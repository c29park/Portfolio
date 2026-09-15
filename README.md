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

### ⚠️ Read this before the first deploy: the videos

`public/projects/multimodal-encoder-visualizer/` holds two MP4s totalling **~120 MB**
(23 MB + 97 MB). They work as-is, but they are a poor fit for a git repo and for
Vercel's Hobby bandwidth allowance (100 GB/month — the 97 MB demo would exhaust
that in roughly 1,000 plays).

**The plan:** move the 14-minute demo to YouTube, keep the 6:28 explainer
self-hosted. At 23 MB it's under GitHub's 50 MB warning line and starts
instantly, and a native player without YouTube chrome looks better.

### Swapping the demo to YouTube

1. Upload `public/projects/multimodal-encoder-visualizer/app-demonstration-1080p.mp4`
   to YouTube as **Unlisted**.
2. Copy the 11-character ID from the URL (`youtu.be/<videoId>`).
3. In `src/content/projects.ts`, replace the `kind: "video"` App Demonstration
   block with the commented-out `kind: "youtube"` template directly above it,
   pasting in the ID.
4. Delete the MP4 and rewrite it out of git history (it is only in one commit):

   ```bash
   git rm --cached public/projects/multimodal-encoder-visualizer/app-demonstration-1080p.mp4
   rm public/projects/multimodal-encoder-visualizer/app-demonstration-1080p.mp4
   # then rewrite the single commit that introduced it, and force-push
   ```

The embed is a **click-to-load facade** (`src/components/YouTubeEmbed.tsx`): the
page renders your own poster image, and YouTube's player — roughly a megabyte of
JS, plus its cookies — only loads if a visitor actually presses play. It uses
`youtube-nocookie.com`.

### Other options considered



1. **Vercel Blob** (cleanest). `npx vercel blob put <file>`, then replace the
   `src` in `src/content/projects.ts` with the returned URL. Blob is built for
   this and is served from the same edge network.
2. **YouTube / Vimeo unlisted.** Upload the 14-minute demo, then swap the
   `video` block for an iframe embed. Zero bandwidth cost, gives you a scrubbable
   player and captions for free.
3. **Ship as-is.** Fine for a low-traffic personal site. Delete the MP4s from git
   history later if it becomes a problem — or track them with Git LFS from the start.

Every video block reads its `src` from `src/content/projects.ts`, so switching to
a hosted URL is a one-line change per video.

## Adding another project

All content lives in `src/content/projects.ts` — no MDX, no CMS.

1. Drop media into `public/projects/<slug>/`.
2. Add a `Project` object with a `blocks` array. Block kinds available:
   `prose`, `video`, `figure`, `table`.
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
  components/Blocks.tsx         renderer for each block kind
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
