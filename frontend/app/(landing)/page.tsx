'use client'

import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { Lock, Search, ArrowDown } from 'lucide-react'

const CovenantNavigation = dynamic(() => import('@/components/covenant-navigation'), { ssr: false })
const LazySections = dynamic(() => import('./sections'), { ssr: false, loading: () => <div className="py-32 text-center text-white/10 font-mono text-xs tracking-[0.3em] uppercase">Loading...</div> })

const A = '#ffffff'; const DA = '#ff4444'

function LiveStatsBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {[['6', 'TEE Contracts', A], ['12', 'SDK Integrations', 'rgba(255,255,255,0.7)'], ['✓', 'CLI Verified', 'rgba(255,255,255,0.5)'], ['$0', 'Data Leaks', DA]].map(([v, l, c]) => (
        <div key={l}><div className="text-base font-bold font-mono" style={{ color: c }}>{v}</div><div className="text-[9px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</div></div>
      ))}
      <div className="text-[9px] tracking-[0.22em] uppercase" style={{ color: A }}>{'>'} LIVE</div>
    </div>
  )
}

function Press3DButton({ children, href, color, shadowColor, textColor = '#000000', border }:
  { children: React.ReactNode; href: string; color: string; shadowColor: string; textColor?: string; border?: string }) {
  const [pressed, setPressed] = useState(false)
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 26px',
      background: color, color: textColor, fontFamily: "'JetBrains Mono','Fira Code',monospace",
      fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
      borderRadius: 4, border: border ?? 'none', cursor: 'pointer',
      transform: pressed ? 'translateY(6px)' : 'translateY(0)',
      boxShadow: pressed ? 'none' : '0 6px 0 0 ' + shadowColor,
      transition: 'transform 80ms ease, box-shadow 80ms ease',
      textDecoration: 'none', userSelect: 'none' as const, WebkitUserSelect: 'none' as const,
    }} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)} onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}>
      {children}
    </Link>
  )
}

export default function LandingPage() {
  return (
    <div className="relative bg-black text-white overflow-x-hidden" style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
      <CovenantNavigation />
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 58%, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
          <motion.div className="absolute rounded-full" style={{ width: 800, height: 560, left: '-8%', top: '8%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.06) 0%,transparent 68%)', filter: 'blur(90px)' }}
            animate={{ x: [0, 60, -40, 0], y: [0, -40, 50, 0] }} transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full" style={{ width: 560, height: 680, right: '-4%', top: '12%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.04) 0%,transparent 68%)', filter: 'blur(110px)' }}
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -35, 0] }} transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
          <div className="absolute inset-0" style={{ opacity: 0.15, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '46px 46px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 10%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 10%, transparent 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 110% 95% at 50% 50%,transparent 18%,#000000 85%)' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden="true">
          <video src="/swarms_characters_video.mp4" autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full" style={{ objectFit: 'cover', opacity: 0.28 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.1) 30%,rgba(0,0,0,0.35) 70%,#000000 100%)' }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="relative z-10 flex items-center justify-center w-full shrink-0" style={{ marginTop: 'clamp(80px, 11vh, 130px)', height: 'clamp(70px, 9vw, 120px)', padding: '0 1.5rem' }}>
          <span className="select-none" style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", fontWeight: 800, fontSize: 'clamp(48px, 8vw, 118px)', lineHeight: 1, letterSpacing: '0.04em', background: 'linear-gradient(180deg, #ffffff 0%, #999999 50%, rgba(255,255,255,0.55) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COVENANT</span>
        </motion.div>
        <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <span style={{ color: A }}>Analyze.</span>{' '}<span style={{ color: 'rgba(255,255,255,0.72)' }}>Attest.</span>{' '}<span style={{ color: 'rgba(255,255,255,0.4)' }}>Trust.</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-base font-light leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '52ch' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.17 }}>
            A company can let investors run AI due diligence on confidential documents — without exposing those documents to the investor or the AI. All analysis runs inside hardware-secured enclaves. The agent orchestrates. The enclave protects. You get the results, not the exposure.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-4 mb-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}>
            <Press3DButton href="/company/upload" color={A} shadowColor="#888"><Lock size={14} strokeWidth={2.5} />Start Due Diligence</Press3DButton>
            <Press3DButton href="/investor/analysis" color="rgba(255,255,255,0.05)" shadowColor="rgba(0,0,0,0.45)" textColor="rgba(255,255,255,0.7)" border="1px solid rgba(255,255,255,0.1)"><Search size={14} strokeWidth={2} />View Analysis</Press3DButton>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.35 }}
            className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}><LiveStatsBar /></motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="relative z-10 flex items-center justify-between px-6 sm:px-10 lg:px-16 pb-8">
          <p className="text-xs sm:text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>Confidential multi-agent due diligence for the world most sensitive transactions. Built on Terminal 3 Agent Dev Kit.</p>
          <ArrowDown className="w-10 h-10 hidden sm:block" strokeWidth={1} style={{ color: 'rgba(255,255,255,0.2)' }} />
        </motion.div>
      </section>
      <LazySections />
    </div>
  )
}
