# COVENANT

Confidential multi-agent due diligence on Terminal 3.

Covenant is a protocol for TEE-secured data rooms where AI agents with verifiable `did:t3n` identities analyze sensitive corporate documents without raw data ever leaving hardware enclaves.

## Architecture

```
                    ┌──────────────────────────────┐
                    │     INTEL TDX TEE ENCLAVE     │
                    │                              │
  Company ─────────►│  KV-STORE (sealed docs)       │
  (did:t3n)         │                              │
                    │  ┌────────┐ ┌──────────────┐ │
  Investor ────────►│  │  WASM  │ │ http-with-    │ │──► External APIs
  (did:t3n)         │  │contract│ │ placeholders  │ │    (OFAC, market data)
                    │  └────────┘ └──────────────┘ │
  Auditor ─────────►│                              │
  (did:t3n)         │  Immutable Audit Ledger       │
                    │  (Merkle-backed)              │
                    └──────────────────────────────┘
```

## How It Works

1. **Seal** — Company connects wallet, gets `did:t3n` identity, uploads sensitive documents into TEE-secured KV maps with cryptographic ACL.
2. **Grant** — Company signs `agent-auth-update` grants scoping investor agents to specific contracts, functions, and time windows.
3. **Analyze** — Investor agents execute WASM contracts inside Intel TDX. `http-with-placeholders` resolves PII at the TEE boundary — raw data never enters WASM memory or any model's context window.
4. **Attest** — Due diligence results become on-chain Verifiable Credentials. Merkle-backed audit trail provides independently verifiable proof.

## Terminal 3 SDK Integration

Covenant integrates all 12 Terminal 3 Agent Dev Kit features:

| Feature | Implementation |
|---------|---------------|
| `did:t3n` identity | Every agent (company, investor, auditor) has verifiable W3C identity |
| SIWE auth | Wallet-based handshake and authentication |
| KV-store | Documents sealed in z-namespace maps with cryptographic ACL |
| `http-with-placeholders` | PII resolved at TEE boundary, never enters WASM memory |
| WASM TEE contracts | 6 Rust contracts compiled to `wasm32-wasip2` |
| Cross-contract calls | Multi-step due diligence pipeline |
| EIP-191 signing | Cryptographic sign-off on investment memos |
| Verifiable Credentials | "Due Diligence Verified" VC anchored on-chain |
| Audit ledger | Merkle-backed immutable audit trail |
| Stripe payments | Test-mode payments for premium reports |
| `agent-auth-update` | Scoped, time-bound, revocable access grants |
| Tenant lifecycle | Full tenant management |

## Contracts

6 Rust WASM contracts in `contracts/`:

| Contract | Purpose |
|----------|---------|
| `access-control` | Grant, validate, and revoke agent access |
| `financial-analysis` | DCF valuation, ratio analysis, anomaly detection |
| `compliance` | OFAC/sanctions screening, accreditation verification |
| `memo-generator` | Cross-contract memo composition, EIP-191 signing |
| `credential-issuer` | W3C Verifiable Credential issuance |
| `payments` | Stripe test-mode payment processing |

## Getting Started

```bash
# Frontend
cd frontend
npm install
npm run dev          # http://localhost:3000

# Contracts
cd contracts
cargo build --target wasm32-wasip2
```

### Environment

```bash
cp frontend/.env.example frontend/.env.local
# Set NEXT_PUBLIC_T3_API_KEY with your Terminal 3 API key
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/company/upload` | Seal documents into TEE KV maps |
| `/company/grants` | Manage agent-auth-update grants |
| `/company/audit` | Immutable Merkle audit trail |
| `/investor/analysis` | Run TEE analysis pipeline |
| `/investor/memo` | Signed investment memo |
| `/verify` | Third-party credential verification |

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, motion/react, Tailwind CSS
- **TEE Runtime**: Terminal 3 SDK (@terminal3/t3n-sdk), Intel TDX
- **Contracts**: Rust, wasm32-wasip2, wit-bindgen
- **Identity**: W3C DID (did:t3n), SIWE, EIP-191

## Privacy Model

Covenant guarantees zero data leakage through its architecture:

- Documents are sealed in TEE KV stores — never transmitted to agents
- `http-with-placeholders` resolves sensitive fields at the enclave boundary
- WASM contracts have no filesystem, network, or OS access
- Agent identity is cryptographically verified before every action
- Every operation is logged to an immutable Merkle audit ledger
- Verifiable Credentials prove diligence completed without exposing underlying data
