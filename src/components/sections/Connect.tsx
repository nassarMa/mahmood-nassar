import { ChannelLink } from '@/components/ui/ChannelLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import type { StageInfo } from '@/content/stages'
import type { Channel } from '@/content/types'

type Content = {
  headline: string
  sub: string
  channels: { key: Channel; label: string; hint: string }[]
}

type Props = { stage: StageInfo; content: Content; links: Record<Channel, string | null>; name: string; footerNote: string }

/** The human close: one question, four ways to answer it. Also the footer. */
export function Connect({ stage, content, links, name, footerNote }: Props) {
  return (
    <section
      id={stage.id}
      data-stage={stage.id}
      data-stage-label={stage.label}
      aria-labelledby={`${stage.id}-title`}
      className="relative border-t hairline pb-32 pt-24 md:py-36"
    >
      <div className="mx-auto max-w-[1200px] px-4 md:grid md:grid-cols-12 md:gap-8 md:px-8">
        <Reveal className="md:col-span-6">
          <Eyebrow>{stage.eyebrow}</Eyebrow>
          <h2
            id={`${stage.id}-title`}
            className="mt-6 font-display text-[clamp(2.6rem,5vw,4.75rem)] font-light leading-[0.98] tracking-[-0.02em]"
          >
            {content.headline}
          </h2>
          <p className="mt-6 max-w-[40ch] text-muted">{content.sub}</p>
        </Reveal>
        <Reveal className="mt-12 md:col-span-5 md:col-start-8 md:mt-0" delay={0.1}>
          <ul className="border-b hairline">
            {content.channels.map((c) => (
              <li key={c.key}>
                <ChannelLink label={c.label} hint={c.hint} href={links[c.key]} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <footer className="mx-auto mt-24 flex max-w-[1200px] flex-col gap-2 px-4 font-mono text-[12px] tracking-[0.06em] text-faint sm:flex-row sm:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        <p>{footerNote}</p>
      </footer>
    </section>
  )
}
