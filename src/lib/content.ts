import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

/**
 * Content lives in files, validated at build time. A bad file fails the
 * build with the file and field named, so nothing broken ever ships.
 *
 *   content/creator.json                  who the hub belongs to
 *   content/projects/<slug>/project.json  one project
 *   content/projects/<slug>/story.md      optional markdown story
 *   public/projects/<slug>/<icon|cover|demo>  media referenced by name
 */

export const CONTENT_DIR = path.join(process.cwd(), 'content')
export const PUBLIC_DIR = path.join(process.cwd(), 'public')

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/
const mediaRef = z.string().min(1).refine((v) => /^https:\/\//.test(v) || /^[\w.-]+$/.test(v), {
  message: 'must be a file name in public/projects/<slug>/ or an https URL',
})

export const projectSchema = z.object({
  title: z.string().min(1).max(60),
  tagline: z.string().min(1).max(120),
  url: z.string().url().refine((u) => u.startsWith('https://'), { message: 'must be https' }),
  kind: z.enum(['app', 'game', 'tool', 'experiment']),
  tags: z.array(z.string().min(1).max(24)).max(8).default([]),
  folder: z.string().min(1).max(24).optional(),
  date: z.string().regex(datePattern, 'must be YYYY-MM-DD'),
  status: z.enum(['live', 'beta', 'archived']).default('live'),
  lang: z.string().min(2).max(5).default('en'),
  featured: z.boolean().default(false),
  icon: mediaRef,
  media: z
    .object({
      cover: mediaRef.optional(),
      demo: mediaRef.optional(),
    })
    .default({}),
  links: z
    .object({
      reel: z.string().url().optional(),
      source: z.string().url().optional(),
    })
    .default({}),
})

export const creatorSchema = z.object({
  name: z.string().min(1).max(60),
  handle: z.string().min(1).max(40),
  tagline: z.string().min(1).max(140),
  avatar: z.string().min(1),
  links: z.record(z.string(), z.string().nullable()).default({}),
  dock: z.array(z.string().regex(slugPattern)).max(4).default([]),
})

export type ProjectInput = z.input<typeof projectSchema>
export type Creator = z.infer<typeof creatorSchema>

export type Project = z.infer<typeof projectSchema> & {
  slug: string
  story: string | null
  /** Resolved public URLs for media. */
  iconUrl: string
  coverUrl: string | null
  demoUrl: string | null
  isNew: boolean
}

export const NEW_FOR_DAYS = 14

export function isNewRelease(date: string, now = new Date()): boolean {
  const released = new Date(`${date}T00:00:00Z`).getTime()
  // Whole days since release; a release is "new" for NEW_FOR_DAYS calendar days.
  const ageDays = Math.floor((now.getTime() - released) / 86_400_000)
  return ageDays >= 0 && ageDays <= NEW_FOR_DAYS
}

export class ContentError extends Error {}

function formatIssues(file: string, issues: z.ZodError['issues']): string {
  const lines = issues.map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
  return `${file}\n${lines.join('\n')}`
}

function readJson(file: string): unknown {
  let raw: string
  try {
    raw = fs.readFileSync(file, 'utf8')
  } catch {
    throw new ContentError(`${file}: missing`)
  }
  try {
    return JSON.parse(raw)
  } catch (e) {
    throw new ContentError(`${file}: invalid JSON (${(e as Error).message})`)
  }
}

function resolveMedia(slug: string, ref: string | undefined, publicDir: string): string | null {
  if (!ref) return null
  if (ref.startsWith('https://')) return ref
  const file = path.join(publicDir, 'projects', slug, ref)
  if (!fs.existsSync(file)) {
    throw new ContentError(`content/projects/${slug}/project.json: media "${ref}" not found at public/projects/${slug}/${ref}`)
  }
  return `/projects/${slug}/${ref}`
}

export function loadProject(slug: string, opts: { contentDir?: string; publicDir?: string; now?: Date } = {}): Project {
  const contentDir = opts.contentDir ?? CONTENT_DIR
  const publicDir = opts.publicDir ?? PUBLIC_DIR
  if (!slugPattern.test(slug)) throw new ContentError(`content/projects/${slug}: folder name must be a lowercase slug`)

  const dir = path.join(contentDir, 'projects', slug)
  const file = path.join(dir, 'project.json')
  const parsed = projectSchema.safeParse(readJson(file))
  if (!parsed.success) throw new ContentError(formatIssues(`content/projects/${slug}/project.json`, parsed.error.issues))
  const data = parsed.data

  const storyFile = path.join(dir, 'story.md')
  const story = fs.existsSync(storyFile) ? fs.readFileSync(storyFile, 'utf8').trim() || null : null

  return {
    ...data,
    slug,
    story,
    iconUrl: resolveMedia(slug, data.icon, publicDir)!,
    coverUrl: resolveMedia(slug, data.media.cover, publicDir),
    demoUrl: resolveMedia(slug, data.media.demo, publicDir),
    isNew: isNewRelease(data.date, opts.now),
  }
}

/** All projects, newest first. */
export function loadProjects(opts: { contentDir?: string; publicDir?: string; now?: Date } = {}): Project[] {
  const contentDir = opts.contentDir ?? CONTENT_DIR
  const root = path.join(contentDir, 'projects')
  const slugs = fs.existsSync(root)
    ? fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : []
  const projects = slugs.map((slug) => loadProject(slug, opts))
  return projects.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
}

export function loadCreator(opts: { contentDir?: string } = {}): Creator {
  const file = path.join(opts.contentDir ?? CONTENT_DIR, 'creator.json')
  const parsed = creatorSchema.safeParse(readJson(file))
  if (!parsed.success) throw new ContentError(formatIssues('content/creator.json', parsed.error.issues))
  return parsed.data
}

/** The whole hub, cross-checked: dock entries must exist. */
export function loadHub(opts: { contentDir?: string; publicDir?: string; now?: Date } = {}) {
  const creator = loadCreator(opts)
  const projects = loadProjects(opts)
  const bySlug = new Map(projects.map((p) => [p.slug, p]))
  for (const slug of creator.dock) {
    if (!bySlug.has(slug)) throw new ContentError(`content/creator.json: dock refers to unknown project "${slug}"`)
  }
  const dock = creator.dock.map((s) => bySlug.get(s)!)
  const folders = groupFolders(projects)
  return { creator, projects, dock, folders }
}

export type Folder = { name: string; projects: Project[] }

/** Projects with a `folder` are grouped; the rest stay loose on the grid. */
export function groupFolders(projects: Project[]): { folders: Folder[]; loose: Project[] } {
  const map = new Map<string, Project[]>()
  const loose: Project[] = []
  for (const p of projects) {
    if (p.folder) map.set(p.folder, [...(map.get(p.folder) ?? []), p])
    else loose.push(p)
  }
  const folders = [...map.entries()].map(([name, ps]) => ({ name, projects: ps })).sort((a, b) => a.name.localeCompare(b.name))
  return { folders, loose }
}
