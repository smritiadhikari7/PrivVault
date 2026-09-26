"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Cpu, EyeOff, Lock, Shield, Sparkles } from "lucide-react";
import styles from "./Landing.module.css";

interface Hotspot {
  id: "vault" | "portal" | "prover";
  title: string;
  subtitle: string;
  badge: string;
  xPercent: number;
  yPercent: number;
  description: string;
  icon: typeof Lock;
}

const hotspots: Hotspot[] = [
  {
    id: "vault",
    title: "Shielded Local Vault",
    subtitle: "Overgrown Library of Secrets",
    badge: "0% Raw Data Disclosed",
    xPercent: 20,
    yPercent: 32,
    description: "Your raw credentials, financial thresholds, and identity attributes remain stored exclusively in your local device storage. Never transmitted to verifiers or written to public memory.",
    icon: Lock,
  },
  {
    id: "portal",
    title: "Zero-Knowledge Portal",
    subtitle: "Luminous Proving Aperture",
    badge: "zk-SNARK Synthesis",
    xPercent: 50,
    yPercent: 28,
    description: "The gateway where Midnight Compact DSL compiles mathematical proofs (π). It confirms you meet all requirements without revealing a single byte of underlying data.",
    icon: Sparkles,
  },
  {
    id: "prover",
    title: "Self-Sovereign Prover",
    subtitle: "Traveler at the Threshold",
    badge: "Client-Side Witness",
    xPercent: 56,
    yPercent: 72,
    description: "You remain in complete control of your credential witnesses. Generate cryptographic attestations autonomously without relying on third-party identity brokers or trackers.",
    icon: Shield,
  },
];

interface HeroSanctuaryVisualProps {
  onSwitchToEngine?: () => void;
}

export function HeroSanctuaryVisual({ onSwitchToEngine }: HeroSanctuaryVisualProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot["id"]>("portal");

  const currentHotspot = hotspots.find((h) => h.id === activeHotspot) || hotspots[1];

  return (
    <div className={styles.sanctuaryVisualFrame}>
      {/* Top Glassmorphic Telemetry Header */}
      <div className={styles.sanctuaryFrameHeader}>
        <div className={styles.sanctuaryHeaderLeft}>
          <div className={styles.windowControls} aria-hidden="true">
            <span className={styles.controlDotRed} />
            <span className={styles.controlDotYellow} />
            <span className={styles.controlDotGreen} />
          </div>
          <div className={styles.sanctuaryHeaderTitleWrap}>
            <span className={styles.sanctuaryHeaderIcon}>◈</span>
            <span className={styles.sanctuaryHeaderTitle}>
              PrivVault Sanctuary // Zero-Knowledge Proving Aperture
            </span>
          </div>
        </div>

        <div className={styles.sanctuaryHeaderBadges}>
          <div className={styles.sanctuaryLivePill}>
            <span className={styles.sanctuaryLiveDot} />
            <span className={styles.sanctuaryLiveText}>Midnight Preprod Active</span>
          </div>
          <div className={styles.sanctuaryProofPill}>
            <span className={styles.sanctuaryProofDot} />
            <span>Compact DSL Engine</span>
          </div>
        </div>
      </div>

      {/* Main Artwork Viewport */}
      <div className={styles.sanctuaryImageStage}>
        {/* Glow halo behind portal arch */}
        <div className={styles.sanctuaryArchGlow} aria-hidden="true" />

        {/* The Exact User-Uploaded Hero Image */}
        <div className={styles.sanctuaryImageWrap}>
          <Image
            src="/hero-vault.png"
            alt="PrivVault Zero-Knowledge Sanctuary Portal - Prove Permission, Not Identity"
            width={736}
            height={414}
            priority
            quality={95}
            className={styles.sanctuaryImage}
          />

          {/* Cinematic Vignette and Edge Treatment */}
          <div className={styles.sanctuaryImageOverlay} aria-hidden="true" />
          <div className={styles.sanctuaryScanlineOverlay} aria-hidden="true" />
        </div>

        {/* Interactive Hotspot Markers positioned on key features of the artwork */}
        <div className={styles.hotspotOverlayLayer}>
          {hotspots.map((hotspot) => {
            const isActive = activeHotspot === hotspot.id;
            const Icon = hotspot.icon;

            return (
              <button
                key={hotspot.id}
                type="button"
                className={`${styles.hotspotPin} ${isActive ? styles.hotspotPinActive : ""}`}
                style={{
                  left: `${hotspot.xPercent}%`,
                  top: `${hotspot.yPercent}%`,
                }}
                onClick={() => setActiveHotspot(hotspot.id)}
                aria-label={`View details about ${hotspot.title}`}
              >
                <span className={styles.hotspotRing} />
                <span className={styles.hotspotCenter}>
                  <Icon size={12} />
                </span>
                <span className={styles.hotspotTooltipLabel}>
                  {hotspot.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating Active Feature Explainer Card */}
        <div className={styles.activeHotspotCard}>
          <div className={styles.activeHotspotCardHeader}>
            <div className={styles.activeHotspotIconBox}>
              <currentHotspot.icon size={15} />
            </div>
            <div className={styles.activeHotspotTitles}>
              <h4 className={styles.activeHotspotTitle}>{currentHotspot.title}</h4>
              <span className={styles.activeHotspotSubtitle}>{currentHotspot.subtitle}</span>
            </div>
            <span className={styles.activeHotspotBadge}>{currentHotspot.badge}</span>
          </div>
          <p className={styles.activeHotspotDesc}>{currentHotspot.description}</p>
        </div>
      </div>

      {/* Bottom Interactive Navigation & Action Bar */}
      <div className={styles.sanctuaryBottomBar}>
        <div className={styles.sanctuaryHotspotTabs}>
          {hotspots.map((h) => {
            const isActive = activeHotspot === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveHotspot(h.id)}
                className={`${styles.hotspotTabBtn} ${isActive ? styles.hotspotTabBtnActive : ""}`}
              >
                <h.icon size={13} />
                <span>{h.title}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.sanctuaryActionGroup}>
          {onSwitchToEngine && (
            <button
              type="button"
              onClick={onSwitchToEngine}
              className={styles.sanctuaryEngineBtn}
              title="Inspect zero-knowledge cryptographic prover engine"
            >
              <Cpu size={14} />
              <span>Simulate ZK Proof</span>
            </button>
          )}

          <Link href="/gate" className={styles.sanctuaryLaunchBtn}>
            <span>Enter Vault</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Protocol Trust & Metrics Strip */}
      <div className={styles.sanctuaryMetricsRow}>
        <div className={styles.sanctuaryMetricItem}>
          <EyeOff size={13} className={styles.metricIconAmber} />
          <span className={styles.metricLabel}>Private Disclosure:</span>
          <strong className={styles.metricValue}>0.00 Bytes (Zero Leaked)</strong>
        </div>
        <div className={styles.sanctuaryMetricDivider} />
        <div className={styles.sanctuaryMetricItem}>
          <CheckCircle2 size={13} className={styles.metricIconGreen} />
          <span className={styles.metricLabel}>Proof Protocol:</span>
          <strong className={styles.metricValue}>Compact zk-SNARK (Midnight)</strong>
        </div>
        <div className={styles.sanctuaryMetricDivider} />
        <div className={styles.sanctuaryMetricItem}>
          <BookOpen size={13} className={styles.metricIconCyan} />
          <span className={styles.metricLabel}>State Security:</span>
          <strong className={styles.metricValue}>Dual-Shielded Ledger</strong>
        </div>
      </div>
    </div>
  );
}
