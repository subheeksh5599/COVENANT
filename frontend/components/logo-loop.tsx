'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export interface LogoItem {
  node: ReactNode
  href?: string
  title?: string
}

interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: 'left' | 'right'
  gap?: number
  pauseOnHover?: boolean
  className?: string
}

const SMOOTH_TAU = 0.25
const MIN_COPIES = 2
const COPY_HEADROOM = 2

export function LogoLoop({ logos, speed = 80, direction = 'left', gap = 48, pauseOnHover = true, className }: LogoLoopProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLUListElement>(null)
  const isHoveredRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  const seqWidthRef = useRef(0)
  const [copyCount, setCopyCount] = useState(MIN_COPIES)

  const targetVelocity = useMemo(
    () => Math.abs(speed) * (direction === 'left' ? 1 : -1),
    [speed, direction]
  )

  const updateDimensions = useCallback(() => {
    const cw = containerRef.current?.clientWidth ?? 0
    const sw = seqRef.current?.getBoundingClientRect().width ?? 0
    if (sw > 0) {
      seqWidthRef.current = Math.ceil(sw)
      const need = Math.ceil(cw / sw) + COPY_HEADROOM
      setCopyCount(prev => { const n = Math.max(MIN_COPIES, need); return prev === n ? prev : n })
    }
  }, [])

  useEffect(() => {
    const c = containerRef.current, s = seqRef.current
    if (!c || !s) return
    const obs = new ResizeObserver(updateDimensions)
    obs.observe(c); obs.observe(s)
    return () => obs.disconnect()
  }, [updateDimensions, logos])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.transform = 'translate3d(0,0,0)'
      return
    }
    const animate = (ts: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = ts
      const dt = Math.max(0, ts - lastTimestampRef.current) / 1000
      lastTimestampRef.current = ts
      const target = isHoveredRef.current && pauseOnHover ? 0 : targetVelocity
      velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-dt / SMOOTH_TAU))
      const sw = seqWidthRef.current
      if (sw > 0) {
        const next = ((offsetRef.current + velocityRef.current * dt) % sw + sw) % sw
        offsetRef.current = next
        track.style.transform = `translate3d(${-next}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      lastTimestampRef.current = null
    }
  }, [targetVelocity, pauseOnHover])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-x-hidden w-full ${className ?? ''}`}
      style={{
        maskImage: 'linear-gradient(to right,transparent,black 14%,black 86%,transparent)',
        WebkitMaskImage: 'linear-gradient(to right,transparent,black 14%,black 86%,transparent)',
      }}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform select-none w-max"
        onMouseEnter={() => { isHoveredRef.current = true }}
        onMouseLeave={() => { isHoveredRef.current = false }}
      >
        {Array.from({ length: copyCount }, (_, ci) => (
          <ul key={ci} ref={ci === 0 ? seqRef : undefined} className="flex items-center" aria-hidden={ci > 0}
            style={{ gap: `${gap}px` }}>
            {logos.map((item, ii) => (
              <li key={`${ci}-${ii}`} className="flex-none leading-none">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center" title={item.title}>
                    {item.node}
                  </a>
                ) : (
                  <span className="inline-flex items-center">{item.node}</span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
