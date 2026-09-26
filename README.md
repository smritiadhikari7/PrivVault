# PrivVault
[![PrivVault CI](https://github.com/smritiadhikari7/PrivVault/actions/runs/36255679516)](https://github.com/smritiadhikari7/PrivVault/actions/runs/36255679516)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)](./tests/)
[![Compact](https://img.shields.io/badge/Compact-Midnight-blue)](https://docs.midnight.network/)
[![Network](https://img.shields.io/badge/Network-Midnight%20Preprod-purple)](https://indexer.preprod.midnight.network/api/v4/graphql)
[![Lace Wallet](https://img.shields.io/badge/Wallet-Lace-7B68EE)](https://www.lace.io/)
[![1AM Wallet](https://img.shields.io/badge/Wallet-1AM-FF5733)](https://1amwallet.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

 <h3>Privacy-First Zero-Knowledge Access Control on Midnight Network</h3>
  <p><i>Prove you're authorized — without revealing who you are.</i></p>
  
## 🏆 Level 3 Verification & Submission Deliverables

* 🌐 **Live Preprod Demo:** [https://privvaultweb3.vercel.app/](https://privvaultweb3.vercel.app/) — PrivVault is deployed and functional on Midnight Preprod.
* 💻 **Public GitHub Repository:** `https://github.com/smritiadhikari7/PrivVault` — Complete source code, smart contract, tests, CI/CD, and documentation.
* 🎥 **Demo Video:** `[DEMO VIDEO URL]` — Full end-to-end PrivVault functionality demonstration.
* 🧪 **Automated Tests:** ✅ Complete — 3+ tests passing covering core authorization and privacy functionality.
* 📸 **Test Evidence:** ✅ Complete — Test output screenshot demonstrating passing tests.
* ⚙️ **CI/CD Pipeline:** ✅ Complete — GitHub Actions workflow configured and passing.
* 📄 **CI/CD Workflow:** `.github/workflows/ci.yml` — Automated project validation and testing.
* 🔐 **Privacy Model:** ✅ Complete — README documents what an on-chain observer can and cannot learn.
* 🌳 **Zero-Knowledge Merkle Verification:** ✅ Complete — Credential membership is verified through the ZK-based Merkle authorization flow.
* ♻️ **Nullifier Replay Protection:** ✅ Complete — Spent nullifiers prevent replay of previously used authorization proofs.
* 👛 **Midnight Wallet Integration:** ✅ Complete — Lace and 1AM wallet support implemented.
* 🛡️ **Midnight Privacy Model:** ✅ Complete — PrivVault meaningfully uses Midnight's privacy-preserving architecture.
* 📝 **Approved Product Idea:** ✅ Complete — Approved idea from the provided Midnight idea list implemented.
* 📚 **Complete README:** ✅ Complete — Project architecture, privacy model, setup, testing, deployment, and security documentation included.
* 💾 **Meaningful Commit History:** ✅ Complete — 10+ meaningful development commits.
* 🚀 **Functional dApp:** ✅ Complete — Admin enrollment → wallet connection → private credential → ZK proof → Midnight verification → nullifier validation → access granted.

### 🟢 Level 3 Status

**✅ LEVEL 3 COMPLETE**

All required Level 3 deliverables have been completed and documented for PrivVault, including the functional Midnight dApp, 3+ passing tests, CI/CD pipeline, approved project idea, 10+ meaningful commits, public GitHub repository, live deployment, privacy model documentation, test evidence, and demo video.


## 📋 Quick Links & CheckList
| Network     | Address                                                              |
| ----------- | -------------------------------------------------------------------- |
| **🌐Live Demo** | [https://privvaultweb3.vercel.app/](https://privvaultweb3.vercel.app/) |
| **Preprod** | `--` |
| **Demo Video** |[Watch the kiyora Demo Video on Google Drive](https://drive.google.com/file/d/1cAb_dis5CkSjRz4XW3x5RSnGYpUv2BDh/view?usp=sharing) |
| CI/CD pipeline running (workflow file + passing runs)                 |               ✅ **Passed**                |

> Preprod deployed. Verify the new address on [Midnight Preprod Explorer](https://preprod.midnightexplorer.com/contracts/85c6d5ce4fec74c33a17d4307290bf7d05878637b9f2e70bead1d90bdf5353cc) 

---
## 🔎 Explorer Verification (Preview NetWork)

| Resource | Link                                                                                                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Explorer | [Midnight Preprod Explorer](https://explorer.1am.xyz/contract/)                                                                                                        |
| Contract | [--](https://explorer.1am.xyz/contract/) |


### 1. Automated Test Suite Passing

<img width="486" height="169" alt="Screenshot 2026-07-22 123954" src="https://github.com/user-attachments/assets/b71b9cdb-8fc5-46d3-9a80-b390b3c44db1" />

### 2. Deployed on Prepod Network 
<img width="1838" height="917" alt="image" src="https://github.com/user-attachments/assets/e761ee14-7b25-44d5-bacd-ac74a70f0dbb" />




### 3. CI & CD Running 

<img width="1878" height="727" alt="image" src="https://github.com/user-attachments/assets/c7aa7a8a-21ec-4533-97ea-6984c8519ee4" />



### Prove permission. Not identity.

PrivVault is a privacy-preserving access gateway built on the **Midnight Network**. It allows authorized users to prove that they possess a valid access credential **without revealing the credential itself or exposing which enrolled credential they own**.

Instead of storing usernames, passwords, wallet addresses, or raw credentials as an access list, PrivVault uses **Zero-Knowledge proofs, Merkle trees, and cryptographic nullifiers** to verify authorization while minimizing information exposed to the public blockchain.

> **Prove that you are authorized — without revealing why or who you are.**

---

## Overview

PrivVault separates **authorization** from **identity disclosure**.

An administrator creates an access gate and enrolls authorized credentials. Each credential is represented by a cryptographic hash and incorporated into a Merkle Tree.

When a member wants to access the protected vault:

1. The member receives their secret credential through a secure channel.
2. The credential remains local to the member's browser.
3. The browser generates a Zero-Knowledge proof of Merkle membership.
4. A cryptographic nullifier is generated to prevent the same authorization from being replayed.
5. The Midnight smart contract verifies the proof.
6. If verification succeeds, access is granted without publishing the original credential.

### Core flow

```text
                 ADMIN
                   │
                   ▼
          Create Access Gate
                   │
                   ▼
        Enroll Credential Hashes
                   │
                   ▼
             Merkle Tree
                   │
                   │
────────────────────────────────────
                   │
                 MEMBER
                   │
                   ▼
           Receive Secret
                   │
                   ▼
             Connect Wallet
                   │
                   ▼
       Generate Zero-Knowledge Proof
                   │
                   ▼
        Verify Merkle Membership
                   │
                   ▼
         Check Nullifier Status
                   │
                   ▼
             Access Granted
```

---

# Why PrivVault?

Traditional allowlists and token-gated applications often expose more information than is necessary to establish authorization.

For example:

* Wallet-based allowlists can associate access with a public wallet address.
* Token-gated applications can expose token ownership or balances.
* Membership systems may maintain identifiable user records.
* Private beta programs can associate access credentials with user identities.

PrivVault takes a different approach:

> **The system verifies authorization instead of revealing the underlying credential.**

The blockchain receives the cryptographic information required to verify the proof, rather than the user's raw secret.

---

# Privacy Model

PrivVault deliberately separates information into **public blockchain state** and **private proving data**.

## Public — Visible On-Chain

The following information may be observable from the contract state:

* Merkle root representing the enrolled credential set
* Spent nullifiers
* Access-gate status
* Administrator-controlled contract state
* Public transaction and contract information

## Private — Kept Local

The following information is used as private proving input:

* Raw secret credential
* Merkle inclusion path
* Private witness values
* Other sensitive inputs required by the ZK circuit

The private inputs are used by the proving process and are not intentionally written into the public contract state.

---

# What Does the User Prove?

A successful access request demonstrates that:

* The user possesses a credential corresponding to an enrolled Merkle-tree leaf.
* The proof satisfies the circuit's membership requirements.
* The associated nullifier has not already been consumed.
* The access request satisfies the contract's verification rules.

The user does **not** need to publicly reveal:

* The raw credential
* The specific Merkle leaf
* The Merkle inclusion path
* The private witness values

This allows the application to establish authorization without requiring the credential itself to become public blockchain data.

---

# Zero-Knowledge Access Model

```text
┌───────────────────────────────┐
│      PRIVATE USER DATA        │
│                               │
│  Secret Credential            │
│  Merkle Path                  │
│  Private Witness Inputs       │
└───────────────┬───────────────┘
                │
                │ ZK Proving
                ▼
┌───────────────────────────────┐
│       ZERO-KNOWLEDGE PROOF    │
│                               │
│  Prove credential membership  │
│  Prove authorization rules    │
│  Produce cryptographic        │
│  nullifier                    │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       MIDNIGHT CONTRACT       │
│                               │
│  Verify Proof                 │
│  Verify Merkle Root           │
│  Check Nullifier              │
│  Record Successful Use        │
└───────────────┬───────────────┘
                │
                ▼
          ACCESS GRANTED
```

---

# Replay Protection

PrivVault uses **cryptographic nullifiers** to prevent successful authorization proofs from being reused.

The simplified flow is:

```text
Credential
    │
    ▼
Generate Nullifier
    │
    ▼
Check Spent Nullifier Set
    │
    ├── Already Used ──► Reject
    │
    └── New ──────────► Continue
                           │
                           ▼
                    Verify ZK Proof
                           │
                           ▼
                    Record Nullifier
                           │
                           ▼
                      Grant Access
```

Once a nullifier has been consumed, another authorization request using the same nullifier is rejected by the contract.

---

# Key Features

### Zero-Knowledge Authentication

Prove authorization without publishing the original access credential.

### Merkle-Based Allowlist

Authorized credentials are represented as cryptographic hashes within a Merkle Tree rather than storing raw secrets on-chain.

### Nullifier-Based Replay Protection

Each successful authorization produces a cryptographic nullifier that can be tracked to prevent replay.

### Admin Console

Administrators can:

* Create access gates
* Enroll authorized credentials
* Generate member credentials
* Publish access gates
* Restore previously published gates
* Share access links
* Manage gate configuration

### Privacy-Preserving Member Access

The member flow is intentionally simple:

```text
Connect Wallet
      ↓
Enter Secret
      ↓
Generate Proof
      ↓
Verify Access
      ↓
Unlock Vault
```

### Multi-Wallet Support

PrivVault supports Midnight-compatible wallet connections through the DApp Connector API, including:

* Lace
* 1AM

### Browser-Based Circuit Interaction

The application integrates the Midnight contract and allows users to initiate the `verify_access()` flow directly from the frontend.

### Proof Status Feedback

The interface provides feedback during proof generation and verification so users can understand the current state of their authorization request.

### Explorer Integration

Contract deployments and blockchain transactions can be inspected through the relevant Midnight explorer interfaces.

---

# Architecture

```text
                           PRIVVAULT
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
          ADMIN CONSOLE                 MEMBER APPLICATION
                │                             │
                │                             │
                ▼                             ▼
       Credential Enrollment          Secret Credential
                │                             │
                ▼                             ▼
          Hash Credential              Local Witness Data
                │                             │
                ▼                             ▼
          Merkle Tree                  ZK Proof Generation
                │                             │
                └──────────────┬──────────────┘
                               │
                               ▼
                    MIDNIGHT SMART CONTRACT
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
          Merkle Root                  Nullifier Set
                │                             │
                └──────────────┬──────────────┘
                               │
                               ▼
                       Proof Verification
                               │
                               ▼
                         Access Granted
                               │
                               ▼
                       Protected Vault
```

---

# Public State vs Private Witness

```text
┌──────────────────────────────────┐
│       MEMBER'S LOCAL DEVICE      │
│                                  │
│  PRIVATE WITNESS DATA            │
│  ─────────────────────           │
│  • Secret credential             │
│  • Merkle inclusion path         │
│  • Circuit witness values        │
│                                  │
│  Used during proof generation    │
└─────────────────┬────────────────┘
                  │
                  │ Zero-Knowledge Proof
                  ▼
┌──────────────────────────────────────────┐
│       MIDNIGHT PREPROD NETWORK           │
│                                          │
│  PUBLIC CONTRACT STATE                   │
│  ─────────────────────                   │
│  • Merkle root                           │
│  • Spent nullifiers                      │
│  • Gate status                           │
│  • Public contract information            │
│                                          │
│  Private credential is not stored here.  │
└──────────────────────────────────────────┘
```

The contract is designed around selective disclosure: the circuit verifies the required authorization conditions without requiring the raw credential to become part of the public contract state.

---

# Smart Contract

PrivVault uses a Midnight Compact smart contract to implement the authorization logic.

The core verification flow is conceptually:

```text
verify_access()
      │
      ├── Validate credential membership
      │
      ├── Validate Merkle root
      │
      ├── Generate/check nullifier
      │
      ├── Verify nullifier has not been spent
      │
      ├── Record successful authorization
      │
      └── Return verification result
```

The contract separates:

* **Public ledger state**
* **Private witness inputs**
* **Verification logic**
* **Replay-protection state**

---

# Tech Stack

| Layer                | Technology                              | Purpose                                          |
| -------------------- | --------------------------------------- | ------------------------------------------------ |
| Blockchain           | Midnight Preprod                        | Privacy-preserving blockchain environment        |
| Smart Contract       | Compact `v0.22.0+`                      | ZK-oriented smart contract logic                 |
| Compiler             | Midnight Compact CLI `v0.30.0`          | Compile Compact contracts and generate artifacts |
| Runtime              | `@midnight-ntwrk/compact-runtime`       | Contract simulation and execution support        |
| Contract SDK         | `@midnight-ntwrk/midnight-js-contracts` | Contract deployment and circuit interaction      |
| Frontend             | Next.js 15                              | Application framework                            |
| Language             | TypeScript                              | Application and contract integration             |
| Styling              | Tailwind CSS                            | Responsive application UI                        |
| Wallet               | `@midnight-ntwrk/dapp-connector-api`    | Midnight wallet integration                      |
| Wallets              | Lace / 1AM                              | User wallet connectivity                         |
| Testing              | Jest / TypeScript                       | Automated contract and application tests         |
| Package Manager      | npm Workspaces                          | Monorepo dependency management                   |
| CI/CD                | GitHub Actions                          | Automated build and test pipeline                |
| Hosting              | Vercel                                  | Frontend deployment                              |
| Proof Infrastructure | Midnight Proof Server                   | Local proof-generation support                   |

---

# Project Structure

```text
PrivVault/
│
├── app/
│   ├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx
│   │   └── CircuitCall.tsx
│   │
│   ├── lib/
│   │   └── useMidnight.ts
│   │
│   └── ...
│
├── contracts/
│   ├── src/
│   │   └── PrivVault.compact
│   │
│   ├── tests/
│   │
│   └── compiler/
│
├── public/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Prerequisites

Before running PrivVault locally, install:

* **Node.js 20+**
* **Node.js 22 LTS recommended**
* **Docker Desktop**
* **WSL 2 + Ubuntu** or a compatible Linux/macOS environment for the Compact compiler
* **Lace Wallet** or **1AM Wallet**
* A wallet configured for **Midnight Preprod**
* Sufficient Preprod DUST for required blockchain transactions

---

# Running Locally

## 1. Clone the Repository

```bash
git clone https://github.com/Rimanshu-Singh/PrivVault.git
cd PrivVault
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Compile the Compact Contract

Run the compiler from WSL/Linux:

```bash
npm run compile
```

---

## 4. Run Tests

```bash
npm test
```

---

## 5. Start the Proof Server

If the proof server container already exists:

```bash
docker start proof-server
```

If you need to create/configure the proof-server container, follow the Midnight proof-server setup appropriate for your installed SDK version.

---

## 6. Start the Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Member Access Flow

Once the application is running:

### 1. Launch the application

Open:

```text
http://localhost:3000
```

### 2. Connect a wallet

Select:

```text
Lace
```

or:

```text
1AM
```

Approve the connection from the wallet extension.

### 3. Open Member Access

Navigate to the member access interface.

### 4. Enter your credential

Paste the secret credential provided by the administrator.

The credential is used as private proving input.

### 5. Generate the proof

Select:

```text
Generate Proof — Verify Access
```

The application generates the required ZK proof and submits the verification flow.

### 6. Verify authorization

The Midnight contract verifies the authorization conditions and checks replay protection.

### 7. Unlock the vault

After successful verification, the protected session becomes available.

---

# Testing

Run the complete test suite:

```bash
npm test
```

The test suite covers key authorization logic including:

* Administrator permissions
* Credential enrollment
* Allowlist behavior
* Merkle membership logic
* Nullifier generation
* Nullifier replay prevention
* Contract state behavior

The test environment uses mocked/in-memory structures where appropriate for fast deterministic testing.

End-to-end proof generation is handled separately through the browser/proof-server environment.

### Test Results

![PrivVault Test Results](https://github.com/user-attachments/assets/1956bef9-193a-4d3b-b7a1-ec9f3aebe2ca)

---

# CI/CD

PrivVault uses GitHub Actions to automatically validate the project.

The workflow is located at:

```text
.github/workflows/ci.yml
```

The CI pipeline performs automated compilation and testing on repository changes.

### Pipeline

```text
Git Push / Pull Request
          │
          ▼
    GitHub Actions
          │
          ├── Install Dependencies
          │
          ├── Compile Contracts
          │
          └── Run Tests
                    │
                    ▼
              Build Status
```

![PrivVault CI/CD](https://github.com/user-attachments/assets/c7aa7a8a-21ec-4533-97ea-6984c8519ee4)


---

# Deployment

## Frontend

PrivVault can be deployed through Vercel.

Build locally before deployment:

```bash
npm run build
```

Then import the GitHub repository into Vercel.

The frontend does not require production environment variables when using the current configuration.

---

## Smart Contract

Smart contracts are deployed through the PrivVault Admin Dashboard.

The deployment flow creates a contract on the **Midnight Preprod network**.

A funded Preprod wallet is required to perform blockchain deployment and transaction operations.

---

# Security Model

PrivVault is designed around minimizing sensitive information stored on-chain.

## The system does not intentionally store:

* Raw secret credentials
* Private witness values
* Private wallet keys
* Raw Merkle inclusion paths
* User passwords

## The contract may expose:

* Merkle root
* Spent nullifiers
* Gate status
* Administrator-controlled public state
* Normal blockchain transaction metadata

### Important distinction

PrivVault provides **privacy-preserving authorization**, not anonymous blockchain activity.

A wallet interacting with the Midnight network may still be observable through normal blockchain transaction metadata. The privacy mechanism specifically protects the relationship between the secret credential and the authorization proof rather than making all blockchain activity anonymous.

---

# Privacy Design

The central design principle is:

```text
Traditional Access

Credential
    ↓
Server
    ↓
Database
    ↓
Identity / Access Record


PrivVault

Credential
    ↓
Local ZK Proof
    ↓
Blockchain Verification
    ↓
Access Granted
```

The application therefore attempts to minimize the amount of sensitive information that needs to leave the user's local environment.

---

# Threat Considerations

PrivVault's privacy model depends on several components working correctly:

* Correct ZK circuit implementation
* Correct Merkle-tree construction
* Secure credential distribution
* Correct nullifier handling
* Secure wallet interaction
* Correct frontend/proof-server configuration
* Correct contract deployment and state management

PrivVault does **not** eliminate risks outside the ZK authorization mechanism. For example, if an administrator leaks a user's credential, the system cannot prevent that credential from being copied and used by another party.

---

# Roadmap

Potential future improvements include:

* Credential expiration
* Credential revocation
* Multiple credential issuers
* Role-based access policies
* Time-bound access
* More granular authorization policies
* Credential rotation
* Proof reuse protection improvements
* SDK/API for third-party integrations
* Embeddable access-gate components
* Additional Midnight-compatible wallet support
* Expanded end-to-end testing
* Production-ready deployment infrastructure

---

# Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git fork
```

### 2. Create a feature branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make your changes

```bash
git add .
```

### 4. Commit

```bash
git commit -m "Add amazing feature"
```

### 5. Push

```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request

Please include a clear description of:

* What changed
* Why the change was needed
* How it was tested
* Any security/privacy implications

---

# Acknowledgments

PrivVault is built using the Midnight ecosystem and its privacy-focused smart contract infrastructure.

Special thanks to:

* **Midnight Foundation / IOG** for the Midnight privacy-focused blockchain ecosystem
* **RiseIn** for the builder program and development opportunities
* **Lace Wallet** for Midnight wallet support
* **1AM Wallet** for Midnight wallet support

---

# License

This project is licensed under the **MIT License**.

---

## PrivVault in One Sentence

> **PrivVault lets authorized users prove they have permission to access a protected resource without publicly revealing the secret credential that grants that permission.**
