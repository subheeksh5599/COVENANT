'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import AppLayout from '@/components/app-layout'

const A = '#ffffff'

export default function CompanyAuditPage() {
  const tabs = [
    { label: 'Data Room', href: '/company/upload' },
    { label: 'Access Grants', href: '/company/grants' },
    { label: 'Audit Trail', href: '/company/audit' },
  ]

  return (
    <AppLayout tabs={tabs}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: A }} />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Immutable Audit Ledger</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Audit Trail</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">
          Merkle-tree-backed cryptographically signed audit entries. Every action logged. Independently verifiable by any third party.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="p-12 text-center border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.003)' }}>
        <div className="text-sm text-white/15 mb-2">No audit entries yet</div>
        <div className="text-[10px] text-white/8 max-w-md mx-auto">
          Run a due diligence analysis to populate the immutable audit ledger. Every contract execution, KV access, and credential issuance is cryptographically logged.
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border border-white/[0.05] mt-10" style={{ background: 'rgba(255,255,255,0.005)' }}>
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
