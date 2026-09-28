import { test, expect } from '@playwright/test'

test.describe('seo', () => {
  test('home carries title, description, open graph, twitter, canonical and Person JSON-LD', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Mahmood Nassar/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /automation|AI/)
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
    const ld = await page.locator('script[type="application/ld+json"]').first().textContent()
    expect(JSON.parse(ld!)['@type']).toBe('Person')
  })

  test('OG image, sitemap, robots and icon respond', async ({ request }) => {
    const og = await request.get('/opengraph-image')
    expect(og.status()).toBe(200)
    expect(og.headers()['content-type']).toMatch(/image\/png/)

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    const xml = await sitemap.text()
    expect(xml).toContain('/notes/fresh-job-data-is-hard')

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toMatch(/Allow: \//)

    const icon = await request.get('/icon.svg')
    expect(icon.status()).toBe(200)
  })
})
