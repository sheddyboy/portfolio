import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { tagLabel } from "@/lib/tags";
import { GithubIcon } from "./BrandIcons";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_var(--accent-soft)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center font-mono text-sm text-muted-foreground">
            {project.title}
          </div>
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 font-mono text-xs font-semibold text-on-accent">
            featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {project.hasCaseStudy ? (
              // The ::after stretches this link over the whole card.
              <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
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
            <li
              key={tag}
              className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent"
            >
              {tagLabel(tag)}
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.githubUrl || project.hasCaseStudy) && (
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-1 text-sm">
            {project.hasCaseStudy && (
              <span aria-hidden="true" className="inline-flex items-center gap-1 font-medium text-accent">
                Case study
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-1 font-medium text-foreground hover:text-accent"
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
                className="relative z-10 inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-accent"
              >
                <GithubIcon className="size-4" /> Source
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
