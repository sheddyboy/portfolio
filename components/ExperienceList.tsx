import type { Experience } from "@/lib/content";
import { Reveal } from "./Reveal";

const fmt = (d: string | null) =>
  d ? new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "Present";

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="border-b-2 border-foreground">
      {items.map((job) => (
        <li key={job.slug} className="group border-t-2 border-foreground">
          <Reveal className="grid gap-4 py-8 sm:py-10 lg:grid-cols-[16rem_1fr] lg:gap-10">
            <p className="mono-label text-accent">
              {fmt(job.startDate)} &ndash; {fmt(job.endDate)}
            </p>
            <div>
              <h3 className="display text-[clamp(2rem,4.5vw,4rem)] transition-transform duration-300 group-hover:translate-x-2">
                {job.role} <span className="text-accent">@ {job.company}</span>
              </h3>
              <ul className="mt-5 max-w-3xl space-y-3 text-muted-foreground">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 bg-accent" />
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
