import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { ResumeViewer } from "@/components/ResumeViewer";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Resume" };

export default async function ResumePage() {
  const profile = await getProfile();
  if (!profile.resume) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Glass load border tilt={false} className="mb-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/" className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Back home
            </Link>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-aurora">Resume</span>
            </h1>
          </div>
          <a href={profile.resume} download className="btn btn-primary">
            <Download className="size-4" aria-hidden="true" /> Download PDF
          </a>
        </div>
      </Glass>
      <Reveal delay={0.15}>
        <ResumeViewer src={profile.resume} title={`${profile.name} resume`} />
      </Reveal>
    </div>
  );
}
