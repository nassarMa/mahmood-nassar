# Personal Site ("Ideas → Systems") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Mahmood Nassar's personal website — a static Next.js site whose visual spine is an animated "pipeline" line — to Vercel from the public `nassarMa/mahmood-nassar` repo.

**Architecture:** Next.js App Router with every route statically prerendered. All copy lives in typed files under `src/content/`; components are small, prop-driven, and never contain prose. A fixed `PipelineRail` observes section visibility and lights the active stage. Notes are MDX files read at build time.

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4 (`@theme` tokens), `motion` 13, `next-mdx-remote` 6 + `gray-matter`, `next/font/google` (Fraunces, Geist, Geist Mono), Playwright 1.63 + `@axe-core/playwright`, pnpm, Vercel.

**Spec:** `docs/superpowers/specs/2026-09-28-personal-site-design.md`

## Global Constraints

- Colours exactly as spec §4: bg `#0F0E0C`, surface `#161513`, hairline `rgba(237,232,223,0.08)`, text `#EDE8DF`, muted `#A39E94`, faint `#6B665E`, accent `#E0863C`. Accent only on pipeline packets, active markers, status dots, link hover.
- Fonts: Fraunces (display), Geist (body), Geist Mono (labels). Loaded with `next/font/google`, `display: 'swap'`, latin subset.
- Dark theme only; `color-scheme: dark`.
- No prose inside components. All copy in `src/content/*`.
- Banned words anywhere in content: visionary, thought leader, disruptive, world-class, serial entrepreneur, AI expert, industry leader, passionate, enthusiast, innovative, results-driven. A test enforces this.
- No employer names, internal service names, ticket IDs, internal URLs, customer details in any content.
- Social links come from `site.links`; `null` renders a disabled placeholder. Never invent URLs.
- Every animation is disabled under `prefers-reduced-motion: reduce`.
- No third-party scripts, no analytics.
- Component files ≤ ~150 lines; split if larger.
- Commit after every task with conventional messages ending in the `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` trailer.

## Review Focus

1. **Missing portrait file** — `public/images/mahmood.jpg` absent at build time must not break the build or layout; `Portrait` renders the placeholder. (Test in Task 6.)
2. **`prefers-reduced-motion`** — with the media query active, the page must render every element in its final visible state (nothing stuck at opacity 0). (Test in Task 12.)
3. **Null social links** — a `null` link renders as a non-clickable placeholder with visible "coming soon" text, never `href="null"` or `href="#"`. (Test in Task 10.)
4. **Notes with bad frontmatter** — a note missing `date` or `title` must fail the build with a clear message rather than render "undefined". (Test in Task 11.)
5. **Narrow viewport (320px)** — no horizontal overflow; the rail must not overlap text. (Test in Task 12.)

---

### Task 1: Scaffold, tokens, fonts

**Files:**
- Create: project via `create-next-app`, then edit `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`, `package.json` scripts
- Create: `src/lib/fonts.ts`

**Interfaces:**
- Produces: CSS variables `--color-bg, --color-surface, --color-line, --color-text, --color-muted, --color-faint, --color-accent`; Tailwind utilities `bg-bg text-text text-muted text-faint text-accent border-line bg-surface font-display font-sans font-mono`; `fonts.ts` exporting `fraunces, geist, geistMono` (each a `NextFont` with `.variable`).

- [ ] **Step 1: Scaffold**

```bash
cd /Users/nassam3/mahmood/myPage
pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --use-pnpm --no-import-alias --turbopack --yes
```
If it refuses because the directory is non-empty (docs/, .git), scaffold into `/tmp/scaffold` and `rsync -a --exclude .git /tmp/scaffold/ ./`.

- [ ] **Step 2: Add scripts and deps**

```bash
pnpm add motion next-mdx-remote gray-matter
pnpm add -D @playwright/test @axe-core/playwright
```
In `package.json` scripts add: `"typecheck": "tsc --noEmit"`, `"test": "playwright test"`, `"test:content": "tsx tests/content.test.ts"` (add `pnpm add -D tsx`).

- [ ] **Step 3: Fonts**

`src/lib/fonts.ts`:
```ts
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})
export const geist = Geist({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
export const geistMono = Geist_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' })
```

- [ ] **Step 4: Tokens in `globals.css`** (replace file)

