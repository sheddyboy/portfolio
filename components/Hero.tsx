"use client";

import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Glass } from "./Glass";
import { RetrievalGraph } from "./RetrievalGraph";

const word = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

// "10k+" counts up from zero; anything non-numeric renders as is.
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(match ? Number(match[1]) : 0);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const controls = animate(0, Number(match[1]), {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {match[2]}
    </span>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  const nameWords = profile.name.split(" ");
  const social =
    "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-12">
        <Glass load border delay={0.1} tilt={false} className="col-span-2 p-6 sm:p-10 lg:col-span-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-accent sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.09, delayChildren: 0.35 }}
            className="mt-6 font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-balance sm:text-7xl"
          >
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span variants={word} className="inline-block">Hi, I&apos;m</motion.span>
            </span>{" "}
            {nameWords.map((w, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span variants={word} className="text-aurora inline-block">
                    {w}
                    {i === nameWords.length - 1 ? "." : ""}
                  </motion.span>
                </span>
                {i < nameWords.length - 1 ? " " : ""}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-5 max-w-2xl font-mono text-base text-accent text-pretty sm:text-lg"
          >
            {profile.headline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-5 max-w-2xl leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="#projects" className="btn btn-primary group">
              View projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/resume" className="btn btn-ghost">
              <FileText className="size-4" aria-hidden="true" /> Resume
            </Link>
          </motion.div>
        </Glass>

        <Glass load delay={0.25} className="relative flex flex-col justify-between gap-6 overflow-hidden col-span-2 p-5 sm:p-6 lg:col-span-4">
          <RetrievalGraph className="pointer-events-none absolute -top-4 -right-4 h-44 w-full max-w-xs opacity-90" />
          <div className="relative pt-32 sm:pt-36">
            {profile.location && (
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-accent" aria-hidden="true" /> {profile.location}
              </p>
            )}
            <div className="mt-3 flex flex-col">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className={social}>
                  <GithubIcon className="size-5 transition-transform group-hover:scale-110" /> GitHub
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className={social}>
                  <LinkedinIcon className="size-5 transition-transform group-hover:scale-110" /> LinkedIn
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className={social}>
                  <Mail className="size-5 transition-transform group-hover:scale-110" /> Email
                </a>
              )}
            </div>
          </div>
        </Glass>

        {profile.stats.length > 0 && (
          <dl className="contents">
            {profile.stats.map((stat, i) => (
              <Glass key={stat.label} load delay={0.4 + i * 0.08} className="p-5 sm:p-6 lg:col-span-3">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-semibold text-aurora sm:text-5xl">
                    <CountUp value={stat.value} />
                  </span>
                  <span aria-hidden="true" className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
                </dd>
              </Glass>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
