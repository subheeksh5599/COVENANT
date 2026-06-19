'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import T3ConnectButton from '@/components/t3-connect-button'

interface AppLayoutProps {
  children: React.ReactNode
  tabs?: { label: string; href: string }[]
}

function Mark() {
  return (
    <svg width={20} height={20} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="3" width="26" height="26" fill="rgba(255,255,255,0.03)" stroke="#fff" strokeWidth="1" strokeOpacity="0.4"/>
      <line x1="10" y1="11" x2="22" y2="11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
      <line x1="10" y1="21" x2="17" y2="21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
  )
}

export default function AppLayout({ children, tabs }: AppLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ background: 'rgba(0,0,0,0.75)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between px-6 py-3.5 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Mark />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-white/80 group-hover:text-white transition-colors">COVENANT</span>
            </Link>
          </div>
          <T3ConnectButton />
        </div>
        {tabs && tabs.length > 0 && (
          <div className="flex gap-0 px-6 max-w-7xl mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {tabs.map(tab => {
              const active = pathname === tab.href
              return (
                <Link key={tab.href} href={tab.href}
                  className="px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-all border-b"
                  style={{ color: active ? '#fff' : 'rgba(255,255,255,0.25)', borderColor: active ? '#fff' : 'transparent' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }}>
                  {tab.label}
                </Link>
              )
            })}
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-50"
        style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }} />
    </div>
  )
}
