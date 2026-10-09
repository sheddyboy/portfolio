import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "@/components/Shapes";
import { ResumeViewer } from "@/components/ResumeViewer";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Resume" };

export default async function ResumePage() {
  const profile = await getProfile();
  if (!profile.resume) notFound();

  return (
    <div className="wrap py-10 sm:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/" className="sticker-sm inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-1.5 text-sm font-bold transition-transform duration-200 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] hover:-translate-x-1 hover:-rotate-2">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back home
          </Link>
          <h1 className="relative mt-5 inline-block font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="marker -rotate-1 inline-block rounded-xl px-3 pb-1">Resume</span>
            <Star className="absolute -top-4 -right-10 size-9 rotate-12 text-pink" />
          </h1>
        </div>
        <a href={profile.resume} download className="btn btn-pink">
          <Download className="size-4" aria-hidden="true" /> Download PDF
        </a>
      </div>
      <ResumeViewer src={profile.resume} title={`${profile.name} resume`} />
    </div>
  );
}
