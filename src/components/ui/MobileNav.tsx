type Item = { id: string; label: string }

/** Phone-only quick navigation, pinned to the bottom edge. The one place blur is used. */
export function MobileNav({ items }: { items: readonly Item[] }) {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-line-strong bg-bg/80 backdrop-blur-md md:hidden"
    >
      <ul className="flex items-stretch justify-between px-2">
        {items.map((l) => (
          <li key={l.id} className="flex-1">
            <a
              href={`#${l.id}`}
              className="flex h-12 items-center justify-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
