# Project Hub

One link for the bio. A mobile-first "home screen" of every app, game, tool
and experiment I've built: tap an icon to see what it is, watch a clip, read
the story, and launch it.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and `motion`.
Content is files in the repo; a bad file fails the build. No database, no
trackers.

## Adding a project

1. Create `content/projects/<slug>/project.json` (slug: lowercase, hyphens):

```json
{
  "title": "Name shown under the icon",
  "tagline": "One line, ≤ 120 chars",
  "url": "https://the-live-app.example",
  "kind": "app | game | tool | experiment",
  "tags": ["ai", "game"],
  "folder": "Games",
  "date": "2026-10-10",
  "status": "live | beta | archived",
  "lang": "en",
  "featured": false,
  "icon": "icon.svg",
  "media": { "cover": "cover.png", "demo": "demo.mp4" },
  "links": { "reel": "https://www.instagram.com/reel/…", "source": "https://github.com/…" }
}
```

   `folder` groups icons into a folder on the home screen; omit it to keep the
   icon loose. `media` and `links` are optional. Media values are file names in
   `public/projects/<slug>/` or `https://` URLs.

2. Put the media in `public/projects/<slug>/`: `icon.svg` or `icon.png`
   (512×512), optional `cover.png` (phone screenshot works well) and an
   optional `demo.mp4` (≤ 10 s, muted, ≤ 3 MB).

3. Optional `content/projects/<slug>/story.md`: what it is, how it was built,
   what you learned. Markdown; no raw HTML.

4. To pin it in the dock, add the slug to `dock` in `content/creator.json`
   (max 4). Projects released in the last 14 days get a "new" dot.

`content/creator.json` holds the name, handle, tagline, avatar and social
links shown in the top bar (`null` hides a link).

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm check        # lint + typecheck + unit tests + build
pnpm test:e2e     # Playwright on a 390×844 viewport (builds and starts the app)
```

## Deploying

Deploys to Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production URL (used
for canonical links, the sitemap and Open Graph images).
