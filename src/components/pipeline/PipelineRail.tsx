'use client'

import type { StageInfo } from '@/content/stages'
import { StageMarker } from './StageMarker'
import { useActiveStage } from './useActiveStage'

/**
 * The pipeline's spine: a fixed vertical line with one marker per stage.
 * Rendered by the home page only (its anchors live there). Hidden — and
 * `inert`, so it takes no focus — while the hero is on screen. On small
 * screens only the hairline at the page edge remains.
 */
export function PipelineRail({ stages }: { stages: readonly StageInfo[] }) {
  const { activeId, pastHero } = useActiveStage()

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 z-30 w-px bg-line md:hidden" />
      <nav
        aria-label="Sections"
        data-active-stage={activeId ?? ''}
        inert={!pastHero}
        className={`fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-300 md:block ${
          pastHero ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="relative flex flex-col items-start">
          <span aria-hidden className="absolute bottom-3 left-[2.5px] top-3 w-px bg-line-strong" />
          {stages.map((s) => (
            <StageMarker key={s.id} id={s.id} label={s.label} active={s.id === activeId} />
          ))}
        </div>
      </nav>
    </>
  )
}
