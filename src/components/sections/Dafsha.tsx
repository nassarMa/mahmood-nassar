import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import type { StageInfo } from '@/content/stages'

type Content = { statement: string; body: string[]; pillars: string[]; scale: string }

/**
 * The one section that leaves the technical grid: full-width, warmer surface,
 * larger type, people first. Still a stage on the rail.
 */
export function Dafsha({ stage, content }: { stage: StageInfo; content: Content }) {
  return (
    <section
      id={stage.id}
      data-stage={stage.id}
      data-stage-label={stage.label}
      aria-labelledby={`${stage.id}-title`}
      className="dafsha relative overflow-hidden border-t hairline bg-surface py-24 md:py-36"
    >
      <div className="relative mx-auto max-w-[1200px] px-4 md:px-8">
        <Reveal>
          <Eyebrow>{stage.eyebrow}</Eyebrow>
          <h2
            id={`${stage.id}-title`}
            className="mt-6 max-w-[18ch] font-display text-[clamp(2.1rem,4.2vw,3.75rem)] font-light italic leading-[1.1] tracking-[-0.01em]"
          >
            {content.statement}
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-12">
          <Reveal className="md:col-span-7 md:col-start-1">
            <div className="space-y-5 text-[17px] leading-relaxed md:text-[18px]">
              {content.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
            <ul className="border-t hairline">
              {content.pillars.map((p) => (
                <li key={p} className="border-b hairline py-3 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-display text-[1.35rem] font-light italic text-text">{content.scale}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
