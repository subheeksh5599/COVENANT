/**
 * COVENANT — Terminal 3 SDK (v3.9.0)
 * Runtime-only import — Webpack cannot bundle this SDK.
 */

const PRIV = process.env.NEXT_PUBLIC_T3_API_KEY || ''
let _client: any = null
let _tenant: any = null
let _did = ''

async function loadSDK(): Promise<any> {
  // Runtime-only import — Webpack cannot analyze eval'd string
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

  _client = client; _tenant = tenant; _did = did
  return { did, tenant, client }
}

export function currentDid() { return _did }
export function currentTenant(): any { if (!_tenant) throw new Error('Not connected'); return _tenant }
export function currentClient(): any { if (!_client) throw new Error('Not connected'); return _client }

export async function getTenantInfo() { return currentTenant().tenant.me() }
export async function getBalance() { return currentClient().getUsage() }
