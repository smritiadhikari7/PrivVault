"use client";

import React, { useState } from 'react';
import { Shield, Lock, Terminal, CheckCircle2, AlertTriangle, MessageSquare, ExternalLink, Menu, X } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

interface RetroNavigationProps {
  activeTab: 'vault' | 'issue' | 'verify' | 'revoke';
  setActiveTab: (tab: 'vault' | 'issue' | 'verify' | 'revoke') => void;
  onOpenConnectModal: () => void;
  feedbackFormUrl: string;
  feedbackSheetUrl: string;
}

export const RetroNavigation: React.FC<RetroNavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenConnectModal,
  feedbackFormUrl,
  feedbackSheetUrl,
}) => {
  const { isConnected, address, disconnect, walletType, isWrongNetwork, targetNetworkId } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const truncate = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const navItems: { id: 'vault' | 'issue' | 'verify' | 'revoke'; label: string; icon: string }[] = [
    { id: 'vault', label: 'VAULT', icon: '01' },
    { id: 'issue', label: 'ISSUE', icon: '02' },
    { id: 'verify', label: 'VERIFY', icon: '03' },
    { id: 'revoke', label: 'REVOKE', icon: '04' },
  ];

  return (
    <header className="w-full max-w-6xl mx-auto pt-6 pb-4 px-4 font-mono relative z-30">
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-vault-panel border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-terminal-green/10 border border-terminal-green/40 flex items-center justify-center text-terminal-green shadow-[0_0_12px_rgba(0,255,102,0.2)]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-moon-white tracking-widest uppercase font-display">
                PRIVVAULT
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-terminal-green/10 border border-terminal-green/30 text-terminal-green">
                v1.0
              </span>
            </div>
            <span className="text-[10px] text-silver/50 tracking-wider block">
              ZERO-KNOWLEDGE PRIVACY VAULT
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/5 text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-md font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-terminal-green/15 text-terminal-green border border-terminal-green/40 shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                    : 'text-silver/60 hover:text-moon-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="text-[10px] opacity-60">[{item.icon}]</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status / Wallet */}
        <div className="hidden sm:flex items-center gap-3 text-xs">
          {/* Network Badge */}
          {isWrongNetwork ? (
            <div className="px-2.5 py-1 rounded-md bg-danger-red/15 border border-danger-red/40 text-danger-red text-[11px] font-semibold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>WRONG NET</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-silver/70 text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              <span>PREPROD</span>
            </div>
          )}

          {/* Feedback Form Link */}
          <a
            href={feedbackFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-silver/80 hover:text-moon-white transition-colors text-[11px] flex items-center gap-1.5"
            title="Tester Feedback Form"
          >
            <MessageSquare className="w-3 h-3 text-terminal-green" />
            <span>FEEDBACK</span>
          </a>

          {/* Wallet Button */}
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-terminal-green/10 border border-terminal-green/30 text-terminal-green font-mono text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
                <span>{walletType?.toUpperCase() || '1AM'}:</span>
                <span className="font-semibold">{truncate(address)}</span>
              </div>
              <button
                onClick={disconnect}
                className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-danger-red/10 border border-white/10 hover:border-danger-red/30 text-silver/60 hover:text-danger-red transition-colors text-[11px]"
                title="Disconnect Wallet"
              >
                EXIT
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenConnectModal}
              id="nav-connect-btn"
              className="px-4 py-1.5 rounded-lg bg-terminal-green text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#20ff78] transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_20px_rgba(0,255,102,0.5)] flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CONNECT 1AM</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {!isConnected && (
            <button
              onClick={onOpenConnectModal}
              className="px-2.5 py-1 rounded bg-terminal-green text-black text-[11px] font-bold"
            >
              CONNECT
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-moon-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 p-4 rounded-xl bg-vault-panel border border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-center font-semibold ${
                  activeTab === item.id
                    ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/40'
                    : 'bg-white/5 text-silver/70 border border-white/5'
                }`}
              >
                [{item.icon}] {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/5 flex flex-col gap-2 text-xs">
            {isConnected ? (
              <div className="flex items-center justify-between">
                <span className="text-terminal-green text-[11px]">{truncate(address)}</span>
                <button
                  onClick={() => {
                    disconnect();
                    setMobileMenuOpen(false);
                  }}
                  className="text-danger-red text-[11px] underline"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenConnectModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded bg-terminal-green text-black font-semibold text-center"
              >
                CONNECT 1AM WALLET
              </button>
            )}

            <div className="flex items-center justify-between text-[11px] text-silver/50 pt-1">
              <a href={feedbackFormUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Feedback Form
              </a>
              <a href={feedbackSheetUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Responses Sheet
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
