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
    <header className="flex flex-col items-center pt-[max(env(safe-area-inset-top),28px)] text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={creator.avatar} alt="" width={72} height={72} className="size-18 rounded-full shadow-lg" />
      <h1 className="mt-3 text-[22px] font-bold leading-tight">{creator.name}</h1>
      <p className="mt-1 max-w-xs text-[15px] leading-snug text-muted">{creator.tagline}</p>
      {links.length > 0 && (
        <nav aria-label="Links" className="mt-3 flex flex-wrap justify-center gap-2">
          {links.map(([key, href]) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-full px-3 py-1 text-[13px] font-medium text-text/90"
            >
              {labels[key] ?? key}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
