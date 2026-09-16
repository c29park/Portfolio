import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { withLinks } from "@/components/Blocks";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">
          {site.role}
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
          I&apos;m {site.name}.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
          {site.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            View projects
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-muted"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Projects
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-muted"
            >
              <div className="relative aspect-video overflow-hidden bg-ink">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-80 transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          About
        </h2>
        <div className="mt-8 flex flex-col gap-8 sm:flex-row">
          <div
            aria-hidden
            className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-xl font-semibold tracking-tight"
          >
            {site.initials}
          </div>
          <div className="max-w-2xl space-y-4">
            {site.bio.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {withLinks(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
