"use client";

import { useState } from "react";
import { ArrowRight, Check, Layers, ShieldCheck } from "lucide-react";
import styles from "./Landing.module.css";

interface StepDetail {
  num: string;
  title: string;
  actor: "Operator / User" | "Verifier Policy" | "Client Prover" | "Midnight Network";
  summary: string;
  deepDive: string;
  inputPayload: string;
  outputPayload: string;
  privacyGuarantee: string;
}

const steps: StepDetail[] = [
  {
    num: "01",
    title: "Create / Store Credential",
    actor: "Operator / User",
    summary:
      "Operator issues or enrolls credential hashes into the Midnight smart contract allowlist. Raw credentials remain safely with the user.",
    deepDive:
      "The user receives a cryptographic credential secret (or holds existing private keys). The operator computes a cryptographic commitment hash H(secret, salt) and posts only the state root to Midnight.",
    inputPayload: "Raw attributes: { age: 24, score: 780, salt: 0x9a4f... }",
    outputPayload: "Commitment Hash: 0x7c81b49e... (Submitted to Ledger)",
    privacyGuarantee: "Raw attributes remain on user device and are NEVER posted on-chain.",
  },
  {
    num: "02",
    title: "Define Requirement",
    actor: "Verifier Policy",
    summary:
      "The verifier defines the exact mathematical condition required for access using Midnight's Compact language.",
    deepDive:
      "A Compact smart contract gate specifies public criteria: e.g. Merkle leaf membership in Root R, threshold inequalities (Score >= 700), or one-time access nullifier rules.",
    inputPayload: "Contract Definition: Compact zk-rule { verify_membership() }",
    outputPayload: "Public Gate Instance: Contract 0x85c6d5ce... on Preprod",
    privacyGuarantee: "Requirements are strictly public, deterministic, and verifiable by anyone.",
  },
  {
    num: "03",
    title: "Generate ZK Proof",
    actor: "Client Prover",
    summary:
      "Nexora's local prover synthesizes a zk-SNARK witness inside the user's browser without contacting any external servers.",
    deepDive:
      "Using the Midnight JS proof provider, the client compiles circuit inputs into an R1CS constraint system. The zero-knowledge property ensures no eavesdropper can deduce the witness w.",
    inputPayload: "Private Witness: (credential_secret, merkle_path, nullifier_seed)",
    outputPayload: "Proof Object (π): Compressed zk-SNARK proof points (A, B, C)",
    privacyGuarantee: "Mathematical zero-knowledge guarantee. Soundness error < 2^-128.",
  },
  {
    num: "04",
    title: "Verify on Midnight",
    actor: "Midnight Network",
    summary:
      "The Midnight network evaluates the proof against the public smart contract state and emits an access grant.",
    deepDive:
      "Midnight nodes check that the proof π satisfies the public contract parameters. A nullifier hash is written to the public state to prevent proof replay, while access is unlocked.",
    inputPayload: "Transaction: SubmitProof(π, nullifier, gate_id)",
    outputPayload: "Ledger State Transition: Status: VERIFIED ✓, Nullifier Stored",
    privacyGuarantee: "Access is granted without the verifier ever knowing who the user is.",
  },
];

export function HowItWorksFlow() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const current = steps[activeStep];

  return (
    <section id="how-it-works" className={styles.howItWorksSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <Layers size={12} />
          <span>Protocol Mechanics</span>
        </div>
        <h2 className={styles.sectionTitle}>
          How Nexora delivers<br />
          <span className={styles.highlightText}>verifiable privacy in 4 steps.</span>
        </h2>
        <p className={styles.sectionLead}>
          A seamless cryptographic pipeline connecting user-held credentials, client-side proof generation, and the Midnight ledger.
        </p>
      </div>

      {/* Step Navigation Track (Desktop Horizontal Stepper) */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepperTrack}>
          {steps.map((st, index) => {
            const isSelected = activeStep === index;
            const isPast = activeStep > index;
            return (
              <button
                key={st.num}
                type="button"
                className={`${styles.stepNavButton} ${isSelected ? styles.stepNavActive : ""} ${isPast ? styles.stepNavPast : ""}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={styles.stepNumCircle}>
                  {isPast ? <Check size={14} /> : <span>{st.num}</span>}
                </div>
                <div className={styles.stepNavText}>
                  <span className={styles.stepNavActor}>{st.actor}</span>
                  <strong className={styles.stepNavTitle}>{st.title}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Inspector Box */}
      <div className={styles.stepInspectorBox}>
        <div className={styles.inspectorHeader}>
          <div className={styles.inspectorTitleWrap}>
            <span className={styles.inspectorIndex}>{current.num}</span>
            <div>
              <span className={styles.inspectorActor}>{current.actor}</span>
              <h3 className={styles.inspectorMainTitle}>{current.title}</h3>
            </div>
          </div>
          <div className={styles.inspectorPaging}>
            <span>Step {activeStep + 1} of 4</span>
            <div className={styles.pagingArrows}>
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((p) => p - 1)}
                className={styles.pagingBtn}
                aria-label="Previous step"
              >
                ←
              </button>
              <button
                type="button"
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((p) => p + 1)}
                className={styles.pagingBtn}
                aria-label="Next step"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <p className={styles.inspectorSummary}>{current.summary}</p>
        <p className={styles.inspectorDeepDive}>{current.deepDive}</p>

        {/* Cryptographic I/O Payload Inspector */}
        <div className={styles.ioInspectorGrid}>
          <div className={styles.ioCard}>
            <span className={styles.ioTagInput}>INPUT DATA</span>
            <code className={styles.ioCode}>{current.inputPayload}</code>
          </div>
          <div className={styles.ioArrow}>
            <ArrowRight size={18} />
          </div>
          <div className={styles.ioCard}>
            <span className={styles.ioTagOutput}>OUTPUT STATE</span>
            <code className={styles.ioCode}>{current.outputPayload}</code>
          </div>
        </div>

        {/* Privacy Guarantee Footer */}
        <div className={styles.inspectorPrivacyBanner}>
          <ShieldCheck size={16} className={styles.shieldGreen} />
          <div>
            <strong>CRYPTOGRAPHIC GUARANTEE:</strong>
            <span> {current.privacyGuarantee}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
