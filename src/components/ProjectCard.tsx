import Link from 'next/link'
import type { Project } from '@/lib/content'

/**
 * One project, one card. The whole card is a link that opens the app; the
 * small "About" link goes to the project's own page (story, preview image).
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="glass rounded-3xl p-4" data-testid={`card-${project.slug}`}>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.iconUrl} alt="" width={64} height={64} className="app-icon size-16 shrink-0" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[17px] font-semibold leading-tight" lang={project.lang}>
            {project.title}
            {project.isNew && (
              <span className="ms-2 align-middle rounded-full bg-new/20 px-2 py-0.5 text-[11px] font-semibold text-new">New</span>
            )}
          </h2>
          <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-muted">{project.tagline}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`open-${project.slug}`}
          className="flex-1 rounded-2xl bg-text py-3 text-center text-[16px] font-semibold text-bg active:scale-[0.98]"
        >
          Open
        </a>
        <Link href={`/p/${project.slug}`} className="rounded-2xl px-4 py-3 text-[15px] font-medium text-muted underline-offset-4 hover:underline">
          About
        </Link>
      </div>
    </li>
  )
}
