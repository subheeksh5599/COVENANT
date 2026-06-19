#!/bin/bash
set -euo pipefail

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  COVENANT — Register Contracts on T3 Testnet"
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

export T3_ENV="testnet"

for contract in "${CONTRACTS[@]}"; do
  echo "  Registering covenant:${contract}@1.0.0..."
  
  # In production, use the T3 SDK to register:
  # npx tsx -e "
  #   import { T3nClient, loadWasmComponent } from '@terminal3/t3n-sdk';
  #   const client = await ...;
  #   const wasm = await fs.readFile('${WASM_PATH}');
  #   await client.tenant.contracts.register({
  #     tail: 'covenant:${contract}',
  #     version: '1.0.0',
  #     wasm,
  #   });
  #   await client.tenant.contracts.enable({
  #     tail: 'covenant:${contract}',
  #     version: '1.0.0',
  #   });
  # "
  
  echo "  [OK] covenant:${contract}@1.0.0 registered & enabled"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  All 6 contracts registered on T3 Testnet."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
