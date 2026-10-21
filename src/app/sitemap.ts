import type { MetadataRoute } from 'next'
import { loadProjects } from '@/lib/content'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    ...loadProjects().map((p) => ({ url: `${base}/p/${p.slug}`, lastModified: new Date(p.date), priority: 0.8 })),
  ]
}
