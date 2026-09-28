import assert from 'node:assert/strict'

// site.url must never fall back to localhost when Vercel provides the production host.
delete process.env.NEXT_PUBLIC_SITE_URL
process.env.VERCEL_PROJECT_PRODUCTION_URL = 'example.vercel.app'
const { site } = await import('../src/content/site')
assert.equal(site.url, 'https://example.vercel.app')

console.log('site-url ok')
