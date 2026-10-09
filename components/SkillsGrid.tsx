import type { SkillGroup } from "@/lib/content";
import { Glass } from "./Glass";

// Asymmetric spans on a 12-column grid, cycled for any number of groups.
const SPANS = [
  "lg:col-span-4", "lg:col-span-8",
  "lg:col-span-7", "lg:col-span-5",
  "lg:col-span-4", "lg:col-span-4", "lg:col-span-4",
];

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
      {groups.map((group, i) => (
        <div key={group.name} className={SPANS[i % SPANS.length]}>
          <Glass delay={(i % 3) * 0.07} className="h-full p-5 sm:p-6">
            <section>
              <h3 className="font-mono text-sm font-semibold text-accent">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-sm transition-colors hover:border-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </Glass>
        </div>
      ))}
    </div>
  );
}
