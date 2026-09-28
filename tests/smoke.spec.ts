import { test, expect } from '@playwright/test'

test.describe('hero', () => {
  test('says who Mahmood is within the first screen', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Engineer/)
    await expect(page.getByText('Engineer by background. Builder by nature.')).toBeVisible()
    await expect(page.getByText(/4 active threads/)).toBeVisible()
    await expect(page.getByTestId('portrait')).toBeVisible()
    await expect(page.getByRole('link', { name: /see what i.m building/i })).toHaveAttribute('href', '#building')
  })
})

test.describe('currently building', () => {
  test('shows four numbered threads with a status', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('#building [data-thread]')
    await expect(cards).toHaveCount(4)
    await expect(cards.nth(0)).toContainText('01')
    await expect(cards.nth(3)).toContainText('Dafsha')
    await expect(cards.nth(3)).toContainText('Community initiative')
  })
})

test.describe('selected work', () => {
  test('tells each project as a story with an honest status', async ({ page }) => {
    await page.goto('/')
    const stories = page.locator('#work article')
    await expect(stories).toHaveCount(4)
    for (const label of ['Problem', 'Thinking', 'Build', 'Technology', 'Learning']) {
      await expect(stories.first().getByText(label, { exact: true })).toBeVisible()
    }
    await expect(stories.first()).toContainText('Internal engineering work')
  })
})

test.describe('pipeline rail', () => {
  test('lights the stage in view', async ({ page }) => {
    await page.goto('/')
    const rail = page.locator('nav[aria-label="Sections"]')
    await page.locator('#building').scrollIntoViewIfNeeded()
    await expect(rail).toHaveAttribute('data-active-stage', 'building')
  })

  test('marker links jump to their stage', async ({ page }) => {
    await page.goto('/')
    const link = page.locator('nav[aria-label="Sections"] a[href="#building"]')
    await expect(link).toHaveAttribute('aria-label', /building/i)
  })
})
