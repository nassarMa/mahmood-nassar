import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Project } from '@/lib/content'
import { Phone } from './Phone'

/**
 * The hero's visual: the newest apps' screens as floating phones, fanned
 * out, each lit in its own brand colour. The front one is the latest release.
 */
export function PhoneFan({ projects }: { projects: Project[] }) {
  const shown = projects.filter((p) => p.coverUrl || p.demoUrl).slice(0, 3)
  if (shown.length === 0) return null
  const [front, ...back] = shown
  const slots = [
    { cls: 'start-[2%] top-[9%] -rotate-[9deg]', delay: '0.6s' },
    { cls: 'end-[2%] top-[9%] rotate-[9deg]', delay: '1.2s' },
  ]
  return (
    <div className="relative mx-auto aspect-[1/0.95] w-full max-w-[560px]" aria-hidden>
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(139,124,255,0.35),transparent)] blur-2xl" />
      {back.map((p, i) => (
        <div key={p.slug} className={`absolute w-[36%] opacity-80 ${slots[i].cls}`}>
          <div className="float" style={{ animationDelay: slots[i].delay } as CSSProperties}>
            <Phone project={p} />
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-1/2 w-[42%] -translate-x-1/2">
        <div className="float">
          <Phone project={front} priority />
        </div>
      </div>
      <Link
        href={`/p/${front.slug}`}
        tabIndex={-1}
        className="absolute bottom-[4%] left-1/2 z-10 flex -translate-x-1/2 border border-line-strong bg-bg/75 backdrop-blur-xl items-center gap-2.5 rounded-full py-1.5 ps-1.5 pe-4 whitespace-nowrap shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
        style={{ '--accent': front.accent } as CSSProperties}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={front.iconUrl} alt="" width={30} height={30} className="app-icon size-[30px]" />
        <span className="text-[12px] text-faint">Latest</span>
        <span className="text-[13.5px] font-semibold" lang={front.lang} dir="auto">
          {front.title}
        </span>
      </Link>
    </div>
  )
}
