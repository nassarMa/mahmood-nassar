import assert from 'node:assert/strict'
import { loadGoogleFont } from '../src/lib/og-font'

// A stalled connection must not hang the build: the loader gives up and returns undefined.
globalThis.fetch = ((_: unknown, init?: RequestInit) =>
  new Promise((_, reject) => {
    init?.signal?.addEventListener('abort', () => reject(new Error('aborted')))
  })) as typeof fetch

// AbortSignal.timeout's timer is unref'd; keep the loop alive so it can fire, and fail loudly if it never does.
const guard = setTimeout(() => {
  console.error('og-font: loader never gave up')
  process.exit(1)
}, 3000)

const started = Date.now()
const result = await loadGoogleFont('Fraunces', 300, false, 200)
clearTimeout(guard)
assert.equal(result, undefined)
assert.ok(Date.now() - started < 2000, 'gave up promptly')

console.log('og-font ok')
