# COVENANT — Confidential AI Due Diligence

## One-line pitch

A company can let investors run AI due diligence on confidential documents — without exposing those documents to the investor or the AI.

## What it does

A company has sensitive documents. They want an investor to analyze them. But they don't trust the investor or an AI model to see everything.

Covenant lets the investor run AI analysis on those documents without the investor or the AI ever seeing the raw data. The documents go into a secure hardware vault. The AI runs inside that vault and comes out with a report. The investor gets the answer. Not the exposure.

A third party can cryptographically verify the analysis happened — without seeing what was analyzed.

## Why it matters

Today, due diligence means sharing PDFs over email and trusting NDAs. If you ask AI to help, the model sees everything — every cell of the cap table, every customer name, every contract clause. Covenant changes the trust model from legal promises to cryptographic enforcement. The agent orchestrates the workflow, but the enclave protects the data.

## How it uses Terminal 3

All 12 features of the Terminal 3 Agent Dev Kit integrated: `did:t3n` identity for every participant, SIWE authentication, KV-store for sealed documents, `http-with-placeholders` for PII resolution at the TEE boundary, 6 WASM contracts running inside Intel TDX, cross-contract pipelines, EIP-191 signing, Verifiable Credentials, immutable Merkle audit ledger, Stripe payments, `agent-auth-update` grants, and full tenant lifecycle management.

## SDK Verification

The SDK was tested and confirmed working via Node.js CLI:

```
✓ WASM crypto loaded
✓ TEE handshake — Intel TDX session
✓ Authenticate — DID returned
✓ getUsage — balance confirmed
```

SDK version: `@terminal3/t3n-sdk@3.9.0`

During integration, 3 SDK issues were identified, documented with reproduction steps and suggested fixes. Full bug report: https://github.com/subheeksh5599/COVENANT/blob/main/BUG_REPORT.md

## Links

- **Live demo:** https://covenant-theta-six.vercel.app
- **GitHub:** https://github.com/subheeksh5599/COVENANT
- **Bug report:** https://github.com/subheeksh5599/COVENANT/blob/main/BUG_REPORT.md

## Tech stack

Next.js 14 · TypeScript · motion/react · Tailwind CSS · Terminal 3 SDK v3.9 · Intel TDX · Rust · wasm32-wasip2 · W3C DID · EIP-191
