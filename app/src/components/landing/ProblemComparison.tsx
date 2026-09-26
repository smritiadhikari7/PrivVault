"use client";

import { AlertTriangle, ArrowRight, Check, Database, EyeOff, ShieldCheck, UserX, XCircle } from "lucide-react";
import styles from "./Landing.module.css";

export function ProblemComparison() {
  return (
    <section id="problem" className={styles.problemSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTagAlert}>
          <AlertTriangle size={12} />
          <span>The Traditional Verification Dilemma</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Verification shouldn&apos;t require exposure.
        </h2>
        <p className={styles.sectionLead}>
          Conventional access systems force you to hand over entire documents just to answer a simple yes-or-no question. Nexora separates qualification from identity.
        </p>
      </div>

      <div className={styles.comparisonGrid}>
        {/* Conventional / Broken Side */}
        <div className={styles.comparisonCardLegacy}>
          <div className={styles.cardBadgeLegacy}>
            <XCircle size={14} />
            <span>CONVENTIONAL VERIFICATION</span>
          </div>

          <h3 className={styles.comparisonHeading}>Full Identity Disclosure</h3>
          <p className={styles.comparisonDesc}>
            To prove you meet one condition, third-party verifiers demand raw documents, transmitting sensitive metadata across central servers.
          </p>

          <div className={styles.pipelineIllustrationLegacy}>
            <div className={styles.pipelineStepLegacy}>
              <span className={styles.stepNumLegacy}>01</span>
              <div className={styles.stepContentLegacy}>
                <strong>Raw Documents</strong>
                <p>Passport, SSN, Tax Records, Bank Balance</p>
              </div>
            </div>
            <div className={styles.arrowBetweenLegacy}>
              <ArrowRight size={16} />
            </div>
            <div className={styles.pipelineStepLegacy}>
              <span className={styles.stepNumLegacy}>02</span>
              <div className={styles.stepContentLegacy}>
                <strong>Transmitted in Plaintext</strong>
                <p>Sent over public API or third-party brokers</p>
              </div>
            </div>
            <div className={styles.arrowBetweenLegacy}>
              <ArrowRight size={16} />
            </div>
            <div className={styles.pipelineStepLegacy}>
              <span className={styles.stepNumLegacy}>03</span>
              <div className={styles.stepContentLegacy}>
                <strong>Stored in Databases</strong>
                <p>Honeypots for data leaks & identity theft</p>
              </div>
            </div>
          </div>

          <div className={styles.legacyRisks}>
            <div className={styles.riskItem}>
              <UserX size={16} className={styles.riskIcon} />
              <span>Full identity linkability across websites and wallets</span>
            </div>
            <div className={styles.riskItem}>
              <Database size={16} className={styles.riskIcon} />
              <span>Permanent storage of private biometric and financial data</span>
            </div>
            <div className={styles.riskItem}>
              <AlertTriangle size={16} className={styles.riskIcon} />
              <span>Compliance liability for operators holding customer data</span>
            </div>
          </div>
        </div>

        {/* Nexora ZK Side */}
        <div className={styles.comparisonCardNexora}>
          <div className={styles.cardBadgeNexora}>
            <ShieldCheck size={14} />
            <span>NEXORA ZERO-KNOWLEDGE ARCHITECTURE</span>
          </div>

          <h3 className={styles.comparisonHeadingNexora}>Mathematical Verification</h3>
          <p className={styles.comparisonDescNexora}>
            Prove you satisfy the rule without exposing the underlying values. Zero documents handed over, zero honeypots created.
          </p>

          <div className={styles.pipelineIllustrationNexora}>
            <div className={styles.pipelineStepNexora}>
              <span className={styles.stepNumNexora}>01</span>
              <div className={styles.stepContentNexora}>
                <strong>Encrypted Local Storage</strong>
                <p>Credentials reside securely inside your browser</p>
              </div>
            </div>
            <div className={styles.arrowBetweenNexora}>
              <ArrowRight size={16} />
            </div>
            <div className={styles.pipelineStepNexora}>
              <span className={styles.stepNumNexora}>02</span>
              <div className={styles.stepContentNexora}>
                <strong>Local ZK Witness</strong>
                <p>Compact circuit evaluates constraints privately</p>
              </div>
            </div>
            <div className={styles.arrowBetweenNexora}>
              <ArrowRight size={16} />
            </div>
            <div className={styles.pipelineStepNexora}>
              <span className={styles.stepNumNexora}>03</span>
              <div className={styles.stepContentNexora}>
                <strong>Midnight Verifiable Proof</strong>
                <p>Ledger confirms eligibility with zero leakage</p>
              </div>
            </div>
          </div>

          <div className={styles.nexoraPerks}>
            <div className={styles.perkItem}>
              <Check size={16} className={styles.perkIcon} />
              <span>Zero knowledge revealed: only mathematical truth is proven</span>
            </div>
            <div className={styles.perkItem}>
              <EyeOff size={16} className={styles.perkIcon} />
              <span>Decoupled identity: wallet address remains unlinked</span>
            </div>
            <div className={styles.perkItem}>
              <ShieldCheck size={16} className={styles.perkIcon} />
              <span>Nullifier replay protection: single-use claims guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