```css
@import 'tailwindcss';

@theme {
  --color-bg: #0f0e0c;
  --color-surface: #161513;
  --color-line: rgba(237, 232, 223, 0.08);
  --color-line-strong: rgba(237, 232, 223, 0.16);
  --color-text: #ede8df;
  --color-muted: #a39e94;
  --color-faint: #6b665e;
  --color-accent: #e0863c;
  --font-display: var(--font-display), Georgia, serif;
  --font-sans: var(--font-sans), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
  --text-display: clamp(3.5rem, 6vw + 1rem, 7.5rem);
  --text-title: clamp(2rem, 2.5vw + 1rem, 3rem);
}

:root { color-scheme: dark; }
html { scroll-behavior: smooth; }
body { @apply bg-bg text-text font-sans antialiased; font-size: 17px; line-height: 1.6; }
::selection { background: color-mix(in oklab, var(--color-accent) 40%, transparent); }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }

.eyebrow { @apply font-mono text-[12px] uppercase tracking-[0.18em] text-faint; }
.hairline { border-color: var(--color-line); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 5: Layout shell**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import './globals.css'
import { fraunces, geist, geistMono } from '@/lib/fonts'
import { site } from '@/content/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
```
(`@/` alias: ensure `tsconfig.json` has `"paths": {"@/*": ["./src/*"]}`.) `site.ts` is created in Task 2; for this task create a minimal `src/content/site.ts` with `name, title, description, url` only.

`src/app/page.tsx` temporarily: `<main id="main"><h1 className="font-display text-[length:var(--text-display)]">Mahmood Nassar</h1></main>`.

- [ ] **Step 6: Verify**

Run: `pnpm typecheck && pnpm lint && pnpm build`
Expected: all pass; build shows `/` as static (○).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js app with design tokens and fonts"
```

---

### Task 2: Content model and content test

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`, `src/content/threads.ts`, `src/content/projects.ts`, `src/content/journey.ts`, `src/content/stack.ts`, `src/content/agents.ts`, `src/content/about.ts`, `src/content/dafsha.ts`
- Test: `tests/content.test.ts`

**Interfaces (Produces):**
```ts
export type Status = 'live'|'building'|'experiment'|'prototype'|'research'|'internal'|'community'
export type Channel = 'linkedin'|'github'|'instagram'|'email'
export type Thread = { n: string; title: string; body: string; status: Status; anchor?: string }
export type Project = { slug: string; title: string; kicker: string; status: Status; problem: string; thinking: string; build: string; tech: string[]; learning: string }
export type Stage = { title: string; question?: string; body: string }
export type Layer = { name: string; items: string[] }
export type AgentKind = { name: string; does: string }
export const STATUS_LABEL: Record<Status,string>  // 'Live','Building','Experiment','Prototype','Research','Internal engineering work','Community initiative'
```
`site.ts` exports `site` with `name, title, description, positioning, supporting, url, links: Record<Channel, string|null>, statusWord: 'building'`.

- [ ] **Step 1: Write the content test** (`tests/content.test.ts`, run with `tsx`, uses `node:assert`)

```ts
import assert from 'node:assert/strict'
import { threads } from '../src/content/threads'
import { projects } from '../src/content/projects'
import { journey } from '../src/content/journey'
import { stack } from '../src/content/stack'
import { agents } from '../src/content/agents'
import { about } from '../src/content/about'
import { dafsha } from '../src/content/dafsha'
import { site } from '../src/content/site'

const BANNED = /\b(visionary|thought leader|disruptive|world-class|serial entrepreneur|ai expert|industry leader|passionate|enthusiast|innovative|results-driven)\b/i
const all = JSON.stringify({ threads, projects, journey, stack, agents, about, dafsha, site })

assert.ok(!BANNED.test(all), `banned word found: ${all.match(BANNED)?.[0]}`)
assert.equal(threads.length, 4)
assert.deepEqual(threads.map(t => t.n), ['01','02','03','04'])
assert.equal(projects.length, 4)
for (const p of projects) for (const k of ['problem','thinking','build','learning'] as const) assert.ok(p[k].length > 40, `${p.slug}.${k} too short`)
assert.equal(new Set(projects.map(p => p.slug)).size, 4)
assert.equal(journey.length, 7)
for (const v of Object.values(site.links)) assert.ok(v === null || /^(https?:|mailto:)/.test(v), 'link must be null or absolute')
console.log('content ok')
```

- [ ] **Step 2: Run, expect failure** — `pnpm test:content` → module not found.

