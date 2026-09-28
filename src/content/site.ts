import type { Channel } from './types'

export const site = {
  name: 'Mahmood Nassar',
  title: 'Mahmood Nassar — Engineer, Builder & AI Explorer',
  description:
    'Software engineer building automation infrastructure, AI agents for real engineering workflows, early products and a technology community.',
  positioning: 'Engineer by background. Builder by nature.',
  supporting: 'I build software, automation, AI systems, products and communities.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  statusWord: 'building',
  // Set a channel to its absolute URL (or mailto:) when ready. `null` renders a
  // visible placeholder instead of a broken link.
  links: {
    linkedin: null,
    github: null,
    instagram: null,
    email: null,
  } as Record<Channel, string | null>,
}
