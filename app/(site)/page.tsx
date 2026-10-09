import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Credentials } from "@/components/Credentials";
import { ExperienceList } from "@/components/ExperienceList";
import { Hero } from "@/components/Hero";
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

      {skills.length > 0 && <Marquee items={skills.flatMap((g) => g.items)} />}

      <section id="projects" className="wrap py-16 sm:py-24">
        <SectionHeading index="01" title="Projects" intro="Things I've built recently. Filter by stack." />
        <Reveal>
          <ProjectFilter projects={projects} />
        </Reveal>
      </section>

      {experience.length > 0 && (
        <section id="experience" className="wrap py-16 sm:py-24">
          <SectionHeading index="02" title="Experience" />
          <ExperienceList items={experience} />
        </section>
      )}

      {skills.length > 0 && (
        <section id="skills" className="wrap py-16 sm:py-24">
          <SectionHeading index="03" title="Skills" intro="The tools I reach for, grouped by where they fit." />
          <SkillsGrid groups={skills} />
        </section>
      )}

      {(education.length > 0 || certifications.length > 0) && (
        <section id="credentials" className="wrap py-16 sm:py-24">
          <SectionHeading index="04" title="Education & certifications" />
          <Credentials education={education} certifications={certifications} />
        </section>
      )}

      {profile.resume && (
        <section id="resume" className="wrap py-16 sm:py-24">
          <SectionHeading index="05" title="Resume" />
          <Reveal>
            <div className="flex flex-col gap-6 sticker flex-col bg-yellow p-6 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-md text-lg font-medium">
                The full picture: education, certifications, skills and experience in one page.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/resume" className="btn btn-pink">
                  <Eye className="size-4" aria-hidden="true" /> View resume
                </Link>
                <a href={profile.resume} download className="btn btn-plain">
                  <Download className="size-4" aria-hidden="true" /> Download PDF
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section id="contact" className="wrap py-16 sm:py-24">
        <SectionHeading index="06" title="Get in touch" intro="Have a role, project or question in mind? Send me a message and I'll reply by email." />
        <Reveal>
          <div className="sticker p-6 sm:p-8">
            <ContactForm fallbackEmail={profile.email} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
