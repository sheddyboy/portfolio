"use client";

import { ArrowLeft, RotateCw } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Glass } from "./Glass";

// Shared layout for the 404 and error states, so they carry the same bento glass look.
export function StatusScreen({
  code,
  title,
  children,
  onRetry,
}: {
  code: string;
  title: string;
  children: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto grid min-h-[70dvh] max-w-3xl place-items-center px-4 py-16 sm:px-6">
      <Glass load border tilt={false} className="w-full p-8 text-center sm:p-14">
        <p className="text-aurora font-display text-8xl leading-none font-semibold tracking-tight sm:text-9xl">{code}</p>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{children}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <button type="button" onClick={onRetry} className="btn btn-primary">
              <RotateCw className="size-4" aria-hidden="true" /> Try again
            </button>
          )}
          <Link href="/" className={onRetry ? "btn btn-ghost" : "btn btn-primary"}>
            <ArrowLeft className="size-4" aria-hidden="true" /> Back home
          </Link>
        </div>
      </Glass>
    </div>
  );
}