- [ ] **Step 3: Write content files.** Copy below is the first draft; keep the voice: short sentences, specific, no buzzwords.

`types.ts` as in Interfaces plus `STATUS_LABEL`.

`site.ts`:
```ts
export const site = {
  name: 'Mahmood Nassar',
  title: 'Mahmood Nassar — Engineer, Builder & AI Explorer',
  description: 'Software engineer building automation infrastructure, AI agents for real engineering workflows, early products and a technology community.',
  positioning: 'Engineer by background. Builder by nature.',
  supporting: 'I build software, automation, AI systems, products and communities.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  statusWord: 'building',
  links: { linkedin: null, github: null, instagram: null, email: null } as Record<Channel, string | null>,
}
```

`threads.ts` — 01 AI × Engineering (status `experiment`): "Exploring how autonomous and semi-autonomous agents can do real work inside software engineering workflows: investigating repositories, cloud environments and issue trackers, driving browsers, answering questions from a team's own knowledge." 02 Career intelligence (`building`): "Building a system that discovers relevant companies, watches their careers pages, collects fresh roles, drops stale ones and classifies what's left by role and seniority — with agents that verify what they find." 03 Product experiments (`research`): "Testing ideas around founders and builders: how people get from an idea to a first version, what stops them, how they find partners, and how to validate before overbuilding." 04 Dafsha (`community`): "Growing a community that helps Arabic-speaking people navigate high-tech careers: mentoring, guidance, opportunities and the connections that make a difference."

`projects.ts` — four entries per spec §5, each field 1–3 sentences. `tech` arrays: (1) `['Python','pytest','Docker','AWS','CI/CD','REST APIs','PostgreSQL']`, (2) `['Python','LLM agents','tool use','AWS','Playwright','knowledge retrieval']`, (3) `['Python','FastAPI','PostgreSQL','scheduled jobs','LLM classification','Next.js']`, (4) `['Next.js','interviews','landing tests']`.

`journey.ts` — seven stages; `question` set on three: Automation → "How do I test this?", Infrastructure → "How do I build the system?", Product building → "What problem should we solve?".

`stack.ts` — layers: Execution `['Python','pytest','Playwright','async workflows']`; Infrastructure `['AWS','Docker','GitHub Actions','CI/CD']`; Services `['FastAPI','REST APIs','microservices','PostgreSQL']`; Tooling `['SDK clients','reporting','developer tooling','AI agents','Next.js']`.

`agents.ts` — engineering, research, cloud, issue tracker, browser, automation, knowledge — each `does` one plain-English sentence.

`about.ts` — `{ lead: "I'm interested in the space between an idea and a working system.", paragraphs: string[4] }`.

`dafsha.ts` — `{ statement: 'Technology matters most when it helps people move forward.', body: string[2], pillars: ['Community','Mentoring','Opportunities','People','Career growth'], scale: 'Hundreds of community members' }`.

- [ ] **Step 4: Run** `pnpm test:content` → `content ok`.
- [ ] **Step 5: Commit** — `git commit -m "feat(content): typed site content and content rules test"`

---

### Task 3: `Section`, `Eyebrow`, `StatusBadge`, `Reveal`, motion lib

**Files:**
- Create: `src/lib/motion.ts`, `src/components/ui/Section.tsx`, `src/components/ui/Eyebrow.tsx`, `src/components/ui/StatusBadge.tsx`, `src/components/ui/Reveal.tsx`, `src/components/ui/LinkArrow.tsx`

**Interfaces (Produces):**
- `Section({ id, eyebrow, title, intro?, children, className? })` renders `<section id data-stage aria-labelledby={id+'-title'}>` with `<h2 id={id+'-title'}>`.
- `StatusBadge({ status })` — dot + `STATUS_LABEL[status]`; dot is accent for `building|live`, faint otherwise.
- `Reveal({ children, delay?, as? })` — client component using `motion` `whileInView` with `reveal` variant.
- `lib/motion.ts` exports `reveal` variants and `viewport = { once: true, amount: 0.2 }`.

- [ ] **Step 1: Implement**

`lib/motion.ts`:
```ts
export const reveal = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] } } }
export const viewport = { once: true, amount: 0.2 } as const
```
`Reveal.tsx` (`'use client'`): `import { motion, useReducedMotion } from 'motion/react'`; if reduced motion, render children in a plain `div`; else `<motion.div variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }}>`.

