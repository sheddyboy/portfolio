import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubIcon } from "@/components/BrandIcons";
import { CaseStudy } from "@/components/CaseStudy";
import { Reveal } from "@/components/Reveal";
import { Burst, Floaty } from "@/components/Shapes";
import { getProject, getProjects } from "@/lib/content";
import { tagLabel } from "@/lib/tags";

const CHIPS = ["bg-pink", "bg-yellow", "bg-mint", "bg-blue", "bg-orange", "bg-violet"];

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
    <article className="wrap max-w-3xl py-10 sm:py-16">
      <Link
        href="/#projects"
        className="sticker-sm inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-1.5 text-sm font-bold transition-transform duration-200 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] hover:-translate-x-1 hover:-rotate-2"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>

      <Reveal>
        <header className="relative mt-8">
          <Floaty className="absolute -top-2 right-0 size-12 text-yellow" rotate={25}>
            <Burst className="size-full" />
          </Floaty>
          <p className="inline-block -rotate-1 rounded-full border-2 border-line bg-mint px-3 py-1 font-mono text-sm font-bold text-ink">
            {year}
            {project.tags.length > 0 && ` / ${project.tags.map(tagLabel).join(", ")}`}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-7xl">
            <span className="marker box-decoration-clone rounded-xl px-2 pb-1">{project.title}</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-pretty">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-pink">
                Visit live site <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-plain">
                <GithubIcon className="size-4" /> View source
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
          </div>
        </header>
      </Reveal>

      {project.image && (
        <Reveal delay={0.05} className="sticker relative mt-12 aspect-[16/10] -rotate-1 overflow-hidden bg-muted">
          <Image src={project.image} alt={`Screenshot of ${project.title}`} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </Reveal>
      )}

      {project.stack.length > 0 && (
        <Reveal className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">Tech stack</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {project.stack.map((tech, i) => (
              <li key={tech} className={`sticker-sm rounded-full px-4 py-1.5 font-mono text-sm font-bold text-ink ${CHIPS[i % CHIPS.length]}`}>
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <div className="mt-16">
        <CaseStudy body={project.body} />
      </div>
    </article>
  );
}
