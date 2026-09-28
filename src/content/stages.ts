/**
 * The stages on the pipeline, in page order. Drives section headers, the rail,
 * the phone quick-nav (`nav: true`) and the notes index header.
 */
export type StageId = 'building' | 'work' | 'engineering' | 'ai' | 'dafsha' | 'journey' | 'notes' | 'about' | 'connect'

export type StageInfo = {
  id: StageId
  label: string
  eyebrow: string
  title: string
  intro: string
  /** Show in the phone quick-nav. */
  nav?: boolean
  /** Label of the "see all" link, where a stage has one. */
  more?: string
}

export const stages: readonly StageInfo[] = [
  {
    id: 'building',
    label: 'Building',
    eyebrow: '01 — Currently building',
    title: 'Four threads, one loop.',
    intro:
      'Everything I work on runs through the same loop: problem, research, architecture, prototype, automation, product, feedback, iteration. These are the threads on it right now.',
    nav: true,
  },
  {
    id: 'work',
    label: 'Work',
    eyebrow: '02 — Selected work',
    title: 'Stories, not screenshots.',
    intro:
      'Each piece of work told the way it happened: the problem I noticed, how I thought about it, what I built, and what I learned. Statuses are honest.',
    nav: true,
  },
  {
    id: 'engineering',
    label: 'Engineering',
    eyebrow: '03 — Engineering',
    title: 'I don’t just automate tests. I build the systems that make automation possible.',
    intro:
      'Most of my engineering work sits one layer below the test cases: distributed execution, containerised runners in the cloud, typed API and SDK clients, database cleanup, async workflow verification and reporting that lands in the CI pipeline. When that layer is solid, writing the next test is the easy part.',
  },
  {
    id: 'ai',
    label: 'AI',
    eyebrow: '04 — AI',
    title: 'AI that does work, not demos.',
    intro:
      'I am interested in what agents can actually do inside real workflows: engineering, research, automation and products. The pattern is always the same — a person sets the goal, an agent uses real tools, the tools touch real systems, and the outcome is something a person can check.',
  },
  {
    id: 'dafsha',
    label: 'Dafsha',
    eyebrow: '05 — Dafsha · community',
    title: 'Technology matters most when it helps people move forward.',
    intro: '',
  },
  {
    id: 'journey',
    label: 'Journey',
    eyebrow: '06 — Journey',
    title: 'Expanding scope.',
    intro:
      'Not a résumé. The same person asking bigger questions: from how to test a thing, to how to build the system, to which problem is worth solving at all.',
  },
  {
    id: 'notes',
    label: 'Notes',
    eyebrow: '07 — Field notes',
    title: 'Notes from the build.',
    intro:
      'Things I learned, things I’m building, AI experiments, product lessons and community observations. Short, honest, occasionally wrong.',
    nav: true,
    more: 'All field notes',
  },
  {
    id: 'about',
    label: 'About',
    eyebrow: '08 — About',
    title: 'Between the idea and the system.',
    intro: '',
  },
  {
    id: 'connect',
    label: 'Connect',
    eyebrow: '09 — Connect',
    title: 'Building something interesting?',
    intro: '',
    nav: true,
  },
]

export function stage(id: StageId): StageInfo {
  return stages.find((s) => s.id === id)!
}
