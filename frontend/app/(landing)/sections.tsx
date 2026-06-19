'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { LogoLoop, type LogoItem } from '@/components/logo-loop'
import {
  Shield, Eye, Lock, FileText, Brain, ExternalLink,
 Plus, Bot, Key, Search,
} from 'lucide-react'
import StaggeredText from '@/components/staggered-text'
import type { HowItWorksStep } from '@/components/how-it-works-6'

const HowItWorks6 = dynamic(() => import('@/components/how-it-works-6'), { ssr: false })
const Footer8 = dynamic(() => import('@/components/covenant-footer'), { ssr: false })

const A  = '#ffffff'; const DA = '#ff4444'; const WA = '#999999'; const IA = '#aaaaaa'

const FEATURES = [
  { Icon: Lock, label: 'TEE Data Rooms', color: A, desc: 'Sensitive documents sealed inside Intel TDX hardware enclaves. P&L statements, cap tables, and contracts never touch an AI model context.' },
  { Icon: Key, label: 'Verifiable Agent Identity', color: '#ccc', desc: 'Every agent gets a W3C did:t3n bound to cryptographic proof. Company, investor, auditor agents all authenticated before access.' },
  { Icon: Brain, label: 'Confidential Analysis', color: IA, desc: 'DCF valuation, ratio analysis, compliance screening all run inside the TEE as WASM contracts. Data processed, never exposed.' },
  { Icon: Shield, label: 'Cryptographic Audit Trail', color: WA, desc: 'Merkle-tree-backed immutable ledger. Every access, every analysis, every credential independently verifiable.' },
  { Icon: Eye, label: 'Zero-Knowledge Compliance', color: '#888', desc: 'OFAC/sanctions screening via http-with-placeholders. Entity names resolved in TEE. Agent never sees raw data.' },
  { Icon: FileText, label: 'On-Chain Credentials', color: DA, desc: 'Due Diligence Verified VCs anchored on-chain. Third parties verify completion without seeing underlying data.' },
]

const BUILD_STEPS = [
  { Icon: Lock, title: 'Seal Documents', color: A, desc: 'Connect wallet, get did:t3n identity. Place sensitive documents into a TEE-secured analysis environment.', tags: ['did:t3n', 'TEE', 'Confidential'] },
  { Icon: Key, title: 'Grant Agent Access', color: IA, desc: 'Sign agent-auth-update grants scoping investor agents. Cryptographic enforcement, not policy.', tags: ['Scoped', 'Time-Bound', 'Revocable'] },
  { Icon: Brain, title: 'Run Confidential Analysis', color: WA, desc: 'Agents execute WASM contracts inside Intel TDX. DCF, ratios, screening. Raw data stays in the enclave.', tags: ['WASM', 'http-placeholders', 'Cross-Contract'] },
  { Icon: Shield, title: 'Issue Verifiable Credentials', color: IA, desc: 'Diligence results as on-chain VCs. Third parties verify diligence without seeing data.', tags: ['On-Chain', 'Auditable', 'Selective Disclosure'] },
]

const AGENT_TEMPLATES = [
  { Icon: Brain, label: 'DCF Valuation Agent' }, { Icon: Search, label: 'Compliance Screener' },
  { Icon: Shield, label: 'Risk Auditor Agent' }, { Icon: FileText, label: 'Memo Generator' },
]

