# COVENANT

> **Let investors run AI due diligence on confidential company documents — without exposing those documents to the investor, the AI model, or any third party.**

---

## Why This Can't Be Done With ChatGPT and Dropbox

```
Traditional Due Diligence                    COVENANT
───────────────────────────                  ──────────────────────────

  Company ──► Share documents ──► Investor     Company ──► TEE ──► Analysis ──► Report
                │                                                    │
                ▼                                                    ▼
          Full PII exposure                                   Zero exposure
          Model sees everything                               Agent never sees raw data
          Trust = NDA                                         Trust = cryptography
```

With traditional tools, the AI model sees everything. Every cell in the cap table. Every line in the P&L. With Covenant, raw data enters a hardware-secured Intel TDX enclave — processed there, analyzed there, and sealed back. The agent only receives computed results: a valuation, a compliance score, a recommendation. Never the underlying data.

---

## How It Works

**Seal** → Company uploads documents into a TEE-secured data room.  
**Grant** → Scoped, time-bound access granted to investor agent via cryptographic signature.  
**Analyze** → Investor agent runs analysis contracts inside the TEE. PII resolved at the enclave boundary.  
**Attest** → Results issued as on-chain verifiable credentials. Third parties verify without seeing data.

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
                    │  KV-STORE (sealed)  │
                    │  AUDIT LEDGER       │
                    └────────────────────┘
```

---

## Terminal 3 SDK Integration

All 12 Agent Dev Kit features in production:

| Feature | Role |
|---------|------|
| `did:t3n` identity | Every company, investor, and auditor gets verifiable W3C identity |
| SIWE auth | Wallet-based handshake and authentication |
| KV-store | Documents sealed with cryptographic ACL |
| `http-with-placeholders` | PII resolved at TEE boundary — raw data never touches WASM |
| WASM TEE contracts | 6 Rust contracts compiled to `wasm32-wasip2` |
| Cross-contract calls | Multi-step due diligence pipeline |
| EIP-191 signing | Cryptographic sign-off on investment memos |
| Verifiable Credentials | On-chain "Due Diligence Verified" credential |
| Audit ledger | Merkle-backed, independently verifiable |
| `agent-auth-update` | Scoped, time-bound, revocable access grants |
| Stripe payments | Payment for premium analysis reports |
| Tenant management | Full identity lifecycle |

---

## Contracts

6 Rust WASM contracts running inside Intel TDX:

| Contract | Purpose |
|----------|---------|
| `access-control` | Grant, validate, revoke agent access |
| `financial-analysis` | DCF valuation, ratio analysis, anomaly detection |
| `compliance` | OFAC/sanctions screening, accreditation |
| `memo-generator` | Cross-contract memo + EIP-191 signing |
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
