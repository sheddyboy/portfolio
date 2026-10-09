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
    <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
      {education.length > 0 && (
        <div>
          <h3 className="mono-label flex items-center gap-2 text-accent">
            <GraduationCap className="size-4" aria-hidden="true" /> Education
          </h3>
          <Reveal>
            <ul className="mt-4 border-b-2 border-foreground">
              {education.map((ed) => (
                <li key={ed.slug} className="border-t-2 border-foreground py-6">
                  <p className="mono-label text-muted-foreground">
                    {ed.startYear} &ndash; {ed.endYear ?? "Present"}
                    {ed.endYear && ed.endYear > new Date().getFullYear() && " (expected)"}
                  </p>
                  <p className="display mt-2 text-3xl">{ed.degree}</p>
                  <p className="mt-1 text-muted-foreground">
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
          <h3 className="mono-label flex items-center gap-2 text-accent">
            <Award className="size-4" aria-hidden="true" /> Certifications
          </h3>
          <Reveal delay={0.08}>
            <ul className="mt-4 border-b-2 border-foreground">
              {certifications.map((cert) => (
                <li key={cert.slug} className="group flex items-start justify-between gap-4 border-t-2 border-foreground py-5">
                  <div className="transition-transform duration-300 group-hover:translate-x-2">
                    <p className="text-lg font-semibold">{cert.name}</p>
                    <p className="mono-label mt-1 text-muted-foreground">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mono-label inline-flex shrink-0 items-center gap-1 text-accent"
                    >
                      <span className="link-sweep">Verify</span> <ExternalLink className="size-3.5" aria-hidden="true" />
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
