"use client";

import { Code2, ExternalLink, Globe2, Layers2, Lock } from "lucide-react";
import styles from "./Landing.module.css";

const midnightPillars = [
  {
    icon: Layers2,
    title: "Dual-State Architecture",
    description:
      "Midnight separates state into private (shielded) and public ledgers. Transactions can read private inputs locally and write zero-knowledge proofs to the public ledger.",
  },
  {
    icon: Code2,
    title: "Compact Programming Language",
    description:
      "Smart contracts in Nexora are authored in Compact — a language designed from the ground up for verifiable private computation and zero-knowledge circuits.",
  },
  {
    icon: Lock,
    title: "Shielded State Transitions",
    description:
      "Unlike pseudonymous blockchains where all account balances and histories are public, Midnight allows confidential state updates verified by zk-SNARKs.",
  },
  {
    icon: Globe2,
    title: "Preprod Network Deployment",
    description:
      "Nexora's access control gateway is live and verifiable on the public Midnight Preprod testnet with verified contract execution.",
  },
];

export function MidnightEcosystem() {
  return (
    <section id="midnight" className={styles.midnightSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <Globe2 size={12} />
          <span>Ecosystem Foundation</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Built on Midnight.<br />
          <span className={styles.highlightText}>The blockchain for data protection.</span>
        </h2>
        <p className={styles.sectionLead}>
          Nexora leverages Midnight&apos;s native zero-knowledge engine to build verifiable credentials without identity leakage.
        </p>
      </div>

      <div className={styles.midnightGrid}>
        {midnightPillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className={styles.midnightCard}>
              <div className={styles.midnightIconCircle}>
                <Icon size={20} className={styles.midnightIcon} />
              </div>
              <h3 className={styles.midnightCardTitle}>{p.title}</h3>
              <p className={styles.midnightCardDesc}>{p.description}</p>
            </div>
          );
        })}
      </div>

      {/* Contract Verification Ribbon */}
      <div className={styles.midnightContractCard}>
        <div className={styles.contractCardLeft}>
          <div className={styles.contractIndicator}>
            <span className={styles.pulseDotGreen} />
            <span className={styles.contractIndicatorLabel}>CONTRACT DEPLOYED & ACTIVE</span>
          </div>
          <p className={styles.contractAddressText}>
            0x85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc
          </p>
          <span className={styles.contractSubtext}>
            Midnight Preprod Network &bull; Compact zk-SNARK Access Gate
          </span>
        </div>

        <div className={styles.contractCardRight}>
          <a
            href="https://preprod.midnightexplorer.com/contracts/85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc"
            target="_blank"
            rel="noreferrer"
            className={styles.midnightExploreBtn}
          >
            <span>Open Preprod Explorer</span>
            <ExternalLink size={14} />
          </a>
          <a
            href="https://docs.midnight.network"
            target="_blank"
            rel="noreferrer"
            className={styles.midnightDocsBtn}
          >
            <span>Midnight Docs</span>
          </a>
        </div>
      </div>
    </section>
  );
}
