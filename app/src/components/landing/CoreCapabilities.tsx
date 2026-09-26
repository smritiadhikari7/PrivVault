"use client";

import { useState } from "react";
import styles from "./Landing.module.css";

interface Capability {
  index: string;
  title: string;
  tag: string;
  description: string;
  technicalDetail: string;
  svgType: "circuit" | "filter" | "vault" | "ledger";
}

const capabilities: Capability[] = [
  {
    index: "01",
    title: "Zero-Knowledge Verification",
    tag: "MATHEMATICAL SOUNDNESS",
    description:
      "Prove you satisfy arbitrary qualification rules without exposing a single byte of your underlying private data or identity.",
    technicalDetail:
      "Non-interactive zk-SNARK constraints compiled via Compact DSL. Verifier learns only whether C(x, w) = 0.",
    svgType: "circuit",
  },
  {
    index: "02",
    title: "Selective Disclosure",
    tag: "GRANULAR CONTROL",
    description:
      "Never disclose an entire passport when all that is asked is whether you are over 21. Disclose boolean proofs, not documents.",
    technicalDetail:
      "Targeted inequality and set-membership proofs without publishing the witness values or Merkle tree leaves.",
    svgType: "filter",
  },
  {
    index: "03",
    title: "User-Controlled Credentials",
    tag: "CLIENT-SIDE WITNESS",
    description:
      "Your private keys, hashes, and credential secrets remain encrypted on your device. Nexora never runs a central database of keys.",
    technicalDetail:
      "IndexedDB encrypted store using local WebCrypto keys. Proof witnesses are constructed exclusively client-side.",
    svgType: "vault",
  },
  {
    index: "04",
    title: "Blockchain-Backed Ledger",
    tag: "MIDNIGHT COMPACT DAPP",
    description:
      "Access rules and nullifier states are enforced by decentralized smart contracts on Midnight Preprod, preventing censorship or tampering.",
    technicalDetail:
      "Dual-state architecture on Midnight network with public allowlist state roots and shielded state transitions.",
    svgType: "ledger",
  },
];

function CardVisual({ type }: { type: Capability["svgType"] }) {
  if (type === "circuit") {
    return (
      <svg viewBox="0 0 200 120" className={styles.capabilitySvg} aria-hidden="true">
        <path d="M20 60 L60 60 L80 30 L120 30 L140 60 L180 60" className={styles.svgPathBase} />
        <path d="M80 30 L100 60 L120 90 L160 90" className={styles.svgPathAccent} />
        <circle cx="20" cy="60" r="4" className={styles.svgDot} />
        <circle cx="80" cy="30" r="4" className={styles.svgDot} />
        <circle cx="120" cy="30" r="4" className={styles.svgDot} />
        <circle cx="140" cy="60" r="5" className={styles.svgDotGlow} />
        <circle cx="180" cy="60" r="4" className={styles.svgDot} />
        <text x="100" y="22" textAnchor="middle" className={styles.svgFormula}>π = ZK(w, x)</text>
      </svg>
    );
  }
  if (type === "filter") {
    return (
      <svg viewBox="0 0 200 120" className={styles.capabilitySvg} aria-hidden="true">
        <line x1="30" y1="25" x2="170" y2="25" className={styles.svgPathBase} strokeDasharray="3 3" />
        <line x1="30" y1="55" x2="170" y2="55" className={styles.svgPathBase} strokeDasharray="3 3" />
        <line x1="30" y1="85" x2="170" y2="85" className={styles.svgPathBase} strokeDasharray="3 3" />
        {/* Redacted bars */}
        <rect x="35" y="20" width="70" height="10" rx="3" className={styles.svgRedacted} />
        <rect x="35" y="50" width="90" height="10" rx="3" className={styles.svgRedacted} />
        {/* Disclosed pass */}
        <rect x="35" y="80" width="40" height="10" rx="3" className={styles.svgVerified} />
        <text x="150" y="89" className={styles.svgVerifiedText}>TRUE ✓</text>
      </svg>
    );
  }
  if (type === "vault") {
    return (
      <svg viewBox="0 0 200 120" className={styles.capabilitySvg} aria-hidden="true">
        <rect x="55" y="25" width="90" height="70" rx="10" className={styles.svgVaultBox} />
        <circle cx="100" cy="55" r="16" className={styles.svgVaultDial} />
        <circle cx="100" cy="55" r="6" className={styles.svgVaultDialCenter} />
        <line x1="100" y1="71" x2="100" y2="82" className={styles.svgPathAccent} strokeWidth="2" />
        <circle cx="70" cy="40" r="2" className={styles.svgDot} />
        <circle cx="130" cy="40" r="2" className={styles.svgDot} />
        <circle cx="70" cy="80" r="2" className={styles.svgDot} />
        <circle cx="130" cy="80" r="2" className={styles.svgDot} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" className={styles.capabilitySvg} aria-hidden="true">
      <rect x="30" y="30" width="36" height="48" rx="4" className={styles.svgBlock} />
      <line x1="66" y1="54" x2="82" y2="54" className={styles.svgChainLine} />
      <rect x="82" y="30" width="36" height="48" rx="4" className={styles.svgBlockActive} />
      <line x1="118" y1="54" x2="134" y2="54" className={styles.svgChainLine} />
      <rect x="134" y="30" width="36" height="48" rx="4" className={styles.svgBlock} />
      <text x="100" y="100" textAnchor="middle" className={styles.svgFormula}>Midnight Block Sync</text>
    </svg>
  );
}

export function CoreCapabilities() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="capabilities" className={styles.capabilitiesSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <span>Core Protocol Pillars</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Architected for zero exposure.<br />
          <span className={styles.highlightText}>Engineered for cryptographic trust.</span>
        </h2>
        <p className={styles.sectionLead}>
          Every component of Nexora is built around the mathematical guarantee that permission does not require identity.
        </p>
      </div>

      <div className={styles.capabilitiesGrid}>
        {capabilities.map((item, idx) => (
          <div
            key={item.index}
            className={`${styles.capabilityCard} ${hoveredIdx === idx ? styles.capabilityCardHover : ""}`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className={styles.capabilityTopRow}>
              <span className={styles.capabilityIndex}>{item.index}</span>
              <span className={styles.capabilityTag}>{item.tag}</span>
            </div>

            <div className={styles.capabilityVisualWrap}>
              <CardVisual type={item.svgType} />
            </div>

            <h3 className={styles.capabilityTitle}>{item.title}</h3>
            <p className={styles.capabilityDescription}>{item.description}</p>

            <div className={styles.capabilityTechnicalBox}>
              <span className={styles.techBoxLabel}>CIRCUIT SPEC:</span>
              <p className={styles.techBoxText}>{item.technicalDetail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
