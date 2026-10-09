"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/pointer";
import { tagLabel } from "@/lib/tags";
import { GithubIcon } from "./BrandIcons";
import { SplitWords } from "./SplitWords";

// One project = one full scroll chapter: a sticky outlined numeral beside the story.
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const imgRef = useRef<HTMLDivElement>(null);
  const still = !!usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const year = project.date ? new Date(`${project.date}T00:00:00Z`).getUTCFullYear() : null;

  return (
    <article
      className="chapter group relative border-t-2 border-foreground"
      data-cursor={project.hasCaseStudy ? "View" : undefined}
    >
      <div className="wrap grid gap-8 py-14 sm:py-20 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-3">
          <div className="flex items-end justify-between gap-4 lg:sticky lg:top-24 lg:block">
            <p aria-hidden="true" className="display outline-text text-[clamp(5rem,16vw,13rem)] leading-[0.8] transition-[color] duration-300 group-hover:text-accent">
              {num}
            </p>
            <div className="text-right lg:mt-8 lg:text-left">
              {year && <p className="mono-label text-accent">{year}</p>}
              {project.featured && (
                <p className="mono-label mt-2 inline-block bg-accent px-2 py-1 font-semibold text-on-accent">featured</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <h3 className="display text-[clamp(2.75rem,8vw,7.5rem)] transition-colors duration-300 group-hover:text-accent">
            {project.hasCaseStudy ? (
              // The ::after stretches this link over the whole chapter.
              <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:z-0 after:content-['']">
                <SplitWords text={project.title} />
              </Link>
            ) : (
              <SplitWords text={project.title} />
            )}
          </h3>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{project.description}</p>

          <motion.div
            ref={imgRef}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="relative mt-10 aspect-[16/10] overflow-hidden border-2 border-foreground bg-muted"
          >
            {project.image ? (
              <motion.div style={still ? undefined : { y, scale: 1.16 }} className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="img-mono object-cover"
                />
              </motion.div>
            ) : (
              <div className="grid h-full place-items-center font-mono text-sm text-muted-foreground">{project.title}</div>
            )}
          </motion.div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag} className="mono-label border-2 border-foreground px-2.5 py-1">
                {tagLabel(tag)}
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.githubUrl || project.hasCaseStudy) && (
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {project.hasCaseStudy && (
                <span aria-hidden="true" className="mono-label inline-flex items-center gap-2 text-accent">
                  Case study
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
                </span>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-sweep mono-label relative z-10 inline-flex items-center gap-1 hover:text-accent"
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
                  className="link-sweep mono-label relative z-10 inline-flex items-center gap-1.5 hover:text-accent"
                >
                  <GithubIcon className="size-4" /> Source
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
