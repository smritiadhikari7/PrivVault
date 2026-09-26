"use client";

import { Cpu, EyeOff, Hash, Key, Lock, ShieldCheck } from "lucide-react";
import styles from "./Landing.module.css";

interface GuaranteeItem {
  icon: typeof ShieldCheck;
  title: string;
  tag: string;
  description: string;
  specification: string;
}

const guarantees: GuaranteeItem[] = [
  {
    icon: Lock,
    title: "Client-Side Witness Synthesis",
    tag: "ZERO SERVER TRANSMISSION",
    description:
      "Your private keys, salt values, and credential attributes are evaluated directly within your local browser runtime. They never traverse an API or remote server.",
    specification:
      "All witness assignments for Compact circuits are computed in WebAssembly in user memory.",
  },
  {
    icon: Cpu,
    title: "Cryptographic Soundness",
    tag: "ZK-SNARK HARDNESS",
    description:
      "It is mathematically infeasible to forge a proof without holding the valid private witness. Soundness is grounded in elliptic curve discrete logarithm assumptions.",
    specification:
      "128-bit security margin provided by Midnight's pairing-friendly elliptic curve parameters.",
  },
  {
    icon: Hash,
    title: "Nullifier Replay Protection",
    tag: "DOUBLE-SPEND PREVENTION",
    description:
      "Each verification consumes a unique deterministic nullifier hash on the Midnight ledger. Proofs cannot be intercepted and re-used by malicious actors.",
    specification:
      "Nullifier = Hash(credential_sk, gate_id, epoch). Unlinked to prover's identity.",
  },
  {
    icon: EyeOff,
    title: "Decoupled Wallet Identity",
    tag: "UNLINKABLE ACCESS",
    description:
      "The wallet paying the gas fee (tDUST) does not need to be the owner of the credential. Access grants cannot be tied to an address's past DeFi activity.",
    specification:
      "Dual-state ledger architecture eliminates linkability between shielded claims and fee payers.",
  },
];

export function SecurityTrust() {
  return (
    <section id="security" className={styles.securityTrustSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <ShieldCheck size={12} />
          <span>Security Model & Guarantees</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Privacy is not a feature.<br />
          <span className={styles.highlightText}>It is the architecture.</span>
        </h2>
        <p className={styles.sectionLead}>
          Nexora does not rely on organizational promises or closed-door privacy policies. Trust is enforced by cryptographic circuits and immutable blockchain execution.
        </p>
      </div>

      <div className={styles.guaranteesGrid}>
        {guarantees.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.title} className={styles.guaranteeCard}>
              <div className={styles.guaranteeHead}>
                <div className={styles.guaranteeIconWrap}>
                  <Icon size={20} className={styles.guaranteeIcon} />
                </div>
                <span className={styles.guaranteeTag}>{g.tag}</span>
              </div>

              <h3 className={styles.guaranteeTitle}>{g.title}</h3>
              <p className={styles.guaranteeDesc}>{g.description}</p>

              <div className={styles.guaranteeSpecBox}>
                <span className={styles.specLabel}>TECHNICAL SPEC:</span>
                <p className={styles.specText}>{g.specification}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Cryptographic Boundary Box */}
      <div className={styles.honestBoundaryBox}>
        <div className={styles.boundaryHeader}>
          <Key size={16} className={styles.accentIcon} />
          <strong>WHAT NEXORA DOES & DOES NOT CLAIM</strong>
        </div>
        <div className={styles.boundaryGrid}>
          <div className={styles.boundaryColTrue}>
            <span className={styles.colBadgeGreen}>CRYPTOGRAPHICALLY ENFORCED</span>
            <ul>
              <li>Zero disclosure of private witness values across network calls</li>
              <li>Impossibility of forging proofs without valid credential commitment</li>
              <li>Cryptographic protection against proof replay via on-chain nullifiers</li>
              <li>Verification directly settled on Midnight Preprod smart contract</li>
            </ul>
          </div>
          <div className={styles.boundaryColHonest}>
            <span className={styles.colBadgeGray}>SECURITY ASSUMPTIONS</span>
            <ul>
              <li>User must maintain local device security against local keyloggers</li>
              <li>Midnight Preprod is a testnet environment subject to network upgrades</li>
              <li>Issuer authority must be trusted to sign genuine initial credentials</li>
              <li>Circuit logic is open source and verifiable on GitHub</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
