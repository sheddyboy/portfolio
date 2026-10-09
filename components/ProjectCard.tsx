import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { tagLabel } from "@/lib/tags";
import { GithubIcon } from "./BrandIcons";
import { Glass } from "./Glass";

export function ProjectCard({
  project,
  priority,
  wide,
  index = 0,
  border,
}: {
  project: Project;
  priority?: boolean;
  /** Full-width bento cell: image beside the text on large screens. */
  wide?: boolean;
  index?: number;
  border?: boolean;
}) {
  return (
    <Glass delay={index * 0.08} border={border} className="group h-full">
      <article className={`flex h-full flex-col overflow-hidden rounded-[inherit] ${wide ? "lg:flex-row" : ""}`}>
        <div
          className={`relative h-52 shrink-0 overflow-hidden bg-muted sm:h-60 ${wide ? "lg:h-auto lg:min-h-80 lg:w-1/2" : ""}`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              priority={priority}
              sizes={wide ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 760px, (min-width: 768px) 50vw, 100vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <div className="grid h-full place-items-center font-mono text-sm text-muted-foreground">
              {project.title}
            </div>
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 font-mono text-xs font-semibold text-on-accent shadow-lg">
              featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {project.hasCaseStudy ? (
                // The ::after stretches this link over the whole card.
                <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:z-[3] after:rounded-[inherit] after:content-['']">
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent">
                {tagLabel(tag)}
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.githubUrl || project.hasCaseStudy) && (
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-1 text-sm">
              {project.hasCaseStudy && (
                <span aria-hidden="true" className="inline-flex items-center gap-1 font-medium text-accent">
                  Case study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-[4] inline-flex items-center gap-1 font-medium text-foreground hover:text-accent"
                >
                  Live site <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-[4] inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-accent"
                >
                  <GithubIcon className="size-4" /> Source
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Glass>
  );
}
