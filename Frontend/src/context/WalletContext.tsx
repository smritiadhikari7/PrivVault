"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  WalletState,
  WalletType,
  connectLace,
  connect1AM,
  getWalletState,
  isMidnightWalletAvailable,
  is1AMWalletAvailable,
  isLaceWalletAvailable,
} from '@/lib/midnight';
import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';

export const TARGET_NETWORK_ID = (import.meta as any).env?.VITE_NETWORK_ID ?? 'preprod';

export type WalletConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'wrong_network'
  | 'error';

export interface WalletContextType extends WalletState {
  status: WalletConnectionStatus;
  isWrongNetwork: boolean;
  targetNetworkId: string;
  detectedNetworkId: string | null;
  isWalletAvailable: boolean;
  is1AMAvailable: boolean;
  isLaceAvailable: boolean;
  connectWallet: () => Promise<void>;
  connect1AMWallet: () => Promise<void>;
  disconnect: () => void;
  getFreshWalletApi: () => Promise<ConnectedAPI | null>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    coinPublicKey: null,
    error: null,
    connector: null,
    walletApi: null,
    walletType: null,
  });

  const [status, setStatus] = useState<WalletConnectionStatus>('disconnected');
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [detectedNetworkId, setDetectedNetworkId] = useState<string | null>(null);

  const [isWalletAvailable, setIsWalletAvailable] = useState(false);
  const [is1AMAvailable, setIs1AMAvailable] = useState(false);
  const [isLaceAvailable, setIsLaceAvailable] = useState(false);

  // Poll for extension injection across lifecycle
  useEffect(() => {
    const checkAvailability = () => {
      setIsWalletAvailable(isMidnightWalletAvailable());
      setIs1AMAvailable(is1AMWalletAvailable());
      setIsLaceAvailable(isLaceWalletAvailable());
    };

    checkAvailability();
    const intervals = [300, 800, 1500, 3000];
    const timers = intervals.map(delay => setTimeout(checkAvailability, delay));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  /**
   * Internal helper to perform connection + network check + state update.
   */
  const performConnect = useCallback(async (
    connectFn: () => Promise<{ connector: any; walletApi: ConnectedAPI }>,
    type: WalletType,
  ) => {
    setStatus('connecting');
    setState(prev => ({ ...prev, error: null }));
    setIsWrongNetwork(false);

    try {
      const { connector, walletApi } = await connectFn();

      // Validate network configuration from connected wallet
      let walletNetworkId = TARGET_NETWORK_ID;
      try {
        const config = await walletApi.getConfiguration();
        if (config && (config as any).networkId) {
          walletNetworkId = (config as any).networkId;
          setDetectedNetworkId(walletNetworkId);
        }
      } catch (cfgErr) {
        console.warn('[PrivVault] Could not read wallet network config:', cfgErr);
      }

      const isNetworkMismatch =
        walletNetworkId.toLowerCase() !== TARGET_NETWORK_ID.toLowerCase() &&
        walletNetworkId.toLowerCase() !== 'unknown';

      if (isNetworkMismatch) {
        setIsWrongNetwork(true);
        setStatus('wrong_network');
        setState(prev => ({
          ...prev,
          isConnected: false,
          error: `Wrong Network: Wallet is connected to '${walletNetworkId}'. PrivVault requires Midnight Preprod (${TARGET_NETWORK_ID}).`,
          connector,
          walletApi,
          walletType: type,
        }));
        return;
      }

      const { address, coinPublicKey } = await getWalletState(walletApi);

      setState({
        isConnected: true,
        address,
        coinPublicKey,
        error: null,
        connector,
        walletApi,
        walletType: type,
      });
      setStatus('connected');
      setIsWrongNetwork(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to connect wallet';
      console.error(`[PrivVault] ${type} connection error:`, err);

      const isNetworkErr = message.toLowerCase().includes('network') || message.toLowerCase().includes('mismatch');

      setState(prev => ({
        ...prev,
        isConnected: false,
        error: message,
        connector: null,
        walletApi: null,
        walletType: null,
      }));

      if (isNetworkErr) {
        setIsWrongNetwork(true);
        setStatus('wrong_network');
      } else {
        setStatus('error');
      }
    }
  }, []);

  /** Connect via 1AM wallet (Primary recommended flow) */
  const connect1AMWallet = useCallback(async () => {
    await performConnect(connect1AM, '1am');
  }, [performConnect]);

  /** Connect via Lace wallet */
  const connectWallet = useCallback(async () => {
    await performConnect(connectLace, 'lace');
  }, [performConnect]);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      address: null,
      coinPublicKey: null,
      error: null,
      connector: null,
      walletApi: null,
      walletType: null,
    });
    setStatus('disconnected');
    setIsWrongNetwork(false);
    setDetectedNetworkId(null);
  }, []);

  const getFreshWalletApi = useCallback(async (): Promise<ConnectedAPI | null> => {
    const connector = state.connector as InitialAPI | null;
    if (!connector) return null;
    try {
      console.log('[PrivVault] Re-connecting wallet for fresh API channel...');
      const freshApi = await connector.connect(TARGET_NETWORK_ID);
      setState(prev => ({ ...prev, walletApi: freshApi }));
      return freshApi;
    } catch (err: any) {
      console.warn('[PrivVault] getFreshWalletApi fallback to existing:', err?.message);
      return state.walletApi;
    }
  }, [state.connector, state.walletApi]);

  return (
    <WalletContext.Provider
      value={{
        ...state,
        status,
        isWrongNetwork,
        targetNetworkId: TARGET_NETWORK_ID,
        detectedNetworkId,
        isWalletAvailable,
        is1AMAvailable,
        isLaceAvailable,
        connectWallet,
        connect1AMWallet,
        disconnect,
        getFreshWalletApi,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
