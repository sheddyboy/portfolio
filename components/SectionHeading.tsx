"use client";

import { motion } from "motion/react";
import { DrawnUnderline } from "./Shapes";

const COLORS = ["bg-pink", "bg-yellow", "bg-blue", "bg-mint", "bg-orange", "bg-violet"];
const STROKES = ["var(--pink)", "var(--yellow)", "var(--blue)", "var(--mint)", "var(--orange)", "var(--violet)"];

export function SectionHeading({ index, title, intro }: { index: string; title: string; intro?: string }) {
  const n = Math.max(0, (parseInt(index, 10) || 1) - 1) % COLORS.length;
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-center gap-4">
        <motion.span
          initial={{ scale: 0, rotate: -50 }}
          whileInView={{ scale: 1, rotate: -6 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 300, damping: 11 }}
          className={`sticker-sm grid size-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold text-ink ${COLORS[n]}`}
        >
          {index}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.08 }}
          className="relative font-display text-4xl leading-none font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          {title}
          <DrawnUnderline className="absolute -bottom-3 left-0 h-3 w-full" color={STROKES[n]} />
        </motion.h2>
      </div>
      {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}
