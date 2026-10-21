'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Project } from '@/lib/content'

const kindLabel: Record<Project['kind'], string> = { app: 'App', game: 'Game', tool: 'Tool', experiment: 'Experiment' }

/**
 * The project card. As a modal (opened from the grid) it slides up over the
 * home screen and closes with back; as a page (direct link) it renders inline.
 */
export function ProjectSheet({ project, modal }: { project: Project; modal: boolean }) {
  const router = useRouter()
  const close = () => (window.history.length > 1 ? router.back() : router.push('/'))

  useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal])

  const card = (
    <motion.article
      aria-label={project.title}
      className={`glass mx-auto w-full max-w-md overflow-hidden ${modal ? 'max-h-[92dvh] rounded-t-[28px]' : 'min-h-dvh'}`}
      initial={modal ? { y: '100%' } : false}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      drag={modal ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDragEnd={(_, info) => {
        if (modal && (info.offset.y > 120 || info.velocity.y > 600)) close()
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-h-[92dvh] overflow-y-auto">
        {modal && <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-text/30" aria-hidden />}
        <Media project={project} />
        <div className="px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-4">
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.iconUrl} alt="" width={56} height={56} className="app-icon size-14 shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold leading-tight" lang={project.lang}>
                {project.title}
              </h1>
              <p className="mt-1 text-sm text-muted">{project.tagline}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
            <span className="rounded-full bg-accent/20 px-2 py-0.5 font-medium text-accent">{kindLabel[project.kind]}</span>
            {project.isNew && <span className="rounded-full bg-new/20 px-2 py-0.5 font-medium text-new">New</span>}
            {project.status !== 'live' && <span className="rounded-full bg-glass-strong px-2 py-0.5 capitalize">{project.status}</span>}
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-glass-strong px-2 py-0.5 text-muted">
                #{t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="launch"
              className="flex-1 rounded-2xl bg-text px-4 py-3 text-center text-[15px] font-semibold text-bg active:scale-[0.98]"
            >
              Launch
            </a>
            {project.links.reel && (
              <a href={project.links.reel} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl px-4 py-3 text-[15px] font-medium">
                Reel
              </a>
            )}
            {project.links.source && (
              <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl px-4 py-3 text-[15px] font-medium">
                Code
              </a>
            )}
          </div>

          {project.story && (
            <div className="prose-story mt-5 text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.story}</ReactMarkdown>
            </div>
          )}

          <p className="mt-6 text-center text-[11px] text-faint">Released {project.date}</p>
          {modal ? (
            <button type="button" onClick={close} className="mt-4 w-full rounded-2xl bg-glass-strong py-2.5 text-sm">
              Back to all projects
            </button>
          ) : (
            <Link href="/" className="mt-4 block w-full rounded-2xl bg-glass-strong py-2.5 text-center text-sm">
              All projects
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )

  if (!modal) return <main id="main">{card}</main>
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-40 flex items-end bg-bg/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      {card}
    </motion.div>
  )
}

function Media({ project }: { project: Project }) {
  if (project.demoUrl) {
    return (
      <video
        className="aspect-[4/5] w-full object-cover sm:aspect-video"
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
    return <img src={project.coverUrl} alt="" className="aspect-[4/5] w-full object-cover object-top sm:aspect-video" />
  }
  return (
    <div className="flex aspect-video w-full items-center justify-center bg-glass">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.iconUrl} alt="" className="app-icon size-28" />
    </div>
  )
}
