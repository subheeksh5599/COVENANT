'use client'

import { useCovenant } from '@/agents/covenant-provider'
import { motion } from 'motion/react'

export default function T3ConnectButton() {
  const { did, loading, error, connect } = useCovenant()

  if (error) {
    return (
      <span className="text-[9px] text-red-400/50 max-w-[240px] truncate" title={error}>
        {error}
      </span>
    )
  }

  if (did) {
    return (
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ boxShadow: '0 0 6px rgba(255,255,255,0.4)' }} />
        <span className="text-[9px] tracking-[0.15em] uppercase text-white/25 hidden sm:block">Connected</span>
      </div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={connect}
      disabled={loading}
      className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold tracking-[0.1em] uppercase bg-white text-black hover:bg-white/90 transition-colors disabled:opacity-40"
      style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
      {loading ? (
        <><span className="w-2.5 h-2.5 border-2 border-black border-t-transparent rounded-full animate-spin" />Connecting...</>
      ) : (
        'Connect T3'
      )}
    </motion.button>
  )
}
