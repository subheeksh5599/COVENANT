'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import AppLayout from '@/components/app-layout'
import { DEMO_AUDIT } from '@/agents/demo-data'

const A = '#ffffff'

export default function CompanyAuditPage() {
  const tabs = [
    { label: 'Data Room', href: '/company/upload' },
    { label: 'Access Grants', href: '/company/grants' },
    { label: 'Audit Trail', href: '/company/audit' },
  ]

  return (
    <AppLayout tabs={tabs}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
        <div className="flex items-center gap-3 mb-5"><div className="h-px w-8" style={{ background: A }} /><span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Immutable Audit Ledger</span></div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Audit Trail</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">Merkle-tree-backed cryptographically signed audit entries. Every action logged. Independently verifiable by any third party.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-3 mb-6 px-4 py-2.5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <span className="text-[10px] font-mono text-white/20">Merkle Root: 0xd4e5f67a8b9c...</span>
        <span className="px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase border border-white/[0.05] text-white/15">Verified</span>
      </motion.div>

      <div className="border border-white/[0.05] mb-10">
        <div className="grid grid-cols-[50px_1fr_auto] gap-3 px-5 py-3 text-[9px] tracking-[0.15em] uppercase text-white/15 border-b border-white/[0.04]">
          <div>#</div><div>Event</div><div>Proof</div>
        </div>
        {DEMO_AUDIT.map((entry, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.02 }}
            className="grid grid-cols-[50px_1fr_auto] gap-3 px-5 py-3 text-[11px] border-b border-white/[0.02] transition-colors hover:bg-white/[0.005]">
            <div className="font-mono text-white/12">{String(i).padStart(2, '0')}</div>
            <div>
              <div className="text-white/40">{entry.event}</div>
              <div className="text-[9px] text-white/12 mt-0.5">{entry.details}</div>
            </div>
            <div className="font-mono text-white/8">{entry.proof}...</div>
          </motion.div>
        ))}
        <div className="px-5 py-3 text-[10px] font-mono text-white/12">{DEMO_AUDIT.length} audit entries — All Merkle-proven</div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.005)' }}>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white/35 mb-1">This audit trail is independently verifiable</div>
          <div className="text-[10px] text-white/12">Share the Merkle root with any third party to cryptographically prove due diligence was completed without revealing what data was analyzed.</div>
        </div>
        <Link href="/verify">
          <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors">
            <ExternalLink className="w-3 h-3" />Verify Externally
          </button>
        </Link>
      </motion.div>
    </AppLayout>
  )
}
