'use client'

import { m, useReducedMotion } from 'motion/react'
import { reveal, viewport } from '@/lib/motion'

type Props = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <m.div
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
