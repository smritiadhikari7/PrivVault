/**
 * PrivVault Local Secure Vault Storage
 * Separates public metadata from private witness secrets.
 * Private witness data is kept strictly client-side and never exposed to network requests or public state.
 */

export interface VaultCredential {
  id: string;
  label: string;
  createdAt: number;
  status: 'active' | 'revoked';
  publicMetadata: {
    commitmentHex: string;
    issuerIdHex: string;
    tier: number;
  };
  privateWitness: {
    userSecret: string;
    credentialSecret: string;
  };
}

const STORAGE_KEY = 'privvault_credentials_vault_v1';

// Canonical test credential issued and verified on Midnight Preprod (Deployment Baseline)
export const CANONICAL_PREPROD_CREDENTIAL: VaultCredential = {
  id: 'canonical-preprod-01',
  label: 'Midnight Preprod Pioneer Accreditation',
  createdAt: 1727100000000,
  status: 'active',
  publicMetadata: {
    commitmentHex: '30b3866deff3cda30eddf79b4ba6092bbfa491881a2a7c41740ee55ecc26f6b9',
    issuerIdHex: '99967b5594ee4cc8ec0c31f8cbc02be10089e16eb269ba92f4b66d6b11431953',
    tier: 1,
  },
  privateWitness: {
    userSecret: 'my-cred-secret-abc',
    credentialSecret: 'my-cred-secret-abc',
  },
};

export const getVaultCredentials = (): VaultCredential[] => {
  if (typeof window === 'undefined') return [CANONICAL_PREPROD_CREDENTIAL];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with canonical preprod credential on first load
      const initial = [CANONICAL_PREPROD_CREDENTIAL];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [CANONICAL_PREPROD_CREDENTIAL];
  } catch (err) {
    console.warn('[PrivVault] Failed to load credentials from storage:', err);
    return [CANONICAL_PREPROD_CREDENTIAL];
  }
};

export const saveVaultCredential = (credential: VaultCredential): VaultCredential[] => {
  if (typeof window === 'undefined') return [credential];
  try {
    const current = getVaultCredentials();
    const existingIndex = current.findIndex(c => c.id === credential.id || c.publicMetadata.commitmentHex === credential.publicMetadata.commitmentHex);
    let updated: VaultCredential[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = credential;
    } else {
      updated = [credential, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('[PrivVault] Failed to save credential:', err);
    return getVaultCredentials();
  }
};

export const updateCredentialStatus = (commitmentHex: string, status: 'active' | 'revoked'): VaultCredential[] => {
  if (typeof window === 'undefined') return [];
  try {
    const current = getVaultCredentials();
    const cleanCommitment = commitmentHex.toLowerCase().replace(/^0x/, '');
    const updated = current.map(c => {
      const cHex = c.publicMetadata.commitmentHex.toLowerCase().replace(/^0x/, '');
      if (cHex === cleanCommitment) {
        return { ...c, status };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('[PrivVault] Failed to update credential status:', err);
    return getVaultCredentials();
  }
};

export const removeVaultCredential = (id: string): VaultCredential[] => {
  if (typeof window === 'undefined') return [];
  try {
    const current = getVaultCredentials();
    const updated = current.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('[PrivVault] Failed to delete credential:', err);
    return getVaultCredentials();
  }
};
