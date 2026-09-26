"use client";

import { Check, Cpu, EyeOff, FileKey, Globe, Lock, Shield, Sparkles } from "lucide-react";
import styles from "./Landing.module.css";

export function PrivacyArchitecture() {
  return (
    <section id="privacy" className={styles.privacyArchSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <EyeOff size={12} />
          <span>Dual-State Architecture</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Your data stays private.<br />
          <span className={styles.highlightText}>Your claim becomes verifiable.</span>
        </h2>
        <p className={styles.sectionLead}>
          Midnight&apos;s dual-state programming model separates what needs to be private from what must be proven publicly on-chain.
        </p>
      </div>

      <div className={styles.archDiagramContainer}>
        {/* Layer 1: Client Private Space */}
        <div className={styles.archLayerCard}>
          <div className={styles.archLayerHead}>
            <div className={styles.archLayerBadgePrivate}>
              <Lock size={12} />
              <span>PRIVATE LOCAL CONTEXT</span>
            </div>
            <span className={styles.archLayerHost}>Runs on User Device</span>
          </div>

          <div className={styles.archLayerBody}>
            <div className={styles.archNodeBox}>
              <FileKey size={18} className={styles.nodeIconCyan} />
              <div>
                <strong>Raw Credential Secret</strong>
                <p>Private attributes (Age, Score, Seed)</p>
              </div>
            </div>

            <div className={styles.archConnectorDown}>
              <span className={styles.connectorLine} />
              <span className={styles.connectorText}>Local Witness Generator</span>
            </div>

            <div className={styles.archNodeBox}>
              <Cpu size={18} className={styles.nodeIconCyan} />
              <div>
                <strong>Compact Prover Engine</strong>
                <p>Synthesizes zero-knowledge witness <i>w</i></p>
              </div>
            </div>
          </div>

          <div className={styles.archLayerFoot}>
            <span>Boundary: Never leaves memory / IndexedDB</span>
          </div>
        </div>

        {/* Cryptographic Firewall / Barrier */}
        <div className={styles.archBarrierCol}>
          <div className={styles.barrierShield}>
            <Shield size={28} className={styles.barrierIcon} />
            <span className={styles.barrierTitle}>ZERO-KNOWLEDGE BARRIER</span>
            <span className={styles.barrierSub}>π = SNARK(x, w)</span>
          </div>
          <div className={styles.barrierArrowRow}>
            <span className={styles.barrierParticle} />
            <span className={styles.barrierParticle} />
            <span className={styles.barrierParticle} />
          </div>
          <span className={styles.barrierTag}>Only compressed proof π crosses</span>
        </div>

        {/* Layer 2: Midnight Public Network */}
        <div className={`${styles.archLayerCard} ${styles.archLayerCardPublic}`}>
          <div className={styles.archLayerHead}>
            <div className={styles.archLayerBadgePublic}>
              <Globe size={12} />
              <span>MIDNIGHT PUBLIC LEDGER</span>
            </div>
            <span className={styles.archLayerHost}>Decentralized Network</span>
          </div>

          <div className={styles.archLayerBody}>
            <div className={styles.archNodeBoxPublic}>
              <Sparkles size={18} className={styles.nodeIconEmerald} />
              <div>
                <strong>Compact Smart Contract</strong>
                <p>Validates proof π against public root <i>R</i></p>
              </div>
            </div>

            <div className={styles.archConnectorDown}>
              <span className={styles.connectorLine} />
              <span className={styles.connectorText}>State Transition Check</span>
            </div>

            <div className={styles.archNodeBoxPublic}>
              <Check size={18} className={styles.nodeIconEmerald} />
              <div>
                <strong>Nullifier Set & Access Grant</strong>
                <p>Registers replay nullifier, opens gate</p>
              </div>
            </div>
          </div>

          <div className={styles.archLayerFoot}>
            <span>Boundary: Publicly verifiable, zero leakage</span>
          </div>
        </div>
      </div>

      {/* Summary Matrix Cards */}
      <div className={styles.dataDistinctionRow}>
        <div className={styles.distinctionCardHidden}>
          <div className={styles.distinctionHead}>
            <span className={styles.dotPrivate} />
            <strong>STAYS 100% PRIVATE (LOCAL DEVICE)</strong>
          </div>
          <ul className={styles.distinctionList}>
            <li>Raw identity data, names, government documents</li>
            <li>Credit scores, salary numbers, wallet token balances</li>
            <li>Private witness variables and salt seeds</li>
            <li>Wallet unshielded address connection history</li>
          </ul>
        </div>

        <div className={styles.distinctionCardPublic}>
          <div className={styles.distinctionHead}>
            <span className={styles.dotPublic} />
            <strong>VERIFIABLE ON MIDNIGHT (PUBLIC LEDGER)</strong>
          </div>
          <ul className={styles.distinctionList}>
            <li>Gate allowlist Merkle root (Commitment state)</li>
            <li>Cryptographic proof validity (Boolean: True / False)</li>
            <li>Unique one-time nullifier hash (Prevents replay)</li>
            <li>Contract address on Midnight Preprod</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
