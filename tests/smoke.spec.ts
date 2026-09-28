import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const STAGES = ['building', 'work', 'engineering', 'ai', 'dafsha', 'journey', 'notes', 'about', 'connect']

test.describe('whole page', () => {
  test('all stages present, no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto('/')
    for (const id of STAGES) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
    expect(errors).toEqual([])
  })

  test('hero CTA activates the building stage', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /see what i.m building/i }).click()
    await expect(page.locator('nav[aria-label="Sections"]')).toHaveAttribute('data-active-stage', 'building')
  })

  test('reduced motion renders everything in its final state, without hydration errors', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
    const page = await ctx.newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    await page.goto('/')
    await page.waitForTimeout(500)
    // Every reveal wrapper is fully visible without scrolling anywhere.
    const opacities = await page.locator('[data-reveal]').evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity))
    expect(opacities.length).toBeGreaterThan(5)
    expect(opacities.every((o) => o === '1')).toBe(true)
    await expect(page.locator('#connect h2')).toBeVisible()
    expect(errors).toEqual([])
    await ctx.close()
  })

  test('rail keeps working after client-side navigation and stays off notes pages', async ({ page }) => {
    await page.goto('/')
    await page.locator('#notes a[href="/notes"]').click()
    await expect(page).toHaveURL(/\/notes$/)
    await expect(page.locator('nav[aria-label="Sections"]')).toHaveCount(0)
    await page.locator('[data-note]').first().locator('a').click()
    await expect(page).toHaveURL(/\/notes\/[a-z0-9-]+$/)
    await expect(page.locator('nav[aria-label="Sections"]')).toHaveCount(0)
    await page.getByRole('link', { name: /field notes/i }).first().click()
    await page.getByRole('link', { name: /mahmood nassar/i }).first().click()
    await expect(page).toHaveURL(/\/$/)
    await page.locator('#work').scrollIntoViewIfNeeded()
    await expect(page.locator('nav[aria-label="Sections"]')).toHaveAttribute('data-active-stage', 'work')
  })

  test('keyboard focus never lands on the hidden rail', async ({ page, isMobile }) => {
    test.skip(isMobile, 'rail markers are desktop-only')
    await page.goto('/')
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab')
      const inRail = await page.evaluate(() => !!document.activeElement?.closest('nav[aria-label="Sections"]'))
      expect(inRail, `tab stop ${i + 1} landed on the hidden rail`).toBe(false)
    }
  })

  test('no horizontal overflow at 320px', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 700 } })
    const page = await ctx.newPage()
    await page.goto('/')
    const sw = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(sw).toBeLessThanOrEqual(320)
    await ctx.close()
  })

  test('axe reports no violations on home and a note', async ({ page }) => {
    for (const path of ['/', '/notes', '/notes/fresh-job-data-is-hard']) {
      await page.goto(path)
      const { violations } = await new AxeBuilder({ page }).analyze()
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
    }
  })
})

test.describe('mobile nav', () => {
  test('phone gets a quick nav with four anchors; desktop does not', async ({ page, isMobile }) => {
    await page.goto('/')
    const nav = page.locator('nav[aria-label="Quick navigation"]')
    if (isMobile) {
      await expect(nav).toBeVisible()
      await expect(nav.locator('a')).toHaveCount(4)
      await expect(nav.locator('a').last()).toHaveAttribute('href', '#connect')
    } else {
      await expect(nav).toBeHidden()
    }
  })
})

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

test.describe('field notes', () => {
  test('home shows the latest three notes', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#notes [data-note]')).toHaveCount(3)
    await expect(page.locator('#notes a[href="/notes"]')).toBeVisible()
  })

  test('index lists notes and each note page renders its title', async ({ page }) => {
    await page.goto('/notes')
    const cards = page.locator('[data-note]')
    await expect(cards).toHaveCount(3)
    await cards.first().locator('a').click()
    await expect(page).toHaveURL(/\/notes\/[a-z0-9-]+$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/agents/i)
    await expect(page.locator('.prose-note h2').first()).toBeVisible()
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
