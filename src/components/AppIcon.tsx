import Link from 'next/link'
import type { Project } from '@/lib/content'

export function AppIcon({ project, size = 'md' }: { project: Project; size?: 'md' | 'sm' | 'dock' }) {
  const px = size === 'md' ? 64 : size === 'dock' ? 56 : 26
  const label = size !== 'dock'
  return (
    <Link
      href={`/p/${project.slug}`}
      scroll={false}
      aria-label={`${project.title} — ${project.tagline}`}
      data-testid={`icon-${project.slug}`}
      className="flex w-full flex-col items-center gap-1.5"
    >
      <span className="app-icon block" style={{ width: px, height: px }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.iconUrl} alt="" width={px} height={px} className="block size-full object-cover" />
        {project.isNew && size !== 'sm' && (
          <span className="absolute right-1 top-1 size-2.5 rounded-full bg-new ring-2 ring-bg" aria-hidden />
        )}
      </span>
      {label && size === 'md' && (
        <span className="line-clamp-1 w-full text-center text-[11.5px] font-medium leading-tight text-text/90" lang={project.lang}>
          {project.title}
          {project.isNew && <span className="sr-only"> (new)</span>}
        </span>
      )}
    </Link>
  )
}
