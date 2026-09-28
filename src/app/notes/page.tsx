import type { Metadata } from 'next'
import Link from 'next/link'
import { NoteCard } from '@/components/notes/NoteCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { site } from '@/content/site'
import { stage } from '@/content/stages'
import { getNotes } from '@/lib/notes'

const notesStage = stage('notes')

export const metadata: Metadata = {
  title: notesStage.label === 'Notes' ? 'Field notes' : notesStage.label,
  description: notesStage.intro,
  alternates: { canonical: '/notes' },
  openGraph: { type: 'website', siteName: site.name, title: notesStage.title, description: notesStage.intro, url: '/notes' },
  twitter: { card: 'summary_large_image', title: notesStage.title, description: notesStage.intro },
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
          <Eyebrow>{notesStage.eyebrow.replace(/^\d+ — /, '')}</Eyebrow>
          <h1 className="mt-4 font-display text-[length:var(--text-title)] font-light leading-[1.05]">{notesStage.title}</h1>
          <p className="mt-5 max-w-[34ch] text-muted">{notesStage.intro}</p>
        </div>
      </header>
      <section aria-label="All notes" className="mt-12 border-b hairline md:mt-16">
        {notes.map((n) => (
          <NoteCard key={n.slug} note={n} headingLevel={2} />
        ))}
      </section>
    </main>
  )
}
