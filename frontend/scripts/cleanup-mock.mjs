/**
 * Purge all mock/seeded agents from the database.
 * Uses the Supabase REST API (HTTPS) — works even when port 5432 is blocked.
 *
 * Usage:
 *   node scripts/cleanup-mock.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

// Read .env.local manually
function readEnv() {
  const env = {}
  try {
    const raw = readFileSync(resolve(__dir, '../.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z_0-9]+)=(.+)$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {}
  return env
}

const env = readEnv()
const SUPABASE_URL     = env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE = env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE, {
  auth: { persistSession: false },
})

const MOCK_NAMES = ['Alpha-7', 'Nexus-3', 'Oracle-X', 'Flux-9', 'Sentinel-1', 'OpenClaw-Bot', 'GPT-Trader']

async function run() {
  console.log('\nFinding mock agents...')

  const { data: agents, error: agentErr } = await supabase
    .from('Agent')
    .select('id, name')
    .in('name', MOCK_NAMES)

  if (agentErr) { console.error('Error fetching agents:', agentErr); process.exit(1) }
  if (!agents || agents.length === 0) {
    console.log('✅  No mock agents found — database is already clean.')
    return
  }

  const ids = agents.map(a => a.id)
  console.log(`Found ${agents.length} mock agents: ${agents.map(a => a.name).join(', ')}`)
  console.log('Deleting all associated records...\n')

  const steps = [
    ['ExecutionEvent',        supabase.from('ExecutionEvent').delete().in('agentId', ids)],
    ['TrustSnapshot',         supabase.from('TrustSnapshot').delete().in('agentId', ids)],
    ['PredictionLog',         supabase.from('PredictionLog').delete().in('agentId', ids)],
    ['HeartbeatLog',          supabase.from('HeartbeatLog').delete().in('agentId', ids)],
    ['ConstitutionRule',      supabase.from('ConstitutionRule').delete().in('agentId', ids)],
    ['ConfigVersion',         supabase.from('ConfigVersion').delete().in('agentId', ids)],
    ['RateLimitBucket',       supabase.from('RateLimitBucket').delete().in('agentId', ids)],
    ['BehavioralFingerprint', supabase.from('BehavioralFingerprint').delete().in('agentId', ids)],
    ['AlertRule',             supabase.from('AlertRule').delete().in('agentId', ids)],
    ['PendingApproval',       supabase.from('PendingApproval').delete().in('agentId', ids)],
    ['SimulationResult',      supabase.from('SimulationResult').delete().in('agentId', ids)],
    ['BillingUsage',          supabase.from('BillingUsage').delete().in('agentId', ids)],
    ['Agent',                 supabase.from('Agent').delete().in('id', ids)],
  ]

  for (const [table, query] of steps) {
    if (!query) { console.log(`  skip  ${table} (no records)`) ; continue }
    const { error, count } = await query
    if (error) {
      console.warn(`  ⚠  ${table}: ${error.message}`)
    } else {
      console.log(`  ✓  ${table.padEnd(24)} ${count ?? '?'} row(s) deleted`)
    }
  }

  console.log(`\n✅  Done! Purged ${agents.length} mock agent(s) from the database.`)
  console.log('    Refresh your dashboard — it will now show only real agents.\n')
}

run().catch(e => { console.error(e); process.exit(1) })
