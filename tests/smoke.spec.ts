import { test, expect } from '@playwright/test'

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
