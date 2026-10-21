import type { Metadata, Viewport } from 'next'
import './globals.css'
import { loadCreator } from '@/lib/content'
import { siteUrl } from '@/lib/site'

const creator = loadCreator()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${creator.name} — Projects`, template: `%s — ${creator.name}` },
  description: creator.tagline,
  applicationName: `${creator.name} Projects`,
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: creator.name },
  openGraph: { type: 'website', siteName: `${creator.name} — Projects`, title: `${creator.name} — Projects`, description: creator.tagline, url: '/' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#07090f',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
