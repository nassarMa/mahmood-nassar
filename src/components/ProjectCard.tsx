import Link from 'next/link'
import type { CSSProperties } from 'react'
import { KIND_LABEL, type Project } from '@/lib/content'
import { ArrowIcon } from './icons'
import { Phone } from './Phone'

const kindName = (p: Project) => KIND_LABEL[p.kind].replace(/s$/, '')

export function NewBadge() {
  return <span className="inline-flex items-center rounded-full bg-new/15 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-new ring-1 ring-new/30">New</span>
}

/**
 * One project, one card: a window onto the app (its screen in a phone frame,
 * lit in its brand colour), then what it is, and Open / About.
 */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <li className="card group rise flex flex-col" data-testid={`card-${project.slug}`} style={{ '--accent': project.accent, '--i': index } as CSSProperties}>
      {project.coverUrl || project.demoUrl ? (
        <div className="relative h-56 overflow-hidden border-b border-line sm:h-60" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_70%)]" />
          <Phone project={project} className="absolute top-8 left-1/2 w-[46%] max-w-[190px] -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-1" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.iconUrl} alt="" width={52} height={52} className="app-icon size-13 shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="flex items-center gap-2 text-[18px] leading-tight font-semibold">
              <span className="truncate" lang={project.lang} dir="auto">
                {project.title}
              </span>
              {project.isNew ? <NewBadge /> : null}
            </h3>
            <p className="mt-1 text-[13px] text-faint">
              {kindName(project)}
              {project.status !== 'live' ? ` · ${project.status}` : ''}
            </p>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.tagline}</p>
        {project.tags.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {project.tags.slice(0, 4).map((t) => (
              <li key={t} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[12px] text-faint ring-1 ring-line">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex items-center gap-2 pt-5">
          <a href={project.url} target="_blank" rel="noopener noreferrer" data-testid={`open-${project.slug}`} className="btn btn-primary flex-1">
            Open
            <ArrowIcon className="text-[15px]" />
          </a>
          <Link href={`/p/${project.slug}`} className="btn btn-ghost px-5">
            About
          </Link>
        </div>
      </div>
    </li>
  )
}
