import Link from 'next/link'
import type { NoteMeta } from '@/lib/notes'
import { formatDate } from '@/lib/notes'

export function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <article data-note={note.slug} className="group border-t hairline py-6 md:py-7">
      <Link href={`/notes/${note.slug}`} className="grid gap-2 sm:grid-cols-[112px_1fr] sm:gap-6">
        <time dateTime={note.date} className="eyebrow pt-2">
          {formatDate(note.date)}
        </time>
        <div>
          <h3 className="font-display text-[1.5rem] font-light leading-tight tracking-[-0.01em] transition-colors group-hover:text-accent md:text-[1.7rem]">
            {note.title}
          </h3>
          <p className="mt-2 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">{note.summary}</p>
          {note.tags.length ? (
            <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-faint">{note.tags.join(' · ')}</p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
