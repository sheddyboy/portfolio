import type { SkillGroup } from "@/lib/content";
import { Reveal } from "./Reveal";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, i) => (
        <Reveal key={group.name} delay={(i % 3) * 0.06} className="h-full">
          <section className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50">
            <h3 className="font-mono text-sm font-semibold text-accent">{group.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill} className="rounded-md border border-border bg-background px-2.5 py-1 text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
