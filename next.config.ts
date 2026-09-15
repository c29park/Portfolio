import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // YouTube thumbnails, used as the embed poster when a local one is absent.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },

  async headers() {
    return [
      {
        // Project media is content-addressed by filename and never mutated in
        // place — safe to cache hard at the edge and in the browser.
        source: "/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
