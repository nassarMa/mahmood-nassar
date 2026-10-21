import { expect, test } from '@playwright/test'

test('home screen shows the creator and project icons', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0) // home has no h1; sheet does
  await expect(page.getByText('Mahmood Nassar')).toBeVisible()
  await expect(page.getByTestId('folder-Games')).toBeVisible()
  await expect(page.getByTestId('folder-Tools')).toBeVisible()
  // Dock shows the featured projects
  await expect(page.getByRole('navigation', { name: 'Featured' }).getByTestId('icon-guess-the-player')).toBeVisible()
})

test('tapping a dock icon opens the project sheet with a Launch link', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Featured' }).getByTestId('icon-guess-the-player').click()
  await expect(page).toHaveURL(/\/p\/guess-the-player$/)
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { level: 1 })).toContainText('خمّن اللاعب')
  const launch = dialog.getByTestId('launch')
  await expect(launch).toHaveAttribute('href', 'https://guess-the-player-nassarmahmoodswe-4498s-projects.vercel.app/')
  await expect(launch).toHaveAttribute('target', '_blank')
  // Home screen is still underneath (intercepting route)
  await expect(page.getByTestId('folder-Games')).toBeAttached()
  await dialog.getByRole('button', { name: 'Back to all projects' }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('a folder opens and reveals its projects', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('folder-Tools').click()
  const folder = page.getByRole('dialog', { name: 'Tools folder' })
  await expect(folder.getByTestId('icon-aqrab-masjid')).toBeVisible()
  await folder.getByTestId('icon-aqrab-masjid').click()
  await expect(page).toHaveURL(/\/p\/aqrab-masjid$/)
})

test('search filters the grid', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox', { name: 'Search projects' }).fill('maps')
  await expect(page.getByRole('status').getByTestId('icon-aqrab-masjid')).toBeVisible()
  await expect(page.getByRole('status').getByTestId('icon-guess-the-player')).toHaveCount(0)
  await page.getByRole('searchbox', { name: 'Search projects' }).fill('zzzz')
  await expect(page.getByText(/Nothing matches/)).toBeVisible()
})

test('a direct project link renders a full page with metadata', async ({ page }) => {
  await page.goto('/p/aqrab-masjid')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('أقرب مسجد')
  await expect(page.getByTestId('launch')).toHaveAttribute('href', 'https://aqrab-masjid.vercel.app')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/)
  await expect(page.getByRole('link', { name: 'All projects' })).toBeVisible()
})

test('unknown project shows the not-found page', async ({ page }) => {
  const res = await page.goto('/p/does-not-exist')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('link', { name: 'See all projects' })).toBeVisible()
})

test('no horizontal overflow at phone width', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(overflow).toBe(false)
})
