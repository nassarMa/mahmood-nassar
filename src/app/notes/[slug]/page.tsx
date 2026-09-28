import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Prose } from '@/components/notes/Prose'
import { formatDate, getNote, getNotes } from '@/lib/notes'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getNotes().map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return {}
  return {
    title: note.meta.title,
    description: note.meta.summary,
    alternates: { canonical: `/notes/${slug}` },
    openGraph: { type: 'article', publishedTime: note.meta.date, title: note.meta.title, description: note.meta.summary },
  }
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  return (
    <main id="main" className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
      <Link href="/notes" className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-accent">
        <span aria-hidden>←</span> Field notes
      </Link>
      <article className="mt-12 md:grid md:grid-cols-12 md:gap-8">
        <header className="md:col-span-10 md:col-start-2">
          <p className="eyebrow">
            <time dateTime={note.meta.date}>{formatDate(note.meta.date)}</time>
            {note.meta.tags.length ? <span className="text-faint"> · {note.meta.tags.join(' · ')}</span> : null}
          </p>
          <h1 className="mt-5 max-w-[22ch] font-display text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-[-0.015em]">
            {note.meta.title}
          </h1>
          <p className="mt-6 max-w-[60ch] font-display text-[1.3rem] font-light italic leading-snug text-muted">
            {note.meta.summary}
          </p>
        </header>
        <div className="mt-12 md:col-span-8 md:col-start-2">
          <Prose>
            <MDXRemote source={note.content} />
          </Prose>
        </div>
      </article>
    </main>
  )
}
