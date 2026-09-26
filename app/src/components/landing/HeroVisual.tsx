"use client";

import { useEffect, useState } from "react";
import { Check, Cpu, EyeOff, Lock, RefreshCw, Shield, Sparkles } from "lucide-react";
import styles from "./Landing.module.css";

interface CredentialRow {
  label: string;
  revealedValue: string;
  encryptedHash: string;
  requirement: string;
}

const mockData: CredentialRow[] = [
  { label: "Age", revealedValue: "24 yrs", encryptedHash: "0x4f92...a8e1", requirement: "≥ 21 Required" },
  { label: "Balance", revealedValue: "$84,200", encryptedHash: "0x9c31...7b04", requirement: "≥ $10k Threshold" },
  { label: "Credit Tier", revealedValue: "Tier 1 (780)", encryptedHash: "0x1e88...fa39", requirement: "Tier 1 or 2 Required" },
  { label: "Vault Credential", revealedValue: "0x981...efb", encryptedHash: "0x77ab...33d1", requirement: "Allowlist Member" },
];

function ProofProgressBar({ phase }: { phase: "input" | "proving" | "verified" }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== "proving") return;

    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 8));
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  const width = phase === "input" ? "15%" : phase === "verified" ? "100%" : `${progress}%`;

  return (
    <div className={styles.proofProgressBar}>
      <div className={styles.proofProgressFill} style={{ width }} />
    </div>
  );
}

