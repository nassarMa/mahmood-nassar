import type { Creator } from '@/lib/content'

const labels: Record<string, string> = {
  instagram: 'Instagram',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  x: 'X',
  email: 'Email',
}

export function TopBar({ creator }: { creator: Creator }) {
  const links = Object.entries(creator.links).filter((e): e is [string, string] => typeof e[1] === 'string')
  return (
    <header className="sticky top-0 z-20 px-4 pt-[max(env(safe-area-inset-top),12px)] pb-2">
      <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={creator.avatar} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold leading-tight">{creator.name}</p>
          <p className="line-clamp-2 text-[12px] leading-tight text-muted">{creator.tagline}</p>
        </div>
        <nav aria-label="Social links" className="flex shrink-0 gap-1">
          {links.map(([key, href]) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-glass-strong px-2.5 py-1 text-[11px] font-medium text-text/90 hover:bg-white/20"
            >
              {labels[key] ?? key}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
