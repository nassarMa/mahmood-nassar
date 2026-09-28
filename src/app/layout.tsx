import type { Metadata } from 'next'
import './globals.css'
import { fraunces, geist, geistMono } from '@/lib/fonts'
import { site } from '@/content/site'
import { stages } from '@/content/stages'
import { PipelineRail } from '@/components/pipeline/PipelineRail'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: '/',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
}

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  jobTitle: 'Software Engineer',
  description: site.description,
  sameAs: Object.values(site.links).filter((v): v is string => typeof v === 'string' && v.startsWith('http')),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <PipelineRail stages={stages} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  )
}
