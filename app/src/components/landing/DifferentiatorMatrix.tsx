"use client";

import { Check, ShieldCheck } from "lucide-react";
import styles from "./Landing.module.css";

interface ComparisonRow {
  feature: string;
  traditional: string;
  publicWeb3: string;
  nexora: string;
  nexoraHighlight: boolean;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Data Exposure to Verifier",
    traditional: "Full documents (Passport, Bank records, DOB)",
    publicWeb3: "Public wallet balance & full token history",
    nexora: "Zero bytes. Only mathematical validity.",
    nexoraHighlight: true,
  },
  {
    feature: "Identity Linkability",
    traditional: "Permanent identity profile tracked by company",
    publicWeb3: "Permanent public address on block explorer",
    nexora: "Completely decoupled & unlinked via nullifiers",
    nexoraHighlight: true,
  },
  {
    feature: "Centralized Storage Vulnerability",
    traditional: "High risk: customer records stored in SQL DB",
    publicWeb3: "Low: ledger is decentralized, but 100% public",
    nexora: "Zero: credentials stay on client machine",
    nexoraHighlight: true,
  },
  {
    feature: "Replay & Double-Spend Protection",
    traditional: "Session cookies & centralized tokens",
    publicWeb3: "Transaction nonces linked to sender address",
    nexora: "Cryptographic nullifiers without identity trail",
    nexoraHighlight: true,
  },
  {
    feature: "Decentralized Settlement",
    traditional: "None (Private servers)",
    publicWeb3: "Yes (Public EVM / Solana / Cardano)",
    nexora: "Yes (Midnight Preprod Shielded Ledger)",
    nexoraHighlight: true,
  },
];

export function DifferentiatorMatrix() {
  return (
    <section id="comparison" className={styles.differentiatorSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <ShieldCheck size={12} />
          <span>Protocol Comparison</span>
        </div>
        <h2 className={styles.sectionTitle}>
          How Nexora compares to<br />
          <span className={styles.highlightText}>conventional identity and public Web3.</span>
        </h2>
        <p className={styles.sectionLead}>
          Public blockchains fix decentralization but destroy privacy. Nexora delivers decentralized verification without sacrificing personal confidentiality.
        </p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th className={styles.thFeature}>Verification Dimension</th>
              <th className={styles.thLegacy}>Traditional KYC / OAuth</th>
              <th className={styles.thPublic}>Public Web3 Gating</th>
              <th className={styles.thNexora}>Nexora on Midnight</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row) => (
              <tr key={row.feature}>
                <td className={styles.tdFeature}>{row.feature}</td>
                <td className={styles.tdLegacy}>{row.traditional}</td>
                <td className={styles.tdPublic}>{row.publicWeb3}</td>
                <td className={styles.tdNexora}>
                  <div className={styles.nexoraValWrap}>
                    <Check size={15} className={styles.iconCheckGreen} />
                    <span>{row.nexora}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
