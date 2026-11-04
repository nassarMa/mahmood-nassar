import type { Creator, Project } from '@/lib/content'
import { ArrowDown, GithubIcon } from './icons'

/** `*words*` in the headline are set in the serif italic with the aurora gradient. */
function Headline({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="text-aurora pe-[0.06em] font-serif font-normal italic">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

export function Hero({ creator, projects }: { creator: Creator; projects: Project[] }) {
  const live = projects.filter((p) => p.status === 'live').length
  const games = projects.filter((p) => p.kind === 'game').length
  const apps = projects.filter((p) => p.kind === 'app').length
  const tools = projects.filter((p) => p.kind === 'tool' || p.kind === 'experiment').length
  const mix = [apps && plural(apps, 'app', 'apps'), games && plural(games, 'game', 'games'), tools && plural(tools, 'tool', 'tools')].filter(Boolean).join(' · ')
  const arabicFirst = projects.filter((p) => p.lang === 'ar').length * 2 > projects.length
  const github = creator.links.github
  return (
    <section className="mx-auto w-[min(100%-2.5rem,72rem)] pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
      <div className="rise mx-auto w-fit">
        <div className="relative mx-auto size-24 rounded-full bg-[conic-gradient(from_200deg,#8b7cff,#5ab8ff,#4fe0b6,#8b7cff)] p-[2px] shadow-[0_20px_60px_-20px_rgba(139,124,255,0.8)] sm:size-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={creator.avatar} alt="" width={112} height={112} className="size-full rounded-full border-[3px] border-bg object-cover" />
        </div>
      </div>
      <h1 className="rise mt-5 text-[15px] font-medium tracking-wide text-muted" style={{ '--i': 1 } as React.CSSProperties}>
        {creator.name}
      </h1>
      <p
        className="rise mx-auto mt-3 max-w-[18ch] text-[40px] leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-[64px] lg:text-[76px]"
        style={{ '--i': 2 } as React.CSSProperties}
      >
        <Headline text={creator.headline ?? creator.tagline} />
      </p>
      {creator.headline ? (
        <p className="rise mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-muted sm:text-[18px]" style={{ '--i': 3 } as React.CSSProperties}>
          {creator.tagline}
        </p>
      ) : null}
      <div className="rise mt-8 flex flex-wrap items-center justify-center gap-3" style={{ '--i': 4 } as React.CSSProperties}>
        <a href="#projects" className="btn btn-primary px-6">
          Explore the projects
          <ArrowDown className="text-[16px]" />
        </a>
        {github ? (
          <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <GithubIcon className="text-[17px]" />
            GitHub
          </a>
        ) : null}
      </div>
      {projects.length > 0 ? (
        <ul className="rise mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="At a glance" style={{ '--i': 5 } as React.CSSProperties}>
          <li className="chip">
            <span className="live-dot" aria-hidden />
            {plural(live, 'project live', 'projects live')}
          </li>
          {mix ? <li className="chip">{mix}</li> : null}
          {arabicFirst ? <li className="chip">Built with AI · Arabic first</li> : <li className="chip">Built with AI</li>}
        </ul>
      ) : null}
    </section>
  )
}
