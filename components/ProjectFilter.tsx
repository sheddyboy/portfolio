"use client";

import { motion } from "motion/react";
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
      <div role="group" aria-label="Filter projects by tag" className="wrap flex flex-wrap gap-2 pb-10">
        {tabs.map((tab) => {
          const selected = tab.value === active;
          return (
            <button
              key={tab.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(tab.value)}
              className={`mono-label cursor-pointer border-2 px-4 py-2.5 transition-colors ${
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {tab.label} <span className={selected ? "" : "text-muted-foreground"}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-live="polite"
      >
        {visible.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </motion.ul>

      {visible.length === 0 && (
        <p className="wrap text-muted-foreground">No projects yet. Add one in /keystatic.</p>
      )}
    </div>
  );
}
