import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ContentError, groupByKind, isNewRelease, loadHub, loadProject, loadProjects } from '@/lib/content'

let root: string
let contentDir: string
let publicDir: string

function writeProject(slug: string, data: Record<string, unknown>, extra: { story?: string; media?: string[] } = {}) {
  const dir = path.join(contentDir, 'projects', slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'project.json'), JSON.stringify(data))
  if (extra.story) fs.writeFileSync(path.join(dir, 'story.md'), extra.story)
  const pub = path.join(publicDir, 'projects', slug)
  fs.mkdirSync(pub, { recursive: true })
  for (const m of ['icon.svg', ...(extra.media ?? [])]) fs.writeFileSync(path.join(pub, m), 'x')
}

const good = {
  title: 'Thing',
  tagline: 'Does a thing',
  url: 'https://example.com',
  kind: 'app',
  tags: ['a'],
  date: '2026-01-02',
  icon: 'icon.svg',
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'hub-'))
  contentDir = path.join(root, 'content')
  publicDir = path.join(root, 'public')
  fs.mkdirSync(contentDir)
  fs.writeFileSync(
    path.join(contentDir, 'creator.json'),
    JSON.stringify({ name: 'Me', handle: '@me', tagline: 'hi', avatar: '/a.svg' }),
  )
})
afterEach(() => fs.rmSync(root, { recursive: true, force: true }))

describe('loadProject', () => {
  it('loads a valid project with defaults and resolved media', () => {
    writeProject('thing', good, { story: '# Hello', media: ['cover.png'] })
    const p = loadProject('thing', { contentDir, publicDir, now: new Date('2026-01-10') })
    expect(p.slug).toBe('thing')
    expect(p.status).toBe('live')
    expect(p.featured).toBe(false)
    expect(p.iconUrl).toBe('/projects/thing/icon.svg')
    expect(p.coverUrl).toBeNull()
    expect(p.story).toBe('# Hello')
    expect(p.isNew).toBe(true)
  })

  it('names the file and field on a schema error', () => {
    writeProject('bad', { ...good, url: 'http://insecure.example' })
    expect(() => loadProject('bad', { contentDir, publicDir })).toThrow(/content\/projects\/bad\/project.json[\s\S]*url: must be https/)
  })

  it('fails when a referenced media file is missing', () => {
    writeProject('nomedia', { ...good, media: { cover: 'cover.png' } })
    expect(() => loadProject('nomedia', { contentDir, publicDir })).toThrow(ContentError)
    expect(() => loadProject('nomedia', { contentDir, publicDir })).toThrow(/cover.png.*not found/)
  })

  it('accepts https media URLs without a local file', () => {
    writeProject('remote', { ...good, media: { demo: 'https://cdn.example.com/demo.mp4' } })
    expect(loadProject('remote', { contentDir, publicDir }).demoUrl).toBe('https://cdn.example.com/demo.mp4')
  })

  it('rejects invalid JSON with the file name', () => {
    const dir = path.join(contentDir, 'projects', 'broken')
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'project.json'), '{ nope')
    expect(() => loadProject('broken', { contentDir, publicDir })).toThrow(/broken\/project.json: invalid JSON/)
  })

  it('rejects a folder name that is not a slug', () => {
    expect(() => loadProject('Not Slug', { contentDir, publicDir })).toThrow(/lowercase slug/)
  })
})

describe('loadProjects / loadHub', () => {
  it('sorts newest first and groups by kind in display order', () => {
    writeProject('old-tool', { ...good, date: '2025-01-01', kind: 'tool' })
    writeProject('thing', { ...good, date: '2026-01-01' })
    writeProject('mid-game', { ...good, date: '2025-06-01', kind: 'game' })
    const projects = loadProjects({ contentDir, publicDir })
    expect(projects.map((p) => p.slug)).toEqual(['thing', 'mid-game', 'old-tool'])
    const sections = groupByKind(projects)
    expect(sections.map((s) => s.label)).toEqual(['Games', 'Apps', 'Tools'])
    expect(sections[1].projects.map((p) => p.slug)).toEqual(['thing'])
  })

  it('loadHub returns creator, projects and non-empty sections', () => {
    writeProject('thing', good)
    const hub = loadHub({ contentDir, publicDir })
    expect(hub.creator.name).toBe('Me')
    expect(hub.sections).toHaveLength(1)
    expect(hub.sections[0].kind).toBe('app')
  })
})

describe('isNewRelease', () => {
  it('is new within 14 days, not after, not in the future', () => {
    const now = new Date('2026-03-15T12:00:00Z')
    expect(isNewRelease('2026-03-15', now)).toBe(true)
    expect(isNewRelease('2026-03-01', now)).toBe(true)
    expect(isNewRelease('2026-02-28', now)).toBe(false)
    expect(isNewRelease('2026-03-20', now)).toBe(false)
  })
})
