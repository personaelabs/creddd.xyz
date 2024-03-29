mod eth_membership;
mod utils;

use crate::utils::{efficient_ecdsa, verify_efficient_ecdsa};
use ark_ff::BigInteger;
use ark_secp256k1::{Affine, Fq, Fr};
use ark_serialize::{CanonicalDeserialize, CanonicalSerialize};
use bloomfilter::Bloom;
use eth_membership::{eth_membership, to_cs_field, TREE_DEPTH};
use num_bigint::BigUint;
use sapir::constraint_system::ConstraintSystem;
use sapir::{embed_to_wasm, wasm::prelude::*};

type Curve = ark_secq256k1::Projective;
type F = ark_secq256k1::Fr;

// Produce the code to generate and verify the proof of the `eth_membership` circuit.
// We wrap the `prove` and `verify` functions with additional logic
// and expose them to the JavaScript runtime.
embed_to_wasm!(
    |cs: &mut ConstraintSystem<F>| { eth_membership(cs) },
    Curve,
    b"creddd"
);

// `MembershipProof` consists of a Spartan proof
// and auxiliary inputs necessary for full verification.
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(CanonicalSerialize, CanonicalDeserialize)]
pub struct MembershipProof {
    pub proof: Vec<u8>,
    r: Fq,
    is_y_odd: bool,
    msg_hash: BigUint,
    sign_in_sig: Fq,
}

