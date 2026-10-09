"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { tagLabel } from "@/lib/tags";
import { GithubIcon } from "./BrandIcons";

const TINTS = ["bg-pink", "bg-mint", "bg-blue", "bg-orange", "bg-violet", "bg-yellow"];
const BANNERS = ["bg-yellow", "bg-pink", "bg-mint", "bg-blue"];

export function ProjectCard({ project, priority, index = 0 }: { project: Project; priority?: boolean; index?: number }) {
  const calm = useReducedMotion();
  const tilt = index % 2 === 0 ? -1.2 : 1.2;
  return (
    <motion.article
      whileHover={calm ? undefined : { y: -8, rotate: tilt }}
      whileTap={calm ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className="sticker group relative flex h-full flex-col overflow-hidden"
    >
      <div className={`relative aspect-[16/10] overflow-hidden border-b-[2.5px] border-line ${BANNERS[index % BANNERS.length]}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.4,0.64,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <div className="grid h-full place-items-center font-display text-2xl font-extrabold text-ink">
            {project.title}
          </div>
        )}
        {project.featured && (
          <span className="sticker-sm absolute top-3 left-3 -rotate-6 rounded-full bg-yellow px-3 py-1 font-mono text-xs font-bold text-ink">
            featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight">
            {project.hasCaseStudy ? (
              // The ::after stretches this link over the whole card.
              <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag, i) => (
            <li
              key={tag}
              className={`rounded-full border-2 border-line px-3 py-0.5 font-mono text-xs font-bold text-ink ${TINTS[(i + index) % TINTS.length]}`}
            >
              {tagLabel(tag)}
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.githubUrl || project.hasCaseStudy) && (
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-1 text-sm">
            {project.hasCaseStudy && (
              <span aria-hidden="true" className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-1.5 font-bold text-on-accent">
                Case study
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-1 font-bold text-foreground underline decoration-pink decoration-2 underline-offset-4 hover:text-accent"
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
                className="relative z-10 inline-flex items-center gap-1.5 font-bold text-muted-foreground hover:text-accent"
              >
                <GithubIcon className="size-4" /> Source
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
