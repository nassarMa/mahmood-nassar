import { ImageResponse } from 'next/og'
import { site } from '@/content/site'
import { loadGoogleFont } from '@/lib/og-font'

export const alt = `${site.name} — ${site.positioning}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Social preview card: name, positioning line, and the pipeline with one packet. */
export default async function OpenGraphImage() {
  const [light, italic] = await Promise.all([loadGoogleFont('Fraunces', 300), loadGoogleFont('Fraunces', 300, true)])
  const fonts = [
    light && { name: 'Fraunces', data: light, weight: 300 as const, style: 'normal' as const },
    italic && { name: 'Fraunces', data: italic, weight: 300 as const, style: 'italic' as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0f0e0c',
          color: '#ede8df',
          fontFamily: 'Fraunces, Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 2, color: '#a39e94', fontFamily: 'monospace' }}>
          <span>{site.name.toUpperCase()}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: '#e0863c' }} />
            BUILDING
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -2, fontWeight: 300 }}>Engineer. Builder.</div>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -2, fontWeight: 300, fontStyle: 'italic', color: '#a39e94' }}>
            Experimenter.
          </div>
          <div style={{ marginTop: 36, fontSize: 30, color: '#ede8df', fontStyle: 'italic' }}>{site.positioning}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(237,232,223,0.18)' }} />
          {['ENGINEERING', 'AI', 'PRODUCT', 'COMMUNITY'].map((w, i) => (
            <div key={w} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  border: '1.5px solid #a39e94',
                  background: i === 1 ? '#e0863c' : '#0f0e0c',
                  borderColor: i === 1 ? '#e0863c' : '#a39e94',
                }}
              />
              <span style={{ margin: '0 18px', fontSize: 18, letterSpacing: 3, color: '#a39e94', fontFamily: 'monospace' }}>{w}</span>
              <div style={{ width: 48, height: 1, background: 'rgba(237,232,223,0.18)' }} />
            </div>
          ))}
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size,
  )
}
