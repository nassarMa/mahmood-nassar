'use client'

import { useEffect, useState } from 'react'

/** Fraction of the viewport height a stage's top must pass to become active. */
const READ_LINE = 0.45
const HERO_END = 200

/**
 * Reports which `[data-stage]` section is being read — the last one whose top
 * has crossed the reading line — and whether the reader has left the hero.
 * Scroll-driven and rAF-throttled: short sections and hash loads both work.
 */
export function useActiveStage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'))
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * READ_LINE
      let current: string | null = null
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.dataset.stage!
        else break
      }
      // At the end of the document the last stage is the one being read, even
      // if the page is too short for its top to reach the line.
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atBottom && els.length) current = els[els.length - 1].dataset.stage!
      setActiveId(current)
      setPastHero(window.scrollY > HERO_END)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return { activeId, pastHero }
}
