"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/lib/content";
import { TAG_OPTIONS } from "@/lib/tags";
import { ProjectCard } from "./ProjectCard";

const ALL = "all";

// Bento spans on a 6-column grid: pairs of 4+2, 2+4, 3+3; an odd leftover goes full width.
const PAIRS = [[4, 2], [2, 4], [3, 3]];
function spansFor(n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const pair = PAIRS[Math.floor(i / 2) % PAIRS.length];
    out.push(i === n - 1 && n % 2 === 1 ? 6 : pair[i % 2]);
  }
  return out;
}
const SPAN_CLASS: Record<number, string> = {
  6: "md:col-span-2 lg:col-span-6",
  4: "lg:col-span-4",
  3: "lg:col-span-3",
  2: "lg:col-span-2",
};

// Filters statically loaded projects in memory; no network calls.
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>(ALL);

  // Only show tabs for tags that at least one project uses.
  const tabs = [
    { value: ALL, label: "All", count: projects.length },
    ...TAG_OPTIONS.map((t) => ({
      value: t.value as string,
      label: t.label as string,
      count: projects.filter((p) => p.tags.includes(t.value)).length,
    })).filter((t) => t.count > 0),
  ];

  const visible = active === ALL ? projects : projects.filter((p) => p.tags.includes(active));
  const spans = spansFor(visible.length);

  return (
    <div>
      <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const selected = tab.value === active;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(tab.value)}
              className={`relative cursor-pointer rounded-full border border-border px-4 py-2 font-mono text-sm transition-colors ${
                selected ? "border-transparent text-on-accent" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {tab.label} <span className="opacity-70">{tab.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              className={SPAN_CLASS[spans[i]]}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} priority={i < 2} wide={spans[i] === 6} index={i} border={i === 0 && project.featured} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-8 text-muted-foreground">No projects yet. Add one in /keystatic.</p>
      )}
    </div>
  );
}
