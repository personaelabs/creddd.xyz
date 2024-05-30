import { Hex } from 'viem';
import { CRED_CONTRACT_ADDRESS } from './contract';
import { getChain } from './utils';

export const EIP712_CREDDD_PROOF_SIG_DOMAIN = {
  name: 'creddd',
  version: '1',
  chainId: getChain().id,
  verifyingContract: CRED_CONTRACT_ADDRESS as Hex,
};

export const EIP712_CREDDD_PROOF_SIG_TYPES = {
  AttestToAddress: [{ name: 'address', type: 'string' }],
};

export const EIP721_CREDDD_PROOF_HASH_SIG_DOMAIN = {
  name: 'creddd',
  version: '1',
  chainId: getChain().id,
  verifyingContract: CRED_CONTRACT_ADDRESS as Hex,
};

export const EIP721_CREDDD_PROOF_HASH_SIG_TYPES = {
  ProofHash: [{ name: 'proofHash', type: 'string' }],
};

export const constructProofSigMessage = (address: Hex) => {
  return {
    domain: EIP712_CREDDD_PROOF_SIG_DOMAIN,
    types: EIP712_CREDDD_PROOF_SIG_TYPES,
    primaryType: 'AttestToAddress' as const,
    message: {
      address,
    },
  };
};

export const constructProofHashSigMessage = (proofHash: Hex) => {
  return {
    domain: EIP721_CREDDD_PROOF_HASH_SIG_DOMAIN,
    types: EIP721_CREDDD_PROOF_HASH_SIG_TYPES,
    primaryType: 'ProofHash',
    message: {
      proofHash,
    },
  };
};