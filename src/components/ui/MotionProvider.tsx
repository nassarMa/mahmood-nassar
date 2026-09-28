'use client'

import { LazyMotion, domAnimation } from 'motion/react'

/** Loads only the animation features the site uses, keeping `motion` small. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
