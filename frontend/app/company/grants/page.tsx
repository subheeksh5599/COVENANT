'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Zap, X } from 'lucide-react'
import AppLayout from '@/components/app-layout'
import { DEMO_GRANTS } from '@/agents/demo-data'

const A = '#ffffff'

export default function CompanyGrantsPage() {
  const [grants, setGrants] = useState(DEMO_GRANTS)
  const revoke = (id: string) => setGrants(prev => prev.map(g => g.id === id ? { ...g, active: false } : g))

  const tabs = [
    { label: 'Data Room', href: '/company/upload' },
    { label: 'Access Grants', href: '/company/grants' },
    { label: 'Audit Trail', href: '/company/audit' },
  ]

  return (
    <AppLayout tabs={tabs}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: A }} />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">agent-auth-update Grants</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Access Grants</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">
          Cryptographically signed scoped grants for investor agents. Time-bound, rate-limited, and revocable via EIP-191 signatures. Enforcement is cryptographic, not policy-based.
        </p>
      </motion.div>

      <div className="space-y-4 mb-10">
        {grants.map((grant, i) => (
          <motion.div key={grant.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            className="p-5 border" style={{ borderColor: grant.active ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)', background: 'rgba(255,255,255,0.005)' }}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 ${grant.active ? 'bg-white animate-pulse' : 'bg-white/15'}`}
                    style={grant.active ? { boxShadow: '0 0 6px rgba(255,255,255,0.3)' } : {}} />
                  <span className="text-sm font-semibold" style={{ color: grant.active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.25)' }}>{grant.grantee}</span>
                </div>
              </div>
              {grant.active && (
                <button onClick={() => revoke(grant.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-[9px] tracking-[0.12em] uppercase border self-start transition-colors"
                  style={{ color: '#ff4444', borderColor: 'rgba(255,68,68,0.15)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,68,68,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                  <X className="w-2.5 h-2.5" />Revoke
                </button>
              )}
              {!grant.active && (
                <span className="px-3 py-1.5 text-[9px] tracking-[0.12em] uppercase text-white/10 border border-white/[0.04]">Expired</span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div><div className="text-[8px] tracking-[0.15em] uppercase text-white/15 mb-1">Functions</div><div className="text-[10px] font-mono text-white/35">{grant.functions.length} permitted</div></div>
              <div><div className="text-[8px] tracking-[0.15em] uppercase text-white/15 mb-1">Hosts</div><div className="text-[10px] font-mono text-white/35">{grant.hosts.join(', ')}</div></div>
              <div><div className="text-[8px] tracking-[0.15em] uppercase text-white/15 mb-1">Calls Used</div><div className="text-[10px] font-mono text-white/35">{grant.callCount}/{grant.maxCalls}</div></div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {grant.functions.map(fn => (
                <span key={fn} className="px-2 py-0.5 text-[8px] tracking-[0.12em] uppercase border" style={{ color: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.05)' }}>{fn}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="flex items-center gap-4 p-5 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.005)' }}>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white/30 mb-1">Grant New Investor Access</div>
          <div className="text-[10px] text-white/12">Create a new agent-auth-update grant scoped to specific contracts, functions, and time windows.</div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors">
          <Zap className="w-3 h-3" />New Grant
        </button>
      </motion.div>
    </AppLayout>
  )
}
