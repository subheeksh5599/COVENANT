#!/bin/bash
set -euo pipefail

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  COVENANT — Build All WASM Contracts"
echo "  Target: wasm32-wasip2 for Terminal 3 TEE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

CONTRACTS=(
  "access-control"
  "financial-analysis"
  "compliance"
  "memo-generator"
  "credential-issuer"
  "payments"
)

cd "$(dirname "$0")/../contracts"

for contract in "${CONTRACTS[@]}"; do
  echo "  Building covenant:${contract}..."
  (
    cd "$contract"
    cargo build --target wasm32-wasip2 --release 2>&1 | tail -1
  )
  echo "  [OK] covenant:${contract} built"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  All 6 contracts built successfully."
echo "  Ready for T3 contract registration."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
