/**
 * Fetches a font file for a Google Font at build time so `next/og` can draw with it.
 * Returns undefined on any failure or after `timeoutMs`, so the OG image still
 * renders in a fallback face and a stalled connection never hangs the build.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  italic = false,
  timeoutMs = 5000,
): Promise<ArrayBuffer | undefined> {
  try {
    const spec = italic ? `ital,wght@1,${weight}` : `wght@${weight}`
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${spec}`, {
      // An old UA makes the API return TTF/WOFF instead of woff2, which Satori cannot read.
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0' },
      signal: AbortSignal.timeout(timeoutMs),
    }).then((r) => r.text())
    // Satori reads TTF, OTF and WOFF (not WOFF2).
    const url = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype|woff)'\)/)?.[1]
    if (!url) return undefined
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) })
    return res.ok ? res.arrayBuffer() : undefined
  } catch {
    return undefined
  }
}
