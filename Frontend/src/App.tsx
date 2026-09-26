"use client";

import React, { useState, useEffect } from 'react';
import { RetroNavigation } from '@/components/vault/RetroNavigation';
import { VaultDashboard } from '@/components/vault/VaultDashboard';
import { IssueScreen } from '@/components/vault/IssueScreen';
import { VerifyScreen } from '@/components/vault/VerifyScreen';
import { RevokeScreen } from '@/components/vault/RevokeScreen';
import { RetroTransactionModal } from '@/components/ui/RetroTransactionModal';
import { WalletConnectModal } from '@/components/ui/WalletConnectModal';
import {
  VaultCredential,
  getVaultCredentials,
  saveVaultCredential,
  updateCredentialStatus,
  CANONICAL_PREPROD_CREDENTIAL,
} from '@/lib/vault-storage';
import { useWallet } from '@/context/WalletContext';
import { useContract } from '@/context/ContractContext';
import { ExternalLink, MessageSquare, Shield, Terminal, Lock } from 'lucide-react';

const FEEDBACK_FORM_URL =
  (import.meta.env.VITE_FEEDBACK_FORM_URL as string) ||
  'https://forms.gle/K33fcHoLQ9iiQoBC7';

const FEEDBACK_SPREADSHEET_URL =
  (import.meta.env.VITE_FEEDBACK_SPREADSHEET_URL as string) ||
  'https://docs.google.com/spreadsheets/d/1DpFulcclh-zrL8PMCsx6_jXl1QsYSPyJ8DVNKQVKANs/edit?usp=sharing';

export default function Home() {
  const { isConnected, isWrongNetwork, targetNetworkId } = useWallet();
  const { contractAddress, txProgress } = useContract();

  const [activeTab, setActiveTab] = useState<'vault' | 'issue' | 'verify' | 'revoke'>('vault');
  const [credentials, setCredentials] = useState<VaultCredential[]>([]);
  const [selectedCredForVerify, setSelectedCredForVerify] = useState<VaultCredential | null>(null);
  const [selectedCredForRevoke, setSelectedCredForRevoke] = useState<VaultCredential | null>(null);

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);

  // Initialize credentials from local storage
  useEffect(() => {
    setCredentials(getVaultCredentials());
  }, []);

  // Open transaction modal automatically when transaction starts
  useEffect(() => {
    if (txProgress.phase !== 'idle') {
      setIsTxModalOpen(true);
    }
  }, [txProgress.phase]);

  const handleSelectVerify = (cred: VaultCredential) => {
    setSelectedCredForVerify(cred);
    setActiveTab('verify');
  };

  const handleSelectRevoke = (cred: VaultCredential) => {
    setSelectedCredForRevoke(cred);
    setActiveTab('revoke');
  };

  const handleIssueSuccess = (newCred: VaultCredential) => {
    setCredentials(getVaultCredentials());
  };

  const handleRevokeSuccess = (commitmentHex: string) => {
    setCredentials(getVaultCredentials());
  };

  const handleResetToBaseline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('privvault_credentials_vault_v1', JSON.stringify([CANONICAL_PREPROD_CREDENTIAL]));
      setCredentials([CANONICAL_PREPROD_CREDENTIAL]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between font-mono bg-vault-bg text-moon-white selection:bg-terminal-green selection:text-black relative">
      {/* Background CRT and Grid Overlay */}
      <div className="crt-scanlines fixed inset-0 z-10 pointer-events-none" />
      <div className="retro-grid fixed inset-0 z-0 opacity-40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 flex flex-col flex-1">
        {/* Navigation Bar */}
        <RetroNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenConnectModal={() => setIsWalletModalOpen(true)}
          feedbackFormUrl={FEEDBACK_FORM_URL}
          feedbackSheetUrl={FEEDBACK_SPREADSHEET_URL}
        />

        {/* Wrong Network Global Warning */}
        {isWrongNetwork && (
          <div className="w-full max-w-6xl mx-auto px-4 mt-2">
            <div className="p-3 rounded-xl bg-danger-red/15 border border-danger-red/40 text-danger-red text-xs flex items-center justify-between gap-3">
              <span>
                <strong>WRONG NETWORK DETECTED:</strong> PrivVault strictly runs on <strong>Midnight Preprod</strong> ({targetNetworkId}). Contract calls will fail until your wallet network is switched.
              </span>
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="px-2.5 py-1 rounded bg-danger-red text-white text-[11px] font-bold uppercase whitespace-nowrap"
              >
                SWITCH NETWORK
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Views */}
        <main className="flex-1 pb-16">
          {activeTab === 'vault' && (
            <VaultDashboard
              credentials={credentials}
              onSelectVerify={handleSelectVerify}
              onSelectRevoke={handleSelectRevoke}
              onNavigateIssue={() => setActiveTab('issue')}
              onResetToBaseline={handleResetToBaseline}
              onOpenConnectModal={() => setIsWalletModalOpen(true)}
            />
          )}

          {activeTab === 'issue' && (
            <IssueScreen
              onSuccess={handleIssueSuccess}
              onOpenConnectModal={() => setIsWalletModalOpen(true)}
            />
          )}

          {activeTab === 'verify' && (
            <VerifyScreen
              credentials={credentials}
              selectedCredential={selectedCredForVerify}
              onOpenConnectModal={() => setIsWalletModalOpen(true)}
            />
          )}

          {activeTab === 'revoke' && (
            <RevokeScreen
              credentials={credentials}
              selectedCredential={selectedCredForRevoke}
              onRevokedSuccess={handleRevokeSuccess}
              onOpenConnectModal={() => setIsWalletModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Retro Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 py-8 border-t border-white/10 text-xs text-silver/60 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-20 font-mono">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-moon-white uppercase">PRIVVAULT</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-terminal-green/10 text-terminal-green border border-terminal-green/30">
              MIDNIGHT PREPROD
            </span>
          </div>
          <p className="text-[11px] text-silver/50">
            Privacy-preserving zero-knowledge credential platform. Powered by Midnight Compact v0.31.1.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a
            href={FEEDBACK_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:underline flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Feedback Form</span>
          </a>
          <a
            href={FEEDBACK_SPREADSHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-silver/70 hover:text-white hover:underline"
          >
            Responses Sheet
          </a>
          <a
            href="https://faucet.preprod.midnight.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-silver/70 hover:text-white hover:underline flex items-center gap-1"
          >
            Faucet <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/smritiadhikari7/PrivVault"
            target="_blank"
            rel="noopener noreferrer"
            className="text-silver/70 hover:text-white hover:underline flex items-center gap-1"
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>

      {/* Transaction Lifecycle Modal */}
      <RetroTransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
      />

      {/* Wallet Connection Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}
