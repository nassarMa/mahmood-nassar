import assert from 'node:assert/strict'
import { threads } from '../src/content/threads'
import { projects } from '../src/content/projects'
import { journey } from '../src/content/journey'
import { stack } from '../src/content/stack'
import { agents } from '../src/content/agents'
import { about } from '../src/content/about'
import { dafsha } from '../src/content/dafsha'
import { site } from '../src/content/site'
import { engineering } from '../src/content/engineering'
import { ai } from '../src/content/ai'
import { connect } from '../src/content/connect'

const BANNED =
  /\b(visionary|thought leader|disruptive|world-class|serial entrepreneur|ai expert|industry leader|passionate|enthusiast|innovative|results-driven)\b/i

const all = JSON.stringify({ threads, projects, journey, stack, agents, about, dafsha, site, engineering, ai, connect })

assert.ok(!BANNED.test(all), `banned word found: ${all.match(BANNED)?.[0]}`)

assert.equal(threads.length, 4, 'four threads')
assert.deepEqual(
  threads.map((t) => t.n),
  ['01', '02', '03', '04'],
)

assert.equal(projects.length, 4, 'four projects')
for (const p of projects) {
  for (const k of ['problem', 'thinking', 'build', 'learning'] as const) {
    assert.ok(p[k].length > 40, `${p.slug}.${k} too short`)
  }
  assert.ok(p.tech.length >= 3, `${p.slug} needs at least three technologies`)
}
assert.equal(new Set(projects.map((p) => p.slug)).size, 4, 'project slugs unique')

assert.equal(journey.length, 7, 'seven journey stages')
assert.equal(journey.filter((s) => s.question).length, 3, 'three stages carry a question')

for (const [channel, v] of Object.entries(site.links)) {
  assert.ok(v === null || /^(https?:|mailto:)/.test(v), `${channel} link must be null or absolute`)
}

console.log('content ok')
