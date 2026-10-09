"use client";

import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Profile } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/pointer";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Magnetic } from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export function Hero({ profile }: { profile: Profile }) {
  const parts = profile.name.split(" ").filter(Boolean);
  const lines = parts.length > 1 ? parts : [profile.name];
  const lastIndex = lines.length - 1;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col">
      <div className="wrap flex w-full flex-1 flex-col justify-between gap-10 pt-6 pb-8 sm:pt-8">
        <motion.div {...fade(0.1)} className="mono-label flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-accent">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping bg-accent opacity-60" />
              <span className="relative inline-flex size-2.5 bg-accent" />
            </span>
            Open to opportunities
          </p>
          {profile.location && (
            <p className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" /> {profile.location}
            </p>
          )}
        </motion.div>

        <h1 className="display text-[clamp(4rem,min(21vw,27vh),21rem)] leading-[0.86]">
          <motion.span {...fade(0.2)} className="mono-label mb-3 block normal-case sm:mb-5">
            Hi, I&apos;m
          </motion.span>
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pt-[0.04em] pb-[0.06em]">
              <motion.span
                className={`block ${i === lastIndex ? "text-accent" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.3 + i * 0.12, ease }}
              >
                {line}
                {i === lastIndex ? "." : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <motion.p
            {...fade(0.9)}
            className="max-w-2xl border-l-4 border-accent pl-4 font-mono text-lg text-pretty sm:text-xl"
          >
            {profile.headline}
          </motion.p>

          <motion.div {...fade(1.05)} className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Magnetic>
              <Link href="#projects" className="btn btn-solid group">
                View projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/resume" className="btn btn-ghost">
                <FileText className="size-4" aria-hidden="true" /> Resume
              </Link>
            </Magnetic>
            <div className="flex items-center gap-2">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-btn">
                  <GithubIcon />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-btn">
                  <LinkedinIcon />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} aria-label="Email" className="icon-btn">
                  <Mail className="size-5" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Word({ word, index, total, progress, still }: { word: string; index: number; total: number; progress: MotionValue<number>; still: boolean }) {
  const start = (index / total) * 0.85;
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.1)], [0.16, 1]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>{word}</motion.span>{" "}
    </>
  );
}

// Pinned scene: the bio lights up word by word while the section stays fixed.
export function Statement({ bio }: { bio: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = !!usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = bio.split(" ");
  return (
    <div ref={ref} className="pin-track border-b-2 border-foreground">
      <div className="pin-stage">
        <p className="display wrap text-[clamp(1.9rem,5.2vw,5rem)] leading-[1.02] text-pretty">
          {words.map((w, i) => (
            <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} still={still} />
          ))}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    const m = value.match(/^(\d+)(.*)$/);
    if (!inView || !m || reduce) return;
    const controls = animate(0, Number(m[1]), {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${m[2]}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div className="group bg-background px-5 py-8 transition-colors hover:bg-accent hover:text-on-accent sm:px-8 sm:py-12">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span ref={ref} className="display block text-[clamp(3.5rem,9vw,8rem)] tabular-nums text-accent group-hover:text-on-accent">
          {value}
        </span>
        <span aria-hidden="true" className="mono-label mt-3 block text-muted-foreground group-hover:text-on-accent">
          {label}
        </span>
      </dd>
    </div>
  );
}

export function Stats({ stats }: { stats: Profile["stats"] }) {
  if (stats.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-0.5 border-b-2 border-foreground bg-foreground lg:grid-cols-4">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </dl>
  );
}
