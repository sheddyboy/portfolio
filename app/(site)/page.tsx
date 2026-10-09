import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Credentials } from "@/components/Credentials";
import { ExperienceList } from "@/components/ExperienceList";
import { Hero, Statement, Stats } from "@/components/Hero";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";
import { ProjectFilter } from "@/components/ProjectFilter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillsGrid } from "@/components/SkillsGrid";
import {
  getCertifications,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/content";

export default async function Home() {
  const [profile, projects, experience, skills, education, certifications] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperience(),
    getSkills(),
    getEducation(),
    getCertifications(),
  ]);

  return (
    <>
      <Hero profile={profile} />
      {skills.length > 0 && <Marquee items={[...new Set(skills.flatMap((g) => g.items))]} />}
      {profile.bio && <Statement bio={profile.bio} />}
      <Stats stats={profile.stats} />

      <section id="projects" className="pt-20 sm:pt-28">
        <div className="wrap">
          <SectionHeading index="01" title="Projects" intro="Things I've built recently. Filter by stack." />
        </div>
        <ProjectFilter projects={projects} />
      </section>

      {experience.length > 0 && (
        <section id="experience" className="wrap py-20 sm:py-28">
          <SectionHeading index="02" title="Experience" />
          <ExperienceList items={experience} />
        </section>
      )}

      {skills.length > 0 && (
        <section id="skills" className="wrap py-20 sm:py-28">
          <SectionHeading index="03" title="Skills" intro="The tools I reach for, grouped by where they fit." />
          <SkillsGrid groups={skills} />
        </section>
      )}

      {(education.length > 0 || certifications.length > 0) && (
        <section id="credentials" className="wrap py-20 sm:py-28">
          <SectionHeading index="04" title="Education & certifications" />
          <Credentials education={education} certifications={certifications} />
        </section>
      )}

      {profile.resume && (
        <section id="resume" className="wrap py-20 sm:py-28">
          <SectionHeading index="05" title="Resume" />
          <Reveal>
            <div className="flex flex-col gap-8 border-2 border-foreground p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <p className="max-w-md text-lg text-muted-foreground">
                The full picture: education, certifications, skills and experience in one page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/resume" className="btn btn-solid">
                    <Eye className="size-4" aria-hidden="true" /> View resume
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a href={profile.resume} download className="btn btn-ghost">
                    <Download className="size-4" aria-hidden="true" /> Download PDF
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section id="contact" className="wrap py-20 sm:py-28">
        <SectionHeading index="06" title="Get in touch" intro="Have a role, project or question in mind? Send me a message and I'll reply by email." />
        <Reveal>
          <div className="border-2 border-foreground p-6 sm:p-10">
            <ContactForm fallbackEmail={profile.email} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
