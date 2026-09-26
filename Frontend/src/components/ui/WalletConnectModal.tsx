"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertCircle, Loader2, RefreshCw, Zap, Shield, CheckCircle, Terminal } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
  const {
    connectWallet,
    connect1AMWallet,
    isConnected,
    isWalletAvailable,
    is1AMAvailable,
    isLaceAvailable,
    isWrongNetwork,
    targetNetworkId,
    walletType,
    error,
  } = useWallet();

  const [connectingWallet, setConnectingWallet] = useState<'lace' | '1am' | null>(null);
  const [hasMidnightInjection, setHasMidnightInjection] = useState(false);
  const [has1AMInjection, setHas1AMInjection] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Check injection directly
  useEffect(() => {
    const checkInjection = () => {
      // @ts-ignore
      const midnight = window?.midnight;
      const has = !!(midnight && typeof midnight === 'object' && Object.keys(midnight).length > 0);
      // @ts-ignore
      const has1am = !!(midnight && midnight['1am'] && typeof midnight['1am'] === 'object');
      setHasMidnightInjection(has);
      setHas1AMInjection(has1am);
    };
    checkInjection();
    const t = setInterval(checkInjection, 1000);
    return () => clearInterval(t);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close when connected
  useEffect(() => {
    if (isConnected && isOpen) {
      const timer = setTimeout(onClose, 600);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isOpen, onClose]);

  const handleConnect1AM = async () => {
    setConnectingWallet('1am');
    try {
      await connect1AMWallet();
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleConnectLace = async () => {
    setConnectingWallet('lace');
    try {
      await connectWallet();
    } finally {
      setConnectingWallet(null);
    }
  };

  const oneAmDetected = is1AMAvailable || has1AMInjection;
  const laceDetected = isLaceAvailable || (hasMidnightInjection && !has1AMInjection);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-label="Connect Wallet"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          className="w-full max-w-md bg-vault-panel border border-terminal-green/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/50 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-moon-white uppercase tracking-wider">
                  CONNECT WALLET // ACCESS VAULT
                </h3>
                <span className="text-[11px] text-silver/60">Midnight Preprod Testnet</span>
              </div>
            </div>
            <button
              onClick={onClose}
              id="wallet-modal-close-btn"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-silver/60 hover:text-moon-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Wrong Network Warning */}
            {isWrongNetwork && (
              <div className="p-3.5 rounded-xl bg-danger-red/10 border border-danger-red/30 text-danger-red text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 uppercase">
                  <AlertCircle className="w-4 h-4" /> Wrong Network
                </div>
                <p className="text-[11px] opacity-90 leading-relaxed">
                  PrivVault strictly operates on <strong>Midnight Preprod</strong> ({targetNetworkId}). Please switch network in your wallet extension.
                </p>
              </div>
            )}

            {/* General Error */}
            {error && !isWrongNetwork && (
              <div className="p-3.5 rounded-xl bg-danger-red/10 border border-danger-red/30 text-danger-red text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 uppercase">
                  <AlertCircle className="w-4 h-4" /> Connection Issue
                </div>
                <p className="text-[11px] opacity-90 leading-relaxed">{error}</p>
              </div>
            )}

            {/* 1AM Wallet — PRIMARY RECOMMENDATION */}
            <div className="space-y-2">
              <div className="text-[11px] text-silver/50 uppercase tracking-widest flex items-center justify-between">
                <span>Primary Midnight Wallet</span>
                <span className="text-terminal-green text-[10px] font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> WASM PROVING ENGINE
                </span>
              </div>

              <button
                id="oneam-connect-btn"
                onClick={handleConnect1AM}
                disabled={!!connectingWallet}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-terminal-green/5 border border-terminal-green/30 hover:border-terminal-green transition-all group disabled:opacity-50 text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-terminal-green/10 border border-terminal-green/30 flex items-center justify-center text-terminal-green">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-moon-white group-hover:text-terminal-green transition-colors">
                        1AM Wallet
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-terminal-green/20 text-terminal-green uppercase">
                        Recommended
                      </span>
                    </div>
                    <span className="text-[11px] text-silver/60">
                      {oneAmDetected ? 'Detected · Fast ZK Sync' : 'Click to connect (or install if missing)'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-terminal-green">
                  {connectingWallet === '1am' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-terminal-green/10 border border-terminal-green/20 group-hover:bg-terminal-green group-hover:text-black transition-all">
                      CONNECT
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Lace Wallet — SECONDARY ALTERNATIVE */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] text-silver/50 uppercase tracking-widest">
                Alternative Wallet
              </div>

              <button
                id="lace-connect-btn"
                onClick={handleConnectLace}
                disabled={!!connectingWallet}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all group disabled:opacity-50 text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-silver/80">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-moon-white group-hover:text-moon-glow transition-colors block">
                      Lace (Midnight Preview)
                    </span>
                    <span className="text-[10px] text-silver/50">
                      {laceDetected ? 'Detected' : 'Standard Midnight Connector'}
                    </span>
                  </div>
                </div>

                <div className="text-xs">
                  {connectingWallet === 'lace' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-silver" />
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-silver/70 group-hover:text-white transition-all text-[11px]">
                      CONNECT
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Helper Info & Extension Links */}
            <div className="pt-2 border-t border-white/5 flex flex-col gap-2 text-[11px] text-silver/50">
              <div className="flex items-center justify-between">
                <span>Need 1AM Wallet extension?</span>
                <a
                  href="https://1am.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-cyan hover:underline inline-flex items-center gap-1"
                >
                  Download 1AM <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Need Preprod $tNIGHT gas?</span>
                <a
                  href="https://faucet.preprod.midnight.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moon-glow hover:underline inline-flex items-center gap-1"
                >
                  Preprod Faucet <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
