import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { KIND_LABEL, type Project } from '@/lib/content'

/** The project's own page: preview, what it is, the story, and a big Open button. */
export function ProjectPage({ project }: { project: Project }) {
  return (
    <main id="main" className="mx-auto w-full max-w-md px-4 pb-10">
      <nav className="pt-[max(env(safe-area-inset-top),16px)]">
        <Link href="/" className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[15px] text-muted">
          <span aria-hidden>‹</span> All projects
        </Link>
      </nav>

      <article className="glass mt-3 overflow-hidden rounded-3xl">
        <Media project={project} />
        <div className="p-5">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.iconUrl} alt="" width={56} height={56} className="app-icon size-14 shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-[22px] font-bold leading-tight" lang={project.lang}>
                {project.title}
              </h1>
              <p className="mt-1 text-[14px] text-muted">
                {KIND_LABEL[project.kind].replace(/s$/, '')}
                {project.isNew ? ' · New' : ''}
                {project.status !== 'live' ? ` · ${project.status}` : ''}
              </p>
            </div>
          </div>

          <p className="mt-4 text-[16px] leading-snug">{project.tagline}</p>

          <div className="mt-4 flex gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="launch"
              className="flex-1 rounded-2xl bg-text py-3 text-center text-[16px] font-semibold text-bg active:scale-[0.98]"
            >
              Open
            </a>
            {project.links.reel && (
              <a href={project.links.reel} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl px-4 py-3 text-[15px] font-medium">
                Watch the Reel
              </a>
            )}
          </div>

          {project.story && (
            <div className="prose-story mt-5 text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.story}</ReactMarkdown>
            </div>
          )}

          {project.links.source && (
            <p className="mt-4 text-[13px] text-faint">
              <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Source code
              </a>
            </p>
          )}
        </div>
      </article>
    </main>
  )
}

function Media({ project }: { project: Project }) {
  if (project.demoUrl) {
    return (
      <video
        className="aspect-[4/5] w-full object-cover object-top"
        src={project.demoUrl}
        poster={project.coverUrl ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    )
  }
  if (project.coverUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.coverUrl} alt="" className="aspect-[4/5] w-full object-cover object-top" />
  }
  return null
}
