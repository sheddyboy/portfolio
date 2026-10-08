import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubIcon } from "@/components/BrandIcons";
import { CaseStudy } from "@/components/CaseStudy";
import { Reveal } from "@/components/Reveal";
import { getProject, getProjects } from "@/lib/content";
import { tagLabel } from "@/lib/tags";

// Only projects with a case study get a page; anything else 404s at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.filter((p) => p.hasCaseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: project.image ? { images: [project.image] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await getProject((await params).slug);
  if (!project || !project.hasCaseStudy) notFound();

  const year = project.date ? new Date(`${project.date}T00:00:00Z`).getUTCFullYear() : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>

      <Reveal>
        <header className="mt-6">
          <p className="font-mono text-sm text-accent">
            {year}
            {project.tags.length > 0 && ` / ${project.tags.map(tagLabel).join(", ")}`}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90">
                Visit live site <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:border-accent">
                <GithubIcon className="size-4" /> View source
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
          </div>
        </header>
      </Reveal>

      {project.image && (
        <Reveal delay={0.05} className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
          <Image src={project.image} alt={`Screenshot of ${project.title}`} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </Reveal>
      )}

      {project.stack.length > 0 && (
        <Reveal className="mt-10">
          <h2 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">Tech stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-sm">
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Reveal className="mt-12">
        <CaseStudy body={project.body} />
      </Reveal>
    </article>
  );
}
