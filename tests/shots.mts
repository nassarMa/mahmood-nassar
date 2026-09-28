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
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true })
  await page.close()
}
await browser.close()
console.log(`shots in ${out}`)
