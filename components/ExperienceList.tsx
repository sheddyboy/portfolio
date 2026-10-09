"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { Experience } from "@/lib/content";
import { Reveal } from "./Reveal";

const fmt = (d: string | null) =>
  d ? new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "Present";

const DOTS = ["bg-pink", "bg-yellow", "bg-mint", "bg-blue"];
const CHIPS = ["bg-yellow", "bg-mint", "bg-pink", "bg-blue"];

export function ExperienceList({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative ml-3 sm:ml-4">
      {/* The rail draws itself as you scroll. */}
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-[3px] -translate-x-1/2 rounded bg-muted" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: grow }}
        className="absolute top-2 bottom-2 left-0 w-[3px] origin-top -translate-x-1/2 rounded bg-pink"
      />
      {items.map((job, i) => (
        <li key={job.slug} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`absolute top-2 left-0 size-5 -translate-x-1/2 rounded-full border-[2.5px] border-line ${DOTS[i % DOTS.length]}`}
          />
          <Reveal delay={i * 0.05}>
            <div className="sticker p-5 sm:p-6">
              <p className={`inline-block -rotate-1 rounded-full border-2 border-line px-3 py-0.5 font-mono text-xs font-bold tracking-wide text-ink uppercase ${CHIPS[i % CHIPS.length]}`}>
                {fmt(job.startDate)} &ndash; {fmt(job.endDate)}
              </p>
              <h3 className="mt-3 font-display text-xl font-extrabold sm:text-2xl">
                {job.role} <span className="text-accent">@ {job.company}</span>
              </h3>
              <ul className="mt-4 space-y-2.5 leading-relaxed text-muted-foreground">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden="true" className={`mt-2.5 size-2.5 shrink-0 rotate-45 border-2 border-line ${DOTS[(i + j) % DOTS.length]}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
