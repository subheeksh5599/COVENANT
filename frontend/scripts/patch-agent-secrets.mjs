/**
 * Generate webhook secrets for agents that have none, write to DB + .agents.json
 * Run: node frontend/scripts/patch-agent-secrets.mjs
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dir  = dirname(fileURLToPath(import.meta.url))
const env    = {}
readFileSync(resolve(__dir, '../.env.local'), 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_0-9]+)=(.+)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
})

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } })

const agentsJsonPath = resolve(__dir, '../../agents/kage-trading-agent/.agents.json')
const current = JSON.parse(readFileSync(agentsJsonPath, 'utf8'))

let patched = 0
for (const [key, cfg] of Object.entries(current)) {
  if (cfg.secret) continue          // already has a secret
  const newSecret = crypto.randomBytes(32).toString('hex')
  const { error } = await sb.from('Agent').update({ webhookSecret: newSecret }).eq('id', cfg.id)
  if (error) {
    console.error(`  ❌ ${key}: ${error.message}`)
    continue
  }
  current[key].secret = newSecret
  patched++
  console.log(`  ✅ ${key.padEnd(12)} patched secret=${newSecret.slice(0, 12)}...`)
}

writeFileSync(agentsJsonPath, JSON.stringify(current, null, 2))
console.log(`\n✅  Patched ${patched} agents in .agents.json`)
