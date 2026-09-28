import type { Channel } from './types'

export const connect = {
  headline: 'Building something interesting?',
  sub: 'Let’s talk about technology, AI, products or ideas. I reply to real messages.',
  channels: [
    { key: 'linkedin', label: 'LinkedIn', hint: 'Work, writing, and the occasional opinion' },
    { key: 'github', label: 'GitHub', hint: 'Experiments in the open' },
    { key: 'instagram', label: 'Instagram', hint: 'Building, events, things I’m learning' },
    { key: 'email', label: 'Email', hint: 'The most reliable way to reach me' },
  ] as { key: Channel; label: string; hint: string }[],
}
