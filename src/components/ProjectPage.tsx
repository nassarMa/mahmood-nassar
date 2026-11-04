import Link from 'next/link'
import type { CSSProperties } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { KIND_LABEL, loadCreator, type Project } from '@/lib/content'
import { Footer } from './Footer'
import { ArrowIcon, ChevronLeft } from './icons'
import { NewBadge } from './ProjectCard'
import { Phone } from './Phone'
import { TopBar } from './TopBar'

const month = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const LANG: Record<string, string> = { ar: 'Arabic', en: 'English', he: 'Hebrew' }

/** The project's own page: its screen, what it is, the story, and a big Open button. */
export function ProjectPage({ project }: { project: Project }) {
  const creator = loadCreator()
  const facts: [string, string][] = [
    ['Type', KIND_LABEL[project.kind].replace(/s$/, '')],
    ['Released', month(project.date)],
    ['Status', project.status === 'live' ? 'Live' : project.status === 'beta' ? 'Beta' : 'Archived'],
    ['Language', LANG[project.lang] ?? project.lang.toUpperCase()],
  ]
  return (
    <>
      <TopBar creator={creator} />
      <main id="main" className="mx-auto w-[min(100%-2rem,72rem)]" style={{ '--accent': project.accent } as CSSProperties}>
        <nav className="pt-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 rounded-full pe-3 text-[14.5px] text-muted transition hover:text-text">
            <ChevronLeft className="text-[16px] rtl:-scale-x-100" />
            All projects
          </Link>
        </nav>

        <article className="mt-4 grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
          <div className="relative md:sticky md:top-28">
            <div className="card flex justify-center px-6 pt-10 pb-0 sm:pt-14" style={{ '--accent': project.accent } as CSSProperties}>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_70%_at_50%_100%,color-mix(in_oklab,var(--accent)_40%,transparent),transparent_70%)]" aria-hidden />
              <Phone project={project} priority className="relative -mb-24 w-[64%] max-w-[300px]" />
            </div>
          </div>

          <div className="rise">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.iconUrl} alt="" width={72} height={72} className="app-icon size-[72px] shrink-0" />
              <div className="min-w-0">
                <h1 className="text-[32px] leading-[1.2] font-semibold tracking-tight sm:text-[44px]">
                  <span lang={project.lang} dir="auto">
                    {project.title}
                  </span>
                </h1>
                {project.isNew ? (
                  <p className="mt-1.5">
                    <NewBadge />
                  </p>
                ) : null}
              </div>
            </div>

            <p className="mt-6 text-[19px] leading-relaxed text-text/90 sm:text-[22px]">{project.tagline}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={project.url} target="_blank" rel="noopener noreferrer" data-testid="launch" className="btn btn-primary px-7 text-[16px]">
                Open {KIND_LABEL[project.kind].replace(/s$/, '').toLowerCase()}
                <ArrowIcon className="text-[16px]" />
              </a>
              {project.links.reel ? (
                <a href={project.links.reel} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-6">
                  Watch the Reel
                </a>
              ) : null}
              {project.links.source ? (
                <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="btn btn-ghost px-6">
                  Source code
                </a>
              ) : null}
            </div>

            <dl className="glass mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-bg/40 px-4 py-3.5">
                  <dt className="text-[12px] text-faint">{k}</dt>
                  <dd className="mt-0.5 text-[14.5px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            {project.tags.length ? (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                {project.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            {project.story ? (
              <div className="prose-story mt-10 border-t border-line pt-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.story}</ReactMarkdown>
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <Footer creator={creator} />
    </>
  )
}
