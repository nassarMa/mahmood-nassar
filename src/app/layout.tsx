import type { Metadata } from 'next'
import './globals.css'
import { fraunces, geist, geistMono } from '@/lib/fonts'
import { site } from '@/content/site'
import { PipelineRail } from '@/components/pipeline/PipelineRail'
import { stages } from '@/content/stages'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
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
      </body>
    </html>
  )
}
