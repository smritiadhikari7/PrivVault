"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff, KeyRound, Play, RefreshCw, Shield, Terminal } from "lucide-react";
import styles from "./Landing.module.css";

interface PresetScenario {
  id: string;
  name: string;
  tag: string;
  condition: string;
  privateData: {
    label: string;
    raw: string;
    hiddenHash: string;
  }[];
  expectedVerdict: string;
}

const scenarios: PresetScenario[] = [
  {
    id: "finance",
    name: "Financial Eligibility Gate",
    tag: "High-Volume DeFi",
    condition: "Annual Income ≥ $80,000 AND Credit Score ≥ 750",
    privateData: [
      { label: "Annual Income", raw: "$142,500 / yr", hiddenHash: "0x3f...98b2 [CONFIDENTIAL]" },
      { label: "Credit Score", raw: "782 (Tier 1)", hiddenHash: "0x81...44dc [CONFIDENTIAL]" },
      { label: "Bank Account #", raw: "US89 3704 0044 ...", hiddenHash: "0xaa...1200 [NEVER EXPOSED]" },
      { label: "Tax Filing ID", raw: "TX-99482-A", hiddenHash: "0x6d...901e [LOCAL WITNESS ONLY]" },
    ],
    expectedVerdict: "ACCREDITED INVESTOR VERIFIED",
  },
  {
    id: "identity",
    name: "Age & Compliance Verification",
    tag: "Restricted Vault",
    condition: "Age ≥ 21 AND Verified Resident (Non-Sanctioned)",
    privateData: [
      { label: "Full Name", raw: "Rishi Sarkar", hiddenHash: "0x44...8821 [ANONYMOUS]" },
      { label: "Date of Birth", raw: "14 May 2001 (Age: 24)", hiddenHash: "0x9c...33b0 [REDACTED]" },
      { label: "Government ID #", raw: "IND-DL-8849-01", hiddenHash: "0xbb...7149 [NEVER STORED]" },
      { label: "Home Address", raw: "42 Bangalore Tech Park", hiddenHash: "0xfe...009a [ZERO DISCLOSURE]" },
    ],
    expectedVerdict: "LEGAL AGE & COMPLIANCE CONFIRMED",
  },
  {
    id: "membership",
    name: "Private DAO Member Tier",
    tag: "Midnight Governance",
    condition: "Allowlist Merkle Root Match AND Unused Nullifier",
    privateData: [
      { label: "Wallet Address", raw: "addr_test1vp9...48e1", hiddenHash: "0x11...776e [UNLINKED PROVER]" },
      { label: "Credential Key", raw: "cred_sk_94827019", hiddenHash: "0x98...22cf [PRIVATE WITNESS]" },
      { label: "Governance Tokens", raw: "50,000 DUST", hiddenHash: "0x7a...bb54 [SHIELDED BALANCE]" },
      { label: "Nullifier Secret", raw: "null_seed_388102", hiddenHash: "0x01...fd44 [ONE-TIME NULLIFIER]" },
    ],
    expectedVerdict: "AUTHORIZED GOVERNANCE MEMBER",
  },
];

