import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Project } from '@/lib/content'
import { ArrowIcon, SparkIcon } from './icons'
import { NewBadge } from './ProjectCard'
import { Phone } from './Phone'

const month = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

/** The newest project, given the stage: its story on one side, its screen on the other. */
export function Spotlight({ project }: { project: Project }) {
  return (
    <section aria-labelledby="spotlight-title" className="mx-auto w-[min(100%-2rem,72rem)]">
      <div className="card rise grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.1fr_0.9fr] md:gap-4 md:p-14" style={{ '--accent': project.accent, '--i': 6 } as CSSProperties}>
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide" style={{ color: `color-mix(in oklab, ${project.accent} 75%, white)` }}>
            <SparkIcon className="text-[13px]" />
            Latest release · {month(project.date)}
          </p>
          <div className="mt-5 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.iconUrl} alt="" width={64} height={64} className="app-icon size-16 shrink-0" />
            <h2 id="spotlight-title" className="text-[30px] leading-[1.2] font-semibold tracking-tight sm:text-[40px]">
              <span lang={project.lang} dir="auto">
                {project.title}
              </span>
            </h2>
          </div>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted sm:text-[19px]">{project.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.isNew ? <NewBadge /> : null}
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={project.url} target="_blank" rel="noopener noreferrer" data-testid="spotlight-open" className="btn btn-primary px-6">
              Try it now
              <ArrowIcon className="text-[15px]" />
            </a>
            <Link href={`/p/${project.slug}`} className="btn btn-ghost px-6">
              How I built it
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center md:justify-end md:pe-6">
          <div className="absolute top-1/2 left-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_30%,transparent),transparent)] blur-2xl" aria-hidden />
          <Phone project={project} priority className="relative w-[62%] max-w-[270px] rotate-[-4deg] md:w-[270px]" />
        </div>
      </div>
    </section>
  )
}
