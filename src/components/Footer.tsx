import type { Creator } from '@/lib/content'
import { GithubIcon } from './icons'

export function Footer({ creator }: { creator: Creator }) {
  return (
    <footer className="mx-auto mt-24 w-[min(100%-2.5rem,76rem)] border-t border-line pt-8 pb-[max(env(safe-area-inset-bottom),2.5rem)]">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={creator.avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover ring-1 ring-white/15" />
          <div>
            <p className="text-[14px] font-semibold">{creator.name}</p>
            <p className="text-[13px] text-faint">New things land here first. Come back soon.</p>
          </div>
        </div>
        {creator.links.github ? (
          <a href={creator.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[14px] text-muted transition hover:text-text">
            <GithubIcon className="text-[16px]" />
            github.com/{creator.links.github.split('/').filter(Boolean).pop()}
          </a>
        ) : null}
      </div>
    </footer>
  )
}
