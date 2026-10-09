import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import { MotionProvider } from "@/components/MotionProvider";
import { NotFoundScene } from "@/components/NotFoundScene";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <MotionProvider>
      <Cursor />
      <header className="sticky top-0 z-50 border-b-[2.5px] border-line bg-background/90 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between">
          <Link href="/" className="sticker-sm inline-flex h-10 items-center rounded-full bg-pink px-4 font-mono text-sm font-bold text-ink">
            <span aria-hidden="true">~/</span>home
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main">
        <NotFoundScene />
      </main>
    </MotionProvider>
  );
}
