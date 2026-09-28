import assert from 'node:assert/strict'
import { getNotes, parseNote } from '../src/lib/notes'

// A note missing required frontmatter fails loudly at build time.
assert.throws(
  () => parseNote('---\ntitle: No date\nsummary: x\n---\nbody', 'x.mdx'),
  /Note x\.mdx: missing date/,
)
assert.throws(
  () => parseNote('---\ndate: 2026-09-01\nsummary: x\n---\nbody', 'y.mdx'),
  /Note y\.mdx: missing title/,
)

const ok = parseNote('---\ntitle: T\ndate: 2026-09-01\nsummary: S\ntags: [a, b]\n---\nHello', 'hello-world.mdx')
assert.equal(ok.meta.slug, 'hello-world')
assert.equal(ok.meta.date, '2026-09-01')
assert.deepEqual(ok.meta.tags, ['a', 'b'])
assert.equal(ok.content.trim(), 'Hello')

// Seed notes exist and come back newest first.
const notes = getNotes()
assert.equal(notes.length, 3, 'three seed notes')
for (let i = 1; i < notes.length; i++) {
  assert.ok(notes[i - 1].date >= notes[i].date, 'sorted newest first')
}

console.log('notes ok')
