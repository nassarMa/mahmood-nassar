'use client'

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

/** Loads only the animation features the site uses and respects the OS reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
