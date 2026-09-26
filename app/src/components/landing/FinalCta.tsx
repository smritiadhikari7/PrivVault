"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, Terminal } from "lucide-react";
import styles from "./Landing.module.css";

export function FinalCta() {
  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.finalCtaBox}>
        {/* Subtle cryptographic backdrop glow & particles */}
        <div className={styles.ctaBackdropGlow} aria-hidden="true" />
        <div className={styles.ctaCrosshairTL} aria-hidden="true">+</div>
        <div className={styles.ctaCrosshairTR} aria-hidden="true">+</div>
        <div className={styles.ctaCrosshairBL} aria-hidden="true">+</div>
        <div className={styles.ctaCrosshairBR} aria-hidden="true">+</div>

        <div className={styles.finalCtaContent}>
          <div className={styles.finalCtaTag}>
            <Sparkles size={12} />
            <span>Zero-Knowledge Access Protocol</span>
          </div>

          <h2 className={styles.finalCtaTitle}>
            Verify more.<br />
            <span className={styles.highlightText}>Reveal less.</span>
          </h2>

          <p className={styles.finalCtaLead}>
            Experience privacy-preserving verification with Nexora. Deploy private gates, issue credentials, and let users prove qualification without exposing sensitive personal data.
          </p>

          <div className={styles.finalCtaBtnRow}>
            <Link href="/gate" className={styles.ctaPrimaryBtn}>
              <span>Launch Nexora</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/admin" className={styles.ctaSecondaryBtn}>
              <Terminal size={15} />
              <span>Operator Console</span>
            </Link>
            <a
              href="https://docs.midnight.network"
              target="_blank"
              rel="noreferrer"
              className={styles.ctaGhostBtn}
            >
              <span>Explore Midnight</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className={styles.finalCtaFooterStatus}>
            <span className={styles.pulseDotGreen} />
            <span>Preprod Contract: 0x85c6d5ce...53cc &bull; Lace &amp; 1AM Wallet Enabled</span>
          </div>
        </div>
      </div>
    </section>
  );
}
