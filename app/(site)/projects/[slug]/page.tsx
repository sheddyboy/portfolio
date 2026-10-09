import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubIcon } from "@/components/BrandIcons";
import { CaseStudy } from "@/components/CaseStudy";
import { Magnetic } from "@/components/Magnetic";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitWords } from "@/components/SplitWords";
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
    <article className="wrap py-10 sm:py-14">
      <Link href="/#projects" className="mono-label link-sweep inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>

      <header className="mt-6">
        <Reveal>
          <p className="mono-label flex items-center gap-3 text-accent">
            <span>
              {year}
              {project.tags.length > 0 && ` / ${project.tags.map(tagLabel).join(", ")}`}
            </span>
            <span aria-hidden="true" className="h-0.5 flex-1 bg-foreground" />
          </p>
        </Reveal>
        <SplitWords
          as="h1"
          text={project.title}
          immediate
          className="display mt-4 text-[clamp(3.5rem,13vw,13rem)] leading-[0.88] text-balance"
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <Reveal delay={0.15}>
            <p className="max-w-3xl border-l-4 border-accent pl-4 text-xl leading-relaxed text-pretty sm:text-2xl">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.25} className="flex flex-wrap gap-3 lg:justify-end">
            {project.liveUrl && (
              <Magnetic>
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
                  Visit live site <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </Magnetic>
            )}
            {project.githubUrl && (
              <Magnetic>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <GithubIcon className="size-4" /> View source
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </Magnetic>
            )}
          </Reveal>
        </div>
      </header>

      {project.image && (
        <ParallaxImage src={project.image} alt={`Screenshot of ${project.title}`} />
      )}

      {project.stack.length > 0 && (
        <Reveal className="mt-12 grid gap-4 border-t-2 border-foreground pt-6 lg:grid-cols-12 lg:gap-12">
          <h2 className="mono-label text-accent lg:col-span-5">Tech stack</h2>
          <ul className="flex flex-wrap gap-2 lg:col-span-7">
            {project.stack.map((tech) => (
              <li key={tech} className="mono-label border-2 border-foreground px-3 py-1.5 transition-colors hover:bg-foreground hover:text-background">
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <div className="mt-12">
        <CaseStudy body={project.body} />
      </div>
    </article>
  );
}
