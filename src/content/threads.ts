import type { Thread } from './types'

export const threads: Thread[] = [
  {
    n: '01',
    title: 'AI × Engineering',
    body: 'Exploring how autonomous and semi-autonomous agents can do real work inside software engineering workflows: investigating repositories, cloud environments and issue trackers, driving browsers, and answering questions from a team’s own knowledge.',
    status: 'experiment',
    anchor: '#ai',
  },
  {
    n: '02',
    title: 'Career intelligence',
    body: 'Building a system that discovers relevant companies, watches their careers pages, collects fresh roles, drops stale ones and classifies what’s left by role and seniority — with agents that verify what they find.',
    status: 'building',
    anchor: '#work',
  },
  {
    n: '03',
    title: 'Product experiments',
    body: 'Testing ideas around founders and builders: how people get from an idea to a first version, what stops them, how they find partners, and how to validate before overbuilding.',
    status: 'research',
    anchor: '#work',
  },
  {
    n: '04',
    title: 'Dafsha',
    body: 'Growing a community that helps Arabic-speaking people navigate high-tech careers: mentoring, guidance, opportunities and the connections that make a difference.',
    status: 'community',
    anchor: '#dafsha',
  },
]
