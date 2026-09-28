import Link from 'next/link'
import type { NoteMeta } from '@/lib/notes'
import { formatDate } from '@/lib/notes'

type Props = { note: NoteMeta; headingLevel: 2 | 3 }

export function NoteCard({ note, headingLevel }: Props) {
  const Heading = `h${headingLevel}` as const
  return (
    <article data-note={note.slug} className="group border-t hairline py-6 md:py-7">
      <Link href={`/notes/${note.slug}`} className="grid gap-2 sm:grid-cols-[136px_1fr] sm:gap-6">
        <time dateTime={note.date} className="eyebrow whitespace-nowrap pt-2">
          {formatDate(note.date)}
        </time>
        <div>
          <Heading className="font-display text-[1.5rem] font-light leading-tight tracking-[-0.01em] transition-colors group-hover:text-accent md:text-[1.7rem]">
            {note.title}
          </Heading>
          <p className="mt-2 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">{note.summary}</p>
          {note.tags.length ? (
            <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-faint">{note.tags.join(' · ')}</p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
