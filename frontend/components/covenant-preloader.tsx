'use client'

import { useEffect, useState } from 'react'
import Preloader from '@/components/preloader'

export default function SitePreloader() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <Preloader
      loading={loading}
      position="fixed"
      duration={2000}
      zIndex={9999}
      variant="stairs"
      bgColor="#000000"
      stairCount={12}
      stairsRevealFrom="left"
      stairsRevealDirection="up"
      loadingText="COVENANT"
      textClassName="!text-white !text-6xl sm:!text-[8rem] !font-bold !tracking-[0.3em]"
    />
  )
}
