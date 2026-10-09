import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Magnetic } from "@/components/Magnetic";
import { ResumeViewer } from "@/components/ResumeViewer";
import { SplitWords } from "@/components/SplitWords";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Resume" };

export default async function ResumePage() {
  const profile = await getProfile();
  if (!profile.resume) notFound();

  return (
    <div className="wrap py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Link href="/" className="mono-label link-sweep inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back home
          </Link>
          <SplitWords as="h1" text="Resume" immediate className="display mt-4 text-[clamp(5rem,16vw,14rem)] leading-[0.85]" />
        </div>
        <Magnetic>
          <a href={profile.resume} download className="btn btn-solid">
            <Download className="size-4" aria-hidden="true" /> Download PDF
          </a>
        </Magnetic>
      </div>
      <ResumeViewer src={profile.resume} title={`${profile.name} resume`} />
    </div>
  );
}
