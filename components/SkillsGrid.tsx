"use client";

import { motion, useReducedMotion } from "motion/react";
import type { SkillGroup } from "@/lib/content";
import { Reveal } from "./Reveal";

const HEADS = ["bg-pink", "bg-yellow", "bg-mint", "bg-blue", "bg-orange", "bg-violet"];

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  const calm = useReducedMotion();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, i) => (
        <Reveal key={group.name} delay={(i % 3) * 0.07} className="h-full">
          <section className="sticker h-full overflow-hidden">
            <h3 className={`border-b-[2.5px] border-line px-5 py-3 font-display text-lg font-extrabold text-ink ${HEADS[i % HEADS.length]}`}>
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-2 p-5">
              {group.items.map((skill, j) => (
                <motion.li
                  key={skill}
                  whileHover={calm ? undefined : { scale: 1.15, y: -4, rotate: j % 2 ? 5 : -5 }}
                  whileTap={calm ? undefined : { scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
                  className="cursor-default rounded-full border-2 border-line bg-background px-3 py-1 text-sm font-semibold"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
