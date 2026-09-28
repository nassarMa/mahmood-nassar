'use client'

import { useEffect, useState } from 'react'

/**
 * Reports which `[data-stage]` section is in the reading band (roughly the
 * middle of the viewport) and whether the reader has scrolled past the hero.
 */
export function useActiveStage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'))
    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.stage!
          if (e.isIntersecting) visible.set(id, e.boundingClientRect.top)
          else visible.delete(id)
        }
        if (visible.size === 0) return
        // The intersecting stage closest to the top of the band wins.
        const [next] = [...visible.entries()].sort((a, b) => a[1] - b[1])
        setActiveId(next[0])
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))

    const onScroll = () => setPastHero(window.scrollY > 200)
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { activeId, pastHero }
}
