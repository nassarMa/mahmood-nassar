'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useSpring } from 'motion/react'
import type { Stage } from '@/content/types'

/** The pipeline widening: a line drawn by scroll, stages beside it, questions where scope changed. */
export function JourneyLine({ stages }: { stages: Stage[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 })

  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-2 left-[3px] top-2 w-px bg-line" />
      <m.span
        aria-hidden
        className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-accent/70"
        style={{ scaleY: reduced ? 1 : scaleY }}
      />
      <ol ref={ref} className="space-y-10 md:space-y-12">
        {stages.map((s, i) => (
          <li key={s.title} data-journey-stage={s.title} className="relative grid grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[20px_64px_1fr]">
            <span aria-hidden className="mt-2 h-[7px] w-[7px] rounded-full border border-muted bg-bg" />
            <span className="eyebrow pt-1">{String(i + 1).padStart(2, '0')}</span>
            <div className="col-start-2 sm:col-start-3">
              {s.question ? (
                <p
                  data-journey-question
                  className="mb-2 font-display text-[1.6rem] font-light italic leading-tight text-text md:text-[1.9rem]"
                >
                  “{s.question}”
                </p>
              ) : null}
              <h3 className={`font-display font-light leading-tight ${s.question ? 'text-[1.1rem] text-muted' : 'text-[1.5rem]'}`}>
                {s.title}
              </h3>
              <p className="mt-2 max-w-[52ch] text-[15.5px] leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
