import { Download } from "lucide-react";

// Browsers render PDFs natively; the fallback link covers ones that don't (most mobile browsers).
export function ResumeViewer({ src, title, className = "h-[80dvh]" }: { src: string; title: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-card ${className}`}>
      <object data={`${src}#view=FitH`} type="application/pdf" title={title} className="size-full">
        <div className="grid h-full place-items-center p-8 text-center">
          <div>
            <p className="text-muted-foreground">Your browser can&apos;t show the PDF inline.</p>
            <a
              href={src}
              download
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-on-accent"
            >
              <Download className="size-4" aria-hidden="true" /> Download resume
            </a>
          </div>
        </div>
      </object>
    </div>
  );
}
