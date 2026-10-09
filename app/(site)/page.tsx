import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Credentials } from "@/components/Credentials";
import { ExperienceList } from "@/components/ExperienceList";
import { Hero } from "@/components/Hero";
import { ProjectFilter } from "@/components/ProjectFilter";
import { Glass } from "@/components/Glass";
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

      <section id="projects" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading index="01" title="Projects" intro="Things I've built recently. Filter by stack." />
        <ProjectFilter projects={projects} />
      </section>

      {experience.length > 0 && (
        <section id="experience" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading index="02" title="Experience" />
          <ExperienceList items={experience} />
        </section>
      )}

      {skills.length > 0 && (
        <section id="skills" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading index="03" title="Skills" intro="The tools I reach for, grouped by where they fit." />
          <SkillsGrid groups={skills} />
        </section>
      )}

      {(education.length > 0 || certifications.length > 0) && (
        <section id="credentials" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading index="04" title="Education & certifications" />
          <Credentials education={education} certifications={certifications} />
        </section>
      )}

      {profile.resume && (
        <section id="resume" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionHeading index="05" title="Resume" />
          <Glass border>
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-md text-muted-foreground">
                The full picture: education, certifications, skills and experience in one page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/resume" className="btn btn-primary">
                  <Eye className="size-4" aria-hidden="true" /> View resume
                </Link>
                <a href={profile.resume} download className="btn btn-ghost">
                  <Download className="size-4" aria-hidden="true" /> Download PDF
                </a>
              </div>
            </div>
          </Glass>
        </section>
      )}

      <section id="contact" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading index="06" title="Get in touch" intro="Have a role, project or question in mind? Send me a message and I'll reply by email." />
        <Glass className="p-6 sm:p-10">
          <ContactForm fallbackEmail={profile.email} />
        </Glass>
      </section>
    </>
  );
}
