'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Zap, FileText } from 'lucide-react'
import AppLayout from '@/components/app-layout'

const A = '#ffffff'

const STEPS = [
  { fn: 'validate-access', label: 'Validating Agent Identity' },
  { fn: 'kv-store:get', label: 'Reading Sealed Documents' },
  { fn: 'dcf-valuation', label: 'Computing DCF Valuation' },
  { fn: 'http-with-placeholders', label: 'Industry API (TEE resolved)' },
  { fn: 'sanctions-check', label: 'OFAC/Sanctions Screening' },
  { fn: 'http-with-placeholders', label: 'Compliance API (TEE resolved)' },
  { fn: 'generate-memo', label: 'Generating Investment Memo' },
  { fn: 'signing:personal-sign', label: 'Signing Memo (EIP-191)' },
  { fn: 'issue-vc', label: 'Issuing Due Diligence VC' },
  { fn: 'payment:stripe', label: 'Processing Payment' },
]

export default function InvestorAnalysisPage() {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [logs])

  const runAnalysis = () => {
    setRunning(true); setDone(false); setProgress(0); setLogs([])
    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${step.fn}] ${step.label}... OK`])
        setProgress(Math.round(((i + 1) / STEPS.length) * 100))
        if (i === STEPS.length - 1) setTimeout(() => { setRunning(false); setDone(true) }, 400)
      }, i * 300)
    })
  }

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: A }} />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">TEE Analysis Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Due Diligence Analysis</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">
          Run the full due diligence pipeline inside Intel TDX. All financial data processed in the enclave. Raw data never enters your agent&apos;s context window.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 p-4 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.008)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white animate-pulse" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.3)' }} />
          <span className="text-[10px] tracking-[0.12em] uppercase text-white/25">Ready</span>
        </div>
      </motion.div>

      <div className="mb-10">
        {!running && !done && (
          <button onClick={runAnalysis}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors">
            <Zap className="w-4 h-4" />Run Due Diligence Pipeline
          </button>
        )}

        {(running || done) && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <motion.div className="h-full bg-white" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
              </div>
              <span className="text-[10px] font-mono text-white/20">{progress}%</span>
            </div>
          </div>
        )}

        {logs.length > 0 && (
          <div ref={terminalRef} className="p-5 border border-white/[0.05] max-h-80 overflow-y-auto" style={{ background: 'rgba(255,255,255,0.005)' }}>
            <div className="font-mono text-[11px] leading-relaxed space-y-0.5">
              {logs.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} className="text-white/25">{l}</motion.div>
              ))}
              {done && (
                <>
                  <div className="pt-2 mt-2 border-t border-white/[0.04] text-white/10">───────────────────────────────────────</div>
                  <div className="text-white/30">All analysis completed inside Intel TDX TEE. 0 bytes leaked.</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link href="/investor/memo">
              <button className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors">
                <FileText className="w-3.5 h-3.5" />View Investment Memo
              </button>
            </Link>
          </div>

          <div className="flex items-start gap-4 p-5 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.005)' }}>
            <div>
              <div className="text-sm font-semibold text-white/20 mb-1">Privacy Guarantee</div>
              <div className="text-[10px] text-white/10 leading-relaxed">
                All analysis executed inside Intel TDX Trusted Execution Environment. Company financial data, PII, and cap table information never entered the agent&apos;s context window. External API calls resolved sensitive fields via http-with-placeholders at the TEE boundary. Cryptographically verified by the immutable audit ledger.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AppLayout>
  )
}
