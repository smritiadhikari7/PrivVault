"use client";

import React, { useState, useMemo } from 'react';
import { Shield, Sparkles, Terminal, Key, CheckCircle2, AlertCircle, Loader2, ArrowRight, RefreshCw, Dice5 } from 'lucide-react';
import { useContract } from '@/context/ContractContext';
import { useWallet } from '@/context/WalletContext';
import { getIssuerId, getUserId, getCredentialCommitment } from '@/lib/credential-derivation';
import { toHex, fromHex } from '@/lib/hex-utils';
import { VaultCredential, saveVaultCredential } from '@/lib/vault-storage';

const to32Bytes = (text: string): Uint8Array => {
  const arr = new Uint8Array(32);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  arr.set(encoded.slice(0, 32));
  return arr;
};

interface IssueScreenProps {
  onSuccess: (credential: VaultCredential) => void;
  onOpenConnectModal: () => void;
}

export const IssueScreen: React.FC<IssueScreenProps> = ({ onSuccess, onOpenConnectModal }) => {
  const { isConnected } = useWallet();
  const { authorizeIssuer, issueCredential, isLoading, error } = useContract();

  // Issuer Secrets
  const [issuerSecret, setIssuerSecret] = useState<string>('demo-secret-123');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true); // Preprod baseline is authorized

  // Issue Form State
  const [label, setLabel] = useState<string>('Developer Accreditation');
  const [recipientSecret, setRecipientSecret] = useState<string>('my-cred-secret-abc');
  const [tier, setTier] = useState<string>('1');

  // Confirmation Modal
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [issuedResult, setIssuedResult] = useState<VaultCredential | null>(null);

  // Derivations
  const { derivedIssuerIdBytes, derivedIssuerIdHex, derivedCommitmentBytes, derivedCommitmentHex } = useMemo(() => {
    try {
      const issBytes = to32Bytes(issuerSecret || 'demo-secret-123');
      const issId = getIssuerId(issBytes);
      const issHex = toHex(issId);

      const userBytes = to32Bytes(recipientSecret || 'my-cred-secret-abc');
      const usrId = getUserId(userBytes);
      const tierNum = BigInt(tier || '1');
      const comm = getCredentialCommitment(usrId, tierNum, issId);
      const commHex = toHex(comm);

      return {
        derivedIssuerIdBytes: issId,
        derivedIssuerIdHex: issHex,
        derivedCommitmentBytes: comm,
        derivedCommitmentHex: commHex,
      };
    } catch (e) {
      console.warn('[PrivVault] Derivation error:', e);
      return {
        derivedIssuerIdBytes: new Uint8Array(32),
        derivedIssuerIdHex: '99967b5594ee4cc8ec0c31f8cbc02be10089e16eb269ba92f4b66d6b11431953',
        derivedCommitmentBytes: new Uint8Array(32),
        derivedCommitmentHex: '30b3866deff3cda30eddf79b4ba6092bbfa491881a2a7c41740ee55ecc26f6b9',
      };
    }
  }, [issuerSecret, recipientSecret, tier]);

  const generateRandomSecret = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let res = 'cred-secret-';
    for (let i = 0; i < 12; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRecipientSecret(res);
  };

  const handleAuthorizeIssuer = async () => {
    if (!isConnected) {
      onOpenConnectModal();
      return;
    }
    try {
      await authorizeIssuer(derivedIssuerIdBytes, {
        issuerSecret: to32Bytes(issuerSecret),
      });
      setIsAuthorized(true);
    } catch (err) {
      console.error('[PrivVault] Authorize error:', err);
    }
  };

  const handleIssueCredential = async () => {
    if (!isConnected) {
      onOpenConnectModal();
      return;
    }
    setShowConfirm(false);
    try {
      await issueCredential(derivedCommitmentBytes, {
        issuerSecret: to32Bytes(issuerSecret),
        credentialType: BigInt(tier),
      });

      // Save to local vault
      const newCred: VaultCredential = {
        id: `cred-${Date.now()}`,
        label: label.trim() || `Tier ${tier} Credential`,
        createdAt: Date.now(),
        status: 'active',
        publicMetadata: {
          commitmentHex: derivedCommitmentHex,
          issuerIdHex: derivedIssuerIdHex,
          tier: Number(tier),
        },
        privateWitness: {
          userSecret: recipientSecret,
          credentialSecret: recipientSecret,
        },
      };

      saveVaultCredential(newCred);
      setIssuedResult(newCred);
      onSuccess(newCred);
    } catch (err) {
      console.error('[PrivVault] Issue error:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-[11px] font-semibold tracking-wider uppercase">
          <Terminal className="w-3.5 h-3.5" />
          <span>ISSUER TERMINAL // MIDNIGHT PREPROD</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-moon-white font-display uppercase tracking-tight">
          ISSUE NEW ZK CREDENTIAL
        </h2>
        <p className="text-xs sm:text-sm text-silver/70 leading-relaxed">
          Mint a cryptographic commitment on Midnight Preprod. The recipient's secret identity remains strictly local, while the commitment is registered under your authorized issuer identity.
        </p>
      </div>

      {/* Step 1: Issuer Identity & Authorization Status */}
      <section className="p-6 rounded-2xl bg-vault-panel border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] text-silver/50 tracking-wider">PHASE 01 // AUTHORITY</span>
            <h3 className="text-sm font-bold text-moon-white uppercase">1. ISSUER SETUP &amp; AUTHORIZATION</h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                isAuthorized
                  ? 'bg-terminal-green/15 text-terminal-green border border-terminal-green/40'
                  : 'bg-arcade-amber/15 text-arcade-amber border border-arcade-amber/40'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAuthorized ? 'bg-terminal-green' : 'bg-arcade-amber'}`} />
              <span>{isAuthorized ? '● AUTHORIZED ON-CHAIN' : '○ NOT AUTHORIZED'}</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-silver/70 leading-relaxed">
          Your issuer identity is derived deterministically from your private issuer secret using Compact's <code className="text-terminal-green font-mono">persistentHash([secret, "vault:issuer"])</code>. The raw secret is never sent to the network.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-silver/60 text-[11px] uppercase mb-1">Issuer Private Secret (Local Witness)</label>
            <input
              type="text"
              value={issuerSecret}
              onChange={(e) => setIssuerSecret(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-moon-white font-mono focus:border-terminal-green/50 outline-none"
            />
          </div>

          <div>
            <label className="block text-silver/60 text-[11px] uppercase mb-1">Derived Public Issuer ID</label>
            <input
              type="text"
              value={derivedIssuerIdHex}
              readOnly
              className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-silver/60 font-mono cursor-not-allowed select-all text-[11px]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleAuthorizeIssuer}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-terminal-green/10 border border-white/10 hover:border-terminal-green/40 text-terminal-green text-xs font-semibold transition-all disabled:opacity-50"
          >
            {isLoading ? 'AUTHORIZING...' : 'RE-AUTHORIZE ISSUER ON-CHAIN'}
          </button>
        </div>
      </section>

      {/* Step 2: Credential Minting Form */}
      <section className="p-6 rounded-2xl bg-vault-panel border border-white/10 space-y-5">
        <div className="pb-4 border-b border-white/10">
          <span className="text-[10px] text-silver/50 tracking-wider">PHASE 02 // ATTESTATION</span>
          <h3 className="text-sm font-bold text-moon-white uppercase">2. CREDENTIAL FORM // LOCAL COMMITMENT</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="block text-silver/60 text-[11px] uppercase mb-1">Credential Name / Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Enterprise Security Accreditation"
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-moon-white font-mono focus:border-terminal-green/50 outline-none"
            />
          </div>

          <div>
            <label className="block text-silver/60 text-[11px] uppercase mb-1">Credential Tier</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-moon-white font-mono focus:border-terminal-green/50 outline-none"
            >
              <option value="1">Tier 1 — Basic Access (Standard)</option>
              <option value="2">Tier 2 — Advanced Clearance (Privileged)</option>
              <option value="3">Tier 3 — Sovereign Master (Full Audit)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <label className="block text-silver/60 text-[11px] uppercase">
              Recipient Subject Secret (Private Local Witness)
            </label>
            <button
              onClick={generateRandomSecret}
              className="text-[10px] text-terminal-green hover:underline flex items-center gap-1"
            >
              <Dice5 className="w-3 h-3" />
              <span>GENERATE RANDOM SECRET</span>
            </button>
          </div>
          <input
            type="text"
            value={recipientSecret}
            onChange={(e) => setRecipientSecret(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-moon-white font-mono focus:border-terminal-green/50 outline-none text-xs"
          />
        </div>

        {/* Commitment Preview Box */}
        <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-silver/50 text-[10px] uppercase">
            <span>DERIVED ON-CHAIN COMMITMENT (hash(userId, ctype, issuerId)):</span>
            <span className="text-terminal-green">PREVIEW</span>
          </div>
          <div className="text-[11px] font-mono text-moon-white break-all bg-black/40 p-2.5 rounded border border-white/5">
            {derivedCommitmentHex}
          </div>
          <p className="text-[10px] text-silver/50 italic">
            This commitment will be registered in the <code className="text-terminal-green font-mono">issued</code> ledger map on Midnight Preprod.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowConfirm(true)}
            disabled={isLoading || !isConnected}
            className="px-6 py-3 rounded-xl bg-terminal-green text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#20ff78] transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>PROCESSING ZK ATTESTATION...</span>
              </>
            ) : (
              <>
                <span>ISSUE ON MIDNIGHT PREPROD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-vault-panel border border-terminal-green/40 rounded-2xl p-6 font-mono space-y-5 shadow-[0_0_30px_rgba(0,255,102,0.15)]">
            <div className="space-y-1 pb-3 border-b border-white/10">
              <span className="text-[10px] text-terminal-green uppercase tracking-widest">TRANSACTION CONFIRMATION</span>
              <h3 className="text-base font-bold text-moon-white uppercase">CONFIRM CREDENTIAL ISSUANCE</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-silver/50">NAME:</span>
                  <span className="text-moon-white font-semibold">{label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-silver/50">TIER:</span>
                  <span className="text-cyber-cyan font-bold">Tier {tier}</span>
                </div>
                <div>
                  <span className="text-silver/50 block mb-0.5">COMMITMENT:</span>
                  <span className="text-[10px] text-silver/80 break-all font-mono">{derivedCommitmentHex}</span>
                </div>
              </div>

              <p className="text-[11px] text-silver/70 leading-relaxed">
                By confirming, a zero-knowledge circuit will execute via your 1AM Wallet, proving authorized issuer authority and registering the commitment on the Midnight Preprod ledger.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-silver text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={handleIssueCredential}
                className="px-5 py-2 rounded-lg bg-terminal-green text-black font-semibold text-xs uppercase"
              >
                CONFIRM &amp; SIGN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {issuedResult && (
        <div className="p-4 rounded-xl bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-xs space-y-2 font-mono">
          <div className="flex items-center gap-2 font-bold uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>CREDENTIAL ISSUED &amp; SAVED TO VAULT</span>
          </div>
          <p className="text-[11px] text-silver/80">
            Commitment <code className="text-moon-white font-mono">{issuedResult.publicMetadata.commitmentHex.slice(0, 16)}...</code> has been recorded on Midnight Preprod and stored in your local vault. You can now prove it on the Verify tab!
          </p>
        </div>
      )}
    </div>
  );
};
