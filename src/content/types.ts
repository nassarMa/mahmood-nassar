export type Status =
  | 'live'
  | 'building'
  | 'experiment'
  | 'prototype'
  | 'research'
  | 'internal'
  | 'community'

export const STATUS_LABEL: Record<Status, string> = {
  live: 'Live',
  building: 'Building',
  experiment: 'Experiment',
  prototype: 'Prototype',
  research: 'Research',
  internal: 'Internal engineering work',
  community: 'Community initiative',
}

export type Channel = 'linkedin' | 'github' | 'instagram' | 'email'

export type Thread = {
  n: string
  title: string
  body: string
  status: Status
  anchor?: string
}

export type Project = {
  slug: string
  title: string
  kicker: string
  status: Status
  problem: string
  thinking: string
  build: string
  tech: string[]
  learning: string
}

export type Stage = {
  title: string
  question?: string
  body: string
}

export type Layer = {
  name: string
  items: string[]
}

export type AgentKind = {
  name: string
  does: string
}
