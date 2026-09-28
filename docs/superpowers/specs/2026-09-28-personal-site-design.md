# Mahmood Nassar — personal site: design spec

Date: 2026-09-28
Status: approved in conversation, awaiting written review

## 1. Purpose

A personal website for Mahmood Nassar that reads, within ten seconds, as the
home of a technically strong engineer who is becoming a builder, product
thinker, founder-in-progress, mentor and community creator. It must not read
as a developer portfolio, résumé or SaaS landing page.

Primary audience: people who met Mahmood at an event or on LinkedIn/Instagram
and searched for him. Most visits arrive on a phone.

Success looks like a visitor thinking: "He clearly knows engineering, he
actually builds things, he uses AI practically, he thinks beyond his title,
he's ambitious but grounded, I'd like to talk to him."

## 2. Concept: "Ideas → Systems"

Mahmood's own working model — `problem → research → architecture → prototype
→ automation → product → feedback → iteration` — is drawn as one continuous
fine line, the **pipeline**, and used as the visual spine of the site.

- In the hero it routes through the four words ENGINEERING · AI · PRODUCT ·
  COMMUNITY, connecting them. Small "packets" (dots) travel along it once on
  load, then pulse idly.
- Down the page it becomes a thin rail (left of content on desktop, left
  page edge on mobile). Each section is a stage on it. The marker for the
  section in view is lit; the others are dim.
- Project stories are told along the same pipeline: Problem → Thinking →
  Build → Technology → Learning → Status.
- The Journey section is the line widening: "How do I test this?" → "How do
  I build the system?" → "What problem should we solve?"

Positioning line: **"Engineer by background. Builder by nature."**
Supporting line: "I build software, automation, AI systems, products and
communities."

A CI-style status chip in the hero reads `● building — 4 active threads`.
The count derives from `threads.ts`, never hard-coded.

## 3. Information architecture

Single page `/` with these sections in order, each a stage on the rail:

1. **Hero** — name, positioning line, portrait, routing diagram, status chip,
   two CTAs ("See what I'm building" → #building, "Connect" → #connect).
2. **Currently building** (`#building`) — four numbered threads:
   01 AI × Engineering, 02 Career intelligence, 03 Product experiments,
   04 Dafsha. Each: number, title, one-paragraph description, status tag.
3. **Selected work** (`#work`) — four project stories (see §5).
4. **Engineering** (`#engineering`) — headline "I don't just automate tests.
   I build the systems that make automation possible." plus an engineering
   map: technologies as labelled nodes grouped into four layers
   (Execution · Infrastructure · Services · Tooling). No skill bars.
5. **AI** (`#ai`) — "AI that does work, not demos." A vertical flow
   Human → Agent → Tools → Systems → Outcome, with agent types (engineering,
   research, cloud, issue-tracker, browser, automation, knowledge) as
   satellites off the Agent node. Written for non-engineers.
6. **Dafsha** (`#dafsha`) — the one section that breaks the technical grid:
   warmer, larger type, people-first copy. "Technology matters most when it
   helps people move forward." Describes Dafsha as a community initiative
   co-founded by Mahmood helping Arabic-speaking people navigate high-tech
   careers; "hundreds of members"; mentoring, career guidance, opportunities,
   connections. No frozen numbers.
7. **Journey** (`#journey`) — seven stages: Software engineering → Automation
   → Infrastructure → Technical leadership → AI → Product building →
   Entrepreneurship, framed as expanding scope, not employment history. No
   employer names.
8. **Field notes** (`#notes`) — latest three notes with link to `/notes`.
9. **About** (`#about`) — "I'm interested in the space between an idea and a
   working system." Four short paragraphs, one with personality.
10. **Connect** (`#connect`) — "Building something interesting?" LinkedIn,
    GitHub, Instagram, Email. Links come from `site.ts`; unset links render
    as visibly disabled placeholders, never invented.

Additional routes:

- `/notes` — list of all notes, newest first.
- `/notes/[slug]` — a note rendered from MDX.
- `/opengraph-image` — generated OG card (name, positioning line, pipeline).
- `/sitemap.xml`, `/robots.txt`.

