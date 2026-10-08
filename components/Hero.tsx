"use client";

import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Profile } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 size-[480px] rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28"
      >
        <motion.p variants={item} className="inline-flex items-center gap-2 font-mono text-sm text-accent">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Open to opportunities
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
        >
          Hi, I&apos;m {profile.name}.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-4 max-w-2xl font-mono text-lg text-muted-foreground text-pretty sm:text-xl"
        >
          {profile.headline}
        </motion.p>
        <motion.p variants={item} className="mt-6 max-w-2xl leading-relaxed text-pretty">
          {profile.bio}
        </motion.p>

        {profile.location && (
          <motion.p variants={item} className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" /> {profile.location}
          </motion.p>
        )}

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="group inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            View projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/resume"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:border-accent"
          >
            <FileText className="size-4" aria-hidden="true" /> Resume
          </Link>
          <div className="ml-1 flex items-center gap-1">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-accent">
                <GithubIcon />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-accent">
                <LinkedinIcon />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-accent">
                <Mail className="size-5" />
              </a>
            )}
          </div>
        </motion.div>

        {profile.stats.length > 0 && (
          <motion.dl
            variants={item}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="bg-background/80 px-5 py-5 backdrop-blur-sm">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl font-semibold text-accent sm:text-3xl">{stat.value}</span>
                  <span aria-hidden="true" className="mt-1 block text-sm text-muted-foreground">{stat.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </motion.div>
    </section>
  );
}
