import { site } from '@/content/site'
import { Portrait } from './Portrait'
import { RoutingDiagram } from './RoutingDiagram'
import { StatusChip } from './StatusChip'

const WORDS = ['Engineering', 'AI', 'Product', 'Community'] as const

type Props = { portraitSrc?: string; threadCount: number }

export function Hero({ portraitSrc, threadCount }: Props) {
  return (
    <header className="hero-grid relative flex min-h-[100svh] flex-col border-b hairline">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 pt-6 md:px-8 md:pt-8">
        <p className="whitespace-nowrap font-mono text-[13px] tracking-[0.06em] text-text">{site.name}</p>
        <StatusChip word={site.statusWord} count={threadCount} />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] flex-1 grid-cols-1 items-center gap-10 px-4 pb-12 pt-14 md:grid-cols-12 md:gap-8 md:px-8 md:pt-10">
        <div className="order-2 md:order-1 md:col-span-7">
          <p className="eyebrow">
            Engineer · builder · <span className="whitespace-nowrap">founder-in-progress</span>
          </p>
          <h1 className="mt-6 font-display text-[length:var(--text-display)] font-light leading-[0.95] tracking-[-0.02em]">
            Engineer.
            <br />
            Builder.
            <br />
            <em className="italic text-muted">Experimenter.</em>
          </h1>
          <p className="mt-8 max-w-[26ch] font-display text-[clamp(1.35rem,1.2vw+1rem,1.75rem)] font-light italic leading-snug">
            {site.positioning}
          </p>
          <p className="mt-4 max-w-[46ch] text-muted">{site.supporting}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#building"
              className="inline-flex items-center justify-center rounded-full bg-text px-6 py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-bg transition-colors hover:bg-accent"
            >
              See what I&apos;m building
            </a>
            <a
              href="#connect"
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-text transition-colors hover:border-accent hover:text-accent"
            >
              Connect with me
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-end md:order-2 md:col-span-5 md:col-start-8">
          <div className="w-[72vw] max-w-[420px]">
            <Portrait src={portraitSrc} alt={`Portrait of ${site.name}`} />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 md:px-8">
        <RoutingDiagram words={WORDS.map((w) => w.toUpperCase())} />
      </div>
    </header>
  )
}
