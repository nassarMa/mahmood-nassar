'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Folder, Project } from '@/lib/content'
import { AppIcon } from './AppIcon'

const PER_PAGE = 20 // 4 columns × 5 rows

type Item = { kind: 'project'; project: Project } | { kind: 'folder'; folder: Folder }

export function HomeScreen({ projects, folders, loose }: { projects: Project[]; folders: Folder[]; loose: Project[] }) {
  const [query, setQuery] = useState('')
  const [openFolder, setOpenFolder] = useState<Folder | null>(null)

  const q = query.trim().toLowerCase()
  const results = useMemo(
    () =>
      q
        ? projects.filter((p) =>
            [p.title, p.tagline, p.kind, p.folder ?? '', ...p.tags].some((s) => s.toLowerCase().includes(q)),
          )
        : null,
    [projects, q],
  )

  const items: Item[] = [
    ...folders.map((folder) => ({ kind: 'folder', folder }) as Item),
    ...loose.map((project) => ({ kind: 'project', project }) as Item),
  ]
  const pages: Item[][] = []
  for (let i = 0; i < items.length; i += PER_PAGE) pages.push(items.slice(i, i + PER_PAGE))
  if (pages.length === 0) pages.push([])

  return (
    <section className="flex flex-1 flex-col px-4" aria-label="Projects">
      <label className="relative mb-3 block">
        <span className="sr-only">Search projects</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          enterKeyHint="search"
          autoComplete="off"
          className="glass w-full rounded-xl px-4 py-2.5 text-[15px] placeholder:text-faint focus:outline-none"
        />
      </label>

      {results ? (
        <div role="status" aria-live="polite" className="flex-1">
          {results.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted">Nothing matches “{query}”.</p>
          ) : (
            <Grid>
              {results.map((p) => (
                <AppIcon key={p.slug} project={p} />
              ))}
            </Grid>
          )}
        </div>
      ) : (
        <Pages pages={pages} onOpenFolder={setOpenFolder} />
      )}

      <AnimatePresence>
        {openFolder && <FolderOverlay folder={openFolder} onClose={() => setOpenFolder(null)} />}
      </AnimatePresence>
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 gap-x-2 gap-y-5 py-2">{children}</div>
}

function Pages({ pages, onOpenFolder }: { pages: Item[][]; onOpenFolder: (f: Folder) => void }) {
  const [page, setPage] = useState(0)
  return (
    <div className="flex flex-1 flex-col">
      <div
        className="hide-scrollbar -mx-4 flex flex-1 snap-x snap-mandatory overflow-x-auto"
        onScroll={(e) => {
          const el = e.currentTarget
          setPage(Math.round(el.scrollLeft / el.clientWidth))
        }}
      >
        {pages.map((items, i) => (
          <div key={i} className="w-full shrink-0 snap-start px-4" aria-label={`Page ${i + 1} of ${pages.length}`}>
            <Grid>
              {items.map((item) =>
                item.kind === 'project' ? (
                  <AppIcon key={item.project.slug} project={item.project} />
                ) : (
                  <FolderIcon key={item.folder.name} folder={item.folder} onOpen={() => onOpenFolder(item.folder)} />
                ),
              )}
            </Grid>
          </div>
        ))}
      </div>
      {pages.length > 1 && (
        <div className="flex justify-center gap-1.5 py-2" aria-hidden>
          {pages.map((_, i) => (
            <span key={i} className={`size-1.5 rounded-full ${i === page ? 'bg-text' : 'bg-text/30'}`} />
          ))}
        </div>
      )}
    </div>
  )
}

function FolderIcon({ folder, onOpen }: { folder: Folder; onOpen: () => void }) {
  const hasNew = folder.projects.some((p) => p.isNew)
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${folder.name} folder, ${folder.projects.length} projects`}
      data-testid={`folder-${folder.name}`}
      className="flex w-full flex-col items-center gap-1.5"
    >
      <span className="app-icon glass grid size-16 grid-cols-3 grid-rows-3 gap-1 p-2">
        {folder.projects.slice(0, 9).map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.slug} src={p.iconUrl} alt="" className="block aspect-square w-full rounded-[22%] object-cover" />
        ))}
        {hasNew && <span className="absolute right-1 top-1 size-2.5 rounded-full bg-new ring-2 ring-bg" aria-hidden />}
      </span>
      <span className="line-clamp-1 w-full text-center text-[11.5px] font-medium leading-tight text-text/90">{folder.name}</span>
    </button>
  )
}

function FolderOverlay({ folder, onClose }: { folder: Folder; onClose: () => void }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${folder.name} folder`}
      className="fixed inset-0 z-30 flex items-center justify-center bg-bg/60 p-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass w-full max-w-sm rounded-[32px] p-5"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{folder.name}</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-glass-strong px-3 py-1 text-sm" autoFocus>
            Close
          </button>
        </div>
        <Grid>
          {folder.projects.map((p) => (
            <AppIcon key={p.slug} project={p} />
          ))}
        </Grid>
      </motion.div>
    </motion.div>
  )
}
