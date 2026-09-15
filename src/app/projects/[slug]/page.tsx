import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { getProject, projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 pb-8">
      <Link
        href="/#projects"
        className="text-sm text-muted transition-colors hover:text-fg"
      >
        ← All projects
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.summary}
        </p>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Organization</dt>
            <dd className="mt-1">{project.org}</dd>
          </div>
          <div>
            <dt className="text-muted">Period</dt>
            <dd className="mt-1">{project.period}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-14">
        <Blocks blocks={project.blocks} />
      </div>
    </article>
  );
}
