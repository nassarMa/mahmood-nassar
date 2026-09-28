import { Reveal } from '@/components/ui/Reveal'

type Content = { lead: string; paragraphs: string[] }

export function About({ content }: { content: Content }) {
  return (
    <Reveal>
      <p className="font-display text-[clamp(1.6rem,2.2vw,2.1rem)] font-light italic leading-snug">{content.lead}</p>
      <div className="mt-8 max-w-[60ch] space-y-5 text-[16.5px] leading-relaxed text-muted">
        {content.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </Reveal>
  )
}
