"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, LoaderCircle, Menu, Wallet, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WalletConnectModal } from "@/components/WalletConnectModal";
import { APP_NETWORK, MidnightClient } from "@/lib/midnight-client";
import type { WalletOption } from "@/lib/midnight-client";
import styles from "./Landing.module.css";

const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#interactive-demo", label: "ZK Demo" },
  { href: "#technology", label: "Technology" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNavbar() {
  const clientRef = useRef<MidnightClient | null>(null);
  const getClient = () => clientRef.current ?? (clientRef.current = new MidnightClient());

  const [menuOpen, setMenuOpen] = useState(false);
  const [wallets, setWallets] = useState<WalletOption[]>([]);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [selectedWalletRdns, setSelectedWalletRdns] = useState<string | null>(null);
  const [selectedWalletName, setSelectedWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletError, setWalletError] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const client = getClient();
    const updateWallets = () => setWallets(client.getInjectedWallets());
    updateWallets();
    const timer = window.setInterval(updateWallets, 750);
    return () => window.clearInterval(timer);
  }, []);

  const openWalletSelector = () => {
    setMenuOpen(false);
    setWalletError("");
    setWalletModalOpen(true);
  };

  const connectWallet = async (wallet: WalletOption) => {
    setWalletModalOpen(false);
    setWalletConnecting(true);
    setWalletError("");
    try {
      await getClient().disconnect();
      const session = await getClient().connectWallet(APP_NETWORK, wallet);
      setSelectedWalletRdns(wallet.rdns);
      setSelectedWalletName(wallet.name);
      setWalletAddress(session.unshieldedAddress);
    } catch (error) {
      setSelectedWalletRdns(null);
      setSelectedWalletName("");
      setWalletAddress(null);
      setWalletError(MidnightClient.messageFor(error));
    } finally {
      setWalletConnecting(false);
    }
  };

  const formatAddress = (addr: string) => {
    if (addr.length <= 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <header className={`${styles.navbarShell} ${scrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navbarContainer}>
          {/* Brand Logo */}
          <Link href="/" className={styles.navBrand} onClick={() => setMenuOpen(false)}>
            <div className={styles.brandIconBox}>
              <Image src="/logo.svg" alt="Nexora Shield" width={18} height={18} priority />
            </div>
            <div className={styles.brandTextBlock}>
              <span className={styles.brandName}>Nexora</span>
              <span className={styles.brandTagline}>MIDNIGHT ZK</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.navLinksDesktop} aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLinkItem}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className={styles.navRightActions}>
            <button
              type="button"
              className={`${styles.navWalletBtn} ${walletAddress ? styles.navWalletConnected : ""}`}
              onClick={openWalletSelector}
              disabled={walletConnecting}
              title={walletAddress ?? "Connect Midnight Wallet"}
            >
              {walletConnecting ? (
                <LoaderCircle size={14} className={styles.rotatingIcon} />
              ) : walletAddress ? (
                <Check size={14} className={styles.textGreen} />
              ) : (
                <Wallet size={14} />
              )}
              <span>
                {walletConnecting
                  ? "Connecting..."
                  : walletAddress
                  ? `${selectedWalletName || "Wallet"}: ${formatAddress(walletAddress)}`
                  : "Connect Wallet"}
              </span>
            </button>

            <Link href="/gate" className={styles.navLaunchBtn}>
              <span>Launch App</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.navMobileToggle}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className={styles.mobileNavDropdown}>
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={styles.mobileNavLinkItem}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className={styles.mobileNavActions}>
              <button
                type="button"
                className={styles.mobileWalletBtn}
                onClick={openWalletSelector}
              >
                <Wallet size={15} />
                <span>
                  {walletAddress
                    ? `${selectedWalletName || "Wallet"}: ${formatAddress(walletAddress)}`
                    : "Connect Wallet (Lace / 1AM)"}
                </span>
              </button>

              <Link
                href="/gate"
                className={styles.mobileLaunchBtn}
                onClick={() => setMenuOpen(false)}
              >
                <span>Launch App (/gate)</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {walletError && (
          <div className={styles.navbarErrorNotice} role="alert">
            <span>{walletError}</span>
            <button type="button" onClick={() => setWalletError("")}>
              ✕
            </button>
          </div>
        )}
      </header>

      {/* Reusable Midnight Wallet Connection Modal */}
      <WalletConnectModal
        open={walletModalOpen}
        wallets={wallets}
        selectedRdns={selectedWalletRdns}
        onClose={() => setWalletModalOpen(false)}
        onSelect={(wallet) => {
          void connectWallet(wallet);
        }}
      />
    </>
  );
}
