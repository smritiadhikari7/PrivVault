"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, CheckCircle2, XCircle, Terminal, Key, ShieldCheck, ArrowRight, Loader2, Sparkles, RefreshCw, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useContract } from '@/context/ContractContext';
import { useWallet } from '@/context/WalletContext';
import { VaultCredential } from '@/lib/vault-storage';
import { toHex, fromHex } from '@/lib/hex-utils';

const to32Bytes = (text: string): Uint8Array => {
  const arr = new Uint8Array(32);
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  arr.set(encoded.slice(0, 32));
  return arr;
};

interface VerifyScreenProps {
  credentials: VaultCredential[];
  selectedCredential: VaultCredential | null;
  onOpenConnectModal: () => void;
}

export const VerifyScreen: React.FC<VerifyScreenProps> = ({
  credentials,
  selectedCredential,
  onOpenConnectModal,
}) => {
  const { isConnected } = useWallet();
  const { verifyCredential, isLoading, error: contractError, resetState } = useContract();

  // Selection & Inputs
  const [selectedCredId, setSelectedCredId] = useState<string>(
    selectedCredential ? selectedCredential.id : credentials[0]?.id || 'custom'
  );

  const [credSecret, setCredSecret] = useState<string>('my-cred-secret-abc');
  const [credIssuer, setCredIssuer] = useState<string>('99967b5594ee4cc8ec0c31f8cbc02be10089e16eb269ba92f4b66d6b11431953');
  const [credTier, setCredTier] = useState<string>('1');
  const [requiredTier, setRequiredTier] = useState<string>('1');

  // Results
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [proofTime, setProofTime] = useState<number | null>(null);
  const [terminalLog, setTerminalLog] = useState<string[]>([]);

  // Update inputs when selected credential changes
  useEffect(() => {
    if (selectedCredential) {
      setSelectedCredId(selectedCredential.id);
      setCredSecret(selectedCredential.privateWitness.credentialSecret);
      setCredIssuer(selectedCredential.publicMetadata.issuerIdHex);
      setCredTier(String(selectedCredential.publicMetadata.tier));
    }
  }, [selectedCredential]);

  const handleSelectChange = (id: string) => {
    setSelectedCredId(id);
    if (id === 'custom') {
      return;
    }
    const found = credentials.find(c => c.id === id);
    if (found) {
      setCredSecret(found.privateWitness.credentialSecret);
      setCredIssuer(found.publicMetadata.issuerIdHex);
      setCredTier(String(found.publicMetadata.tier));
    }
  };

  const handleVerify = async () => {
    if (!isConnected) {
      onOpenConnectModal();
      return;
    }

    setVerifyResult(null);
    setFailureReason(null);
    resetState();
    setTerminalLog(['[INIT] Loading private witness parameters into memory...', '[ZK] Setting up local WASM constraint system...']);

    const startTime = Date.now();

    try {
      const issuerTrimmed = credIssuer.trim();
      const issuerBytes =
        issuerTrimmed.length === 64 ? fromHex(issuerTrimmed) : to32Bytes(issuerTrimmed);

      setTerminalLog(prev => [
        ...prev,
        `[WITNESS] Bound credentialTier = ${credTier}, issuerId = ${issuerTrimmed.slice(0, 10)}...`,
        `[POLICY] Required threshold: tier >= ${requiredTier}`,
        '[PROVING] Generating zero-knowledge proof via ProofStation...',
      ]);

      await verifyCredential(BigInt(requiredTier), {
        credentialSecret: to32Bytes(credSecret),
        credentialIssuer: issuerBytes,
        credentialType: BigInt(credTier),
      });

      const elapsed = Math.round((Date.now() - startTime) / 1000);
      setProofTime(elapsed);
      setVerifyResult(true);

      setTerminalLog(prev => [
        ...prev,
        `[PREPROD] Zero-knowledge proof verified and submitted!`,
        `[STATUS] Ledger counter incremented on Midnight Preprod.`,
      ]);
    } catch (err: any) {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      setProofTime(elapsed);
      setVerifyResult(false);

      const msg = err?.message || String(err);
      let reason = 'Circuit assertion failed or proof was rejected.';

      if (Number(credTier) < Number(requiredTier)) {
        reason = `Threshold Policy Violation: Presented credential is Tier ${credTier}, which is lower than the required Tier ${requiredTier} policy.`;
      } else if (msg.includes('revoked') || msg.includes('Credential revoked')) {
        reason = 'Revocation Assertion Failed: This credential commitment has been revoked on the Midnight Preprod ledger.';
      } else if (msg.includes('Issuer') || msg.includes('not active')) {
        reason = 'Issuer Authority Assertion Failed: The issuing authority is either not authorized or has been deactivated.';
      } else if (msg.includes('rejected') || msg.includes('denied')) {
        reason = 'Wallet Transaction Rejected: The signature request was cancelled in your wallet.';
      } else if (contractError) {
        reason = contractError;
      }

      setFailureReason(reason);
      setTerminalLog(prev => [
        ...prev,
        `[ASSERTION FAILED] ${reason}`,
      ]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8 font-mono">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-[11px] font-semibold tracking-wider uppercase">
          <Shield className="w-3.5 h-3.5" />
          <span>ZERO-KNOWLEDGE VERIFIER TERMINAL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-moon-white font-display uppercase tracking-tight">
          PROVE CREDENTIAL ELIGIBILITY
        </h2>
        <p className="text-xs sm:text-sm text-silver/70 leading-relaxed">
          Evaluate your credential witness inside the local WASM ZK circuit. Prove that you satisfy <code className="text-terminal-green font-mono">tier &gt;= requiredTier</code>, that your credential is valid and unrevoked, without revealing your identity or exact tier.
        </p>
      </div>

      {/* Main Terminal Box */}
      <section className="p-6 rounded-2xl bg-vault-panel border border-white/10 space-y-6 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        {/* Credential Selection Bar */}
        <div className="space-y-2 text-xs">
          <label className="block text-silver/60 text-[11px] uppercase tracking-wider">
            Select Credential From Vault
          </label>
          <select
            value={selectedCredId}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-moon-white font-mono focus:border-cyber-cyan/50 outline-none text-xs"
          >
            {credentials.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} · Tier {c.publicMetadata.tier} [{c.status.toUpperCase()}] ({c.publicMetadata.commitmentHex.slice(0, 10)}...)
              </option>
            ))}
            <option value="custom">— Manual / Custom Private Witness Input —</option>
          </select>
        </div>

        {/* Private Witness Configuration (Local Only) */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
            <span className="text-arcade-amber font-semibold flex items-center gap-1.5 uppercase text-[11px]">
              <Lock className="w-3.5 h-3.5" /> Local Private Witness (Never Disclosed)
            </span>
            <span className="text-[10px] text-silver/50">PROTECTED BY WASM ZKIR</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-silver/50 text-[10px] uppercase mb-1">Holder Credential Secret</label>
              <input
                type="text"
                value={credSecret}
                onChange={(e) => setCredSecret(e.target.value)}
                className="w-full bg-black/70 border border-white/10 rounded-lg px-3 py-2 text-moon-white font-mono text-xs focus:border-cyber-cyan/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-silver/50 text-[10px] uppercase mb-1">Actual Witness Tier</label>
              <select
                value={credTier}
                onChange={(e) => setCredTier(e.target.value)}
                className="w-full bg-black/70 border border-white/10 rounded-lg px-3 py-2 text-cyber-cyan font-mono text-xs font-bold focus:border-cyber-cyan/50 outline-none"
              >
                <option value="1">Tier 1 (Basic)</option>
                <option value="2">Tier 2 (Advanced)</option>
                <option value="3">Tier 3 (Sovereign)</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-silver/50 text-[10px] uppercase mb-1">Issuing Authority ID (Public Commitment)</label>
              <input
                type="text"
                value={credIssuer}
                onChange={(e) => setCredIssuer(e.target.value)}
                className="w-full bg-black/70 border border-white/10 rounded-lg px-3 py-2 text-silver/70 font-mono text-[11px] focus:border-cyber-cyan/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Public Policy Threshold Selection */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <label className="block font-bold text-moon-white uppercase text-[11px]">
              Select Required Tier Threshold (Public Verifier Policy)
            </label>
            <span className="text-[10px] text-terminal-green">CIRCUIT CONSTRAINT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { tier: '1', title: 'Tier 1+ (Basic)', desc: 'Standard Access Policy' },
              { tier: '2', title: 'Tier 2+ (Advanced)', desc: 'Privileged Clearance Policy' },
              { tier: '3', title: 'Tier 3 (Sovereign)', desc: 'Strict Master Audit Policy' },
            ].map((p) => {
              const isSelected = requiredTier === p.tier;
              return (
                <button
                  key={p.tier}
                  type="button"
                  onClick={() => setRequiredTier(p.tier)}
                  className={`p-3.5 rounded-xl border text-left font-mono transition-all ${
                    isSelected
                      ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 text-silver/70'
                  }`}
                >
                  <div className="font-bold text-xs uppercase">{p.title}</div>
                  <div className="text-[10px] opacity-70 mt-1">{p.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prover Action Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-silver/50">
            <span>Evaluating condition: </span>
            <code className="text-terminal-green font-mono">witness.tier ({credTier}) &gt;= policy.tier ({requiredTier})</code>
          </div>

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyber-cyan text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#38f2ff] transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>GENERATING ZK PROOF...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>EXECUTE ZERO-KNOWLEDGE PROOF</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Terminal Prover Logs Output */}
      {terminalLog.length > 0 && (
        <section className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] text-silver/50 uppercase tracking-widest pb-1 border-b border-white/5">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>PROVER EXECUTION LOG</span>
          </div>
          <div className="space-y-1 text-[11px]">
            {terminalLog.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('ASSERTION FAILED')
                    ? 'text-danger-red'
                    : log.includes('PREPROD') || log.includes('verified')
                    ? 'text-terminal-green'
                    : 'text-silver/80'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verification Result Component */}
      <AnimatePresence>
        {verifyResult !== null && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className={`p-6 rounded-2xl border font-mono space-y-5 ${
              verifyResult
                ? 'bg-terminal-green/5 border-terminal-green/40 shadow-[0_0_30px_rgba(0,255,102,0.15)]'
                : 'bg-danger-red/5 border-danger-red/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
            }`}
          >
            {/* Result Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                {verifyResult ? (
                  <div className="w-10 h-10 rounded-full bg-terminal-green/20 border border-terminal-green/40 flex items-center justify-center text-terminal-green">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-danger-red/20 border border-danger-red/40 flex items-center justify-center text-danger-red">
                    <XCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-lg font-bold uppercase tracking-wider font-display ${
                      verifyResult ? 'text-terminal-green' : 'text-danger-red'
                    }`}
                  >
                    {verifyResult ? 'VERIFIED // ZERO-KNOWLEDGE PROOF ACCEPTED' : 'VERIFICATION REJECTED'}
                  </h3>
                  <span className="text-[11px] text-silver/60">
                    {verifyResult
                      ? `Credential satisfies the required policy (Tier >= ${requiredTier}) on Midnight Preprod`
                      : 'The credential does not satisfy the required circuit constraints'}
                  </span>
                </div>
              </div>

              {proofTime !== null && (
                <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-silver/60 text-xs">
                  {proofTime}s PROOF TIME
                </span>
              )}
            </div>

            {/* If Failure: Explanatory Box */}
            {!verifyResult && failureReason && (
              <div className="p-4 rounded-xl bg-danger-red/10 border border-danger-red/20 text-danger-red text-xs space-y-1">
                <span className="font-bold uppercase text-[10px] block">REJECTION DIAGNOSTIC:</span>
                <p className="text-[11px] leading-relaxed text-danger-red/90">{failureReason}</p>
              </div>
            )}

            {/* Audit Breakdown Table */}
            <div className="space-y-2">
              <span className="text-[10px] text-silver/50 uppercase tracking-widest block">
                CRYPTOGRAPHIC AUDIT BREAKDOWN
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                  <span className="text-silver/60">HOLDER IDENTITY:</span>
                  <span className="text-terminal-green font-semibold">Private (Kept in Witness)</span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                  <span className="text-silver/60">CREDENTIAL SECRET:</span>
                  <span className="text-terminal-green font-semibold">Private (Kept in Witness)</span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                  <span className="text-silver/60">EXACT TIER DISCLOSED:</span>
                  <span className="text-terminal-green font-semibold">Hidden (Satisfies &gt;= {requiredTier})</span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                  <span className="text-silver/60">ISSUER AUTHORITY:</span>
                  <span className={verifyResult ? 'text-terminal-green font-semibold' : 'text-silver/60'}>
                    {verifyResult ? 'Authorized & Active' : 'Unconfirmed'}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                  <span className="text-silver/60">REVOCATION STATUS:</span>
                  <span className={verifyResult ? 'text-terminal-green font-semibold' : 'text-danger-red'}>
                    {verifyResult ? 'Clear (Unrevoked)' : 'Check assertion'}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                  <span className="text-silver/60">ZK PROOF INTEGRITY:</span>
                  <span className={verifyResult ? 'text-terminal-green font-semibold' : 'text-danger-red'}>
                    {verifyResult ? 'Cryptographically Valid' : 'Failed Constraint'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
