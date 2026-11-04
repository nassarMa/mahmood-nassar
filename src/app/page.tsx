import type { CSSProperties } from 'react'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { ProjectCard } from '@/components/ProjectCard'
import { PointerGlow } from '@/components/PointerGlow'
import { TopBar } from '@/components/TopBar'
import { loadHub } from '@/lib/content'

export default function Home() {
  const { creator, sections, projects } = loadHub()
  const fewProjects = projects.length <= 4 && sections.length > 1
  return (
    <>
      <TopBar creator={creator} />
      <main id="main">
        <Hero creator={creator} projects={projects} />
        {projects.length === 0 ? <p className="mt-10 text-center text-muted">Nothing here yet. Check back soon.</p> : null}
        <div id="projects" className="mx-auto mt-16 w-[min(100%-2rem,76rem)] scroll-mt-24 px-1 sm:mt-24">
          <p className="text-[13px] font-medium tracking-wide text-violet">Everything I&apos;ve shipped</p>
          <p className="mt-2 text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[52px]">
            All projects, <span className="text-aurora">ready to try.</span>
          </p>
        </div>
        {/* With only a few projects, wide screens put the sections side by side, each as wide as its cards. */}
        <div
          className={`mx-auto mt-10 w-[min(100%-2rem,76rem)] ${fewProjects ? 'lg:grid lg:gap-5 lg:[grid-template-columns:var(--cols)]' : ''}`}
          style={{ '--cols': sections.map((s) => `${s.projects.length}fr`).join(' ') } as CSSProperties}
        >
          {sections.map((section) => (
            <section key={section.kind} aria-labelledby={`h-${section.kind}`} className={fewProjects ? 'mt-14 first:mt-0 lg:mt-0' : 'mt-14 first:mt-0'}>
              <h2 id={`h-${section.kind}`} className="mb-5 px-1 text-[13px] font-semibold tracking-[0.16em] text-faint uppercase">
                {section.label}
              </h2>
              <ul
                className={`grid gap-5 sm:grid-cols-2 ${fewProjects ? 'lg:[grid-template-columns:var(--inner)]' : 'lg:grid-cols-3'}`}
                style={{ '--inner': `repeat(${section.projects.length}, minmax(0, 1fr))` } as CSSProperties}
              >
                {section.projects.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer creator={creator} />
      <PointerGlow />
    </>
  )
}
