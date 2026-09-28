'use client'

import { useRef, type PointerEvent } from 'react'

const MAX_DEG = 1

/**
 * Tilts its child a degree towards the cursor. Pointer-only; the CSS class
 * `tilt` (globals.css) turns the effect off for touch and reduced motion.
 */
export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${x * MAX_DEG * 2}deg`)
    el.style.setProperty('--rx', `${-y * MAX_DEG * 2}deg`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt ${className}`}>
      {children}
    </div>
  )
}
