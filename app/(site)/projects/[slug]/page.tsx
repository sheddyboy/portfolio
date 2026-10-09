import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubIcon } from "@/components/BrandIcons";
import { CaseStudy } from "@/components/CaseStudy";
import { Glass } from "@/components/Glass";
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
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/#projects" className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> All projects
      </Link>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <Glass load border tilt={false} className={`p-6 sm:p-10 ${project.image ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <header>
            <p className="font-mono text-sm text-accent">
              {year}
              {project.tags.length > 0 && ` / ${project.tags.map(tagLabel).join(", ")}`}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              <span className="text-aurora">{project.title}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{project.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Visit live site <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <GithubIcon className="size-4" /> View source
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          </header>
        </Glass>

        {project.image && (
          <Glass load delay={0.15} className="relative min-h-60 overflow-hidden lg:col-span-5">
            <Image src={project.image} alt={`Screenshot of ${project.title}`} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="rounded-[inherit] object-cover" />
          </Glass>
        )}

        {project.stack.length > 0 && (
          <Glass delay={0.05} className="p-6 sm:p-8 lg:col-span-12">
            <h2 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">Tech stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-border bg-muted px-3.5 py-1.5 font-mono text-sm transition-colors hover:border-accent">
                  {tech}
                </li>
              ))}
            </ul>
          </Glass>
        )}

        <div className="lg:col-span-12">
          <CaseStudy body={project.body} />
        </div>
      </div>
    </article>
  );
}
