import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

type Props = {
  id: string
  eyebrow: string
  /** Short label shown on the pipeline rail. */
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * A stage on the pipeline. Registers itself for the rail via data-stage and
 * lays out a sticky header column beside the content on wide screens.
 */
export function Section({ id, eyebrow, label, title, intro, children, className = '' }: Props) {
  const titleId = `${id}-title`
  return (
    <section
      id={id}
      data-stage={id}
      data-stage-label={label}
      aria-labelledby={titleId}
      className={`relative border-t hairline py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-4 md:grid md:grid-cols-12 md:gap-8 md:px-8">
        <header className="mb-12 md:col-span-4 md:mb-0">
          <div className="md:sticky md:top-24">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2
                id={titleId}
                className="mt-4 font-display text-[length:var(--text-title)] font-light leading-[1.05] tracking-[-0.01em]"
              >
                {title}
              </h2>
              {intro ? <div className="mt-5 max-w-[34ch] text-muted">{intro}</div> : null}
            </Reveal>
          </div>
        </header>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  )
}