export function InteractiveZkDemo() {
  const [selectedId, setSelectedId] = useState<string>("finance");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [hasVerified, setHasVerified] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentScenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  const runProofDemo = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setHasVerified(false);
    setGenerationStep(1);

    setTimeout(() => {
      setGenerationStep(2);
    }, 900);

    setTimeout(() => {
      setGenerationStep(3);
    }, 1800);

    setTimeout(() => {
      setGenerationStep(4);
      setIsGenerating(false);
      setHasVerified(true);
    }, 2800);
  };

  const resetDemo = () => {
    setIsGenerating(false);
    setGenerationStep(0);
    setHasVerified(false);
  };

  const handleCopyProof = () => {
    navigator.clipboard.writeText("0x85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-demo" className={styles.interactiveDemoSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <KeyRound size={12} />
          <span>Interactive Cryptographic Proof Sandbox</span>
        </div>
        <h2 className={styles.sectionTitle}>
          See what Nexora reveals &mdash;<br />
          <span className={styles.highlightText}>and what it keeps permanently hidden.</span>
        </h2>
        <p className={styles.sectionLead}>
          Select a credential scenario below and trigger local ZK proof generation. Observe how mathematical verification succeeds while sensitive data remains strictly shielded.
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className={styles.scenarioPillRow} role="tablist" aria-label="Credential Scenarios">
        {scenarios.map((scen) => (
          <button
            key={scen.id}
            type="button"
            role="tab"
            aria-selected={selectedId === scen.id}
            className={`${styles.scenarioTabBtn} ${selectedId === scen.id ? styles.scenarioTabActive : ""}`}
            onClick={() => {
              setSelectedId(scen.id);
              resetDemo();
            }}
          >
            <span className={styles.scenarioTagName}>{scen.tag}</span>
            <span className={styles.scenarioMainName}>{scen.name}</span>
          </button>
        ))}
      </div>

      {/* Sandbox Interface Window */}
      <div className={styles.sandboxWindow}>
        {/* Window Topbar */}
        <div className={styles.sandboxTopbar}>
          <div className={styles.windowControls}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <div className={styles.windowTitle}>
            <span>nexora-zk-witness-engine v2.5.1 // Midnight Preprod Circuit</span>
          </div>
          <div className={styles.windowBadge}>
            <Shield size={12} />
            <span>Soundness: 128-bit</span>
          </div>
        </div>

        {/* Verification Condition Banner */}
        <div className={styles.conditionBanner}>
          <div className={styles.conditionLeft}>
            <span className={styles.conditionLabel}>VERIFIER REQUIREMENT:</span>
            <strong className={styles.conditionRule}>{currentScenario.condition}</strong>
          </div>
          <div className={styles.conditionRight}>
            <button
              type="button"
              onClick={runProofDemo}
              disabled={isGenerating}
              className={`${styles.runDemoBtn} ${hasVerified ? styles.runDemoBtnSuccess : ""}`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={14} className={styles.rotatingIcon} />
                  <span>Generating Proof...</span>
                </>
              ) : hasVerified ? (
                <>
                  <Check size={14} />
                  <span>Proof Verified</span>
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
                  <span>Generate ZK Proof</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Status Progress Indicator */}
        {isGenerating && (
          <div className={styles.progressNotificationBar}>
            <div className={styles.stepIndicators}>
              <span className={`${styles.stepBadge} ${generationStep >= 1 ? styles.stepBadgeDone : ""}`}>
                1. Scanning Credential
              </span>
              <span className={`${styles.stepBadge} ${generationStep >= 2 ? styles.stepBadgeDone : ""}`}>
                2. Constructing Witness
              </span>
              <span className={`${styles.stepBadge} ${generationStep >= 3 ? styles.stepBadgeDone : ""}`}>
                3. Evaluating Compact Circuit
              </span>
              <span className={`${styles.stepBadge} ${generationStep >= 4 ? styles.stepBadgeDone : ""}`}>
                4. Midnight Verification
              </span>
            </div>
          </div>
        )}

        {/* Split Comparison View: What Verifier Sees vs Stays Hidden */}
        <div className={styles.sandboxSplitGrid}>
          {/* Left Panel: Private User State */}
          <div className={styles.sandboxPanel}>
            <div className={styles.panelHead}>
              <div className={styles.panelTitleGroup}>
                <EyeOff size={16} className={styles.privateEyeIcon} />
                <div>
                  <h4 className={styles.panelHeaderTitle}>Local Private Storage</h4>
                  <p className={styles.panelHeaderDesc}>Stored only inside your browser runtime</p>
                </div>
              </div>
              <span className={styles.privateStateBadge}>
                {hasVerified ? "Encrypted & Hidden" : "Available in Memory"}
              </span>
            </div>

            <div className={styles.panelDataList}>
              {currentScenario.privateData.map((row) => (
                <div key={row.label} className={styles.dataFieldRow}>
                  <div className={styles.fieldLabelCol}>
                    <span className={styles.fieldName}>{row.label}</span>
                  </div>
                  <div className={styles.fieldValueCol}>
                    {hasVerified ? (
                      <span className={styles.shieldedCipherValue}>
                        <span className={styles.cipherLockIcon}>🔒</span>
                        {row.hiddenHash}
                      </span>
                    ) : (
                      <span className={styles.plaintextValue}>{row.raw}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.panelSecurityBanner}>
              <EyeOff size={14} />
              <span>
                {hasVerified
                  ? "✓ Verifier has zero visibility into any of the 4 raw credential fields."
                  : "These sensitive attributes will NEVER be sent to the network or stored in public logs."}
              </span>
            </div>
          </div>

          {/* Right Panel: What the Midnight Verifier & Network Sees */}
          <div className={`${styles.sandboxPanel} ${styles.sandboxPanelPublic}`}>
            <div className={styles.panelHead}>
              <div className={styles.panelTitleGroup}>
                <Eye size={16} className={styles.publicEyeIcon} />
                <div>
                  <h4 className={styles.panelHeaderTitle}>What Midnight Ledger Sees</h4>
                  <p className={styles.panelHeaderDesc}>Cryptographic proof emitted to network</p>
                </div>
              </div>
              <span className={`${styles.publicStateBadge} ${hasVerified ? styles.publicStateVerified : ""}`}>
                {hasVerified ? "ZK Proof Valid ✓" : "Awaiting Execution"}
              </span>
            </div>

            <div className={styles.publicProofDisplay}>
              <div className={styles.verdictBigCard}>
                <div className={styles.verdictBigStatus}>
                  {hasVerified ? (
                    <div className={styles.verdictApproved}>
                      <span className={styles.checkCirc}>
                        <Check size={22} />
                      </span>
                      <div>
                        <strong className={styles.verdictMainTitle}>ELIGIBLE ✓</strong>
                        <p className={styles.verdictSubLabel}>{currentScenario.expectedVerdict}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.verdictPending}>
                      <span className={styles.pendingDot} />
                      <div>
                        <strong className={styles.verdictPendingTitle}>PROOF NOT YET GENERATED</strong>
                        <p className={styles.verdictPendingSub}>Click &quot;Generate ZK Proof&quot; above to start</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Cryptographic Output Breakdown */}
              <div className={styles.proofAttributesList}>
                <div className={styles.attrRow}>
                  <span className={styles.attrName}>Proof Object (π)</span>
                  <div className={styles.attrValGroup}>
                    <code className={styles.monoCode}>
                      {hasVerified
                        ? "0x85c6d5ce...53cc (Compact SNARK)"
                        : "0x00000000...0000"}
                    </code>
                    {hasVerified && (
                      <button
                        type="button"
                        onClick={handleCopyProof}
                        className={styles.copyBtn}
                        title="Copy proof hash"
                      >
                        <Copy size={12} />
                        {copied ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.attrRow}>
                  <span className={styles.attrName}>Public Inputs (x)</span>
                  <code className={styles.monoCode}>
                    {hasVerified ? "[0x01, Root: 0x2e8f...c1]" : "[None]"}
                  </code>
                </div>

                <div className={styles.attrRow}>
                  <span className={styles.attrName}>One-time Nullifier</span>
                  <code className={styles.monoCode}>
                    {hasVerified ? "0x39a1...ff89 (Registered)" : "Unregistered"}
                  </code>
                </div>

                <div className={styles.attrRow}>
                  <span className={styles.attrName}>Personal Data Disclosed</span>
                  <strong className={styles.zeroDisclosedTag}>EXACTLY 0 BYTES</strong>
                </div>
              </div>

              {/* Terminal Execution Log */}
              <div className={styles.terminalSnippet}>
                <div className={styles.terminalHead}>
                  <Terminal size={12} />
                  <span>Execution Log</span>
                </div>
                <div className={styles.terminalBody}>
                  {hasVerified ? (
                    <>
                      <p className={styles.termGreen}>[OK] Local witness assembled (4 private signals)</p>
                      <p className={styles.termInfo}>[COMPACT] R1CS circuit evaluated: 14,812 constraints</p>
                      <p className={styles.termInfo}>[PROVER] Proof π synthesized in 412ms</p>
                      <p className={styles.termSuccess}>[MIDNIGHT] Ledger preprod verification: VALID (tx: 0x7fa...)</p>
                    </>
                  ) : (
                    <p className={styles.termDim}>$ nexora proof-engine --idle</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
