# COVENANT

> **A company can let investors run AI due diligence on confidential documents — without exposing those documents to the investor or the AI.**

---

## What It Does — In Plain English

A company has sensitive documents — financials, contracts, ownership details.

They want an investor to analyze them. But they don't trust the investor (or an AI model) to see everything.

Covenant lets the investor run AI analysis on those documents **without the investor or the AI ever seeing the raw data.**

The documents go into a secure hardware vault. The AI runs inside that vault. It comes out with a report — "this company is worth $42M, compliance is clean, recommendation: strong buy." But it never shows the cap table. Never shows the P&L. Never shows a single customer name.

The investor gets the answer. Not the exposure.

And a third party can cryptographically verify that the analysis actually happened, without seeing what was analyzed.

---

## What This Replaces

```
Traditional AI Analysis                         COVENANT
──────────────────────────                     ────────────────────────────────

  Company ──► Upload docs ──► AI Model           Company ──► TEE ──► Analysis ──► Report
                │                                              │
                ▼                                              ▼
          Model sees everything                    Agent orchestrates, never sees raw data
          Sensitive data in context window         Trust = cryptography
          Trust = legal agreements
```

When you share sensitive documents and ask AI to analyze them, the model sees everything. Names, numbers, contracts — all of it enters the context window. You trust the AI provider not to train on it, not to leak it, not to retain it. That trust breaks all the time.

Covenant runs the analysis inside hardware-secured enclaves. The agent orchestrates the workflow — calling analysis models, compliance checks, risk screens — but raw data never enters its context window. The agent receives results. Never the source documents.

---

## How It Works

**Seal** → Company places documents into a TEE-secured analysis environment.  
**Grant** → Scoped, time-bound analyst access granted via cryptographic signature.  
**Analyze** → Agent runs analysis inside the TEE. Sensitive fields resolved at the enclave boundary.  
**Attest** → Results issued as verifiable credentials. Third parties verify without seeing source data.

---

## Architecture

```
Company ──── did:t3n ────┐
                          │
                    ┌─────▼──────────────┐
                    │  INTEL TDX TEE     │
Investor ── did:t3n ──►  ┌────────────┐  │
                    │    │ 6 WASM     │  │──► Market data APIs
Auditor ─── did:t3n ──►  │ contracts  │  │    (PII resolved at call time)
                    │    └────────────┘  │
                    │  Sealed documents   │
                    │  Audit ledger       │
                    └────────────────────┘
```

---

## Terminal 3 SDK Integration

All 12 Agent Dev Kit features in production:

| Feature | Role in the workflow |
|---------|---------------------|
| `did:t3n` identity | Every company, investor, and auditor has verifiable W3C identity |
| SIWE auth | Wallet-based handshake and authentication |
| KV-store | Documents sealed with cryptographic ACL |
| `http-with-placeholders` | PII resolved at TEE boundary — raw data never touches WASM |
| WASM TEE contracts | 6 Rust contracts compiled to `wasm32-wasip2` |
| Cross-contract calls | Multi-step analysis pipeline |
| EIP-191 signing | Cryptographic sign-off on due diligence reports |
| Verifiable Credentials | On-chain "Due Diligence Verified" credential |
| Audit ledger | Merkle-backed, independently verifiable |
| `agent-auth-update` | Scoped, time-bound, revocable access grants |
| Stripe payments | Payment for premium analysis |
| Tenant management | Full identity lifecycle |

---

## Contracts

6 Rust WASM contracts running inside Intel TDX:

| Contract | Purpose |
|----------|---------|
| `access-control` | Grant, validate, revoke analyst access |
| `financial-analysis` | Valuation, ratio analysis, anomaly detection |
| `compliance` | Sanctions screening, accreditation |
| `memo-generator` | Cross-contract report + EIP-191 signing |
| `credential-issuer` | W3C Verifiable Credential issuance |
| `payments` | Stripe test-mode payment processing |

---

## Getting Started

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

### Environment

```bash
cp frontend/.env.example frontend/.env.local
# Set NEXT_PUBLIC_T3_API_KEY with your Terminal 3 API key
```

---

## Tech Stack

Next.js 14 · TypeScript · motion/react · Tailwind CSS · Terminal 3 SDK v3.9 · Intel TDX · Rust · wasm32-wasip2 · W3C DID · EIP-191