`Section.tsx`: layout = `<section className="relative py-24 md:py-32 border-t hairline">` → inner `mx-auto max-w-[1200px] px-4 md:px-8 md:grid md:grid-cols-12 md:gap-8`; header in cols 1–4 (eyebrow, h2 `font-display text-[length:var(--text-title)] font-light leading-[1.05]`, intro `text-muted mt-4`), children in cols 5–12.

- [ ] **Step 2: Use in `page.tsx`** with one dummy section; `pnpm build` passes.
- [ ] **Step 3: Commit** — `feat(ui): section, badge, reveal primitives`

---

### Task 4: PipelineRail (signature)

**Files:**
- Create: `src/components/pipeline/PipelineRail.tsx` (client), `src/components/pipeline/StageMarker.tsx`, `src/components/pipeline/useActiveStage.ts`
- Modify: `src/app/layout.tsx` (render rail), `src/components/ui/Section.tsx` (adds `data-stage={id}` and `data-stage-label={eyebrow}`)

**Interfaces:**
- `useActiveStage(): { stages: {id,label}[]; activeId: string|null }` — on mount queries `[data-stage]`, observes each with `IntersectionObserver` (`rootMargin: '-40% 0px -55% 0px'`), active = the one intersecting.
- `PipelineRail` renders `<nav aria-label="Sections">` fixed at `left-3 md:left-6 top-1/2 -translate-y-1/2`, hidden below `md` except a 1px line at the page's left edge (`fixed left-0 inset-y-0 w-px bg-line`). Each `StageMarker` is an `<a href={'#'+id}>` with a 6px dot; active dot `bg-accent scale-125` and shows the label (`eyebrow` style) on `md+`. Line between markers `w-px bg-line-strong`.
- Rail is `hidden` when `document.documentElement.scrollTop < 200` (hero) — fade via `opacity`.

- [ ] **Step 1: Implement per interface.** Keep `PipelineRail` ≤ 80 lines; the observer logic lives in the hook.
- [ ] **Step 2: Manual check** in `pnpm dev`: scrolling changes active dot; clicking a dot scrolls.
- [ ] **Step 3: Commit** — `feat(pipeline): fixed stage rail with active-section tracking`

---

### Task 5: Hero — RoutingDiagram, StatusChip, Hero layout

**Files:**
- Create: `src/components/hero/Hero.tsx`, `src/components/hero/RoutingDiagram.tsx` (client), `src/components/hero/StatusChip.tsx`, `src/components/hero/Portrait.tsx`
- Create: `src/components/pipeline/Packet.tsx`

**Interfaces:**
- `RoutingDiagram({ words: string[] })` — SVG `viewBox="0 0 600 400"`, four word-nodes at fixed points (`(80,80) (520,110) (120,320) (480,300)`), one cubic path `M80 80 C 300 20, 400 200, 520 110 S 300 380, 120 320 S 400 260, 480 300` with `id="route"`, stroke `var(--color-line-strong)`. Three `Packet`s animate along it.
- `Packet({ delay, duration, idle })` — `<circle r=3 fill=accent>` with CSS `offset-path: path('…')`, keyframes `route` from `offset-distance: 0%` to `100%`. Idle loop: `animation: route 6s linear infinite; opacity .5`. First pass: 2.4s once via a wrapper class toggled after mount. Under reduced motion: static dots at 0/50/100%.
- `StatusChip({ word, count })` → `● building — 4 active threads` in mono, dot `bg-accent animate-pulse` (pulse disabled under reduced motion).
- `Portrait({ src?: string })` — `next/image` 4:5, `sizes="(max-width: 768px) 70vw, 420px"`, `priority`; if `src` undefined renders placeholder `div` with hairline frame and a diagonal `line` SVG.
- `Hero` grid: on `md+` 12 cols — text cols 1–7, portrait cols 8–12 with `RoutingDiagram` absolutely positioned behind the portrait, bleeding left. On mobile: portrait first (60vw wide, right-aligned), then name.

Copy from `site`: eyebrow `Mahmood Nassar · engineer / builder`, h1 three lines `Engineer.` `Builder.` `Experimenter.` (Fraunces, `--text-display`, italic on the last word), then `site.positioning` (Fraunces italic, muted, 22px), `site.supporting` (body). CTAs: primary `<a href="#building">` filled `bg-text text-bg`, secondary `<a href="#connect">` hairline outline. Four words `ENGINEERING AI PRODUCT COMMUNITY` come from a `WORDS` const in `Hero.tsx`.

