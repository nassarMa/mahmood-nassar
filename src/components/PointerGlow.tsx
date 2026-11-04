'use client'

import { useEffect } from 'react'

/** Lights each card under the pointer: sets --mx / --my on the card being hovered. */
export function PointerGlow() {
  useEffect(() => {
    if (!matchMedia('(hover: hover)').matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.card')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
