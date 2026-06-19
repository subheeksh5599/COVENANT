'use client'

import React, { createContext, useContext } from 'react'

const Ctx = createContext({ did: 'did:t3n:5ce002c43b2247c1238a114b0d21f3e196af3693', loading: false, error: null as string | null })

export function useCovenant() { return useContext(Ctx) }

export function CovenantProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ did: 'did:t3n:5ce002c43b2247c1238a114b0d21f3e196af3693', loading: false, error: null }}>{children}</Ctx.Provider>
}
