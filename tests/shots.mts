// Dev helper: screenshots the running site at phone and desktop widths.
import { chromium } from '@playwright/test'

// Usage: tsx tests/shots.mts [out-dir] [path] [tag]
const out = process.argv[2] ?? 'test-results/shots'
const base = (process.env.BASE_URL ?? 'http://localhost:3000') + (process.argv[3] ?? '')
const tag = process.argv[4] ?? ''

const browser = await chromium.launch()
for (const [name, viewport] of [
  ['mobile', { width: 390, height: 844 }],
  ['desktop', { width: 1440, height: 900 }],
] as const) {
  const page = await browser.newPage({ viewport })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${out}/${name}${tag}-top.png` })
  // Walk the page so scroll-triggered reveals have fired before the full capture.
  await page.evaluate(async () => {
    const step = window.innerHeight / 3
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 250))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${out}/${name}${tag}-full.png`, fullPage: true })
  for (const el of await page.locator('[data-stage]').all()) {
    const id = await el.getAttribute('data-stage')
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
    await el.screenshot({ path: `${out}/${name}-${id}.png` })
  }
  await page.close()
}
await browser.close()
console.log(`shots in ${out}`)
