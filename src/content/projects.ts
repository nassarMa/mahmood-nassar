import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'automation-infrastructure',
    title: 'Automation infrastructure for distributed systems',
    kicker: 'The system behind the tests',
    status: 'internal',
    problem:
      'Teams were writing more and more automated tests, but the machinery around them had not kept up. Runs were slow, flaky and hard to trust, and every new service meant another bespoke setup.',
    thinking:
      'Treat the test platform as a product with its own architecture. If engineers can run any suite, anywhere, against any environment, and read a clear report afterwards, the tests themselves become the easy part.',
    build:
      'A Python and pytest architecture with shared fixtures and typed API clients, containerised runners executing in parallel on AWS, database cleanup that leaves environments the way it found them, async workflow verification, and reporting wired into CI/CD so results land where people already look.',
    tech: ['Python', 'pytest', 'Docker', 'AWS', 'CI/CD', 'REST APIs', 'PostgreSQL'],
    learning:
      'Infrastructure compounds. One well-built runner or client removes work from every test written afterwards, while one more test only covers one more case.',
  },
  {
    slug: 'engineering-agents',
    title: 'Engineering agents',
    kicker: 'AI that investigates, not just autocompletes',
    status: 'experiment',
    problem:
      'A large share of engineering time goes to investigation: reading unfamiliar code, checking what a cloud resource is doing, tracing an issue across a tracker, reproducing a UI bug. It is slow, repetitive and rarely written down.',
    thinking:
      'Give an agent the same tools an engineer would reach for — repository access, cloud APIs, the issue tracker, a browser — and narrow scopes where it can be checked. Trust is earned one bounded task at a time.',
    build:
      'A family of agents: one that investigates repositories and answers questions with citations, one that inspects and acts on cloud environments with guardrails, one that reads and updates issues, one that drives Playwright to reproduce UI behaviour, and a knowledge layer that lets a team ask questions of its own documentation and history.',
    tech: ['Python', 'LLM agents', 'Tool use', 'AWS', 'Playwright', 'Knowledge retrieval'],
    learning:
      'Agents earn their place on investigation and first drafts, and lose it when they are asked to decide alone. The interesting engineering is in the boundaries, not the prompts.',
  },
  {
    slug: 'career-intelligence',
    title: 'Career intelligence',
    kicker: 'Fresh opportunities, verified',
    status: 'building',
    problem:
      'Job boards are full of stale, duplicated and mislabelled roles. People spend hours filtering noise, and the best openings often appear on a company’s own careers page first, quietly.',
    thinking:
      'Go to the source. Discover the companies worth watching, monitor their careers pages directly, keep only what is genuinely new, and let agents do the verification a careful person would do by hand.',
    build:
      'A pipeline that discovers companies, watches careers pages on a schedule, extracts and de-duplicates roles, filters out anything outdated, classifies by role and seniority with a language model, and asks agents to confirm details before anything is shared.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Scheduled jobs', 'LLM classification', 'Next.js'],
    learning:
      'Fresh job data is much harder than scraping a board. Freshness is a modelling problem — what counts as new, closed or changed — long before it is a scraping problem.',
  },
  {
    slug: 'idea-builder-matching',
    title: 'Idea ↔ builder matching',
    kicker: 'From an idea to someone who can build it',
    status: 'research',
    problem:
      'Many people have a real product idea and no way to build it. Many builders want a problem worth solving. They rarely meet, and when they do, neither side knows how to test the idea before committing months to it.',
    thinking:
      'Before building a platform, understand the people. Talk to early founders about what stopped them, watch how builders choose what to join, and test whether a lightweight matching flow changes anything.',
    build:
      'Structured conversations with founders and builders, a small landing page to measure interest, and a prototype flow for describing an idea in a way a builder can evaluate — used to learn, not to launch.',
    tech: ['Next.js', 'Interviews', 'Landing-page tests', 'Prototype flows'],
    learning:
      'The gap is not tooling. It is confidence: founders do not know if the idea is worth a builder’s time, and builders cannot tell either. Validation has to come before matching.',
  },
]