export function HeroVisual() {
  const [phase, setPhase] = useState<"input" | "proving" | "verified">("input");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => {
        if (prev === "input") return "proving";
        if (prev === "proving") return "verified";
        return "input";
      });
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const triggerCycle = () => {
    if (phase === "proving") return;
    setPhase("proving");
  };

  return (
    <div className={styles.heroVisualContainer} aria-label="Zero Knowledge Verification Engine visual">
      {/* Ambient background glow and crosshairs */}
      <div className={styles.visualBackdropGlow} aria-hidden="true" />
      <div className={styles.visualCrosshairTopLeft} aria-hidden="true">+</div>
      <div className={styles.visualCrosshairTopRight} aria-hidden="true">+</div>
      <div className={styles.visualCrosshairBottomLeft} aria-hidden="true">+</div>
      <div className={styles.visualCrosshairBottomRight} aria-hidden="true">+</div>

      {/* Floating Status Badges (Obelisk Inspired) */}
      <div className={styles.floatingStatusRow}>
        <div className={styles.statusPill}>
          <span className={styles.statusDotActive} />
          <span className={styles.statusLabel}>Network:</span>
          <strong className={styles.statusValue}>Midnight Preprod</strong>
        </div>
        <div className={styles.statusPill}>
          <span className={styles.statusDotCyan} />
          <span className={styles.statusLabel}>ZK Layer:</span>
          <strong className={styles.statusValue}>Compact Engine Active</strong>
        </div>
        <div className={styles.statusPill}>
          <span className={styles.statusDotEmerald} />
          <span className={styles.statusLabel}>State:</span>
          <strong className={styles.statusValue}>Dual-Shielded</strong>
        </div>
      </div>

      {/* Main Interactive ZK Chamber */}
      <div className={styles.chamberGrid}>
        {/* Left Column: Private Inputs */}
        <div className={`${styles.chamberCard} ${styles.privateCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconWrap}>
              <Lock size={14} className={styles.accentIcon} />
            </div>
            <div>
              <span className={styles.cardSubtitle}>LOCAL CLIENT STORAGE</span>
              <h4 className={styles.cardTitle}>Private Credential Data</h4>
            </div>
            <span className={styles.secureTag}>
              <EyeOff size={11} /> 0% Exposed
            </span>
          </div>

          <div className={styles.credentialList}>
            {mockData.map((item, idx) => (
              <div key={item.label} className={styles.credentialItem} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={styles.credentialMeta}>
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.itemReq}>{item.requirement}</span>
                </div>
                <div className={styles.credentialValueRow}>
                  {phase === "input" ? (
                    <span className={styles.revealedText}>{item.revealedValue}</span>
                  ) : (
                    <span className={styles.encryptedText}>
                      <span className={styles.hashBadge}>HASH</span> {item.encryptedHash}
                    </span>
                  )}
                  <span className={styles.privacyStateIndicator}>
                    {phase === "input" ? "Client only" : "Shielded in witness"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.privateCardFooter}>
            <span className={styles.privacyNote}>
              Raw attributes never leave your device or enter public memory.
            </span>
          </div>
        </div>

        {/* Center: Cryptographic Transformation Core */}
        <div className={styles.chamberCore}>
          <div className={styles.proofFlowStream}>
            <div className={`${styles.streamLine} ${phase === "proving" ? styles.streamLineActive : ""}`} />
            <div className={styles.coreOrb}>
              <div className={styles.orbInnerGlow} />
              <div className={styles.orbRing} />
              <div className={styles.orbRingSecondary} />
              <div className={styles.orbCenterIcon}>
                {phase === "proving" ? (
                  <RefreshCw size={24} className={styles.rotatingIcon} />
                ) : phase === "verified" ? (
                  <Shield size={24} className={styles.verifiedIcon} />
                ) : (
                  <Cpu size={24} className={styles.idleIcon} />
                )}
              </div>
            </div>
            <div className={`${styles.streamLine} ${phase === "verified" ? styles.streamLineActive : ""}`} />
          </div>

          <div className={styles.proofProgressBox}>
            <div className={styles.proofPhaseLabel}>
              {phase === "input" && "Ready to Prove"}
              {phase === "proving" && "Synthesizing ZK-SNARK Witness..."}
              {phase === "verified" && "Proof Verified by Ledger"}
            </div>
            <ProofProgressBar key={phase} phase={phase} />
            <div className={styles.cryptoEquations}>
              <span>π = Proof(x, w)</span>
              <span>C(x, w) = 0</span>
              <span>H(Nullifier)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={triggerCycle}
            className={styles.replayProofBtn}
            title="Click to cycle proof generation"
          >
            <Sparkles size={12} />
            <span>Simulate Proof Generation</span>
          </button>
        </div>

        {/* Right Column: Public Verifiable Proof Result */}
        <div className={`${styles.chamberCard} ${styles.publicCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconWrapPublic}>
              <Shield size={14} className={styles.publicAccentIcon} />
            </div>
            <div>
              <span className={styles.cardSubtitle}>MIDNIGHT PREPROD LEDGER</span>
              <h4 className={styles.cardTitle}>Verifiable Public Claim</h4>
            </div>
            <span className={`${styles.statusBadge} ${phase === "verified" ? styles.statusBadgeActive : ""}`}>
              {phase === "verified" ? "CONFIRMED" : "PENDING"}
            </span>
          </div>

          <div className={styles.verifiableProofBody}>
            <div className={styles.verdictBox}>
              <div className={styles.verdictIconWrap}>
                <Check size={20} className={styles.checkIcon} />
              </div>
              <div className={styles.verdictText}>
                <strong className={styles.verdictTitle}>
                  {phase === "verified" ? "ELIGIBLE & AUTHORIZED" : "REQUIREMENTS MET"}
                </strong>
                <span className={styles.verdictSubtitle}>
                  Zero private inputs revealed to verifier
                </span>
              </div>
            </div>

            <div className={styles.proofMetadataGrid}>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Verification Result</span>
                <span className={styles.metaValSuccess}>TRUE (Valid Proof)</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>ZK Proof (π)</span>
                <span className={styles.metaValMono}>0x85c6...53cc</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Replay Nullifier</span>
                <span className={styles.metaValMono}>0x9f1a...480b</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Information Leaked</span>
                <span className={styles.metaValZero}>0 Bytes (Mathematically Zero)</span>
              </div>
            </div>

            <div className={styles.publicCardFooter}>
              <div className={styles.verifiableTag}>
                <span className={styles.pulseDot} />
                Verifiable on Midnight Explorer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
