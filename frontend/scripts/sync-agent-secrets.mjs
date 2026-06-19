/**
 * Fetch the real webhookSecrets from Supabase and write them to .agents.json
 * Run: node frontend/scripts/sync-agent-secrets.mjs
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir  = dirname(fileURLToPath(import.meta.url))
const env    = {}
readFileSync(resolve(__dir, '../.env.local'), 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_0-9]+)=(.+)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
})

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } })

const NAME_KEY_MAP = {
  'Hermes Trading Agent': 'trading',
  'Market Monitor Agent': 'monitor',
  'DeFi Yield Optimizer': 'yield',
  'KAGE Guardian':        'guardian',
  'Contract Auditor':     'auditor',
  'Incident Investigator':'forensics',
}

const { data, error } = await sb
  .from('Agent')
  .select('id, name, webhookSecret')
  .in('name', Object.keys(NAME_KEY_MAP))

if (error) { console.error(error); process.exit(1) }

const agentsJsonPath = resolve(__dir, '../../agents/kage-trading-agent/.agents.json')
const current = JSON.parse(readFileSync(agentsJsonPath, 'utf8'))

let updated = 0
for (const row of data) {
  const key = NAME_KEY_MAP[row.name]
  if (!key) continue
  current[key] = { ...current[key], id: row.id, secret: row.webhookSecret || '' }
  updated++
  console.log(`  ${row.name.padEnd(30)} secret=${row.webhookSecret ? row.webhookSecret.slice(0,12) + '...' : '(none)'}`)
}

writeFileSync(agentsJsonPath, JSON.stringify(current, null, 2))
console.log(`\n✅  Updated ${updated} agent secrets in .agents.json`)