No other pages.

## 4. Visual system

- **Background** warm near-black `#0F0E0C`; surfaces `#161513`; hairlines
  `rgba(237,232,223,0.08)`.
- **Text** warm paper `#EDE8DF`; muted `#A39E94`; faint `#6B665E`.
- **Accent** burnt amber `#E0863C`, used only for pipeline packets, active
  stage markers, status dots and link hover. Nothing else is orange.
- **Type** Fraunces (display, optical size high, weight 300–500 with
  italics for emphasis), Geist Sans (body), Geist Mono (eyebrows, numbers,
  timestamps, status). Loaded with `next/font`, `display: swap`.
- **Scale** display 56–120px fluid (`clamp`), section titles 32–48px, body
  17px/1.6, mono labels 12–13px uppercase tracked.
- **Grid** 12-col desktop, 4-col mobile, 16px gutters on phones, max width
  1200px. A faint 1px hairline grid is drawn in the hero only.
- **Glass/blur** only on the sticky mini-nav on mobile.
- Dark theme only. `color-scheme: dark`.

Tokens live in `src/app/globals.css` as CSS variables and are mapped to
Tailwind v4 `@theme`.

## 5. Content model

All copy lives in `src/content/`. Components take typed props and never
contain prose.

```ts
// site.ts
export const site = {
  name: 'Mahmood Nassar',
  title: 'Mahmood Nassar — Engineer, Builder & AI Explorer',
  description: 'Software engineer building automation systems, AI-powered workflows, products and technology communities.',
  positioning: 'Engineer by background. Builder by nature.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000', // Vercel URL set in env; custom domain later
  links: { linkedin: null, github: null, instagram: null, email: null } as Record<Channel, string | null>,
}

// threads.ts — Currently building
type Thread = { n: '01'|'02'|'03'|'04'; title: string; body: string; status: Status }

// projects.ts — Selected work
type Status = 'live' | 'building' | 'experiment' | 'prototype' | 'research' | 'internal' | 'community'
type Project = {
  slug: string; title: string; kicker: string; status: Status;
  problem: string; thinking: string; build: string; tech: string[]; learning: string;
}

// journey.ts — Stage[] { title, question?, body }
// stack.ts   — Layer[] { name, items: string[] }
// agents.ts  — AgentKind[] { name, does: string }
// notes/*.mdx — frontmatter { title, date, summary, tags[] }
```

Initial projects (public-safe, honest statuses):

1. **Automation infrastructure for distributed systems** — `internal`.
   Problem: teams writing more tests without the system to run them well.
   Build: pytest architecture, distributed execution, Dockerised runners on
   AWS, API/SDK clients, DB cleanup, reporting, CI/CD. No employer or
   service names.
2. **Engineering agents** — `experiment`. Agents that investigate
   repositories, cloud environments, issue trackers and browsers, and a
   knowledge layer for engineering teams. Learning: where agents earn trust
   and where they don't.
3. **Career intelligence** — `building`. Discovering companies, monitoring
   careers pages, collecting fresh roles, filtering stale ones, classifying
   by role/seniority, agents that verify. Learning: fresh job data is much
   harder than scraping boards.
4. **Idea ↔ builder matching** — `research`. Connecting people with product
   ideas to people who can build them; what stops early founders; validating
   before overbuilding.

Seed notes (three): "What happens when AI agents enter real engineering
workflows?", "Why fresh job data is much harder than scraping job boards",
"Building infrastructure instead of writing more tests". Each ~300 words,
written as drafts Mahmood can edit.

Content rules: no buzzwords (visionary, thought leader, disruptive,
world-class, serial entrepreneur, AI expert, industry leader, passionate,
enthusiast, innovative, results-driven). No employer, service, ticket, URL or
customer details. Experiments never described as companies.

## 6. Components

