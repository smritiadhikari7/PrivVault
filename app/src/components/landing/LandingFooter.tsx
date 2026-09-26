"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import styles from "./Landing.module.css";

export function LandingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footerShell}>
      <div className={styles.footerContainer}>
        {/* Top Brand & Philosophy Block */}
        <div className={styles.footerBrandCol}>
          <Link href="/" className={styles.footerBrand} onClick={scrollToTop}>
            <div className={styles.brandIconBox}>
              <Image src="/logo.svg" alt="Nexora Logo" width={18} height={18} />
            </div>
            <span className={styles.brandName}>Nexora</span>
          </Link>
          <p className={styles.footerPhilosophy}>
            &ldquo;Prove permission, not identity.&rdquo;
          </p>
          <p className={styles.footerTagline}>
            Confidential zero-knowledge credential verification gateway powered by Midnight Preprod and Compact smart contracts.
          </p>

          <div className={styles.footerNetworkTag}>
            <span className={styles.pulseDotGreen} />
            <span>Midnight Preprod Contract Verified</span>
          </div>
        </div>

        {/* Column 1: Application */}
        <div className={styles.footerCol}>
          <h4 className={styles.footerColTitle}>Application</h4>
          <ul className={styles.footerLinksList}>
            <li>
              <Link href="/gate">Member Gate</Link>
            </li>
            <li>
              <Link href="/admin">Operator Console</Link>
            </li>
            <li>
              <Link href="/vault">Encrypted Vault</Link>
            </li>
            <li>
              <a href="#interactive-demo">ZK Sandbox Demo</a>
            </li>
          </ul>
        </div>

        {/* Column 2: Architecture */}
        <div className={styles.footerCol}>
          <h4 className={styles.footerColTitle}>Architecture</h4>
          <ul className={styles.footerLinksList}>
            <li>
              <a href="https://docs.midnight.network" target="_blank" rel="noreferrer">
                <span>Midnight Network</span>
                <ExternalLink size={11} />
              </a>
            </li>
            <li>
              <a href="https://docs.midnight.network/develop/reference/compact/" target="_blank" rel="noreferrer">
                <span>Compact DSL</span>
                <ExternalLink size={11} />
              </a>
            </li>
            <li>
              <a href="#privacy">Dual-State Model</a>
            </li>
            <li>
              <a href="#security">Cryptographic Guarantees</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Community & Verify */}
        <div className={styles.footerCol}>
          <h4 className={styles.footerColTitle}>Verification &amp; Code</h4>
          <ul className={styles.footerLinksList}>
            <li>
              <a
                href="https://preprod.midnightexplorer.com/contracts/85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc"
                target="_blank"
                rel="noreferrer"
              >
                <span>Contract Explorer</span>
                <ArrowUpRight size={11} />
              </a>
            </li>
            <li>
              <a href="https://github.com/rishiisarkar/Nexora" target="_blank" rel="noreferrer">
                <span>Public GitHub</span>
                <ArrowUpRight size={11} />
              </a>
            </li>
            <li>
              <a href="https://x.com/NexoraWeb3x" target="_blank" rel="noreferrer">
                <span>Official X (@NexoraWeb3x)</span>
                <ArrowUpRight size={11} />
              </a>
            </li>
            <li>
              <a
                href="https://forms.gle/ShbFDAme1TiP7FRYA"
                target="_blank"
                rel="noreferrer"
              >
                <span>Feedback Form</span>
                <ExternalLink size={11} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className={styles.subFooterBar}>
        <div className={styles.subFooterContainer}>
          <div className={styles.subFooterLeft}>
            <span>&copy; {new Date().getFullYear()} Nexora Protocol. Open source under Apache-2.0.</span>
          </div>
          <div className={styles.subFooterRight}>
            <span className={styles.preprodIndicator}>
              Active Deployment: Preprod 0x85c6...53cc
            </span>
            <button type="button" onClick={scrollToTop} className={styles.backToTopBtn}>
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
