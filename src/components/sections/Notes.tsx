import type { NoteMeta } from '@/lib/notes'
import { NoteCard } from '@/components/notes/NoteCard'
import { LinkArrow } from '@/components/ui/LinkArrow'
import { Reveal } from '@/components/ui/Reveal'

export function Notes({ notes }: { notes: NoteMeta[] }) {
  return (
    <Reveal>
      <div className="border-b hairline">
        {notes.map((n) => (
          <NoteCard key={n.slug} note={n} />
        ))}
      </div>
      <LinkArrow href="/notes" className="mt-8">
        All field notes
      </LinkArrow>
    </Reveal>
  )
}
