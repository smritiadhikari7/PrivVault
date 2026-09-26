export const contractName = 'Vault';
export const languageVersion = '0.23';

export const CANONICAL_PREPROD_CONTRACT_ADDRESS =
  (import.meta as any).env?.VITE_CONTRACT_ADDRESS ||
  'dcef898920d314ca3ad8c512ec356befac3407c730700b0323cd9577faadd18f';

export const CANONICAL_NETWORK_ID =
  (import.meta as any).env?.VITE_NETWORK_ID || 'preprod';

export const CANONICAL_INDEXER_URI =
  (import.meta as any).env?.VITE_INDEXER_URI ||
  'https://indexer.preprod.midnight.network/api/v4/graphql';

export const CANONICAL_INDEXER_WS_URI =
  (import.meta as any).env?.VITE_INDEXER_WS_URI ||
  'wss://indexer.preprod.midnight.network/api/v4/graphql/ws';

export const CANONICAL_PROOF_SERVER_URI =
  (import.meta as any).env?.VITE_PROOF_SERVER_URI ||
  'https://api-preprod.1am.xyz';

export const circuits = {
  authorizeIssuer: {
    name: 'authorizeIssuer',
    inputs: [{ name: 'issuerId', type: 'Bytes<32>' }],
    outputs: [],
    witnesses: [],
  },
  issueCredential: {
    name: 'issueCredential',
    inputs: [{ name: 'credentialCommitment', type: 'Bytes<32>' }],
    outputs: [],
    witnesses: [{ name: 'issuerSecret', type: 'Bytes<32>' }],
  },
  verifyCredential: {
    name: 'verifyCredential',
    inputs: [{ name: 'requiredType', type: 'Uint<8>' }],
    outputs: [],
    witnesses: [
      { name: 'credentialSecret', type: 'Bytes<32>' },
      { name: 'credentialType', type: 'Uint<8>' },
      { name: 'credentialIssuer', type: 'Bytes<32>' },
    ],
  },
  revokeCredential: {
    name: 'revokeCredential',
    inputs: [{ name: 'credentialCommitment', type: 'Bytes<32>' }],
    outputs: [],
    witnesses: [{ name: 'issuerSecret', type: 'Bytes<32>' }],
  },
} as const;

export const ledger = {
  issuers: { type: 'Map<Bytes<32>, Boolean>', visibility: 'public' },
  issued: { type: 'Map<Bytes<32>, Bytes<32>>', visibility: 'public' },
  revoked: { type: 'Map<Bytes<32>, Boolean>', visibility: 'public' },
  verificationCount: { type: 'Counter', visibility: 'public' },
} as const;

export type ContractAddress = string;
