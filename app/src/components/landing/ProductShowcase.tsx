"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, KeyRound, Lock, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import styles from "./Landing.module.css";

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"gate" | "admin">("gate");

  return (
    <section id="product" className={styles.productShowcaseSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <Sparkles size={12} />
          <span>Interactive Protocol Interface</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Privacy-preserving verification,<br />
          <span className={styles.highlightText}>made usable.</span>
        </h2>
        <p className={styles.sectionLead}>
          Explore the real Nexora application interfaces running on Midnight Preprod &mdash; built for everyday members and protocol operators.
        </p>
      </div>

      {/* Interface Switcher Tabs */}
      <div className={styles.productTabSwitchRow}>
        <button
          type="button"
          className={`${styles.productTabBtn} ${activeTab === "gate" ? styles.productTabBtnActive : ""}`}
          onClick={() => setActiveTab("gate")}
        >
          <Lock size={15} />
          <span>Member Gate (/gate)</span>
          <span className={styles.tabBadge}>Live Demo</span>
        </button>
        <button
          type="button"
          className={`${styles.productTabBtn} ${activeTab === "admin" ? styles.productTabBtnActive : ""}`}
          onClick={() => setActiveTab("admin")}
        >
          <Terminal size={15} />
          <span>Operator Console (/admin)</span>
          <span className={styles.tabBadge}>Gate Manager</span>
        </button>
      </div>

      {/* Browser Mockup Window */}
      <div className={styles.browserFrame}>
        {/* Browser Window Chrome */}
        <div className={styles.browserChrome}>
          <div className={styles.browserDots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <div className={styles.browserUrlBar}>
            <span className={styles.urlLock}>🔒</span>
            <span className={styles.urlProtocol}>https://</span>
            <span className={styles.urlDomain}>
              nexora.network{activeTab === "gate" ? "/gate" : "/admin"}
            </span>
          </div>
          <div className={styles.browserNetworkBadge}>
            <span className={styles.pulseDot} />
            <span>Midnight Preprod</span>
          </div>
        </div>

        {/* View 1: Member Gate Preview */}
        {activeTab === "gate" && (
          <div className={styles.appWindowView}>
            <div className={styles.appViewGrid}>
              {/* Left Column: Verification Form */}
              <div className={styles.appFormPane}>
                <div className={styles.appPaneHead}>
                  <span className={styles.appStepEyebrow}>STEP 02 OF 03</span>
                  <h3 className={styles.appPaneTitle}>Prove Access to Vault #85C</h3>
                  <p className={styles.appPaneSubtitle}>
                    Enter your credential secret. A zero-knowledge proof will be computed locally in your browser.
                  </p>
                </div>

                <div className={styles.appInputGroup}>
                  <label className={styles.appInputLabel}>Credential Secret / Hash</label>
                  <div className={styles.appInputFieldMock}>
                    <span>0x9f4a81b2e90c...7e31</span>
                    <span className={styles.appInputShieldIcon}>🔒 Encrypted</span>
                  </div>
                  <span className={styles.appInputHint}>
                    Never sent over the network. Evaluated client-side only.
                  </span>
                </div>

                <div className={styles.appInputGroup}>
                  <label className={styles.appInputLabel}>Target Gate Contract</label>
                  <div className={styles.appInputFieldMock}>
                    <span>0x85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc</span>
                  </div>
                </div>

                <div className={styles.appActionRow}>
                  <Link href="/gate" className={styles.appLaunchPrimaryBtn}>
                    <span>Try the Live Gate</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Proof Status Card */}
              <div className={styles.appStatusPane}>
                <div className={styles.appProofCard}>
                  <div className={styles.proofCardHead}>
                    <ShieldCheck size={18} className={styles.proofCardIcon} />
                    <div>
                      <strong>Compact Proof Stream</strong>
                      <p>Local WebAssembly Prover</p>
                    </div>
                    <span className={styles.proofCardLiveTag}>ACTIVE</span>
                  </div>

                  <div className={styles.proofProgressList}>
                    <div className={styles.proofProgressRow}>
                      <CheckCircle2 size={15} className={styles.iconCheckGreen} />
                      <span>Wallet connected (Lace / 1AM)</span>
                    </div>
                    <div className={styles.proofProgressRow}>
                      <CheckCircle2 size={15} className={styles.iconCheckGreen} />
                      <span>Private witness synthesized</span>
                    </div>
                    <div className={styles.proofProgressRow}>
                      <CheckCircle2 size={15} className={styles.iconCheckGreen} />
                      <span>Proof constraints satisfied: 14,290 gates</span>
                    </div>
                    <div className={styles.proofProgressRow}>
                      <span className={styles.pulseDot} />
                      <strong className={styles.textCyan}>Submitting proof to Midnight Preprod...</strong>
                    </div>
                  </div>

                  <div className={styles.proofNullifierBox}>
                    <span className={styles.nullifierLabel}>ONE-TIME NULLIFIER:</span>
                    <code className={styles.nullifierCode}>0x9c3140ab98124ef12...</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Operator Console Preview */}
        {activeTab === "admin" && (
          <div className={styles.appWindowView}>
            <div className={styles.appViewGrid}>
              {/* Left Column: Gate Management */}
              <div className={styles.appFormPane}>
                <div className={styles.appPaneHead}>
                  <span className={styles.appStepEyebrow}>OPERATOR MANAGEMENT</span>
                  <h3 className={styles.appPaneTitle}>Create Private Access Gate</h3>
                  <p className={styles.appPaneSubtitle}>
                    Deploy a new access rule on Midnight. Manage credential allowlist hashes and nullifier replay policies.
                  </p>
                </div>

                <div className={styles.appStatsMiniGrid}>
                  <div className={styles.statMiniCard}>
                    <span className={styles.statMiniVal}>70+</span>
                    <span className={styles.statMiniLabel}>Enrolled Hashes</span>
                  </div>
                  <div className={styles.statMiniCard}>
                    <span className={styles.statMiniVal}>100%</span>
                    <span className={styles.statMiniLabel}>Proof Soundness</span>
                  </div>
                  <div className={styles.statMiniCard}>
                    <span className={styles.statMiniVal}>Preprod</span>
                    <span className={styles.statMiniLabel}>Sync Status</span>
                  </div>
                </div>

                <div className={styles.appActionRow}>
                  <Link href="/admin" className={styles.appLaunchPrimaryBtn}>
                    <span>Open Operator Console</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Allowlist Registry Mockup */}
              <div className={styles.appStatusPane}>
                <div className={styles.appProofCard}>
                  <div className={styles.proofCardHead}>
                    <KeyRound size={18} className={styles.proofCardIcon} />
                    <div>
                      <strong>Credential Registry Root</strong>
                      <p>Shielded Merkle Tree on Midnight</p>
                    </div>
                  </div>

                  <div className={styles.registryTreeList}>
                    <div className={styles.registryRow}>
                      <span className={styles.regLeaf}>Leaf #01</span>
                      <code className={styles.regHash}>0x7a81...4912</code>
                      <span className={styles.regBadgeActive}>Active</span>
                    </div>
                    <div className={styles.registryRow}>
                      <span className={styles.regLeaf}>Leaf #02</span>
                      <code className={styles.regHash}>0xbb09...31fc</code>
                      <span className={styles.regBadgeActive}>Active</span>
                    </div>
                    <div className={styles.registryRow}>
                      <span className={styles.regLeaf}>Leaf #03</span>
                      <code className={styles.regHash}>0x44dc...1801</code>
                      <span className={styles.regBadgeActive}>Active</span>
                    </div>
                  </div>

                  <div className={styles.adminSyncStatus}>
                    <span className={styles.pulseDotGreen} />
                    <span>State Root Published: Block #148,290</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
