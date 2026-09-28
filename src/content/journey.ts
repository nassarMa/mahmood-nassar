import type { Stage } from './types'

export const journey: Stage[] = [
  {
    title: 'Software engineering',
    body: 'Learning how systems are put together by building them: backends, APIs, web applications, and the discipline of shipping code other people depend on.',
  },
  {
    title: 'Automation',
    question: 'How do I test this?',
    body: 'Automating the checks that keep systems honest. Writing tests taught me where systems break and why they are hard to trust.',
  },
  {
    title: 'Infrastructure',
    question: 'How do I build the system?',
    body: 'Moving from writing tests to building the platform that runs them: distributed execution, containers, cloud environments, clients and reporting.',
  },
  {
    title: 'Technical leadership',
    body: 'Owning direction and quality across teams. Reviewing, mentoring, deciding what to build and what to leave alone.',
  },
  {
    title: 'AI',
    body: 'Putting agents to work on real engineering problems, and finding out where they help, where they mislead and how to bound them.',
  },
  {
    title: 'Product building',
    question: 'What problem should we solve?',
    body: 'Starting from the problem instead of the code. Research, prototypes, user conversations and the discipline of validating before building.',
  },
  {
    title: 'Entrepreneurship',
    body: 'Treating ideas as experiments with a cost and a hypothesis. Learning in public, one small bet at a time.',
  },
]
