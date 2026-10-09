import type { SkillGroup } from "@/lib/content";
import { Reveal } from "./Reveal";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="border-b-2 border-foreground">
      {groups.map((group) => (
        <section key={group.name} className="border-t-2 border-foreground">
          <Reveal className="grid gap-4 py-7 lg:grid-cols-[22rem_1fr] lg:gap-10">
            <h3 className="display text-3xl text-accent sm:text-4xl">{group.name}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="mono-label border-2 border-foreground px-3 py-1.5 transition-colors hover:bg-foreground hover:text-background"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ))}
    </div>
  );
}
