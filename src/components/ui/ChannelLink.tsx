type Props = { label: string; hint: string; href: string | null }

/**
 * A way to reach Mahmood. With no URL yet it renders a visibly disabled
 * placeholder — never an empty or invented link.
 */
export function ChannelLink({ label, hint, href }: Props) {
  const base = 'group flex items-baseline justify-between gap-6 border-t hairline py-5'
  if (!href) {
    return (
      <div className={`${base} text-faint`} aria-disabled="true" data-testid="channel-placeholder">
        <span className="font-display text-[1.5rem] font-light">{label}</span>
        <span className="font-mono text-[12px] uppercase tracking-[0.14em]">coming soon</span>
      </div>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`${base} transition-colors hover:text-accent`}
    >
      <span className="font-display text-[1.5rem] font-light">{label}</span>
      <span className="flex items-baseline gap-3 text-right font-mono text-[12px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent">
        <span className="hidden sm:inline">{hint}</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
      </span>
    </a>
  )
}
