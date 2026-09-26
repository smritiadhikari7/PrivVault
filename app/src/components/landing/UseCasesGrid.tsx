"use client";

import { Award, Briefcase, Coins, ShieldCheck, Ticket, UserCheck } from "lucide-react";
import styles from "./Landing.module.css";

interface UseCaseItem {
  icon: typeof UserCheck;
  title: string;
  category: string;
  questionSolved: string;
  traditionalProblem: string;
  nexoraSolution: string;
}

const useCases: UseCaseItem[] = [
  {
    icon: UserCheck,
    title: "Age & Legal Gate Verification",
    category: "IDENTITY & COMPLIANCE",
    questionSolved: "Is the user at least 21 years old?",
    traditionalProblem: "Demands full birth certificate, passport scan, and home address.",
    nexoraSolution: "Generates a ZK proof affirming Age ≥ 21. Birth date and name remain 100% confidential.",
  },
  {
    icon: Coins,
    title: "Financial Eligibility & Tier Access",
    category: "DEFI & PRIVATE WEALTH",
    questionSolved: "Does the trader meet the accredited threshold?",
    traditionalProblem: "Requires uploading bank account statements and tax returns.",
    nexoraSolution: "Proves balance or net worth exceeds the criteria without disclosing a single numerical balance.",
  },
  {
    icon: ShieldCheck,
    title: "Private Community & Vault Gating",
    category: "WEB3 INFRASTRUCTURE",
    questionSolved: "Is the visitor an approved member of this private vault?",
    traditionalProblem: "Forces users to dox public wallet addresses and transaction history.",
    nexoraSolution: "Proves Merkle tree leaf inclusion in the allowlist without revealing which leaf is yours.",
  },
  {
    icon: Ticket,
    title: "Single-Use Anonymous Claims",
    category: "AIRDROPS & PRIVACY REWARDS",
    questionSolved: "Has this eligible member already claimed their reward?",
    traditionalProblem: "Tracks wallets and IP addresses, creating centralized surveillance logs.",
    nexoraSolution: "Emits a deterministic cryptographic nullifier. Prevents double-claiming with total anonymity.",
  },
  {
    icon: Briefcase,
    title: "Role-Based Enterprise Clearance",
    category: "ENTERPRISE SECURITY",
    questionSolved: "Does the engineer possess level-4 production access?",
    traditionalProblem: "Exposes employee rosters, internal user IDs, and department hierarchies.",
    nexoraSolution: "Proves valid cryptographic delegation signature from the company's master root key.",
  },
  {
    icon: Award,
    title: "Accredited Credential Proving",
    category: "PROFESSIONAL ATTESTATION",
    questionSolved: "Does the applicant hold a certified professional license?",
    traditionalProblem: "Exposes license serial numbers, university transcripts, and personal contact info.",
    nexoraSolution: "Proves validity of an issuer-signed credential hash without publishing the certificate.",
  },
];

export function UseCasesGrid() {
  return (
    <section id="use-cases" className={styles.useCasesSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <span>Real-World Applications</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Built for every scenario where<br />
          <span className={styles.highlightText}>trust matters, but privacy is non-negotiable.</span>
        </h2>
        <p className={styles.sectionLead}>
          From DeFi thresholds to restricted vaults, Nexora replaces document over-sharing with mathematical proofs.
        </p>
      </div>

      <div className={styles.useCasesGrid}>
        {useCases.map((uc) => {
          const Icon = uc.icon;
          return (
            <div key={uc.title} className={styles.useCaseCard}>
              <div className={styles.useCaseHead}>
                <div className={styles.useCaseIconWrap}>
                  <Icon size={20} className={styles.useCaseIcon} />
                </div>
                <span className={styles.useCaseCategory}>{uc.category}</span>
              </div>

              <h3 className={styles.useCaseTitle}>{uc.title}</h3>

              <div className={styles.questionBox}>
                <span className={styles.questionLabel}>VERIFIER ASK:</span>
                <p className={styles.questionText}>&ldquo;{uc.questionSolved}&rdquo;</p>
              </div>

              <div className={styles.useCaseComparison}>
                <div className={styles.compRowLegacy}>
                  <span className={styles.compBadgeRed}>WITHOUT NEXORA</span>
                  <p>{uc.traditionalProblem}</p>
                </div>
                <div className={styles.compRowNexora}>
                  <span className={styles.compBadgeGreen}>WITH NEXORA</span>
                  <p>{uc.nexoraSolution}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
