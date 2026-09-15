import Image from "next/image";
import type { Block } from "@/content/projects";
import { YouTubeEmbed } from "./YouTubeEmbed";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders markdown-style `[label](href)` spans in body copy as links.
 *
 * Builds React elements rather than an HTML string, so content text is never
 * interpreted as markup — no dangerouslySetInnerHTML, nothing to escape.
 */
function withLinks(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const [raw, label, href] = match;
    const at = match.index;

    if (at > cursor) nodes.push(text.slice(cursor, at));

    const external = href.startsWith("http");
    nodes.push(
      <a
        key={at}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      >
        {label}
      </a>,
    );
    cursor = at + raw.length;
  }

  if (cursor === 0) return text;
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function Caption({ children }: { children: string }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted">
      {withLinks(children)}
    </p>
  );
}

function ProseBlock({ block }: { block: Extract<Block, { kind: "prose" }> }) {
  return (
    <section className="space-y-4">
      {block.heading && <Heading>{block.heading}</Heading>}
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph} className="leading-relaxed text-muted">
          {withLinks(paragraph)}
        </p>
      ))}
    </section>
  );
}

/** Shared chrome for both self-hosted and YouTube-hosted video blocks. */
function MediaSection({
  heading,
  duration,
  caption,
  children,
}: {
  heading: string;
  duration: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Heading>{heading}</Heading>
        <span className="text-sm tabular-nums text-muted">{duration}</span>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
        {children}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </section>
  );
}

function VideoBlock({ block }: { block: Extract<Block, { kind: "video" }> }) {
  return (
    <MediaSection
      heading={block.heading}
      duration={block.duration}
      caption={block.caption}
    >
      <video
        controls
        preload="none"
        poster={block.poster}
        className="block aspect-video w-full bg-ink"
      >
        <source src={block.src} type="video/mp4" />
        Your browser does not support the video tag.{" "}
        <a href={block.src}>Download the video</a> instead.
      </video>
    </MediaSection>
  );
}

function YouTubeBlock({ block }: { block: Extract<Block, { kind: "youtube" }> }) {
  return (
    <MediaSection
      heading={block.heading}
      duration={block.duration}
      caption={block.caption}
    >
      <YouTubeEmbed
        videoId={block.videoId}
        title={block.heading}
        poster={block.poster}
      />
    </MediaSection>
  );
}

function CodeBlock({ block }: { block: Extract<Block, { kind: "code" }> }) {
  return (
    <section>
      {block.heading && (
        <div className="mb-5">
          <Heading>{block.heading}</Heading>
        </div>
      )}
      <div className="scroll-x rounded-2xl border border-line bg-surface">
        <pre className="p-5 text-sm leading-relaxed whitespace-pre text-fg">
          {block.text}
        </pre>
      </div>
      {block.caption && <Caption>{block.caption}</Caption>}
    </section>
  );
}

function FigureBlock({ block }: { block: Extract<Block, { kind: "figure" }> }) {
  return (
    <figure>
      {block.heading && (
        <div className="mb-5">
          <Heading>{block.heading}</Heading>
        </div>
      )}
      <div className="scroll-x rounded-2xl border border-line bg-white p-4">
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          className="mx-auto h-auto w-full max-w-lg"
        />
      </div>
      {block.caption && (
        <figcaption>
          <Caption>{block.caption}</Caption>
        </figcaption>
      )}
    </figure>
  );
}

function TableBlock({ block }: { block: Extract<Block, { kind: "table" }> }) {
  const emphasized = new Set(block.emphasize ?? []);

  return (
    <section>
      {block.heading && (
        <div className="mb-5">
          <Heading>{block.heading}</Heading>
        </div>
      )}
      <div className="scroll-x rounded-2xl border border-line">
        <table className="w-full min-w-md border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-surface text-left">
              {block.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-5 py-3 font-medium text-muted"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr
                key={row[0]}
                className="border-b border-line/60 last:border-b-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${row[0]}-${cellIndex}`}
                    className={
                      cellIndex === 0
                        ? "px-5 py-3 text-muted"
                        : emphasized.has(rowIndex)
                          ? "px-5 py-3 font-semibold tabular-nums text-accent"
                          : "px-5 py-3 tabular-nums"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption && <Caption>{block.caption}</Caption>}
    </section>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-16">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "prose":
            return <ProseBlock key={index} block={block} />;
          case "video":
            return <VideoBlock key={index} block={block} />;
          case "youtube":
            return <YouTubeBlock key={index} block={block} />;
          case "code":
            return <CodeBlock key={index} block={block} />;
          case "figure":
            return <FigureBlock key={index} block={block} />;
          case "table":
            return <TableBlock key={index} block={block} />;
        }
      })}
    </div>
  );
}
