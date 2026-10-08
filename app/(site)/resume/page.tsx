import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResumeViewer } from "@/components/ResumeViewer";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Resume" };

export default async function ResumePage() {
  const profile = await getProfile();
  if (!profile.resume) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back home
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Resume</h1>
        </div>
        <a href={profile.resume} download className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90">
          <Download className="size-4" aria-hidden="true" /> Download PDF
        </a>
      </div>
      <ResumeViewer src={profile.resume} title={`${profile.name} resume`} />
    </div>
  );
}
