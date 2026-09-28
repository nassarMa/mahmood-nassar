// Dev helper: `pnpm tsx tests/shots.ts [out-dir]` screenshots the running site.
import { chromium } from '@playwright/test'

const out = process.argv[2] ?? 'test-results/shots'
const base = process.env.BASE_URL ?? 'http://localhost:3000'

const browser = await chromium.launch()
for (const [name, viewport] of [
  ['mobile', { width: 390, height: 844 }],
  ['desktop', { width: 1440, height: 900 }],
] as const) {
  const page = await browser.newPage({ viewport })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${out}/${name}-top.png` })
  // Walk the page so scroll-triggered reveals have fired before the full capture.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true })
  for (const el of await page.locator('[data-stage]').all()) {
    const id = await el.getAttribute('data-stage')
    await el.screenshot({ path: `${out}/${name}-${id}.png` })
  }
  await page.close()
}
await browser.close()
console.log(`shots in ${out}`)
