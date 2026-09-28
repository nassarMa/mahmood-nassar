import type { Project } from '@/content/types'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { TiltCard } from '@/components/ui/TiltCard'

const STEPS: { key: keyof Project; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'thinking', label: 'Thinking' },
  { key: 'build', label: 'Build' },
  { key: 'tech', label: 'Technology' },
  { key: 'learning', label: 'Learning' },
]

/** A project told along the pipeline: five steps joined by a line, ending in an honest status. */
export function ProjectStory({ project, index }: { project: Project; index: number }) {
  return (
    <TiltCard>
      <article className="border hairline bg-surface p-6 md:p-8" aria-labelledby={`${project.slug}-title`}>
        <header className="flex flex-col gap-4 border-b hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">
              {String(index + 1).padStart(2, '0')} · {project.kicker}
            </p>
            <h3
              id={`${project.slug}-title`}
              className="mt-3 font-display text-[1.9rem] font-light leading-tight tracking-[-0.01em] md:text-[2.25rem]"
            >
              {project.title}
            </h3>
          </div>
          <StatusBadge status={project.status} />
        </header>

        <ol className="relative mt-8 space-y-7">
          <span aria-hidden className="absolute bottom-3 left-[3px] top-3 w-px bg-line-strong" />
          {STEPS.map(({ key, label }) => (
            <li key={key} className="relative grid grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[112px_1fr]">
              <span aria-hidden className="mt-2 h-[7px] w-[7px] rounded-full border border-muted bg-surface" />
              <span className="eyebrow col-start-2 pt-1 sm:col-start-auto sm:-ml-4">{label}</span>
              <div className="col-start-2 mt-1 sm:col-span-1 sm:col-start-2 sm:mt-0">
                {key === 'tech' ? <TechList items={project.tech} /> : <p className="text-[15.5px] leading-relaxed text-muted">{project[key] as string}</p>}
              </div>
            </li>
          ))}
        </ol>
      </article>
    </TiltCard>
  )
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border hairline px-3 py-1 font-mono text-[12px] tracking-[0.04em] text-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}
