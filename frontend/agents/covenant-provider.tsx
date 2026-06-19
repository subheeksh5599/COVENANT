'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { bootstrap } from '@/agents/covenant-sdk'

type State = {
  did: string
  loading: boolean
  error: string | null
  connect: () => Promise<void>
}

const Ctx = createContext<State>({
  did: '', loading: false, error: null, connect: async () => {},
})

export function useCovenant() { return useContext(Ctx) }

export function CovenantProvider({ children }: { children: React.ReactNode }) {
  const [did, setDid] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async () => {
    if (loading || did) return
    setLoading(true)
    setError(null)
    try {
      const result = await bootstrap()
      setDid(result.did)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Connection failed')
    } finally {
      setLoading(false)
    }
  }, [loading, did])

  return <Ctx.Provider value={{ did, loading, error, connect }}>{children}</Ctx.Provider>
}