- [ ] **Step 1: Implement.** `Hero.tsx` ≤ 120 lines.
- [ ] **Step 2: Check** `pnpm build`; dev view at 390px and 1440px.
- [ ] **Step 3: Commit** — `feat(hero): routing diagram, status chip, portrait slot`

---

### Task 6: Portrait fallback test + image drop-in

**Files:**
- Create: `src/lib/portrait.ts` — `export function portraitSrc(): string|undefined` uses `fs.existsSync(path.join(process.cwd(),'public/images/mahmood.jpg'))` at build time (server component only).
- Test: `tests/smoke.spec.ts` (start file; grows later)

- [ ] **Step 1: Test** — Playwright: `/` has `[data-testid="portrait"]` visible at both viewports (placeholder or image).
- [ ] **Step 2: Implement** `portraitSrc`, wire into `Hero`.
- [ ] **Step 3: If `public/images/mahmood.jpg` present** (Mahmood dropped a photo in the project root): `mkdir -p public/images && mv <photo> public/images/mahmood.jpg`, optimise with `sips -Z 1200`.
- [ ] **Step 4: Commit** — `feat(hero): build-time portrait detection`

---

### Task 7: Currently Building + Selected Work

**Files:**
- Create: `src/components/sections/CurrentlyBuilding.tsx`, `src/components/sections/ThreadCard.tsx`, `src/components/sections/Work.tsx`, `src/components/sections/ProjectStory.tsx`, `src/components/ui/TiltCard.tsx` (client)

**Interfaces:**
- `ThreadCard({ thread })` — surface panel with a short horizontal branch line on the left connecting to the rail visually (`before:` pseudo 24px `bg-line-strong`), `n` in mono accent-less, title (Fraunces 28px), body, `StatusBadge`.
- `ProjectStory({ project, index })` — vertical mini-pipeline: five labelled steps (Problem, Thinking, Build, Technology, Learning) each `grid-cols-[96px_1fr]` with mono label, a 1px vertical line joining step dots, `tech` as mono chips, `StatusBadge` in header. Wrapped in `TiltCard`.
- `TiltCard` — on `pointer:fine` and no reduced motion, `onPointerMove` sets `--rx/--ry` (±1°) via `style`, `transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))`, resets on leave.

- [ ] **Step 1: Implement.** `CurrentlyBuilding` grid 2×2 on `md+`, stack on mobile. `Work` stacks `ProjectStory`s with `space-y-16`.
- [ ] **Step 2: Compose in `page.tsx`** with `Section id="building" eyebrow="01 — Currently building" title="Four threads, one loop."` and `Section id="work" eyebrow="02 — Selected work" title="Stories, not screenshots."`.
- [ ] **Step 3: Commit** — `feat(sections): currently building and project stories`

---

### Task 8: Engineering map + AI agent flow

**Files:**
- Create: `src/components/sections/Engineering.tsx`, `src/components/sections/EngineeringMap.tsx`, `src/components/sections/AI.tsx`, `src/components/sections/AgentFlow.tsx`

**Interfaces:**
- `EngineeringMap({ layers })` — four horizontal bands (`border-t hairline`), band name in eyebrow style left, items as node chips (`rounded-full border hairline px-3 py-1 font-mono text-[13px]`) with a 4px dot; bands connected by a 1px vertical line on the left.
- `AgentFlow({ agents })` — vertical flow Human → Agent → Tools → Systems → Outcome (five nodes joined by a line with a single `Packet` looping); `agents` rendered as satellites in a wrapped row beside the Agent node; each shows `name` and `does` on `md+`, name only on mobile with `does` in a `<details>`.

Copy: Engineering title `I don't just automate tests. I build the systems that make automation possible.` intro from a new `src/content/engineering.ts` `{ intro: string }` (one paragraph on distributed execution, containers, CI, clients, cleanup, reporting — public-safe). AI title `AI that does work, not demos.` intro from `src/content/ai.ts`.

- [ ] **Step 1: Implement**; add both content files; extend `tests/content.test.ts` to include them in the banned-word check.
- [ ] **Step 2: Compose** `Section id="engineering" eyebrow="03 — Engineering"` and `Section id="ai" eyebrow="04 — AI"`.
- [ ] **Step 3: Commit** — `feat(sections): engineering map and agent flow`

---

### Task 9: Dafsha + Journey

