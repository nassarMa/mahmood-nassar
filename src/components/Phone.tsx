import type { CSSProperties } from 'react'
import type { Project } from '@/lib/content'

/** The project's screenshot (or demo video) inside a phone frame, lit by its brand colour. */
export function Phone({ project, className = '', priority = false }: { project: Project; className?: string; priority?: boolean }) {
  if (!project.coverUrl && !project.demoUrl) return null
  return (
    <div className={`phone ${className}`} style={{ '--accent': project.accent } as CSSProperties}>
      {project.demoUrl ? (
        <video src={project.demoUrl} poster={project.coverUrl ?? undefined} autoPlay muted loop playsInline preload="metadata" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.coverUrl!} alt={`${project.title}: screenshot`} width={390} height={844} loading={priority ? 'eager' : 'lazy'} />
      )}
    </div>
  )
}
