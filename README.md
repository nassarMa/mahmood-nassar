# mahmood-nassar

Personal website of Mahmood Nassar — engineer, builder, experimenter.

The visual spine is a **pipeline**: `problem → research → architecture → prototype → automation → product → feedback → iteration`, drawn as one line through the hero, down the page as a rail, and through each project story.

Built with Next.js (App Router, fully static), TypeScript, Tailwind CSS 4, `motion`, and MDX. No analytics, no trackers.

## Editing the site

All copy lives in `src/content/`. Components never contain prose.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, positioning line, description, footer note, social links (`null` = "coming soon" placeholder) |
| `hero.ts` | Hero eyebrow, the three headline lines, the four routed words, CTA labels |
| `stages.ts` | Section order, eyebrows, rail labels, section titles and intros, phone quick-nav |
| `threads.ts` | The four "Currently building" threads |
| `projects.ts` | Project stories (problem / thinking / build / tech / learning / status) |
| `engineering.ts`, `stack.ts` | Engineering headline and the technology layers |
| `ai.ts`, `agents.ts` | AI flow copy and the kinds of agent |
| `dafsha.ts` | Community section |
| `journey.ts` | The seven journey stages |
| `about.ts`, `connect.ts` | About and Connect copy |

Statuses come from `types.ts` (`live`, `building`, `experiment`, `prototype`, `research`, `internal`, `community`). Keep them honest.

### Adding a field note

Create `src/content/notes/<slug>.mdx`:

```md
---
title: Why fresh job data is much harder than scraping job boards
date: 2026-09-12
summary: One or two sentences shown in lists and as the page description.
tags: [career-tech, data]
---

Body in Markdown. `## Headings`, lists, **bold**, links and code all work.
```

`title`, `date` and `summary` are required; the build fails with a clear message if one is missing. The home page shows the latest three.

### Adding the portrait

Drop a photo at `public/images/mahmood.jpg` (4:5 works best, ≥ 1200px tall). The hero picks it up at build time; until then it renders a designed placeholder.

### Social links

Set the URLs in `src/content/site.ts` → `links`. Use `mailto:` for email. Anything left `null` renders as a disabled "coming soon" row.

## Development

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm typecheck      # tsc
pnpm lint           # eslint
pnpm test:content   # content rules (banned words, structure), portrait, notes loader
pnpm test           # Playwright: smoke, a11y (axe), reduced motion, 320px overflow, SEO
```

`tests/shots.mts` screenshots every section at phone and desktop widths for design review:

```bash
pnpm build && pnpm start &
pnpm tsx tests/shots.mts out/ [path] [tag]
```

## Deploying

The site deploys to Vercel from `main`. Set `NEXT_PUBLIC_SITE_URL` to the production URL (used for canonical links, the sitemap and Open Graph).
