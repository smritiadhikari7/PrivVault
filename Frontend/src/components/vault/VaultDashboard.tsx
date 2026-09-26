"use client";

import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Copy, Check, ExternalLink, Sparkles, Key, CheckCircle2, XCircle, ArrowUpRight, RefreshCw, Terminal, Plus } from 'lucide-react';
import { VaultCredential, CANONICAL_PREPROD_CREDENTIAL } from '@/lib/vault-storage';
import { useContract } from '@/context/ContractContext';
import { useWallet } from '@/context/WalletContext';

interface VaultDashboardProps {
  credentials: VaultCredential[];
  onSelectVerify: (cred: VaultCredential) => void;
  onSelectRevoke: (cred: VaultCredential) => void;
  onNavigateIssue: () => void;
  onResetToBaseline: () => void;
  onOpenConnectModal: () => void;
}

export const VaultDashboard: React.FC<VaultDashboardProps> = ({
  credentials,
  onSelectVerify,
  onSelectRevoke,
  onNavigateIssue,
  onResetToBaseline,
  onOpenConnectModal,
}) => {
  const { isConnected } = useWallet();
  const { verificationCount, isContractValid, contractAddress } = useContract();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectCred, setInspectCred] = useState<VaultCredential | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  const activeCount = credentials.filter(c => c.status === 'active').length;
  const revokedCount = credentials.filter(c => c.status === 'revoked').length;

  const copyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const truncate = (str: string, lead = 8, trail = 6) => {
    if (!str || str.length <= lead + trail) return str;
    return `${str.slice(0, lead)}...${str.slice(-trail)}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 font-mono">
      {/* Hero Section */}
      <section className="relative p-8 rounded-2xl bg-vault-panel border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-terminal-green/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-terminal-green/10 border border-terminal-green/30 text-terminal-green text-[11px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Midnight Network · Preprod ZK Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-moon-white font-display uppercase">
              PRIVATE CREDENTIAL VAULT
            </h1>
            <p className="text-xs sm:text-sm text-silver/70 leading-relaxed">
              Your credentials. Your private witnesses. Zero unnecessary disclosure. Prove compliance, tier eligibility, and authenticity with zero-knowledge proofs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateIssue}
              className="px-4 py-2.5 rounded-xl bg-terminal-green text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#20ff78] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>ISSUE NEW CREDENTIAL</span>
            </button>
            <button
              onClick={onResetToBaseline}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-silver/80 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title="Reset vault to canonical Preprod baseline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESTORE BASELINE</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total */}
        <div className="p-4 rounded-xl bg-vault-panel border border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-silver/50 text-[11px] uppercase tracking-wider">
            <span>TOTAL STORED</span>
            <Shield className="w-4 h-4 text-terminal-green" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-moon-white font-display">
              {String(credentials.length).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-silver/50 block mt-0.5">In client-side vault</span>
          </div>
        </div>

        {/* Metric 2: Active */}
        <div className="p-4 rounded-xl bg-vault-panel border border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-silver/50 text-[11px] uppercase tracking-wider">
            <span>ACTIVE TIERS</span>
            <CheckCircle2 className="w-4 h-4 text-terminal-green" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-terminal-green font-display">
              {String(activeCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-silver/50 block mt-0.5">Verified unrevoked</span>
          </div>
        </div>

        {/* Metric 3: Revoked */}
        <div className="p-4 rounded-xl bg-vault-panel border border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-silver/50 text-[11px] uppercase tracking-wider">
            <span>REVOKED</span>
            <XCircle className="w-4 h-4 text-danger-red" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-danger-red font-display">
              {String(revokedCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-silver/50 block mt-0.5">Circuit assertion fail</span>
          </div>
        </div>

        {/* Metric 4: On-Chain Verifications */}
        <div className="p-4 rounded-xl bg-vault-panel border border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-silver/50 text-[11px] uppercase tracking-wider">
            <span>ON-CHAIN PROOFS</span>
            <Terminal className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-cyber-cyan font-display">
              {String(verificationCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-silver/50 block mt-0.5">Preprod ledger counter</span>
          </div>
        </div>
      </section>

      {/* Disconnected Warning Banner if user is not connected */}
      {!isConnected && (
        <section className="p-4 rounded-xl bg-arcade-amber/10 border border-arcade-amber/30 text-arcade-amber flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>VAULT LOCKED IN READ-ONLY MODE:</strong> Connect your 1AM Wallet to generate zero-knowledge proofs on Midnight Preprod.
            </span>
          </div>
          <button
            onClick={onOpenConnectModal}
            className="px-3 py-1.5 rounded-lg bg-arcade-amber text-black font-semibold text-xs whitespace-nowrap hover:bg-amber-400 transition-colors"
          >
            CONNECT 1AM
          </button>
        </section>
      )}

      {/* Credentials Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-silver/60 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-terminal-green" />
            <h2 className="font-semibold text-moon-white">VAULT CREDENTIALS</h2>
            <span>({credentials.length})</span>
          </div>
          <span className="text-[11px] text-silver/40">Canonical Contract: {truncate(contractAddress, 6, 6)}</span>
        </div>

        {credentials.length === 0 ? (
          <div className="p-12 rounded-2xl bg-vault-panel border border-dashed border-white/10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-silver/40">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-moon-white uppercase tracking-wider">NO CREDENTIALS FOUND</h3>
              <p className="text-xs text-silver/60 max-w-sm mx-auto">
                Your private vault is currently empty. Issue a new zero-knowledge credential or restore the preprod baseline.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNavigateIssue}
                className="px-4 py-2 rounded-lg bg-terminal-green text-black text-xs font-semibold uppercase"
              >
                ISSUE FIRST CREDENTIAL
              </button>
              <button
                onClick={onResetToBaseline}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-silver text-xs"
              >
                RESTORE BASELINE
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((cred) => {
              const isActive = cred.status === 'active';
              return (
                <div
                  key={cred.id}
                  className={`p-5 rounded-xl bg-vault-panel border transition-all flex flex-col justify-between space-y-4 ${
                    isActive
                      ? 'border-white/10 hover:border-terminal-green/50 shadow-sm hover:shadow-[0_0_20px_rgba(0,255,102,0.1)]'
                      : 'border-danger-red/20 bg-danger-red/[0.02]'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-silver/50 tracking-wider">PRIVVAULT // CREDENTIAL</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isActive
                              ? 'bg-terminal-green/10 text-terminal-green border border-terminal-green/30'
                              : 'bg-danger-red/10 text-danger-red border border-danger-red/30'
                          }`}
                        >
                          {isActive ? '● ACTIVE' : '▲ REVOKED'}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-moon-white font-display">
                        {cred.label}
                      </h4>
                    </div>

                    <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cyber-cyan text-xs font-bold font-mono">
                      TIER {cred.publicMetadata.tier}
                    </div>
                  </div>

                  {/* Public Ledger Commitment Data */}
                  <div className="space-y-2 p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-silver/50">COMMITMENT:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-moon-white">{truncate(cred.publicMetadata.commitmentHex, 8, 8)}</span>
                        <button
                          onClick={() => copyText(cred.publicMetadata.commitmentHex, `comm-${cred.id}`)}
                          className="text-silver/40 hover:text-white"
                          title="Copy commitment hex"
                        >
                          {copiedId === `comm-${cred.id}` ? <Check className="w-3 h-3 text-terminal-green" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-silver/50">ISSUER ID:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-silver/70">{truncate(cred.publicMetadata.issuerIdHex, 8, 8)}</span>
                        <button
                          onClick={() => copyText(cred.publicMetadata.issuerIdHex, `iss-${cred.id}`)}
                          className="text-silver/40 hover:text-white"
                          title="Copy issuer hex"
                        >
                          {copiedId === `iss-${cred.id}` ? <Check className="w-3 h-3 text-terminal-green" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setInspectCred(cred)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-silver text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>DETAILS</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <button
                          onClick={() => onSelectRevoke(cred)}
                          className="px-3 py-1.5 rounded-lg bg-danger-red/10 hover:bg-danger-red/20 border border-danger-red/30 text-danger-red text-xs transition-colors"
                        >
                          REVOKE
                        </button>
                      )}
                      <button
                        onClick={() => onSelectVerify(cred)}
                        className="px-3.5 py-1.5 rounded-lg bg-terminal-green/10 hover:bg-terminal-green/20 border border-terminal-green/40 text-terminal-green text-xs font-semibold flex items-center gap-1 transition-all shadow-[0_0_10px_rgba(0,255,102,0.1)]"
                      >
                        <span>PROVE (ZK)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Inspect Modal (Reveals Public vs Private Witness Separation) */}
      {inspectCred && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-vault-panel border border-white/20 rounded-2xl p-6 font-mono space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] text-silver/50 uppercase tracking-widest">CREDENTIAL INSPECTION</span>
                <h3 className="text-base font-bold text-moon-white">{inspectCred.label}</h3>
              </div>
              <button
                onClick={() => {
                  setInspectCred(null);
                  setShowSecret(false);
                }}
                className="text-silver hover:text-white text-xs px-2 py-1 rounded bg-white/5"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Public Section */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-terminal-green flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> PUBLIC DISCLOSED LEDGER STATE
              </span>
              <div className="p-3 rounded-lg bg-black/60 border border-white/10 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-silver/50 block">COMMITMENT (Public Argument):</span>
                  <span className="text-moon-white break-all text-[11px] font-mono">{inspectCred.publicMetadata.commitmentHex}</span>
                </div>
                <div>
                  <span className="text-[10px] text-silver/50 block">ISSUER ID (Public Register):</span>
                  <span className="text-silver/80 break-all text-[11px] font-mono">{inspectCred.publicMetadata.issuerIdHex}</span>
                </div>
                <div>
                  <span className="text-[10px] text-silver/50 block">TIER RATING:</span>
                  <span className="text-cyber-cyan font-bold">Tier {inspectCred.publicMetadata.tier}</span>
                </div>
              </div>
            </div>

            {/* Private Witness Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-arcade-amber flex items-center gap-1.5">
                  <Lock className="w-4 h-4" /> PRIVATE LOCAL WITNESS (KEPT CLIENT-SIDE)
                </span>
                <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-[10px] text-silver/60 hover:text-white flex items-center gap-1"
                >
                  {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showSecret ? 'HIDE' : 'REVEAL'}</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-arcade-amber/20 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-silver/50 block">HOLDER WITNESS SECRET:</span>
                  <span className="text-arcade-amber font-mono break-all text-[11px]">
                    {showSecret ? inspectCred.privateWitness.credentialSecret : '••••••••••••••••••••••••••••••••'}
                  </span>
                </div>
                <p className="text-[10px] text-silver/50 italic">
                  Note: This secret is evaluated exclusively inside your local WASM zero-knowledge prover. It is never transmitted across the network.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  const target = inspectCred;
                  setInspectCred(null);
                  onSelectVerify(target);
                }}
                className="px-4 py-2 rounded-lg bg-terminal-green text-black font-semibold text-xs tracking-wider uppercase"
              >
                PROVE THIS CREDENTIAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
