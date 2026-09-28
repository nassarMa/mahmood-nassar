import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { getNotes } from '@/lib/notes'

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getNotes()
  const latest = notes[0]?.date ?? '2026-09-01'
  return [
    { url: `${site.url}/`, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/notes`, lastModified: latest, changeFrequency: 'weekly', priority: 0.7 },
    ...notes.map((n) => ({
      url: `${site.url}/notes/${n.slug}`,
      lastModified: n.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
