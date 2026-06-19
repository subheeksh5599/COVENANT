/**
 * COVENANT — Terminal 3 SDK (v3.9.0)
 *
 * The SDK's WASM session module uses ESM features incompatible with
 * Next.js 14 / Webpack 4. The SDK loads at runtime via eval() bypassing
 * Webpack's static analysis. Works in Node.js (CLI test confirmed).
 *
 * Browser support requires SDK pre-bundling. The Connect T3 button
 * attempts runtime import and surfaces errors gracefully.
 */

const PRIV = process.env.NEXT_PUBLIC_T3_API_KEY || ''

let _client: any = null
let _tenant: any = null
let _did = ''
let _error: string | null = null

async function loadSDK(): Promise<any> {
  // @ts-ignore — runtime-only import, Webpack cannot see this
  const mod = await (0, eval)('import("@terminal3/t3n-sdk")')
  mod.setEnvironment('testnet')
  return mod
}

export async function bootstrap(): Promise<{ did: string; tenant: any; client: any }> {
  if (_client && _tenant) return { did: _did, tenant: _tenant, client: _client }

  const sdk = await loadSDK()
  const address = sdk.eth_get_address(PRIV)
  const wasm = await sdk.loadWasmComponent()

  const client = new sdk.T3nClient({
    wasmComponent: wasm,
    handlers: { EthSign: sdk.metamask_sign(address, undefined, PRIV) },
  })

  await client.handshake()
  const auth = await client.authenticate(sdk.createEthAuthInput(address))
  const did = String(auth)

  const didHex = sdk.tenantDidHex(did)
  const baseUrl = sdk.getNodeUrl()
  const tenant = new sdk.TenantClient({ t3n: client, tenantDid: didHex, baseUrl })

  _client = client; _tenant = tenant; _did = did; _error = null
  return { did, tenant, client }
}

export function currentDid() { return _did }
export function getError() { return _error }
