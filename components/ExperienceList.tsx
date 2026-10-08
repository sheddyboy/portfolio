import type { Experience } from "@/lib/content";
import { Reveal } from "./Reveal";

const fmt = (d: string | null) =>
  d ? new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "Present";

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="relative border-l border-border">
      {items.map((job, i) => (
        <li key={job.slug} className="relative pb-10 pl-8 last:pb-0">
          <span aria-hidden="true" className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent ring-4 ring-background" />
          <Reveal delay={i * 0.05}>
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              {fmt(job.startDate)} &ndash; {fmt(job.endDate)}
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              {job.role} <span className="text-accent">@ {job.company}</span>
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {job.bullets.map((b, j) => (
                <li key={j} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
