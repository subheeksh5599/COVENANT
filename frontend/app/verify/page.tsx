'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Search, Copy, ExternalLink } from 'lucide-react'
import AppLayout from '@/components/app-layout'
import { DEMO_VERIFY } from '@/agents/demo-data'

const A = '#ffffff'

export default function VerifyPage() {
  const [did, setDid] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [copied, setCopied] = useState(false)

  const doVerify = () => { if (!did.trim()) return; setVerifying(true); setTimeout(() => { setVerifying(false); setVerified(true) }, 1500) }

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
        <div className="flex items-center gap-3 mb-5"><div className="h-px w-8" style={{ background: A }} /><span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Third-Party Verification</span></div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Verify Credential</h1>
        <p className="text-sm text-white/25 max-w-xl leading-relaxed">Verify that due diligence was completed without seeing the underlying financial data. Cryptographic proof only. Zero data leakage.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-10">
        <input type="text" value={did} onChange={e => { setDid(e.target.value); setVerified(false) }}
          className="cv-input flex-1 text-[12px] px-5 py-3" placeholder="Enter did:t3n to verify..." />
        <button onClick={doVerify} disabled={verifying || !did.trim()}
          className="flex items-center justify-center gap-2 px-6 py-3 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors disabled:opacity-30">
          {verifying ? <><span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />Verifying...</> : <><Search className="w-3.5 h-3.5" />Verify</>}
        </button>
      </motion.div>

      {verified && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="p-8 mb-8 text-center border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.008)' }}>
            <div className="text-2xl font-bold text-white/45 mb-2">VERIFIED</div>
            <div className="text-sm text-white/15">Due Diligence credential is valid and cryptographically signed</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.005)' }}>
              <div className="text-[9px] tracking-[0.15em] uppercase text-white/18 mb-4">Credential Info</div>
              {[['Subject', DEMO_VERIFY.subject], ['Issuer', DEMO_VERIFY.issuer], ['Type', DEMO_VERIFY.type], ['Proof', DEMO_VERIFY.proof], ['Issued', new Date().toISOString().split('T')[0]], ['Valid Until', new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-1.5 border-b border-white/[0.02]"><span className="text-[10px] text-white/12">{k}</span><span className="text-[10px] font-mono text-white/20 truncate max-w-[180px]">{v}</span></div>
              ))}
            </div>
            <div className="p-5 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.005)' }}>
              <div className="text-[9px] tracking-[0.15em] uppercase text-white/18 mb-4">Claims</div>
              {DEMO_VERIFY.claims.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-1.5 border-b border-white/[0.02]"><span className="text-[10px] text-white/12">{k}</span><span className="text-[10px] font-mono text-white/20">{v}</span></div>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-4 mb-8 p-5 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.003)' }}>
            <div><div className="text-sm font-semibold text-white/20 mb-1">What This Verification Proves</div><div className="text-[10px] text-white/10 leading-relaxed">This credential proves due diligence was completed to cryptographic standards. It does NOT expose underlying financial data, cap table, or any PII that was analyzed. All data processing occurred inside Intel TDX TEE with immutable audit trail.</div></div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => { navigator.clipboard.writeText(did); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-colors"><Copy className="w-3.5 h-3.5" />{copied ? 'Copied' : 'Copy Proof'}</button>
            <Link href="/company/audit"><button className="flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.12em] uppercase text-white/20 border border-white/[0.08] hover:border-white/15 hover:text-white/40 transition-colors" style={{ background: 'transparent' }}><ExternalLink className="w-3.5 h-3.5" />View Audit Trail</button></Link>
          </div>
        </motion.div>
      )}
    </AppLayout>
  )
}