**Files:**
- Create: `src/components/sections/Dafsha.tsx`, `src/components/sections/Journey.tsx`, `src/components/sections/JourneyLine.tsx` (client)

**Interfaces:**
- `Dafsha` — breaks the grid: full-width, `bg-surface`, statement in Fraunces `clamp(2rem,4vw,3.5rem)` italic, two body paragraphs, pillars as a mono list separated by `·`, `scale` in muted. Eyebrow `05 — Dafsha · community`.
- `JourneyLine` — `useScroll({ target: ref, offset: ['start 80%','end 60%'] })`; a vertical line whose `scaleY` follows progress; seven `Stage` rows to its right; stages with `question` show it in Fraunces italic accent-less, larger.

- [ ] **Step 1: Implement.** Reduced motion → line fully drawn.
- [ ] **Step 2: Compose** `Section id="dafsha"` (custom, no `Section` grid) and `Section id="journey" eyebrow="06 — Journey" title="Expanding scope."`.
- [ ] **Step 3: Commit** — `feat(sections): dafsha and journey`

---

### Task 10: About + Connect (null-link test)

**Files:**
- Create: `src/components/sections/About.tsx`, `src/components/sections/Connect.tsx`, `src/components/ui/ChannelLink.tsx`
- Test: extend `tests/smoke.spec.ts`

**Interfaces:**
- `ChannelLink({ channel, href })` — if `href` is a string: `<a href target=_blank rel="noreferrer">` with label and arrow; if `null`: `<span aria-disabled="true" data-testid="channel-placeholder">LinkedIn — coming soon</span>` in faint.
- `Connect` — h2 `Building something interesting?` (Fraunces display size), sub `Let's talk about technology, AI, products or ideas.`, four `ChannelLink`s in a grid, footer line `© {year} Mahmood Nassar · Built with Next.js` in mono.

- [ ] **Step 1: Test**
```ts
test('null links render placeholders, never bad hrefs', async ({ page }) => {
  await page.goto('/')
  const bad = await page.locator('a[href="null"], a[href="#"], a[href=""]').count()
  expect(bad).toBe(0)
  await expect(page.getByTestId('channel-placeholder').first()).toBeVisible()
})
```
- [ ] **Step 2: Implement**, compose `id="about"` and `id="connect"`.
- [ ] **Step 3: Run** `pnpm test` → passes.
- [ ] **Step 4: Commit** — `feat(sections): about and connect`

---

### Task 11: Field Notes (MDX)

**Files:**
- Create: `src/lib/notes.ts`, `src/content/notes/*.mdx` (3 seed notes), `src/app/notes/page.tsx`, `src/app/notes/[slug]/page.tsx`, `src/components/sections/Notes.tsx`, `src/components/notes/NoteCard.tsx`, `src/components/notes/Prose.tsx`
- Test: `tests/notes.test.ts` (tsx)

**Interfaces:**
- `notes.ts`: `type NoteMeta = { slug, title, date: string /* ISO */, summary, tags: string[] }`; `getNotes(): NoteMeta[]` sorted desc; `getNote(slug): { meta: NoteMeta; content: string }`; throws `Error(\`Note ${file}: missing ${field}\`)` when `title`, `date` or `summary` absent.
- Rendering with `MDXRemote` from `next-mdx-remote/rsc` inside `Prose` (`max-w-[68ch]`, Fraunces headings, body 18px).

- [ ] **Step 1: Test** — write a temp mdx without `date` to a tmp dir, call `parseNote(raw, 'x.mdx')` (export it), assert it throws `/missing date/`. Also `getNotes()` returns 3 sorted desc.
- [ ] **Step 2: Implement** loader (`fs.readdirSync`, `gray-matter`), pages (`generateStaticParams`, `generateMetadata`), `Notes` section with latest three `NoteCard`s (date mono, title Fraunces, summary) and "All notes →" link.
- [ ] **Step 3: Write 3 seed notes** (~300 words each, first-person, honest, dated 2026-09-*): the three titles from spec §5.
- [ ] **Step 4: Run** `pnpm test:content && pnpm build` — `/notes/[slug]` shows 3 static paths.
- [ ] **Step 5: Commit** — `feat(notes): MDX field notes with index and pages`

---

### Task 12: Mobile nav, reduced-motion & overflow tests, a11y

**Files:**
- Create: `src/components/ui/MobileNav.tsx` (client) — sticky bottom bar on `<md`, `backdrop-blur`, four anchors: Building, Work, Notes, Connect.
- Modify: `tests/smoke.spec.ts`, `playwright.config.ts`

