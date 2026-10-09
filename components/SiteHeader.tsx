"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="display flex items-center gap-2 text-2xl" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="size-3 bg-accent" />
          {initials || "home"}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label px-3 py-2 text-foreground transition-colors hover:text-accent"
            >
              <span aria-hidden="true" className="mr-1.5 text-muted-foreground">
                0{i + 1}
              </span>
              <span className="link-sweep">{item.label}</span>
            </Link>
          ))}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 cursor-pointer place-items-center border-2 border-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-background sm:hidden"
          >
            <ul className="wrap flex flex-col py-6">
              {NAV.map((item, i) => (
                <li key={item.href} className="border-b-2 border-foreground">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 py-4 text-6xl hover:text-accent"
                  >
                    <span className="mono-label text-muted-foreground">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-[-2px] h-[3px] origin-left bg-accent"
      />
    </header>
  );
}
