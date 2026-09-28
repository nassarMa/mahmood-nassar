import type { Layer } from './types'

export const stack: Layer[] = [
  { name: 'Execution', items: ['Python', 'pytest', 'Playwright', 'Async workflows'] },
  { name: 'Infrastructure', items: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD'] },
  { name: 'Services', items: ['FastAPI', 'REST APIs', 'Microservices', 'PostgreSQL'] },
  { name: 'Tooling', items: ['SDK clients', 'Reporting', 'Developer tooling', 'AI agents', 'Next.js'] },
]
