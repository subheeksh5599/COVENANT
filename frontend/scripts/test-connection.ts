/**
 * COVENANT — T3 Connection Test (v3.9.0)
 * Run: npx tsx scripts/test-connection.ts
 */

import {
  T3nClient,
  TenantClient,
  loadWasmComponent,
  setEnvironment,
  createEthAuthInput,
  eth_get_address,
  metamask_sign,
  tenantDidHex,
  getNodeUrl,
} from '@terminal3/t3n-sdk'

setEnvironment('testnet')

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  COVENANT — T3 Connection Test')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const privateKey = '0x1bd2b813c03fbef21d806a1288073b97381f2f844206328cc32e198b492afef7'
  const address = eth_get_address(privateKey)
  console.log('[0] Address:', address)

  const wasm = await loadWasmComponent()
  console.log('[1] WASM loaded')

  const client = new T3nClient({
    wasmComponent: wasm,
    handlers: { EthSign: metamask_sign(address, undefined, privateKey) },
  })
  console.log('[2] Client created')

  await client.handshake()
  console.log('[3] Handshake OK')

  const auth = await client.authenticate(createEthAuthInput(address))
  const did = String(auth)
  console.log('[4] DID:', did)

  // tenantDidHex converts did:t3n:... to hex for the SDK
  const didHex = tenantDidHex(did)
  const baseUrl = getNodeUrl()
  const tenant = new TenantClient({ t3n: client, tenantDid: didHex, baseUrl })
  const claimResult = await tenant.tenant.claim()
  console.log('[5] Tenant claimed:', JSON.stringify(claimResult))

  const info: any = await tenant.tenant.me()
  console.log('[6] Tenant:', info.tenant, 'status:', info.status)

  const usage = await client.getUsage()
  console.log('[7] Balance:', usage.balance, 'tokens\n')

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  CONNECTED')
  console.log('  DID:', did)
  console.log('  Balance:', usage.balance)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main().catch(err => {
  console.error('\n✕ FAILED:', err.message || err)
  process.exit(1)
})