#[wasm_bindgen]
pub fn prove_membership(
    s: &[u8],
    r: &[u8],
    is_y_odd: bool,
    msg_hash: &[u8],
    merkle_siblings: &[u8],
    merkle_indices: &[u8],
    root: &[u8],
    sign_in_sig: &[u8],
) -> Vec<u8> {
    assert!(merkle_siblings.len() == TREE_DEPTH * 32);
    assert!(merkle_indices.len() == TREE_DEPTH * 32);
    assert!(root.len() == 32);

    // Deserialize the inputs
    let s = Fr::from(BigUint::from_bytes_be(s));
    let r = Fq::from(BigUint::from_bytes_be(r));
    let msg_hash = BigUint::from_bytes_be(msg_hash);
    let sign_in_sig = Fq::from(BigUint::from_bytes_be(sign_in_sig));

    let merkle_siblings = merkle_siblings
        .to_vec()
        .chunks(32)
        .map(|sibling| F::from(BigUint::from_bytes_be(&sibling)))
        .collect::<Vec<F>>();

    let merkle_indices = merkle_indices
        .to_vec()
        .chunks(32)
        .map(|index| F::from(BigUint::from_bytes_be(&index)))
        .collect::<Vec<F>>();

    let root = F::from(BigUint::from_bytes_be(root));

    // Compute the efficient ECDSA input
    let (u, t) = efficient_ecdsa(msg_hash.clone(), r, is_y_odd);

    // Construct the private input
    let mut priv_input = vec![];

    let s_bits = s
        .into_bigint()
        .to_bits_le()
        .iter()
        .map(|b| F::from(*b))
        .collect::<Vec<F>>();

    priv_input.extend_from_slice(&s_bits);

    // Append the Merkle indices and siblings to the private input
    priv_input.extend_from_slice(&merkle_indices);
    priv_input.extend_from_slice(&merkle_siblings);

    // Convert the private input to bytes
    let priv_input = priv_input
        .iter()
        .flat_map(|x| x.into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    // Construct the public input
    let mut pub_input = vec![
        to_cs_field(t.x),
        to_cs_field(t.y),
        to_cs_field(u.x),
        to_cs_field(u.y),
        to_cs_field(sign_in_sig),
    ];

    // Append the Merkle roots to the public input
    pub_input.push(to_cs_field(root));

    let pub_input = pub_input
        .iter()
        .flat_map(|x| x.into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    // Generate the proof
    let proof = prove(&pub_input, &priv_input);

    let membership_proof = MembershipProof {
        proof,
        r,
        is_y_odd,
        msg_hash,
        sign_in_sig,
    };

    // Serialize the full proof
    let mut membership_proof_bytes = Vec::new();
    membership_proof
        .serialize_compressed(&mut membership_proof_bytes)
        .unwrap();

    membership_proof_bytes
}

#[wasm_bindgen]
pub fn verify_membership(creddd_proof: &[u8]) -> bool {
    // Get the public inputs from the proof
    let creddd_proof = MembershipProof::deserialize_compressed(creddd_proof).unwrap();
    let spartan_proof =
        SpartanProof::<Curve>::deserialize_compressed(creddd_proof.proof.as_slice()).unwrap();
    let pub_inputs = spartan_proof.pub_input.clone();

    let tx = pub_inputs[0];
    let ty = pub_inputs[1];
    let ux = pub_inputs[2];
    let uy = pub_inputs[3];

    let t = Affine::new(tx, ty);
    let u = Affine::new(ux, uy);

    let r = creddd_proof.r;
    let is_y_odd = creddd_proof.is_y_odd;
    let msg_hash = creddd_proof.msg_hash;

    // Verify the proof
    let is_proof_valid = verify(&creddd_proof.proof);

    // Verify the efficient ECDSA input
    let is_efficient_ecdsa_valid = verify_efficient_ecdsa(msg_hash, r, is_y_odd, t, u);

    is_proof_valid && is_efficient_ecdsa_valid
}

// ####################################
// Helper functions
// ####################################

// Get the Merkle root from the proof's public input
#[wasm_bindgen]
pub fn get_merkle_root(creddd_proof: &[u8]) -> Vec<u8> {
    let creddd_proof = MembershipProof::deserialize_compressed(creddd_proof).unwrap();
    let spartan_proof =
        SpartanProof::<Curve>::deserialize_compressed(creddd_proof.proof.as_slice()).unwrap();
    let pub_inputs = spartan_proof.pub_input.clone();
    // The first 4 elements of the public input are the efficient ECDSA inputs,
    // and the 5th element is the sign_in_sig.
    // The 6th element is the Merkle root.
    let root = &pub_inputs[5];

    root.into_bigint().to_bytes_be()
}

// Get the  message hash from the proof's public input
#[wasm_bindgen]
pub fn get_msg_hash(creddd_proof: &[u8]) -> Vec<u8> {
    let creddd_proof = MembershipProof::deserialize_compressed(creddd_proof).unwrap();
    creddd_proof.msg_hash.to_bytes_be()
}

#[wasm_bindgen]
pub fn get_sign_in_sig(creddd_proof: &[u8]) -> Vec<u8> {
    let creddd_proof = MembershipProof::deserialize_compressed(creddd_proof).unwrap();
    creddd_proof.sign_in_sig.into_bigint().to_bytes_be()
}

#[wasm_bindgen]
pub fn bloom_check(
    bytes: &[u8],
    bitmap_bits: u64,
    k_num: u32,
    sip_keys_bytes: &[u8],
    item: &[u8],
) -> bool {
    let sip_keys = [
        (
            u64::from_be_bytes(sip_keys_bytes[0..8].try_into().unwrap()),
            u64::from_be_bytes(sip_keys_bytes[8..16].try_into().unwrap()),
        ),
        (
            u64::from_be_bytes(sip_keys_bytes[16..24].try_into().unwrap()),
            u64::from_be_bytes(sip_keys_bytes[24..32].try_into().unwrap()),
        ),
    ];

    let bloom = Bloom::from_existing(bytes, bitmap_bits, k_num, sip_keys);

    bloom.check(item)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils::test_utils::mock_sig;
    use ark_ff::BigInteger;
    use ark_std::{end_timer, start_timer};
    use eth_membership::TREE_DEPTH;
    use num_bigint::BigUint;
    use sapir::{merkle_tree::tree::MerkleTree, poseidon::constants::secp256k1_w3};

    #[test]
    fn bench_eth_membership() {
        prepare();

        let (s, r, is_y_odd, msg_hash, _, address) = mock_sig(42);
        let address = F::from(BigUint::from_bytes_be(&address.to_fixed_bytes()));

        // Construct a mock tree
        let mut leaves = vec![address];
        for i in 0..(2usize.pow(TREE_DEPTH as u32) - 1) {
            leaves.push(F::from(i as u32));
        }

        let mut tree: MerkleTree<_, 3> = MerkleTree::<F, 3>::new(secp256k1_w3());
        for leaf in &leaves {
            tree.insert(*leaf);
        }

        tree.finish();

        let merkle_proof = tree.create_proof(address);

        let s_bytes = s.into_bigint().to_bytes_be();
        let r_bytes = r.into_bigint().to_bytes_be();
        let msg_hash = msg_hash.to_bytes_be();

        let merkle_siblings = merkle_proof
            .siblings
            .iter()
            .flat_map(|sibling| sibling.into_bigint().to_bytes_be())
            .collect::<Vec<u8>>();

        let merkle_indices = merkle_proof
            .path_indices
            .iter()
            .map(|i| F::from(*i as u32).into_bigint().to_bytes_be())
            .flatten()
            .collect::<Vec<u8>>();

        let root = tree.root.unwrap().into_bigint().to_bytes_be();

        // Dummy sign_in_sig
        let sign_in_sig = F::from(42u32).into_bigint().to_bytes_be();

        let prover_timer = start_timer!(|| "prove");
        let proof = prove_membership(
            &s_bytes,
            &r_bytes,
            is_y_odd,
            &msg_hash,
            &merkle_siblings,
            &merkle_indices,
            &root,
            &sign_in_sig,
        );
        end_timer!(prover_timer);

        let verifier_timer = start_timer!(|| "verify");
        assert!(verify_membership(&proof));
        end_timer!(verifier_timer);
    }
}
