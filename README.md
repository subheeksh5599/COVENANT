# COVENANT

> **Confidential AI due diligence.** Let investors run AI-powered financial analysis on private company documents without exposing those documents to the investor, the AI model, or any third party.

---

## What This Replaces

```
Traditional AI Due Diligence                     COVENANT
──────────────────────────────────              ────────────────────────────────

  Company ──► Upload P&L ──► AI Model             Company ──► TEE ──► Analysis ──► Report
              Upload cap table                        │
              Upload contracts                         │
                │                                      ▼
                ▼                              Agent orchestrates, never sees raw data
          Model sees everything                Trust = cryptography
          PII in context window
          Trust = NDA
```

Every startup fundraising round, every M&A deal, every vendor security assessment requires sharing sensitive documents with counterparties. Today, that means PDFs over email and NDAs for trust. If you want AI to analyze those documents, the model sees everything — every cell of the cap table, every line of the P&L, every customer name in every contract.

Covenant runs the analysis inside hardware-secured enclaves. The AI agent orchestrates the workflow — calling valuation models, compliance APIs, risk screens — but raw data never enters its context window. The agent receives computed results: a valuation, a compliance score, a recommendation. Never the underlying documents.

---

## The Due Diligence Workflow

**Seal** → Company places documents into a TEE-secured analysis environment.  
**Grant** → Scoped, time-bound analyst access granted via cryptographic signature.  
**Analyze** → Agent runs valuation, compliance, and risk contracts inside the TEE. PII resolved at the enclave boundary.  
**Attest** → Results issued as on-chain verifiable credentials. Third parties verify without seeing source data.

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
| `financial-analysis` | DCF valuation, ratio analysis, anomaly detection |
| `compliance` | OFAC/sanctions screening, accreditation |
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
