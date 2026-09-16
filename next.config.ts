import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

// No custom Cache-Control here on purpose.
//
// There used to be a `headers()` rule applying `max-age=31536000, immutable`
// to `/projects/:path*`, intended for the images under public/projects. It
// never matched an image — every image is rendered through next/image and is
// requested as `/_next/image?url=...`, which Next already serves with a
// long immutable cache. What the rule *did* match was the project page routes
// (`/projects/fraud-detection` and friends), so visitors were told to cache
// those pages for a year and never revalidate. Edits then stayed invisible in
// any browser that had loaded a page before.
//
// Let Next and Vercel set caching: hashed build assets and optimized images
// get long immutable caches, HTML gets revalidated.
