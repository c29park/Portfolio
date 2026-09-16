import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Project media lives under /media, deliberately separate from the
        // /projects/<slug> page routes. Figures are never edited in place — a
        // changed figure gets a new filename — so a one-year immutable cache
        // is safe. next/image fetches these files internally when optimizing
        // and copies this header onto the optimized output.
        //
        // This used to be `/projects/:path*`, which also matched the project
        // page routes, so pages were served `immutable` for a year and any
        // browser that had loaded one never saw another update. Narrowing the
        // pattern was attempted twice and failed both times — `:file*` and
        // `:file+` both still matched `/projects/fraud-detection`. Keeping
        // assets on their own top-level path removes the overlap entirely
        // rather than relying on pattern subtleties.
        source: "/media/:path*",
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
