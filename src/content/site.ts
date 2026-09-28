import type { Channel } from './types'

/** Production URL: explicit env first, then Vercel's own production host, then local dev. */
function resolveUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'http://localhost:3000'
}

export const site = {
  name: 'Mahmood Nassar',
  title: 'Mahmood Nassar — Engineer, Builder & AI Explorer',
  description:
    'Software engineer building automation infrastructure, AI agents for real engineering workflows, early products and a technology community.',
  positioning: 'Engineer by background. Builder by nature.',
  supporting: 'I build software, automation, AI systems, products and communities.',
  jobTitle: 'Software Engineer',
  url: resolveUrl(),
  statusWord: 'building',
  footerNote: 'Built with Next.js · No trackers',
  // Set a channel to its absolute URL (or mailto:) when ready. `null` renders a
  // visible placeholder instead of a broken link.
  links: {
    linkedin: null,
    github: null,
    instagram: null,
    email: null,
  } as Record<Channel, string | null>,
}
