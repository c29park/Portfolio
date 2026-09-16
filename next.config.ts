import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Cache optimized images for a year. Project media is never edited in
    // place — a changed figure gets a new filename — so a long TTL is safe.
    //
    // This replaces an earlier `headers()` rule on `/projects/:path*`, which
    // was a mistake: that pattern also matched the project *page* routes
    // (`/projects/fraud-detection`), so pages were served
    // `max-age=31536000, immutable` and browsers that had loaded a page once
    // never saw another update. Setting the TTL here reaches images only and
    // leaves HTML caching to Next and Vercel.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
