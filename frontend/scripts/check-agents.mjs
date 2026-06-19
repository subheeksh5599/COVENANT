import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const env = {}
readFileSync(resolve(__dir, '../.env.local'), 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_0-9]+)=(.+)$/)
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
})

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } })
const { data, error } = await sb.from('Agent').select('id,name,agentType,status')
if (error) { console.error(error); process.exit(1) }
console.log(`Agents in DB: ${data.length}`)
data.forEach(a => console.log(`  ${a.name.padEnd(30)} | ${a.agentType.padEnd(12)} | ${a.status}`))
if (data.length === 0) console.log('  (empty — ready for real agents)')
