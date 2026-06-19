'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Upload, Zap, ChevronRight } from 'lucide-react'
import AppLayout from '@/components/app-layout'

const A = '#ffffff'

export default function CompanyUploadPage() {
  const [uploaded, setUploaded] = useState<string[]>([])
  const [file, setFile] = useState<string | null>(null)

  const sealDocument = (name: string) => {
    setFile(name)
    setUploaded(prev => [...prev, name])
    setTimeout(() => setFile(null), 2000)
  }

  const tabs = [
    { label: 'Data Room', href: '/company/upload' },
    { label: 'Access Grants', href: '/company/grants' },
    { label: 'Audit Trail', href: '/company/audit' },
  ]

  const documents = [
    { name: 'P&L Statement', desc: 'Profit & Loss', size: '—' },
    { name: 'Cap Table', desc: 'Capitalization table', size: '—' },
    { name: 'IP Portfolio', desc: 'Patents, trademarks', size: '—' },
    { name: 'Contracts', desc: 'Customer agreements', size: '—' },
    { name: 'Vendor Agreements', desc: 'Supplier contracts', size: '—' },
    { name: 'Financial Projections', desc: '3-year forecast', size: '—' },
  ]

  return (
    <AppLayout tabs={tabs}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: A }} />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Seal Documents to Intel TDX</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Data Room</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">
          Upload sensitive corporate documents. Each file is sealed inside a TEE-secured KV map with cryptographic ACL. Data never touches an AI model context window.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          [String(documents.length), 'Documents'],
          [String(uploaded.length), 'Sealed'],
          ['—', 'Active Grants'],
          ['6', 'Contracts Live'],
        ].map(([v, l]) => (
          <div key={l} className="p-4 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <div className="text-2xl font-bold font-mono text-white/60">{v}</div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-white/20 mt-1">{l}</div>
          </div>
        ))}
      </motion.div>

      {file && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-4 border border-white/[0.06] flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 bg-white" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.3)' }} />
          <div className="flex-1">
            <div className="text-xs font-semibold text-white/50">Sealing to TEE</div>
            <div className="text-[10px] font-mono text-white/20 mt-0.5">{file} → Intel TDX Enclave → KV Map</div>
          </div>
          <div style={{ width: 'clamp(60px, 15vw, 120px)', height: 2, background: 'rgba(255,255,255,0.06)' }}>
            <motion.div className="h-full bg-white" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'easeOut' }} />
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {documents.map((doc, i) => {
          const sealed = uploaded.includes(doc.name)
          return (
            <motion.div key={doc.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              onClick={() => !sealed && sealDocument(doc.name)}
              className="group p-5 border transition-all duration-200 cursor-pointer select-none"
              style={{
                borderColor: sealed ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                background: sealed ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.5)',
              }}
              onMouseEnter={e => { if (!sealed) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' } }}
              onMouseLeave={e => { if (!sealed) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(0,0,0,0.5)' } }}>
              <div className="text-sm font-semibold mb-1" style={{ color: sealed ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.4)' }}>{doc.name}</div>
              <div className="text-[10px] text-white/12 mb-4">{doc.desc}</div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-white/10">{doc.size}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase border"
                  style={{ color: sealed ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)', borderColor: sealed ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)' }}>
                  {sealed ? 'Sealed' : <><Upload className="w-2.5 h-2.5" />Seal</>}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {uploaded.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-4 mb-12 p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white/50">{uploaded.length} document{uploaded.length > 1 ? 's' : ''} sealed in TEE</div>
            <div className="text-[10px] text-white/15 font-mono mt-1">KV Map • Intel TDX • ACL: invite-only</div>
          </div>
          <Link href="/company/grants">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors">
              <Zap className="w-3 h-3" />Grant Agent Access<ChevronRight className="w-3 h-3" />
            </motion.button>
          </Link>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }}>
        <div className="text-[10px] tracking-[0.2em] uppercase text-white/18 mb-3">TEE Contract Status</div>
        <div className="p-5 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.005)' }}>
          <div className="font-mono text-[11px] leading-relaxed space-y-0.5">
            {['access-control', 'financial-analysis', 'compliance', 'memo-generator', 'credential-issuer', 'payments'].map(c => (
              <div key={c}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span>
                <span className="ml-2">covenant:{c}</span>
                <span className="ml-2" style={{ color: '#666' }}>[REGISTERED]</span>
                <span className="ml-1" style={{ color: 'rgba(255,255,255,0.12)' }}>v1.0.0 enabled</span>
              </div>
            ))}
            <div className="pt-2 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.15)' }}>
              All 6 WASM contracts registered on T3 Testnet. Intel TDX TEE ready.
            </div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  )
}
