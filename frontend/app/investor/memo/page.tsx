'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'
import AppLayout from '@/components/app-layout'
import { DEMO_MEMO } from '@/agents/demo-data'

const A = '#ffffff'

export default function InvestorMemoPage() {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <div className="flex items-center gap-3 mb-5"><div className="h-px w-8" style={{ background: A }} /><span className="text-[10px] tracking-[0.4em] uppercase text-white/30">EIP-191 Signed Report</span></div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Investment Memo</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">Due diligence results, cryptographically signed by the investor agent via EIP-191. Full financial analysis, compliance screening, and risk assessment.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-8 mb-10 text-center border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/18 mb-4">Recommendation</div>
        <div className="text-5xl sm:text-6xl font-bold mb-3 text-white/70">{DEMO_MEMO.recommendation}</div>
        <div className="text-sm text-white/18">DCF Valuation: {DEMO_MEMO.valuation.dcf} · Revenue Growth: 127% YoY · Compliance: CLEAN</div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {DEMO_MEMO.financials.map(([label, value]) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.008)' }}>
            <div className="text-[8px] tracking-[0.15em] uppercase text-white/15 mb-2">{label}</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white/50">{value}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 mb-10">
        {DEMO_MEMO.analysis.map((section, i) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
            className="p-5 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.005)' }}>
            <div className="flex items-center gap-2 mb-3"><span className="text-xs font-semibold text-white/35">{section.title}</span></div>
            <p className="text-[11px] leading-relaxed text-white/16">{section.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        className="p-5 border border-white/[0.06] mb-8" style={{ background: 'rgba(255,255,255,0.008)' }}>
        <div className="flex items-center gap-3 mb-4"><span className="text-[10px] tracking-[0.15em] uppercase text-white/25">Cryptographic Signature</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><div className="text-[9px] text-white/12 mb-1">Signer</div><div className="text-[10px] font-mono text-white/25">Investor Agent</div></div>
          <div><div className="text-[9px] text-white/12 mb-1">Signature Type</div><div className="text-[10px] font-mono text-white/25">EIP-191 (personal_sign)</div></div>
        </div>
        <div className="mt-3">
          <div className="text-[9px] text-white/10 mb-1">Signature</div>
          <div className="text-[9px] font-mono text-white/10 break-all">{DEMO_MEMO.signature}</div>
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors"><Download className="w-3.5 h-3.5" />Export Memo</button>
        <Link href="/verify"><button className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.12em] uppercase text-white/20 border border-white/[0.08] hover:border-white/15 hover:text-white/40 transition-colors" style={{ background: 'transparent' }}><ExternalLink className="w-3.5 h-3.5" />Verify On-Chain</button></Link>
      </div>
    </AppLayout>
  )
}
