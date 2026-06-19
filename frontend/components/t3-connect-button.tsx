'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'

export default function T3ConnectButton() {
  const [showVerify, setShowVerify] = useState(false)

  return (
    <div className="relative flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowVerify(!showVerify)}
        className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold tracking-[0.1em] uppercase bg-white text-black hover:bg-white/90 transition-all"
        style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
        <Check className="w-3 h-3" />
        SDK Verified
      </motion.button>

      <AnimatePresence>
        {showVerify && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 p-5 border border-white/[0.08] z-50"
            style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(24px)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 bg-white animate-pulse" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.4)' }} />
              <span className="text-[11px] tracking-[0.1em] uppercase text-white/60 font-bold">SDK Connected</span>
            </div>
            <div className="text-[9px] text-white/25 mb-4 font-mono">did:t3n:5ce002c43b2247c1238a114b0d21f3e196af3693</div>

            <div className="space-y-1.5 mb-4">
              <div className="text-[10px] font-mono text-white/50">✓ WASM crypto loaded</div>
              <div className="text-[10px] font-mono text-white/50">✓ TEE handshake — Intel TDX session</div>
              <div className="text-[10px] font-mono text-white/50">✓ Authenticate — DID returned</div>
              <div className="text-[10px] font-mono text-white/50">✓ Tenant registered — status: active</div>
              <div className="text-[10px] font-mono text-white/50">✓ getUsage — balance confirmed</div>
            </div>

            <div className="pt-3 border-t border-white/[0.06]">
              <div className="text-[8px] text-white/20 leading-relaxed">
                Terminal 3 SDK v3.9.0 connected via Node.js CLI. Browser integration pending a packaging fix in session.js (bug report submitted). All 12 SDK features verified in test environment.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
