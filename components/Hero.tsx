"use client";

import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/content";
import { Blobby } from "./Blobby";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Burst, Floaty, Plus, Ring, Squiggle, Star, Triangle } from "./Shapes";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 220, damping: 16 } },
};

// Splits a name into words and letters so each letter can bounce on hover.
function BouncyName({ text }: { text: string }) {
  const calm = useReducedMotion();
  return (
    <span aria-hidden="true">
      {text.split(" ").map((word, w, all) => (
        <span key={w} className="marker mx-0.5 inline-block -rotate-1 whitespace-nowrap rounded-xl px-2 pb-1">
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: -70, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 11, delay: 0.55 + (w * 7 + i) * 0.04 }}
              whileHover={calm ? undefined : { y: -14, rotate: i % 2 ? 10 : -10, scale: 1.2 }}
            >
              {ch}
            </motion.span>
          ))}
          {w < all.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

// Counts the numeric part of a stat up from zero once visible, keeping the suffix ("10k+").
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const calm = useReducedMotion();
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [n, setN] = useState(m ? Number(m[2]) : 0);

  useEffect(() => {
    if (!m || !inView || calm) return;
    const controls = animate(0, Number(m[2]), {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, calm, value]);

  if (!m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {m[1]}
      {n}
      {m[3]}
    </span>
  );
}

const STAT_TINTS = ["bg-pink", "bg-yellow", "bg-mint", "bg-blue"];
const STAT_TILT = [-2, 1.5, -1, 2];

export function Hero({ profile }: { profile: Profile }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const shapeY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const shapeYSlow = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={heroRef} className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />

      <motion.div aria-hidden="true" style={{ y: shapeY }} className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <Floaty className="absolute top-24 left-[46%] size-10 text-yellow" delay={0.2} rotate={20}>
          <Star className="size-full" />
        </Floaty>
        <Floaty className="absolute top-[58%] left-[52%] size-12 text-mint" delay={0.6} amp={14}>
          <Triangle className="size-full" />
        </Floaty>
      </motion.div>

      <div className="wrap pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="sticker-sm inline-flex items-center gap-2.5 rounded-full bg-mint px-4 py-1.5 font-mono text-sm font-bold text-ink"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink opacity-50" />
                <span className="relative inline-flex size-2.5 rounded-full bg-ink" />
              </span>
              Open to opportunities
            </motion.p>

            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-7xl sm:leading-[1.1]">
              <span className="sr-only">Hi, I&apos;m {profile.name}.</span>
              <span aria-hidden="true">Hi, I&apos;m </span>
              <BouncyName text={profile.name} />
              <span aria-hidden="true">.</span>
            </h1>
            <motion.p
              variants={item}
              className="mt-5 max-w-2xl font-mono text-lg font-medium text-accent text-pretty sm:text-xl"
            >
              {profile.headline}
            </motion.p>
            <motion.p variants={item} className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty">
              {profile.bio}
            </motion.p>

            {profile.location && (
              <motion.p variants={item} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <MapPin className="size-4" aria-hidden="true" /> {profile.location}
              </motion.p>
            )}

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#projects" className="btn btn-pink group">
                View projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/resume" className="btn btn-plain">
                <FileText className="size-4" aria-hidden="true" /> Resume
              </Link>
              <div className="flex items-center gap-1">
                {profile.github && (
                  <motion.a
                    whileHover={{ y: -4, rotate: -8, scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="grid size-11 place-items-center rounded-full hover:bg-blue hover:text-ink"
                  >
                    <GithubIcon />
                  </motion.a>
                )}
                {profile.linkedin && (
                  <motion.a
                    whileHover={{ y: -4, rotate: 8, scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="grid size-11 place-items-center rounded-full hover:bg-blue hover:text-ink"
                  >
                    <LinkedinIcon />
                  </motion.a>
                )}
                {profile.email && (
                  <motion.a
                    whileHover={{ y: -4, rotate: -8, scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    className="grid size-11 place-items-center rounded-full hover:bg-blue hover:text-ink"
                  >
                    <Mail className="size-5" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto grid place-items-center py-6 lg:py-0">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 11, delay: 0.3 }}
            >
              <Blobby />
            </motion.div>
            <motion.div style={{ y: shapeYSlow }} aria-hidden="true" className="pointer-events-none absolute inset-0">
              <Floaty className="absolute top-0 left-2 size-14 text-pink" rotate={15}>
                <Burst className="size-full" />
              </Floaty>
              <Floaty className="absolute top-6 right-2 size-12 text-blue" delay={0.4}>
                <Ring className="size-full" />
              </Floaty>
              <Floaty className="absolute bottom-2 left-6 size-12 text-orange" delay={0.8} amp={14}>
                <Plus className="size-full" />
              </Floaty>
              <Floaty className="absolute right-0 bottom-8 h-8 w-28 text-violet" delay={0.3} rotate={4}>
                <Squiggle className="size-full" />
              </Floaty>
            </motion.div>
          </div>
        </div>

        {profile.stats.length > 0 && (
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } }}
            className="mt-14 grid grid-cols-2 gap-4 sm:mt-16 sm:grid-cols-4 sm:gap-5"
          >
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8, rotate: 0 },
                  show: { opacity: 1, y: 0, scale: 1, rotate: STAT_TILT[i % 4], transition: { type: "spring", stiffness: 240, damping: 12 } },
                }}
                whileHover={{ rotate: 0, scale: 1.06, y: -6 }}
                whileTap={{ scale: 0.94, rotate: STAT_TILT[i % 4] * -2 }}
                className={`sticker cursor-default px-4 py-5 text-ink sm:px-5 ${STAT_TINTS[i % 4]}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl leading-none font-extrabold sm:text-5xl">
                    <CountUp value={stat.value} />
                  </span>
                  <span aria-hidden="true" className="mt-2 block text-sm font-semibold">{stat.label}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
