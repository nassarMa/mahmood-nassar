import type { Metadata, Viewport } from 'next'
import { Geist, IBM_Plex_Sans_Arabic, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { loadCreator } from '@/lib/content'
import { siteUrl } from '@/lib/site'

const creator = loadCreator()

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'], variable: '--font-plex-arabic', display: 'swap' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' })

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
  themeColor: '#05060d',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${plexArabic.variable} ${instrument.variable}`}>
      <body>
        <div className="backdrop" aria-hidden />
        {children}
      </body>
    </html>
  )
}
