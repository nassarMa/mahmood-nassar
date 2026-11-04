import Link from 'next/link'
import type { Creator } from '@/lib/content'
import { GithubIcon } from './icons'

/** A slim, sticky bar: who this is, and the one or two links that matter. */
export function TopBar({ creator }: { creator: Creator }) {
  const github = creator.links.github
  return (
    <header className="sticky top-0 z-30 pt-[env(safe-area-inset-top)]">
      <div className="mx-auto mt-3 flex w-[min(100%-1.5rem,72rem)] items-center justify-between gap-3 rounded-full border border-line bg-bg/60 py-1.5 ps-1.5 pe-1.5 backdrop-blur-xl">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 rounded-full pe-3 ps-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={creator.avatar} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-1 ring-white/15" />
          <span className="text-[14.5px] font-semibold tracking-tight">{creator.name}</span>
        </Link>
        <nav aria-label="Site" className="flex items-center gap-1">
          <Link href="/#projects" className="hidden min-h-11 items-center rounded-full px-4 text-[14px] text-muted transition hover:text-text sm:inline-flex">
            Projects
          </Link>
          {github ? (
            <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/[0.07] px-4 text-[14px] font-medium transition hover:bg-white/[0.12]">
              <GithubIcon className="text-[16px]" />
              GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
