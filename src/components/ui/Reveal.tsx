'use client'

import { m } from 'motion/react'
import { reveal, viewport } from '@/lib/motion'

type Props = {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Fade-and-rise once on entering the viewport. The rendered tree never
 * depends on the reduced-motion setting (that would break hydration); a CSS
 * rule on `[data-reveal]` forces the final state when motion is reduced.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  return (
    <m.div
      data-reveal
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </m.div>
  )
}
