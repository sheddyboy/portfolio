import type { Experience } from "@/lib/content";
import { Glass } from "./Glass";

const fmt = (d: string | null) =>
  d ? new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : "Present";

// Bento rhythm on a 2-column grid: an odd first job spans the full row.
export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {items.map((job, i) => {
        const wide = items.length % 2 === 1 && i === 0;
        return (
          <li key={job.slug} className={wide ? "md:col-span-2" : ""}>
            <Glass delay={(i % 2) * 0.08} className="h-full p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="relative flex size-2.5">
                  <span className={`absolute inline-flex size-full rounded-full bg-accent ${job.endDate ? "opacity-0" : "animate-ping opacity-60"}`} />
                  <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  {fmt(job.startDate)} &ndash; {fmt(job.endDate)}
                </p>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {job.role} <span className="text-accent">@ {job.company}</span>
              </h3>
              <ul className={`mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground ${wide ? "md:columns-2 md:gap-8 md:space-y-0 [&>li]:mb-2.5 [&>li]:break-inside-avoid" : ""}`}>
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </Glass>
          </li>
        );
      })}
    </ol>
  );
}