const HIW_STEPS: HowItWorksStep[] = [
  { title: 'Seal Documents', copy: 'Companies connect via wallet, get did:t3n identity, and place sensitive documents into a TEE-secured analysis environment. Intel TDX guarantees data never leaves the enclave.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80', icon: Lock },
  { title: 'Grant Scoped Access', copy: 'Sign agent-auth-update grants. Scope investor agents to specific contracts, functions, and time windows. Cryptographic enforcement.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80', icon: Key },
  { title: 'Analyze in TEE', copy: 'Investor agents execute WASM contracts inside Intel TDX. All computation inside the enclave. Raw data never enters model context.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80', icon: Brain },
  { title: 'Attest On-Chain', copy: 'Diligence results become on-chain Verifiable Credentials. Third parties verify completion without seeing data. 47 audit events per deal.', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80', icon: Shield },
]

const FAQS = [
  { q: 'How does Covenant prevent data leaks?', a: 'Instead of sending documents to an AI model, Covenant runs WASM contracts inside Intel TDX hardware enclaves. The contracts process data but raw PII and financials never enter WASM memory. Terminal 3 http-with-placeholders resolves sensitive fields at the enclave edge.' },
  { q: 'What T3 SDK features does Covenant use?', a: '12 features: did:t3n identity, SIWE auth, KV-store sealed documents, http-with-placeholders PII resolution, 6 WASM TEE contracts, cross-contract calls, EIP-191 signing, Verifiable Credential issuance, immutable audit ledger, Stripe payments, agent-auth-update grants, and tenant lifecycle management.' },
  { q: 'Can third parties verify diligence happened?', a: 'Yes. Every analysis run produces a Merkle-backed audit entry. Due diligence completion issues a W3C Verifiable Credential anchored on-chain via the T3 Issuer Registry. Anyone can cryptographically verify without seeing what data was analyzed.' },
  { q: 'What industries need this?', a: 'M&A deal rooms ($3.2T/year), VC/PE fundraising, vendor security assessments, bank KYC/AML, government procurement, insurance underwriting, legal discovery. Any use case where AI must analyze sensitive data without exposure.' },
  { q: 'How do I start building?', a: 'Claim test tokens at terminal3.io. Install @terminal3/t3n-sdk. Write Rust WASM contracts. Use http-with-placeholders for PII-safe API calls. Docs at docs.terminal3.io. Bounty runs until 22 June 2026.' },
]

const logoStyle = { fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono','Fira Code',monospace" } as const
const TECH_LOGOS: LogoItem[] = [
  { node: <span style={logoStyle}>TERMINAL 3</span> }, { node: <span style={logoStyle}>INTEL TDX</span> },
  { node: <span style={logoStyle}>GOOGLE CLOUD</span> }, { node: <span style={logoStyle}>W3C DID</span> },
  { node: <span style={logoStyle}>WASM</span> }, { node: <span style={logoStyle}>RUST</span> },
  { node: <span style={logoStyle}>NEXT.JS</span> }, { node: <span style={logoStyle}>TYPESCRIPT</span> },
  { node: <span style={logoStyle}>STRIPE</span> }, { node: <span style={logoStyle}>OPENAI</span> },
]

function Kvark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="3" width="26" height="26" fill="rgba(255,255,255,0.03)" stroke="#fff" strokeWidth="1" strokeOpacity="0.45"/>
      <line x1="10" y1="11" x2="22" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="10" y1="21" x2="17" y2="21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  )
}

export default function LandingSections() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  return (
    <>
      {/* LOGO LOOP */}
      <div className="relative py-10 overflow-hidden" style={{ borderBottom: '1px solid #111', background: '#000' }}>
        <p className="text-center text-[9px] tracking-[0.4em] uppercase mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>Powered by the confidential computing stack</p>
        <LogoLoop logos={TECH_LOGOS} speed={55} gap={60} pauseOnHover />
      </div>

      {/* BUILD FLOW */}
      <section className="relative py-28 px-6 sm:px-8 overflow-hidden" style={{ borderTop: '1px solid #111' }}>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
                <div className="flex items-center gap-3 mb-5"><div className="h-px w-8" style={{ background: A }} /><span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Due Diligence Protocol</span></div>
                <StaggeredText text="Seal. Grant. Analyze. Attest." as="h2" segmentBy="words" delay={60} duration={0.7} direction="bottom" blur
                  className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-white/90" />
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>Upload documents into TEE-secured KV maps. Grant scoped agent access. Run analysis inside the enclave. Issue verifiable credentials on-chain.</p>
              </motion.div>
              <div className="relative flex flex-col gap-0">
                <div className="absolute left-[19px] top-10 bottom-10 w-px" style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.3),rgba(255,255,255,0.1))' }} />
                {BUILD_STEPS.map((step, i) => (
                  <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }} className="group relative flex gap-5 pb-8 last:pb-0">
                    <div className="relative z-10 shrink-0 flex h-10 w-10 items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: step.color + '08', border: '1px solid ' + step.color + '20' }}>
                      <step.Icon style={{ color: step.color, width: 18, height: 18 }} />
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <h3 className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{step.title}</h3>
                        <span className="text-[9px] tracking-widest uppercase px-2 py-0.5" style={{ background: step.color + '06', color: step.color + '60', border: '1px solid ' + step.color + '10' }}>{i + 1}/{BUILD_STEPS.length}</span>
                      </div>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.28)' }}>{step.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.tags.map(tag => <span key={tag} className="text-[9px] tracking-wider px-2 py-0.5 uppercase" style={{ background: step.color + '04', color: step.color + '50', border: '1px solid ' + step.color + '08' }}>{tag}</span>)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-2 items-center">
                <Link href="/company/upload"><motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold" style={{ background: A, color: '#000' }}><Lock className="w-3 h-3"/>Start Due Diligence</motion.button></Link>
                {AGENT_TEMPLATES.map(t => (
                  <button key={t.label} type="button" className="flex items-center gap-1.5 px-3 py-2 text-xs transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.28)', border: '1px solid rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => { e.currentTarget.style.color='rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.28)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.background='rgba(255,255,255,0.02)' }}>
                    <t.Icon className="w-3 h-3"/>{t.label}</button>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 32, filter: 'blur(12px)' }} whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div className="relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)' }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 animate-pulse" style={{ background: A }}/><span className="text-[10px] font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.15)' }}>covenant.contract.runner</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2" style={{ background: DA }}/><span className="w-2 h-2" style={{ background: WA }}/><span className="w-2 h-2" style={{ background: A }}/></div>
                </div>
                <div className="p-5 font-mono text-[11px] leading-relaxed space-y-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> covenant:access-control/validate-access<span style={{ color:'#666',marginLeft:8 }}>[OK] 12ms</span></div>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> kv-store:get cap-table<span style={{ color:'#666',marginLeft:8 }}>[OK] 3ms</span></div>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> covenant:financial-analysis/dcf<span style={{ color:'#666',marginLeft:8 }}>[OK] 847ms</span></div>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> http-with-placeholders: marketdata<span style={{ color:'#666',marginLeft:8 }}>[OK] 520ms</span></div>
                  <div style={{ color: 'rgba(255,255,255,0.12)' }}>| PII resolved in TEE: company_name</div>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> covenant:compliance/sanctions<span style={{ color:'#666',marginLeft:8 }}>[CLEAN] 1203ms</span></div>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> covenant:memo-generator<span style={{ color:'#666',marginLeft:8 }}>[OK] 2104ms</span></div>
                  <div><span style={{ color: 'rgba(255,255,255,0.5)' }}>{'>'}</span> signing:personal-sign (EIP-191)<span style={{ color:'#666',marginLeft:8 }}>[SIGNED] 90ms</span></div>
                  <div style={{ color: 'rgba(255,255,255,0.12)', marginTop: 8 }}>──────────────────────────────────────────</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)' }}>TOTAL: 5,286ms | Audit: 47 entries | TEE: Intel TDX</div>
                  <div style={{ color: 'rgba(255,255,255,0.2)' }}>{'>'} 0 bytes leaked. All analysis inside enclave.</div>
                </div>
                <div className="px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-[10px] font-mono text-center" style={{ color: 'rgba(255,255,255,0.12)' }}>Sealed {'>'} Granted {'>'} Analyzed {'>'} Signed {'>'} Attested</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks6 steps={HIW_STEPS} color={A} label="How It Works" title="Seal. Analyze. Attest. On-chain."
        subtitle="From sealed documents to cryptographic analyst access, confidential WASM computation, and verifiable on-chain results." />

      {/* FEATURES */}
      <section className="relative py-28 px-6 sm:px-8 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
            <div className="flex items-center gap-3 mb-5"><div className="h-px w-8" style={{ background: A }}/><span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>12 SDK Integrations</span></div>
            <StaggeredText text="Every Terminal 3 SDK feature, in production." as="h2" segmentBy="words" delay={60} duration={0.7} direction="bottom" blur
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-white/90" />
            <p className="text-base max-w-md leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>Covenant integrates the full Terminal 3 Agent Dev Kit. 12 features in one complete solution.</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group flex flex-col gap-3 p-5 transition-colors duration-200"
                style={{ background: 'linear-gradient(145deg,rgba(4,4,4,0.96) 0%,rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center shrink-0" style={{ background: f.color + '08', border: '1px solid ' + f.color + '15' }}><f.Icon style={{ color: f.color, width: 18, height: 18 }}/></div>
                  <div className="shrink-0" style={{ width: 6, height: 6, background: f.color }}/>
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: 'rgba(255,255,255,0.85)' }}>{f.label}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.3)' }}>{f.desc}</div>
                </div>
                <div style={{ height: 2, background: 'linear-gradient(to right,' + f.color + '40,transparent)' }}/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-28 sm:px-8" style={{ borderTop: '1px solid #111' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <StaggeredText text="Answers to your questions" as="h2" segmentBy="words" delay={60} duration={0.65} direction="bottom" blur
                className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white/90" />
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-3">
                {FAQS.map((faq, i) => (
                  <motion.div key={i} layout className="transition-colors duration-200"
                    style={{ background: faqOpen === i ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)', border: '1px solid ' + (faqOpen === i ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)') }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>
                    <button type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left">
                      <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>{faq.q}</span>
                      <motion.div animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2, ease: 'easeOut' }} className="shrink-0"><Plus className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.3)' }}/></motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {faqOpen === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                          <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STRIP */}
      <div className="py-12 px-6 flex flex-wrap items-center justify-center gap-10" style={{ borderTop: '1px solid #111', background: '#000' }}>
        {['@terminal3/t3n-sdk','Intel TDX','WASM','Rust','Next.js 14','TypeScript','Stripe'].map(t => (
          <span key={t} className="text-[10px] tracking-[0.2em] uppercase cursor-default transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.12)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.12)')}>{t}</span>
        ))}
      </div>

      {/* CTA */}
      <section className="px-6 py-24 sm:px-8" style={{ borderTop: '1px solid #111' }}>
        <div className="relative mx-auto max-w-7xl overflow-hidden" style={{ background: 'rgba(4,4,4,0.92)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="relative z-10 px-8 py-14 sm:px-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-5"><Kvark size={20}/><span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>COVENANT . Terminal 3</span></div>
              <StaggeredText text="Your documents. Your analysis. All confidential." as="h2" segmentBy="words" delay={70} duration={0.65} direction="bottom" blur className="text-3xl font-bold tracking-tight sm:text-4xl mb-3 text-white/90" />
              <p className="text-base mt-4 mb-8" style={{ color: 'rgba(255,255,255,0.28)' }}>Built for the Terminal 3 Agent Dev Kit Bounty Challenge. 6 WASM contracts. 12 SDK integrations. Zero data leaks. Submit by 22 June 2026.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/company/upload"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 h-12 px-8 text-sm font-bold tracking-wide" style={{ background: A, color: '#000' }}><Lock className="w-4 h-4"/>Start Due Diligence</motion.button></Link>
                <a href="https://terminal3.io" target="_blank" rel="noopener noreferrer"><motion.button whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 h-12 px-8 text-sm font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}>
                  <ExternalLink className="w-4 h-4"/>Claim T3 Test Tokens</motion.button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer8 />
    </>
  )
}
