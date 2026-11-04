import type { CSSProperties } from 'react'
import type { Creator, Project } from '@/lib/content'
import { ArrowDown, GithubIcon } from './icons'
import { PhoneFan } from './PhoneFan'

/** `*words*` in the headline get the aurora gradient. */
function Headline({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-aurora">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`
const step = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero({ creator, projects }: { creator: Creator; projects: Project[] }) {
  const live = projects.filter((p) => p.status === 'live').length
  const games = projects.filter((p) => p.kind === 'game').length
  const apps = projects.filter((p) => p.kind === 'app').length
  const tools = projects.filter((p) => p.kind === 'tool' || p.kind === 'experiment').length
  const mix = [apps && plural(apps, 'app', 'apps'), games && plural(games, 'game', 'games'), tools && plural(tools, 'tool', 'tools')].filter(Boolean).join(' · ')
  const github = creator.links.github
  return (
    <section className="mx-auto grid w-[min(100%-2.5rem,76rem)] items-center gap-12 pt-12 pb-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pt-20 lg:pb-16">
      <div>
        <div className="rise flex items-center gap-3" style={step(0)}>
          <div className="size-12 shrink-0 rounded-full bg-[conic-gradient(from_200deg,#8b7cff,#5ab8ff,#4fe0b6,#8b7cff)] p-[2px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={creator.avatar} alt="" width={48} height={48} className="size-full rounded-full border-2 border-bg object-cover" />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight">{creator.name}</h1>
            {projects.length > 0 ? (
              <p className="flex items-center gap-1.5 text-[13px] text-muted">
                <span className="live-dot" aria-hidden />
                {plural(live, 'project live', 'projects live')}
              </p>
            ) : null}
          </div>
        </div>
        <p className="rise mt-7 max-w-[15ch] text-[44px] leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-[68px] lg:text-[80px]" style={step(1)}>
          <Headline text={creator.headline ?? creator.tagline} />
        </p>
        {creator.headline ? (
          <p className="rise mt-6 max-w-md text-[17px] leading-relaxed text-muted sm:text-[19px]" style={step(2)}>
            {creator.tagline}
          </p>
        ) : null}
        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={step(3)}>
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
          <ul className="rise mt-10 flex flex-wrap items-center gap-2" aria-label="At a glance" style={step(4)}>
            {mix ? <li className="chip">{mix}</li> : null}
            <li className="chip">Built with AI</li>
            <li className="chip">Made for your phone</li>
          </ul>
        ) : null}
      </div>
      <div className="rise" style={step(2)}>
        <PhoneFan projects={projects} />
      </div>
    </section>
  )
}
