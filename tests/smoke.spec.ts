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

test.describe('engineering', () => {
  test('maps technologies into four layers, no skill bars', async ({ page }) => {
    await page.goto('/')
    const layers = page.locator('#engineering [data-layer]')
    await expect(layers).toHaveCount(4)
    await expect(layers.first()).toContainText('Execution')
    await expect(page.locator('#engineering progress, #engineering [role="progressbar"]')).toHaveCount(0)
  })
})

test.describe('ai', () => {
  test('shows the human → agent → tools → systems → outcome flow with agent kinds', async ({ page }) => {
    await page.goto('/')
    const flow = page.locator('#ai [data-flow-node]')
    await expect(flow).toHaveCount(5)
    await expect(flow.first()).toContainText('Human')
    await expect(flow.last()).toContainText('Outcome')
    await expect(page.locator('#ai [data-agent]')).toHaveCount(7)
  })
})

test.describe('dafsha', () => {
  test('reads as a community section with no frozen numbers', async ({ page }) => {
    await page.goto('/')
    const s = page.locator('#dafsha')
    await expect(s).toContainText('Technology matters most when it helps people move forward.')
    await expect(s).toContainText(/Arabic-speaking/)
    await expect(s).toContainText(/hundreds of/i)
    expect(await s.textContent()).not.toMatch(/\b\d{3,}\b/)
  })
})

test.describe('journey', () => {
  test('shows seven stages of expanding scope with three questions', async ({ page }) => {
    await page.goto('/')
    const stages = page.locator('#journey [data-journey-stage]')
    await expect(stages).toHaveCount(7)
    await expect(stages.first()).toContainText('Software engineering')
    await expect(stages.last()).toContainText('Entrepreneurship')
    await expect(page.locator('#journey [data-journey-question]')).toHaveCount(3)
  })
})

test.describe('about + connect', () => {
  test('about is short and personal', async ({ page }) => {
    await page.goto('/')
    const s = page.locator('#about')
    await expect(s).toContainText('I’m interested in the space between an idea and a working system.')
    await expect(s.locator('p:not(.eyebrow)')).toHaveCount(5) // lead + 4 paragraphs
  })

  test('null links render placeholders, never bad hrefs', async ({ page }) => {
    await page.goto('/')
    const bad = await page.locator('a[href="null"], a[href="#"], a[href=""]').count()
    expect(bad).toBe(0)
    await expect(page.locator('#connect')).toContainText('Building something interesting?')
    await expect(page.getByTestId('channel-placeholder')).toHaveCount(4)
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
