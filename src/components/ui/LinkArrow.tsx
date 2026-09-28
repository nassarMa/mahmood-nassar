import Link from 'next/link'

type Props = { href: string; children: React.ReactNode; className?: string }

export function LinkArrow({ href, children, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}
