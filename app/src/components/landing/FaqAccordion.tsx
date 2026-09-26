"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import styles from "./Landing.module.css";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What is Nexora?",
    a: "Nexora is a privacy-first zero-knowledge credential and access gateway built on the Midnight Network. It enables members to prove they satisfy specific rules or possess valid qualifications without revealing their identity, documents, or underlying personal data.",
  },
  {
    q: "What is a zero-knowledge proof (ZKP)?",
    a: "A zero-knowledge proof is a cryptographic method where one party (the prover) mathematically proves to another party (the verifier) that a specific statement is true, without conveying any information beyond the validity of the statement itself.",
  },
  {
    q: "What information does Nexora reveal to the verifier?",
    a: "Nexora reveals only the cryptographic proof object (π), the public input parameters (such as the gate ID or tier requirement), and a unique one-time nullifier hash. Your raw attributes, dates of birth, balances, and identity remain strictly hidden.",
  },
  {
    q: "How does Nexora protect my private data from leaking?",
    a: "All witness computations and credential secrets are stored and processed locally within your browser using WebAssembly. No sensitive credentials are ever sent to an external server or written into public blockchain blocks.",
  },
  {
    q: "What is Midnight?",
    a: "Midnight is a privacy-focused sidechain and blockchain network developed by IOHK (Input Output). It features a unique dual-state architecture that natively combines shielded private smart contract states with a public decentralized ledger.",
  },
  {
    q: "What is Compact?",
    a: "Compact is Midnight's domain-specific programming language for writing zero-knowledge smart contracts. It allows developers to declare private state circuits and public ledger rules with formal cryptographic correctness.",
  },
  {
    q: "Do I need a wallet to use Nexora?",
    a: "Yes. Nexora supports Midnight-compatible wallets such as Lace and 1AM Wallet. The wallet signs transactions and balances minimal tDUST gas fees for state transitions on the Midnight Preprod network.",
  },
  {
    q: "What happens when a proof is invalid or conditions are not met?",
    a: "If a user fails to satisfy the cryptographic circuit constraints (e.g., age is below 21 or the credential hash is absent from the allowlist), the local prover cannot generate a valid zk-SNARK proof. The transaction fails immediately without exposing why it failed.",
  },
  {
    q: "Can credentials expire or be revoked?",
    a: "Yes. Gate operators can update the allowlist Merkle root on the Midnight smart contract to rotate or invalidate credentials, and epoch-based nullifiers can enforce one-time or time-limited access rights.",
  },
  {
    q: "Is Nexora currently production-ready?",
    a: "Nexora is currently live and operating on the Midnight Preprod testnet, with an active contract deployed at 0x85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc. Over 70 testnet users have validated its end-to-end functionality as part of the official developer submission.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <HelpCircle size={12} />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Technical &amp; Protocol FAQ
        </h2>
        <p className={styles.sectionLead}>
          Everything you need to know about Nexora, Midnight, Compact circuits, and zero-knowledge verification.
        </p>
      </div>

      <div className={styles.faqAccordionContainer}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.q}
              className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
            >
              <button
                type="button"
                className={styles.faqQuestionButton}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span className={styles.faqQuestionText}>{faq.q}</span>
                <span className={`${styles.faqChevronWrap} ${isOpen ? styles.faqChevronRotate : ""}`}>
                  <ChevronDown size={18} />
                </span>
              </button>

              {isOpen && (
                <div className={styles.faqAnswerContainer}>
                  <p className={styles.faqAnswerText}>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
