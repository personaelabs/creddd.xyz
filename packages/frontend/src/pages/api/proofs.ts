// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Hex, bytesToHex, hashMessage, hexToBytes, keccak256 } from 'viem';
import prisma from '@/lib/prisma';
import { CircuitV3 } from '../../lib/circuit/circuit_v3';

import { ROOT_TO_SET } from '@/lib/sets';
import { toPrefixedHex } from '@/lib/utils';
import {
  __wbg_set_wasm,
  verify_membership,
  client_prepare,
  init_panic_hook,
  get_root,
  get_msg_hash,
  // @ts-ignore
} from '../../../node_modules/circuits/circuits_bg';
import * as wasm from '../../../node_modules/circuits/circuits_bg.wasm';

let verifiedInitialized = false;

// Merkle roots copied from json files
const VALID_ROOTS: Hex[] = Object.keys(ROOT_TO_SET).map((root) =>
  toPrefixedHex(BigInt(root).toString(16)),
);

const TEST_PROOF: Hex = '0x';

export default async function submitProof(req: NextApiRequest, res: NextApiResponse) {
  const proof: Hex = req.body.proof;
  console.log('Proof', proof.length);

  // The signed message
  const message: string = req.body.message;

  __wbg_set_wasm(wasm);

  // If we're not in production, we allow the TEST_PROOF to be submitted.
  // This is useful for testing the UI without having to generate a proof
  // every time.
  if (process.env.NODE_ENV !== 'production') {
    if (proof === TEST_PROOF) {
      const proofHash = keccak256(proof);
      res.send({ proofHash });
      return;
    }
  }

  if (!verifiedInitialized) {
    // Initialize the verifier's wasm
    // await CircuitV3.prepare();
    await client_prepare();
    await init_panic_hook();
    verifiedInitialized = true;
  }

  // Verify the proof
  console.time('verify');
  // const verified = await CircuitV3.verify(proof);
  const proofBytes = hexToBytes(proof);
  const verified = verify_membership(proofBytes);
  console.timeEnd('verify');
  if (!verified) {
    res.status(400).send({ error: 'Invalid proof' });
    return;
  }

  const merkleRoot = bytesToHex(get_root(proofBytes));
  // Check if the merkle root is valid
  if (!VALID_ROOTS.includes(merkleRoot)) {
    res.status(400).send({ error: 'Invalid merkle root' });
    return;
  }

  const msgHash = bytesToHex(get_msg_hash(proofBytes));
  // Check if the message hash is valid
  if (msgHash !== hashMessage(message)) {
    res.status(400).send({ error: 'Invalid message hash' });
    return;
  }

  // Compute the proof hash
  let proofHash: Hex = keccak256(proof);

  // Save the proof to the database. We save the proof the public input in hex format.
  await prisma.membershipProof.create({
    data: {
      message,
      proof,
      merkleRoot,
      publicInput: '',
      proofHash,
      proofVersion: 'v3', // We expect the submitted proof to be a V2 proof
    },
  });

  res.send({ proofHash });
}