```
src/app/
  layout.tsx            fonts, metadata, <PipelineRail/>, skip link
  page.tsx              composes sections in order
  globals.css           tokens, base, reduced-motion
  notes/page.tsx        note index
  notes/[slug]/page.tsx MDX note, generateStaticParams
  opengraph-image.tsx   generated OG (ImageResponse)
  sitemap.ts robots.ts
src/components/
  pipeline/PipelineRail.tsx   fixed rail + markers; observes sections via IntersectionObserver
  pipeline/Packet.tsx         dot animated with CSS offset-path along an SVG path
  pipeline/StageMarker.tsx
  hero/Hero.tsx  hero/RoutingDiagram.tsx (SVG, four word-nodes, one path)
  hero/Portrait.tsx  hero/StatusChip.tsx
  sections/CurrentlyBuilding.tsx  Work.tsx  ProjectStory.tsx  Engineering.tsx
           EngineeringMap.tsx  AI.tsx  AgentFlow.tsx  Dafsha.tsx  Journey.tsx
           Notes.tsx  About.tsx  Connect.tsx
  ui/Section.tsx (id, eyebrow, title, children; registers as rail stage)
  ui/Eyebrow.tsx  StatusBadge.tsx  LinkArrow.tsx  Reveal.tsx  MobileNav.tsx
src/lib/notes.ts (reads MDX, sorts by date)  src/lib/motion.ts (variants)
src/content/ (as §5)
```

Each component has one purpose and takes data as props. No component exceeds
~150 lines; if one does, split it.

Portrait: `public/images/mahmood.jpg`, rendered with `next/image`, sizes
attribute for 320–640px, `priority`. Until the file exists, `Portrait`
renders a designed placeholder (hairline frame with the pipeline passing
through) so the layout is identical before and after.

## 7. Motion

- One shared reveal: opacity 0→1, y 12→0, 0.5s, ease-out, triggered once at
  20% visibility. Used by `Reveal`.
- Hero routing packets: CSS `offset-path` along the SVG path, 2.4s once on
  load, then a 6s idle loop at low opacity.
- Rail marker: active marker scales and takes the accent; 200ms.
- Project cards: 1° tilt toward cursor on hover, desktop only, pointer:fine.
- Journey line width grows with scroll progress via `motion` `useScroll`.
- Everything disabled under `prefers-reduced-motion: reduce` (elements render
  in their final state).
- No parallax. No scroll-jacking. No autoplaying text cyclers.

## 8. Performance, accessibility, SEO

- Fully static export of all routes (`generateStaticParams` for notes).
- Lighthouse mobile targets: Performance ≥ 95, Accessibility 100, Best
  Practices 100, SEO 100. LCP element is the hero headline (text), not the
  image.
- Fonts subset to latin; two Fraunces axes only.
- Semantic landmarks: header, main, nav, section with `aria-labelledby`,
  footer. Skip link. Focus rings visible. Colour contrast ≥ 4.5:1 for text.
- Metadata via the App Router `metadata` export: title, description,
  OpenGraph, Twitter card, canonical. JSON-LD `Person` in layout.
- No analytics or third-party scripts by default.

## 9. Testing

- `pnpm lint` (ESLint, next config) and `pnpm typecheck` (`tsc --noEmit`).
- Playwright smoke (`tests/smoke.spec.ts`), run against `next start` at
  390×844 and 1440×900:
  - `/` renders; all ten section ids exist and are visible after scroll.
  - No console errors.
  - Hero CTA scrolls to `#building`; rail marker for `#building` becomes
    active.
  - `/notes` lists three notes; each note page renders its title.
  - axe (`@axe-core/playwright`) reports no violations on `/` and one note.
- Lighthouse run manually before the first deploy; results recorded in the
  PR/commit message.

## 10. Delivery

- Repo: public `nassarMa/mahmood-nassar`, branch `main`, created with
  `gh repo create` under the `nassarMa` account.
- Commits: conventional, small (scaffold, tokens, pipeline, hero, each
  section, notes, tests, seo).
- Deploy: Vercel via `npx vercel` (one interactive login by Mahmood), then
  production deploy from `main`. `site.url` updated to the Vercel URL until
  a custom domain is added.

## 11. Out of scope

Light theme, i18n/Arabic, CMS, comments, newsletter, analytics, contact form,
project detail pages, admin UI. Any of these is a separate spec.
