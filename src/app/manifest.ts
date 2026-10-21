import type { MetadataRoute } from 'next'
import { loadCreator } from '@/lib/content'

export default function manifest(): MetadataRoute.Manifest {
  const creator = loadCreator()
  return {
    name: `${creator.name} — Projects`,
    short_name: creator.name.split(' ')[0],
    description: creator.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#07090f',
    theme_color: '#07090f',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
