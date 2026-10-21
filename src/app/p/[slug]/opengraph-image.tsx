import fs from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { loadProject, loadProjects } from '@/lib/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return loadProjects().map((p) => ({ slug: p.slug }))
}

const kindLabel = { app: 'App', game: 'Game', tool: 'Tool', experiment: 'Experiment' } as const

// Bundled font: titles can be Arabic or Latin, and Satori's built-in face has
// no Arabic glyphs. IBM Plex Sans Arabic covers both scripts and parses in
// Satori (the Noto Arabic faces use a GSUB lookup it cannot read). Reading
// from disk keeps the build offline.
function font(file: string) {
  return fs.readFileSync(path.join(process.cwd(), 'src/app/fonts', file))
}

const rtlScript = /[֐-ࣿיִ-﷿ﹰ-﻿]/

/**
 * Satori shapes glyphs but has no bidi algorithm, so an RTL sentence comes out
 * with its words in reading order left-to-right. Reversing the word order
 * gives the correct visual order for a short title; mixed-direction runs are
 * out of scope here.
 */
export function visualOrder(text: string): string {
  return rtlScript.test(text) ? text.split(/\s+/).reverse().join(' ') : text
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = loadProject(slug)
  const title = visualOrder(p.title)
  const tagline = visualOrder(p.tagline)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 72,
          color: '#f3f4f8',
          background: 'linear-gradient(135deg, #0e1220 0%, #07090f 60%)',
          fontFamily: 'IBM Plex Sans Arabic, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(124,156,255,0.35), transparent 65%)',
          }}
        />
        <div style={{ display: 'flex', fontSize: 28, color: '#a6abbd', letterSpacing: 2, textTransform: 'uppercase' }}>
          {kindLabel[p.kind]}
          {p.isNew ? ' · New' : ''}
        </div>
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, marginTop: 12, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 36, color: '#a6abbd', marginTop: 20 }}>{tagline}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'IBM Plex Sans Arabic', data: font('IBMPlexSansArabic-Bold.woff'), weight: 700, style: 'normal' },
      ],
    },
  )
}
