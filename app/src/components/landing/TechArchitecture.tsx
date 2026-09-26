"use client";

import { useState } from "react";
import { ArrowRight, Check, Code, Cpu, ExternalLink, Globe, Layers, Shield, Terminal, Wallet } from "lucide-react";
import styles from "./Landing.module.css";

interface StackLayer {
  name: string;
  role: string;
  packageOrTech: string;
  spec: string;
  icon: typeof Code;
}

const techStack: StackLayer[] = [
  {
    name: "Midnight Preprod Network",
    role: "Decentralized Settlement Layer",
    packageOrTech: "Midnight Preprod (Testnet)",
    spec: "Dual-state consensus, shielded transaction ledger, public state root registry.",
    icon: Globe,
  },
  {
    name: "Compact DSL (Smart Contracts)",
    role: "Zero-Knowledge Circuit Specification",
    packageOrTech: "@midnight-ntwrk/compact-runtime",
    spec: "Formal zk-SNARK circuits compiled with Compact compiler into constraint systems.",
    icon: Code,
  },
  {
    name: "Local ZK Proof Provider",
    role: "Client-Side Witness Synthesizer",
    packageOrTech: "@midnight-ntwrk/midnight-js-http-client-proof-provider",
    spec: "Generates zk-SNARK proofs locally. Fallback to private proof server if needed.",
    icon: Cpu,
  },
  {
    name: "Multi-Wallet DApp Connector",
    role: "Account Authentication & Gas Balancing",
    packageOrTech: "Lace Wallet + 1AM Wallet",
    spec: "BIP-39 key management, tDUST fee balancing, transaction envelope signing.",
    icon: Wallet,
  },
  {
    name: "Private State Provider",
    role: "Client-Side Encrypted Storage",
    packageOrTech: "@midnight-ntwrk/midnight-js-level-private-state-provider",
    spec: "Stores salt seeds, credentials, and local Merkle witness paths inside browser IndexedDB.",
    icon: Layers,
  },
  {
    name: "Next.js 16 Web Application",
    role: "High-Performance Reactive Interface",
    packageOrTech: "Next.js 16 (App Router) + React 19",
    spec: "Webpack WASM loader support for Compact cryptography and streaming ledger state.",
    icon: Terminal,
  },
];

export function TechArchitecture() {
  const [selectedTech, setSelectedTech] = useState<number>(0);

  return (
    <section id="technology" className={styles.techArchSection}>
      <div className={styles.sectionHeaderCentered}>
        <div className={styles.sectionTag}>
          <Cpu size={12} />
          <span>Technical Architecture</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Production-grade cryptography.<br />
          <span className={styles.highlightText}>Built on Midnight and Compact.</span>
        </h2>
        <p className={styles.sectionLead}>
          Nexora does not use simulated cryptography. Every interaction runs on real zero-knowledge proofs and Midnight testnet smart contracts.
        </p>
      </div>

      {/* Visual End-to-End Pipeline Diagram */}
      <div className={styles.endToEndDiagram}>
        <div className={styles.pipelineTitleBar}>
          <span className={styles.diagLabel}>DATA FLOW ARCHITECTURE</span>
          <span className={styles.diagStatus}>Verified On-Chain</span>
        </div>

        <div className={styles.diagramNodesRow}>
          {/* Node 1: User */}
          <div className={styles.diagramNode}>
            <div className={styles.nodeIconCircle}>
              <Wallet size={18} />
            </div>
            <strong>User Device</strong>
            <span>Lace / 1AM Wallet</span>
          </div>

          <div className={styles.diagramConnectorArrow}>
            <span className={styles.arrowLabel}>Private Secret</span>
            <ArrowRight size={18} />
          </div>

          {/* Node 2: Nexora App */}
          <div className={styles.diagramNode}>
            <div className={styles.nodeIconCircle}>
              <Terminal size={18} />
            </div>
            <strong>Nexora App</strong>
            <span>Local State Engine</span>
          </div>

          <div className={styles.diagramConnectorArrow}>
            <span className={styles.arrowLabel}>Construct Witness</span>
            <ArrowRight size={18} />
          </div>

          {/* Node 3: Compact Prover */}
          <div className={`${styles.diagramNode} ${styles.diagramNodeHighlight}`}>
            <div className={styles.nodeIconCircleGlow}>
              <Cpu size={18} />
            </div>
            <strong>Compact Prover</strong>
            <span>Generates Proof π</span>
          </div>

          <div className={styles.diagramConnectorArrow}>
            <span className={styles.arrowLabel}>Submit (π, Nullifier)</span>
            <ArrowRight size={18} />
          </div>

          {/* Node 4: Midnight Contract */}
          <div className={styles.diagramNode}>
            <div className={styles.nodeIconCircle}>
              <Globe size={18} />
            </div>
            <strong>Midnight Preprod</strong>
            <span>Contract 0x85c6...</span>
          </div>

          <div className={styles.diagramConnectorArrow}>
            <span className={styles.arrowLabel}>Confirmed</span>
            <ArrowRight size={18} />
          </div>

          {/* Node 5: Unlocked Gate */}
          <div className={`${styles.diagramNode} ${styles.diagramNodeSuccess}`}>
            <div className={styles.nodeIconCircleSuccess}>
              <Check size={18} />
            </div>
            <strong>Gate Unlocked</strong>
            <span>Vault Access Active</span>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className={styles.techStackGrid}>
        {techStack.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = selectedTech === idx;
          return (
            <div
              key={item.name}
              className={`${styles.techCard} ${isSelected ? styles.techCardActive : ""}`}
              onClick={() => setSelectedTech(idx)}
            >
              <div className={styles.techCardTop}>
                <div className={styles.techCardIcon}>
                  <Icon size={18} />
                </div>
                <span className={styles.techPackage}>{item.packageOrTech}</span>
              </div>

              <h4 className={styles.techCardTitle}>{item.name}</h4>
              <span className={styles.techCardRole}>{item.role}</span>
              <p className={styles.techCardSpec}>{item.spec}</p>
            </div>
          );
        })}
      </div>

      {/* Explorer Verification Link Banner */}
      <div className={styles.contractExplorerBanner}>
        <div className={styles.explorerLeft}>
          <Shield size={16} className={styles.shieldGreen} />
          <div>
            <strong>LIVE ON MIDNIGHT PREPROD TESTNET:</strong>
            <code className={styles.contractCode}>
              0x85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc
            </code>
          </div>
        </div>
        <a
          href="https://preprod.midnightexplorer.com/contracts/85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc"
          target="_blank"
          rel="noreferrer"
          className={styles.explorerLinkBtn}
        >
          <span>View on Explorer</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}
