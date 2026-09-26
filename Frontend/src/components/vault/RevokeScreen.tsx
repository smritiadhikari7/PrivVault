"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, XCircle, CheckCircle2, Loader2, ArrowRight, Lock, Key, Copy, Check } from 'lucide-react';
import { useContract } from '@/context/ContractContext';
import { useWallet } from '@/context/WalletContext';
import { VaultCredential, updateCredentialStatus } from '@/lib/vault-storage';
import { toHex, fromHex } from '@/lib/hex-utils';

const to32Bytes = (text: string): Uint8Array => {
  const arr = new Uint8Array(32);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  arr.set(encoded.slice(0, 32));
  return arr;
};

interface RevokeScreenProps {
  credentials: VaultCredential[];
  selectedCredential: VaultCredential | null;
  onRevokedSuccess: (commitmentHex: string) => void;
  onOpenConnectModal: () => void;
}

export const RevokeScreen: React.FC<RevokeScreenProps> = ({
  credentials,
  selectedCredential,
  onRevokedSuccess,
  onOpenConnectModal,
}) => {
  const { isConnected } = useWallet();
  const { revokeCredential, isLoading, error: contractError } = useContract();

  const [selectedId, setSelectedId] = useState<string>(
    selectedCredential ? selectedCredential.id : credentials[0]?.id || 'custom'
  );

  const [commitmentInput, setCommitmentInput] = useState<string>(
    selectedCredential ? selectedCredential.publicMetadata.commitmentHex : ''
  );
  const [issuerSecret, setIssuerSecret] = useState<string>('demo-secret-123');

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [revokedTxSuccess, setRevokedTxSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCredential) {
      setSelectedId(selectedCredential.id);
      setCommitmentInput(selectedCredential.publicMetadata.commitmentHex);
    }
  }, [selectedCredential]);

  const handleSelectChange = (id: string) => {
    setSelectedId(id);
    if (id === 'custom') {
      setCommitmentInput('');
      return;
    }
    const found = credentials.find(c => c.id === id);
    if (found) {
      setCommitmentInput(found.publicMetadata.commitmentHex);
    }
  };

  const currentSelectedCred = credentials.find(c => c.id === selectedId);
  const isAlreadyRevoked = currentSelectedCred?.status === 'revoked';

  const handleExecuteRevoke = async () => {
    if (!isConnected) {
      onOpenConnectModal();
      return;
    }

    setShowConfirmModal(false);
    setRevokedTxSuccess(false);

    try {
      const cleanHex = commitmentInput.trim().replace(/^0x/, '');
      const commitmentBytes =
        cleanHex.length === 64 ? fromHex(cleanHex) : to32Bytes(commitmentInput.trim());

      await revokeCredential(commitmentBytes, {
        issuerSecret: to32Bytes(issuerSecret),
      });

      // Update local storage status
      updateCredentialStatus(cleanHex, 'revoked');
      setRevokedTxSuccess(true);
      onRevokedSuccess(cleanHex);
    } catch (err) {
      console.error('[PrivVault] Revocation error:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-danger-red/10 border border-danger-red/30 text-danger-red text-[11px] font-semibold tracking-wider uppercase">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>ISSUER DANGER ZONE // ON-CHAIN REVOCATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-moon-white font-display uppercase tracking-tight">
          REVOKE CREDENTIAL COMMITMENT
        </h2>
        <p className="text-xs sm:text-sm text-silver/70 leading-relaxed">
          Executing this circuit records the commitment in the on-chain <code className="text-danger-red font-mono">revoked</code> ledger map on Midnight Preprod. Any future attempt to verify this credential will be cryptographically rejected.
        </p>
      </div>

      {/* Warning Panel */}
      <section className="p-6 rounded-2xl bg-danger-red/5 border border-danger-red/30 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-danger-red/20 border border-danger-red/40 flex items-center justify-center text-danger-red flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-danger-red uppercase tracking-wider">
              PERMANENT REVERSIBLE ACTIONS DO NOT EXIST
            </h3>
            <p className="text-xs text-silver/80 leading-relaxed">
              Once revoked on the Midnight ledger, a credential cannot be un-revoked. Ensure you have selected the intended credential before executing the ZK revocation proof.
            </p>
          </div>
        </div>

        {/* Credential Selector */}
        <div className="space-y-2 text-xs pt-2">
          <label className="block text-silver/60 text-[11px] uppercase tracking-wider">
            Select Credential To Revoke
          </label>
          <select
            value={selectedId}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-moon-white font-mono focus:border-danger-red/50 outline-none text-xs"
          >
            {credentials.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} · Tier {c.publicMetadata.tier} [{c.status.toUpperCase()}] ({c.publicMetadata.commitmentHex.slice(0, 10)}...)
              </option>
            ))}
            <option value="custom">— Manual Credential Commitment Input —</option>
          </select>
        </div>

        {/* Commitment Input Field */}
        <div className="space-y-2 text-xs">
          <label className="block text-silver/60 text-[11px] uppercase tracking-wider">
            Credential Commitment (Hex)
          </label>
          <input
            type="text"
            value={commitmentInput}
            onChange={(e) => setCommitmentInput(e.target.value)}
            placeholder="e.g. 30b3866deff3cda30eddf79b4ba6092bbfa491881a2a7c41740ee55ecc26f6b9"
            className="w-full bg-black/70 border border-white/10 rounded-xl px-4 py-3 text-moon-white font-mono text-xs focus:border-danger-red/50 outline-none"
          />
        </div>

        {/* Issuer Private Secret for Revoke Witness */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-arcade-amber font-semibold flex items-center gap-1.5 uppercase text-[11px]">
              <Lock className="w-3.5 h-3.5" /> Issuer Authority Witness (Private)
            </span>
            <span className="text-[10px] text-silver/50">Caller must be the original issuing authority</span>
          </div>
          <input
            type="text"
            value={issuerSecret}
            onChange={(e) => setIssuerSecret(e.target.value)}
            placeholder="Issuer Secret"
            className="w-full bg-black/70 border border-white/10 rounded-lg px-3 py-2 text-moon-white font-mono text-xs focus:border-danger-red/50 outline-none"
          />
        </div>

        {/* Already Revoked Alert */}
        {isAlreadyRevoked && (
          <div className="p-3 rounded-lg bg-black/50 border border-danger-red/30 text-danger-red text-xs flex items-center gap-2">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span>This credential is already registered as REVOKED on the Midnight Preprod ledger map.</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={isLoading || isAlreadyRevoked || !commitmentInput.trim() || !isConnected}
            className="px-6 py-3 rounded-xl bg-danger-red text-white font-semibold text-xs tracking-wider uppercase hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>PROCESSING REVOCATION...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                <span>CONFIRM &amp; REVOKE ON-CHAIN</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-vault-panel border border-danger-red/50 rounded-2xl p-6 font-mono space-y-5 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <div className="space-y-1 pb-3 border-b border-white/10">
              <span className="text-[10px] text-danger-red uppercase tracking-widest">IRREVERSIBLE OPERATION</span>
              <h3 className="text-base font-bold text-moon-white uppercase">CONFIRM PERMANENT REVOCATION</h3>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-silver/80 leading-relaxed">
                You are about to submit an on-chain transaction that enters this commitment into the <code className="text-danger-red font-mono">revoked</code> map:
              </p>

              <div className="p-3 rounded-lg bg-black/60 border border-white/5 break-all text-[11px] font-mono text-moon-white">
                {commitmentInput}
              </div>

              <p className="text-[11px] text-silver/60">
                Subsequent verification circuits evaluated by any verifier will immediately fail constraint checking.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-silver text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={handleExecuteRevoke}
                className="px-5 py-2 rounded-lg bg-danger-red text-white font-semibold text-xs uppercase hover:bg-red-600 transition-colors"
              >
                EXECUTE REVOKE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {revokedTxSuccess && (
        <div className="p-4 rounded-xl bg-danger-red/10 border border-danger-red/30 text-danger-red text-xs space-y-1 font-mono">
          <div className="flex items-center gap-2 font-bold uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>REVOCATION RECORDED ON MIDNIGHT PREPROD</span>
          </div>
          <p className="text-[11px] text-silver/80">
            The credential commitment has been revoked on-chain. Future verification attempts will reject as expected.
          </p>
        </div>
      )}
    </div>
  );
};
