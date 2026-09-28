import type { NoteMeta } from '@/lib/notes'
import { NoteCard } from '@/components/notes/NoteCard'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { Reveal } from '@/components/ui/Reveal'

export function Notes({ notes, more }: { notes: NoteMeta[]; more: string }) {
  return (
    <Reveal>
      <div className="border-b hairline">
        {notes.map((n) => (
          <NoteCard key={n.slug} note={n} headingLevel={3} />
        ))}
      </div>
      <LinkArrow href="/notes" className="mt-8">
        {more}
      </LinkArrow>
    </Reveal>
  )
}
