import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type NoteMeta = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

export type Note = { meta: NoteMeta; content: string }

const NOTES_DIR = path.join(process.cwd(), 'src/content/notes')
const REQUIRED = ['title', 'date', 'summary'] as const

/** Parses one MDX file. Missing required frontmatter throws so the build fails, not the page. */
export function parseNote(raw: string, file: string): Note {
  const { data, content } = matter(raw)
  for (const key of REQUIRED) {
    if (!data[key]) throw new Error(`Note ${file}: missing ${key}`)
  }
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
  return {
    meta: {
      slug: file.replace(/\.mdx?$/, ''),
      title: String(data.title),
      date,
      summary: String(data.summary),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    },
    content,
  }
}

export function getNotes(): NoteMeta[] {
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => parseNote(fs.readFileSync(path.join(NOTES_DIR, f), 'utf8'), f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getNote(slug: string): Note | null {
  const file = path.join(NOTES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  return parseNote(fs.readFileSync(file, 'utf8'), `${slug}.mdx`)
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
