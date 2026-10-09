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
    <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
      {education.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-extrabold">
            <GraduationCap className="size-6 text-pink" aria-hidden="true" /> Education
          </h3>
          <Reveal>
            <ul className="mt-5 space-y-5">
              {education.map((ed) => (
                <li key={ed.slug} className="sticker p-5 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] hover:-translate-y-1 hover:-rotate-1">
                  <p className="inline-block rounded-full border-2 border-line bg-yellow px-3 py-0.5 font-mono text-xs font-bold text-ink">
                    {ed.startYear} &ndash; {ed.endYear ?? "Present"}
                    {ed.endYear && ed.endYear > new Date().getFullYear() && " (expected)"}
                  </p>
                  <p className="mt-3 font-display text-lg font-extrabold">{ed.degree}</p>
                  <p className="text-muted-foreground">
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
          <h3 className="flex items-center gap-2 font-display text-xl font-extrabold">
            <Award className="size-6 text-pink" aria-hidden="true" /> Certifications
          </h3>
          <Reveal delay={0.08}>
            <ul className="sticker mt-5 divide-y-2 divide-line overflow-hidden">
              {certifications.map((cert) => (
                <li key={cert.slug} className="flex items-start justify-between gap-4 p-5 transition-colors hover:bg-accent-soft">
                  <div>
                    <p className="font-bold">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-line bg-mint px-3 py-1 text-sm font-bold text-ink transition-transform hover:-rotate-3 hover:scale-105"
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
