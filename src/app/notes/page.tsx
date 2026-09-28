import type { Metadata } from 'next'
import Link from 'next/link'
import { NoteCard } from '@/components/notes/NoteCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { site } from '@/content/site'
import { getNotes } from '@/lib/notes'

export const metadata: Metadata = {
  title: `Field notes — ${site.name}`,
  description: 'Things I learned, things I’m building, AI experiments, product lessons and community observations.',
  alternates: { canonical: '/notes' },
}

export default function NotesPage() {
  const notes = getNotes()
  return (
    <main id="main" className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
      <Link href="/" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-accent">
        <span aria-hidden>←</span> {site.name}
      </Link>
      <header className="mt-12 md:grid md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Eyebrow>Field notes</Eyebrow>
          <h1 className="mt-4 font-display text-[length:var(--text-title)] font-light leading-[1.05]">
            Notes from the build.
          </h1>
          <p className="mt-5 max-w-[34ch] text-muted">
            Things I learned, things I’m building, AI experiments, product lessons and community observations. Short, honest, occasionally wrong.
          </p>
        </div>
      </header>
      <section aria-label="All notes" className="mt-12 border-b hairline md:mt-16">
        {notes.map((n) => (
          <NoteCard key={n.slug} note={n} />
        ))}
      </section>
    </main>
  )
}