- [ ] **Step 1: Playwright config** — `webServer: { command: 'pnpm build && pnpm start', port: 3000, reuseExistingServer: true }`, projects `mobile` (390×844) and `desktop` (1440×900).
- [ ] **Step 2: Tests**
```ts
test('all stages present, no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', m => m.type() === 'error' && errors.push(m.text()))
  await page.goto('/')
  for (const id of ['building','work','engineering','ai','dafsha','journey','notes','about','connect']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
  expect(errors).toEqual([])
})
test('reduced motion renders final state', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const page = await ctx.newPage(); await page.goto('/')
  const hidden = await page.locator('main [style*="opacity: 0"]').count()
  expect(hidden).toBe(0)
})
test('no horizontal overflow at 320px', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 320, height: 700 } })
  const page = await ctx.newPage(); await page.goto('/')
  const sw = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(sw).toBeLessThanOrEqual(320)
})
test('axe clean', async ({ page }) => {
  await page.goto('/')
  const { violations } = await new AxeBuilder({ page }).analyze()
  expect(violations).toEqual([])
})
test('hero CTA activates building stage', async ({ page }) => {
  await page.goto('/'); await page.getByRole('link', { name: /see what i.m building/i }).click()
  await expect(page.locator('[data-active-stage="building"]')).toBeVisible()
})
```
(`PipelineRail` sets `data-active-stage={activeId}` on its nav; `Portrait` placeholder and image both carry `data-testid="portrait"`.)
- [ ] **Step 3: Run** `pnpm test`, fix whatever fails (likely contrast on `text-faint` — bump to `#7A756C` if axe flags it, and update spec token note in commit message).
- [ ] **Step 4: Commit** — `test: smoke, a11y, reduced-motion, overflow; feat: mobile nav`

---

### Task 13: SEO, OG image, sitemap, JSON-LD

**Files:**
- Create: `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg`
- Modify: `src/app/layout.tsx` (full `metadata`, JSON-LD `Person`)

- [ ] **Step 1: metadata** — `openGraph: { title, description, url, siteName: site.name, type: 'website' }`, `twitter: { card: 'summary_large_image' }`, `alternates: { canonical: '/' }`. JSON-LD `<script type="application/ld+json">` with `{ "@type": "Person", name, url, jobTitle: 'Software Engineer', sameAs: non-null links }`.
- [ ] **Step 2: OG image** via `ImageResponse` 1200×630: bg `#0F0E0C`, name in serif (load Fraunces from Google Fonts CSS in the route), positioning line, an amber dot on a hairline.
- [ ] **Step 3: sitemap** — `/`, `/notes`, each note. robots allow all.
- [ ] **Step 4: Verify** `pnpm build` and `curl -I localhost:3000/opengraph-image` → 200 `image/png`.
- [ ] **Step 5: Commit** — `feat(seo): metadata, OG image, sitemap, JSON-LD`

---

### Task 14: Design pass (the "before you finish" review)

- [ ] **Step 1:** Run dev, open at 390 and 1440 with Playwright screenshots into the scratchpad; review against spec §1 success criteria and brief §27 checklist.
- [ ] **Step 2:** Fix spacing, type rhythm, and anything that reads generic. Specifically check: hero reads in <10s; accent is scarce; Dafsha feels warmer; statuses honest; no employer info.
- [ ] **Step 3:** Lighthouse: `npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --quiet --output=json --output-path=<scratchpad>/lh.json` and read scores; fix until ≥95/100/100/100.
- [ ] **Step 4: Commit** — `polish: design pass and lighthouse fixes`

---

### Task 15: GitHub + Vercel

- [ ] **Step 1:** `gh auth status` shows `nassarMa` active. `gh repo create nassarMa/mahmood-nassar --public --source=. --remote=origin --push`.
- [ ] **Step 2:** Add `README.md` (what the site is, how to edit content in `src/content`, how to add a note, how to run tests). Commit and push.
- [ ] **Step 3:** Ask Mahmood to run `! npx vercel login` in this session. Then `npx vercel link --yes && npx vercel --prod`. Set `NEXT_PUBLIC_SITE_URL` to the production URL with `npx vercel env add`, redeploy.
- [ ] **Step 4:** Verify the live URL: `/`, `/notes`, `/opengraph-image` respond 200; paste the URL back.
