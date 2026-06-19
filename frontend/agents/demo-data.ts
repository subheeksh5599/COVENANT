/**
 * COVENANT — Demo mode data.
 * Populates all pages with realistic data so the demo video
 * shows a complete workflow without requiring live T3 SDK.
 */

export type DemoGrant = {
  id: string
  grantee: string
  functions: string[]
  hosts: string[]
  active: boolean
  callCount: number
  maxCalls: number
}

export type DemoAuditEntry = {
  event: string
  details: string
  proof: string
}

export const DEMO_GRANTS: DemoGrant[] = [
  {
    id: 'grant-001',
    grantee: 'Bob Capital Partners',
    functions: ['dcf-valuation', 'ratio-analysis', 'sanctions-check', 'generate-memo'],
    hosts: ['api.marketdata.com', 'api.compliance.io'],
    active: true,
    callCount: 3,
    maxCalls: 100,
  },
  {
    id: 'grant-002',
    grantee: 'Alice Angel Fund',
    functions: ['dcf-valuation', 'ratio-analysis'],
    hosts: ['api.marketdata.com'],
    active: false,
    callCount: 12,
    maxCalls: 50,
  },
]

export const DEMO_AUDIT: DemoAuditEntry[] = [
  { event: 'validate-access', details: 'GRANT OK — 71:58:42 remaining', proof: '0xabc1' },
  { event: 'kv-store:get', details: 'covenant:financials / cap-table', proof: '0xdef2' },
  { event: 'kv-store:get', details: 'covenant:financials / pnl-statement', proof: '0x1233' },
  { event: 'contract-execute', details: 'dcf-valuation — OK (847ms)', proof: '0x4564' },
  { event: 'http-with-placeholders', details: 'api.marketdata.com — PII resolved in TEE', proof: '0x7895' },
  { event: 'contract-execute', details: 'sanctions-check — CLEAN (1203ms)', proof: '0xabc6' },
  { event: 'http-with-placeholders', details: 'api.compliance.io — PII resolved in TEE', proof: '0xdef7' },
  { event: 'contract-execute', details: 'generate-memo — OK (2104ms)', proof: '0x1238' },
  { event: 'signing:personal-sign', details: 'Memo signed — EIP-191', proof: '0x4569' },
  { event: 'payment:stripe', details: 'Charge $49.99 — Premium Report', proof: '0x789a' },
  { event: 'vc:issue', details: 'VC issued — DueDiligenceVerified', proof: '0xabcb' },
  { event: 'grant:revoke', details: 'Access expired — 72h window', proof: '0xdefc' },
]

export const DEMO_MEMO = {
  valuation: { dcf: '$42.3M', low: '$38.5M', high: '$46.1M' },
  financials: [
    ['DCF Valuation', '$42.3M'],
    ['Revenue Growth', '127% YoY'],
    ['Burn Rate', '$380K/mo'],
    ['Runway', '18 months'],
    ['EBITDA (2025)', '$6.8M'],
    ['Gross Margin', '68%'],
  ],
  recommendation: 'STRONG BUY',
  signature: '0xe1f3a5b7c9d2e4f6a8b0c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e',
  compliance: { passed: true, riskScore: 2, flags: [] as string[] },
  analysis: [
    { title: 'Valuation Analysis', text: 'DCF valuation computed inside Intel TDX TEE. Industry comparables retrieved via http-with-placeholders — company name resolved at TEE boundary. WACC: 12.5%. Terminal growth: 3%. Fair value range: $38.5M-$46.1M.' },
    { title: 'Compliance Screening', text: 'OFAC sanctions: CLEAN. Adverse media: NONE. PEP check: NEGATIVE. All entity names resolved via TEE placeholders — agent never saw raw PII. External compliance API called from within enclave.' },
    { title: 'Risk Assessment', text: 'Customer concentration: MODERATE (top 3 = 52%). Key man risk: MITIGATED (4 co-founders). Market risk: MODERATE ($45B TAM, competitive). Technology risk: LOW (3 patents, 8 pending).' },
  ],
}

export const DEMO_VERIFY = {
  subject: 'did:t3n:5ce002c43b2247c1238a114b0d21f3e196af3693',
  issuer: 'did:t3n:covenant',
  type: 'DueDiligenceVerified',
  proof: 'EIP-191',
  claims: [
    ['DueDiligenceCompleted', 'true'],
    ['AnalysisDigest', '0xd4e5f67a...'],
    ['Scope', 'Series A Data Room'],
    ['Compliance', 'CLEAN'],
    ['Valuation Range', '$38.5M-$46.1M'],
  ],
}
