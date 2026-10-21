import { expect, test } from '@playwright/test'

test('home shows the creator and one card per project with an Open button', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Mahmood Nassar' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Apps' })).toBeVisible()
  const open = page.getByTestId('open-guess-the-player')
  await expect(open).toBeVisible()
  await expect(open).toHaveAttribute('href', 'https://guess-the-player-nassarmahmoodswe-4498s-projects.vercel.app/')
  await expect(open).toHaveAttribute('target', '_blank')
  await expect(page.getByTestId('open-aqrab-masjid')).toHaveAttribute('href', 'https://aqrab-masjid.vercel.app')
  // No Instagram link: the hub itself is the Instagram bio link.
  await expect(page.getByRole('link', { name: 'Instagram' })).toHaveCount(0)
})

test('About goes to the project page, which links back', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('card-aqrab-masjid').getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL(/\/p\/aqrab-masjid$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('أقرب مسجد')
  await expect(page.getByTestId('launch')).toHaveAttribute('href', 'https://aqrab-masjid.vercel.app')
  await page.getByRole('link', { name: 'All projects' }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('a direct project link has a preview image for sharing', async ({ page }) => {
  await page.goto('/p/guess-the-player')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/)
  const og = await page.request.get('/p/guess-the-player/opengraph-image')
  expect(og.status()).toBe(200)
  expect(og.headers()['content-type']).toContain('image/png')
})

test('unknown project shows the not-found page', async ({ page }) => {
  const res = await page.goto('/p/does-not-exist')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('link', { name: 'See all projects' })).toBeVisible()
})

test('no horizontal overflow at phone width; tap targets are big enough', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(overflow).toBe(false)
  const box = await page.getByTestId('open-guess-the-player').boundingBox()
  expect(box && box.height).toBeGreaterThanOrEqual(44)
})
