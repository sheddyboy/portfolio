"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/lib/content";
import { TAG_OPTIONS } from "@/lib/tags";
import { ProjectCard } from "./ProjectCard";

const ALL = "all";

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

  return (
    <div>
      <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const selected = tab.value === active;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(tab.value)}
              className={`sticker-sm relative cursor-pointer rounded-full px-4 py-2 font-mono text-sm font-bold transition-transform duration-200 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] hover:-translate-y-0.5 hover:-rotate-2 active:scale-90 ${
                selected ? "text-ink" : "bg-card text-foreground"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute -inset-[2.5px] rounded-full border-[2.5px] border-line bg-pink"
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                />
              )}
              <span className="relative">
                {tab.label} <span className="opacity-80">{tab.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid gap-8 sm:grid-cols-2" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              <ProjectCard project={project} priority={i < 2} index={i} />
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
