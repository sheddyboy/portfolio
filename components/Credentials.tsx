import { Award, ExternalLink, GraduationCap } from "lucide-react";
import type { Certification, Education } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Credentials({
  education,
  certifications,
}: {
  education: Education[];
  certifications: Certification[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
      {education.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold text-muted-foreground uppercase">
            <GraduationCap className="size-4 text-accent" aria-hidden="true" /> Education
          </h3>
          <Reveal>
            <ul className="mt-4 space-y-4">
              {education.map((ed) => (
                <li key={ed.slug} className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-mono text-xs text-muted-foreground">
                    {ed.startYear} &ndash; {ed.endYear ?? "Present"}
                    {ed.endYear && ed.endYear > new Date().getFullYear() && " (expected)"}
                  </p>
                  <p className="mt-1 font-semibold">{ed.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {ed.institution}
                    {ed.location && `, ${ed.location}`}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold text-muted-foreground uppercase">
            <Award className="size-4 text-accent" aria-hidden="true" /> Certifications
          </h3>
          <Reveal delay={0.08}>
            <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {certifications.map((cert) => (
                <li key={cert.slug} className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-sm text-accent hover:underline"
                    >
                      Verify <ExternalLink className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">{cert.name} (opens in new tab)</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}
    </div>
  );
}
