"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ExternalLink, Terminal, Shield, ArrowRight } from 'lucide-react';
import { useContract, TransactionPhase } from '@/context/ContractContext';

interface RetroTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RetroTransactionModal: React.FC<RetroTransactionModalProps> = ({ isOpen, onClose }) => {
  const { txProgress, resetTxProgress } = useContract();
  const { phase, stepMessage, txHash, error } = txProgress;

  if (!isOpen && phase === 'idle') return null;

  const steps = [
    { id: 'preparing', label: '01 · EVALUATING WITNESS & SCHEMA', desc: 'Validating private witnesses locally' },
    { id: 'generating_proof', label: '02 · CONSTRUCTING ZK PROOF', desc: 'ProofStation WASM cryptographic proving' },
    { id: 'submitting', label: '03 · SUBMITTING TO PREPROD', desc: 'Broadcasting signed attestation on-chain' },
    { id: 'success', label: '04 · CONFIRMED ON MIDNIGHT', desc: 'Ledger state mutated & verified' },
  ];

  const getStepStatus = (stepId: string) => {
    if (phase === 'failed') {
      if (stepId === 'preparing' && stepMessage.includes('preparing')) return 'error';
      if (stepId === 'generating_proof' && stepMessage.includes('proof')) return 'error';
      if (stepId === 'submitting') return 'error';
      return 'pending';
    }
    if (phase === 'success') return 'completed';
    if (phase === stepId) return 'active';
    if (stepId === 'preparing' && (phase === 'generating_proof' || phase === 'submitting')) return 'completed';
    if (stepId === 'generating_proof' && phase === 'submitting') return 'completed';
    return 'pending';
  };

  const handleClose = () => {
    resetTxProgress();
    onClose();
  };

  return (
    <AnimatePresence>
      {(isOpen || phase !== 'idle') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-lg bg-vault-panel border border-terminal-green/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,102,0.15)] flex flex-col"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
                <span className="text-terminal-green font-semibold tracking-wider uppercase">
                  TRANSACTION STATUS // ZERO-KNOWLEDGE PROVING
                </span>
              </div>
              <span className="text-silver/50 text-[11px]">MIDNIGHT PREPROD</span>
            </div>

            {/* Steps Visualizer */}
            <div className="p-6 space-y-4">
              <div className="space-y-3 font-mono">
                {steps.map((step) => {
                  const status = getStepStatus(step.id);
                  return (
                    <div
                      key={step.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                        status === 'completed'
                          ? 'bg-terminal-green/5 border-terminal-green/30 text-terminal-green'
                          : status === 'active'
                          ? 'bg-cyber-cyan/10 border-cyber-cyan/50 text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : status === 'error'
                          ? 'bg-danger-red/10 border-danger-red/40 text-danger-red'
                          : 'bg-white/[0.02] border-white/5 text-silver/40'
                      }`}
                    >
                      <div className="mt-0.5">
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-terminal-green flex-shrink-0" />
                        ) : status === 'active' ? (
                          <Loader2 className="w-4 h-4 text-cyber-cyan animate-spin flex-shrink-0" />
                        ) : status === 'error' ? (
                          <XCircle className="w-4 h-4 text-danger-red flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-silver/30 flex items-center justify-center text-[9px]">
                            ○
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-semibold tracking-wider">{step.label}</div>
                        <div className="text-[11px] opacity-80 mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Message Log */}
              {stepMessage && (
                <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-xs flex items-start gap-2.5">
                  <Terminal className="w-4 h-4 text-silver/60 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-silver/50 text-[10px] block uppercase tracking-wider">SYSTEM LOG:</span>
                    <p className="text-moon-white text-[11px] break-words">{stepMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Box */}
              {error && (
                <div className="p-3 rounded-lg bg-danger-red/10 border border-danger-red/30 text-danger-red font-mono text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                    <XCircle className="w-3.5 h-3.5" /> Execution Rejected
                  </div>
                  <p className="text-[11px] opacity-90 leading-relaxed break-words">{error}</p>
                </div>
              )}

              {/* Success Tx Details */}
              {phase === 'success' && txHash && (
                <div className="p-3 rounded-lg bg-terminal-green/10 border border-terminal-green/30 text-terminal-green font-mono text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Transaction Confirmed
                  </div>
                  <p className="text-[11px] text-silver/80 break-all font-mono">
                    Ref: {txHash}
                  </p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-black/40 border-t border-white/10 flex justify-end gap-3 font-mono text-xs">
              {(phase === 'success' || phase === 'failed') && (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-moon-white font-medium transition-colors"
                >
                  DISMISS
                </button>
              )}
              {phase !== 'success' && phase !== 'failed' && (
                <div className="flex items-center gap-2 text-cyber-cyan text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Zero-Knowledge Proof...</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
