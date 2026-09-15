"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  /** The 11-character ID from the watch URL. */
  videoId: string;
  title: string;
  /** Local poster path. Falls back to YouTube's own thumbnail when omitted. */
  poster?: string;
  /** Start offset in seconds. */
  start?: number;
};

/**
 * Click-to-load YouTube embed.
 *
 * A bare <iframe> pulls roughly a megabyte of player JS on page load even when
 * the video is never played, and sets cookies before the visitor has asked for
 * anything. This renders a static poster instead and only mounts the iframe on
 * interaction — so the page stays cheap and nothing third-party runs until the
 * visitor actually opts in.
 */
export function YouTubeEmbed({ videoId, title, poster, start }: Props) {
  const [active, setActive] = useState(false);

  if (active) {
    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    if (start) params.set("start", String(start));

    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="block aspect-video w-full border-0 bg-ink"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden bg-ink"
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover opacity-80 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      ) : (
        // Fallback only. Deliberately a plain <img>: routing a third-party image
        // through next/image would mean allowing i.ytimg.com in `remotePatterns`
        // and running it through the optimizer, which is attack surface we do
        // not need. Prefer a local poster.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-80 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      )}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full bg-ink/70 ring-1 ring-fg/25 backdrop-blur transition-colors group-hover:bg-ink/90">
          <svg viewBox="0 0 24 24" aria-hidden className="ml-1 size-7 fill-fg">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
