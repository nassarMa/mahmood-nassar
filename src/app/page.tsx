import { ProjectCard } from '@/components/ProjectCard'
import { TopBar } from '@/components/TopBar'
import { loadHub } from '@/lib/content'

export default function Home() {
  const { creator, sections, projects } = loadHub()
  return (
    <main id="main" className="mx-auto w-full max-w-md px-4 pb-10">
      <TopBar creator={creator} />
      {projects.length === 0 && <p className="mt-10 text-center text-muted">Nothing here yet. Check back soon.</p>}
      {sections.map((section) => (
        <section key={section.kind} aria-labelledby={`h-${section.kind}`} className="mt-6">
          <h2 id={`h-${section.kind}`} className="mb-3 px-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-faint">
            {section.label}
          </h2>
          <ul className="flex flex-col gap-3">
            {section.projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-10 text-center text-[12px] text-faint">New things land here first. Come back soon.</p>
    </main>
  )
}
