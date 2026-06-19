'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'
import AppLayout from '@/components/app-layout'

const A = '#ffffff'

export default function InvestorMemoPage() {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: A }} />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">EIP-191 Signed Report</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Investment Memo</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">
          Due diligence results, cryptographically signed by the investor agent via EIP-191. Includes full financial analysis, compliance screening, and risk assessment.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="p-12 text-center border border-white/[0.04] mb-8" style={{ background: 'rgba(255,255,255,0.003)' }}>
        <div className="text-sm text-white/15 mb-2">No memo generated yet</div>
        <div className="text-[10px] text-white/8 max-w-md mx-auto">
          Run a due diligence analysis first. The signed investment memo will appear here with full financial metrics, compliance results, and an EIP-191 cryptographic signature.
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        className="p-5 border border-white/[0.06] mb-8" style={{ background: 'rgba(255,255,255,0.008)' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/25">Cryptographic Signature</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><div className="text-[9px] text-white/12 mb-1">Signer</div><div className="text-[10px] font-mono text-white/25">—</div></div>
          <div><div className="text-[9px] text-white/12 mb-1">Signature Type</div><div className="text-[10px] font-mono text-white/25">EIP-191 (personal_sign)</div></div>
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors">
          <Download className="w-3.5 h-3.5" />Export Memo
        </button>
        <Link href="/verify">
          <button className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.12em] uppercase text-white/20 border border-white/[0.08] hover:border-white/15 hover:text-white/40 transition-colors" style={{ background: 'transparent' }}>
            <ExternalLink className="w-3.5 h-3.5" />Verify On-Chain
          </button>
        </Link>
      </div>
    </AppLayout>
  )
}
