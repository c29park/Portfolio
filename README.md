# Chris Park — Portfolio

Next.js 15 (App Router) + Tailwind CSS v4, built to deploy on Vercel.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying to Vercel

Vercel auto-detects Next.js — no `vercel.json` needed.

**Option A — Git (recommended):**

```bash
git init
git add .
git commit -m "Initial portfolio"
gh repo create chris-park-portfolio --private --source=. --push
```

Then import the repo at [vercel.com/new](https://vercel.com/new). Every push deploys.

**Option B — CLI:**

```bash
npx vercel          # preview deploy
npx vercel --prod   # production deploy
```

## Video hosting

Both project videos live on **YouTube (unlisted)**, not in this repo:

| Section | Length | Video ID |
|---|---|---|
| Video Processing Explanation | 6:28 | `msgui-kY1lY` |
| App Demonstration | 14:16 | `igmpV1qh1a4` |

They were originally committed as MP4s (23 MB + 97 MB) and have since been
removed from git history. Keep it that way — a 97 MB blob in a git repo is
painful to undo, and a progressive MP4 has one fixed bitrate, so anyone on a
phone or a weak connection gets a stalling player. YouTube gives adaptive
streaming, instant seeking, and auto-captions.

### The embed is a click-to-load facade

`src/components/YouTubeEmbed.tsx` renders a static poster and a play button. The
iframe only mounts on click, so YouTube's player JS (~1 MB) and its cookies never
load for visitors who don't press play. When it does load, it uses
`youtube-nocookie.com`.

Posters are served from `public/projects/<slug>/` — your own frames, not
YouTube's auto-generated thumbnail. Omit `poster` on a block and it falls back to
`i.ytimg.com`.

### Adding another video

```ts
{
  kind: "youtube",
  heading: "Section title",
  caption: "One or two sentences.",
  videoId: "11CharIdHere",          // from youtu.be/<videoId>
  poster: "/projects/<slug>/my-poster.jpg",
  duration: "12:34",
}
```

The `kind: "video"` block is still supported for self-hosted MP4s — reasonable
for anything short (under ~10 MB). It renders identically.

## Adding another project

All content lives in `src/content/projects.ts` — no MDX, no CMS.

1. Drop media into `public/projects/<slug>/`.
2. Add a `Project` object with a `blocks` array. Block kinds available:
   `prose`, `video`, `youtube`, `figure`, `table`.
3. Push it into the exported `projects` array and remove the matching entry from
   `upcomingProjects`.

The route `/projects/[slug]` and the home page grid pick it up automatically.

## Structure

```
src/
  app/
    layout.tsx                  nav, footer, metadata
    page.tsx                    hero, project grid, about
    projects/[slug]/page.tsx    project detail (SSG)
    globals.css                 Tailwind v4 theme tokens
  components/
    Blocks.tsx                renderer for each block kind
    YouTubeEmbed.tsx          click-to-load YouTube facade
  content/
    site.ts                     name, bio, links
    projects.ts                 all project content
content/source/                 raw text scraped from the old Wix site (reference)
public/projects/                images and video
```

## Content provenance

Copy, figures, and video were imported from the previous Wix site
(`changhapark0501.wixsite.com/mysite`). The verbatim source text is preserved in
`content/source/multimodal-encoder-visualizer.md` for reference.

Two things to review:

- The old site had **no captions** on either video. The captions currently in
  `projects.ts` are placeholders marked with `TODO(chris)` — rewrite them.
- The old page title was misspelled "Multimdoal Encoder Visualizer"; it is
  corrected here.
