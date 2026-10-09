"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-line bg-background/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <motion.div whileHover={{ rotate: -6, scale: 1.08 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
          <Link href="/" className="sticker-sm inline-flex h-10 items-center rounded-full bg-pink px-4 font-mono text-sm font-bold text-ink">
            <span aria-hidden="true">~/</span>
            {initials.toLowerCase() || "home"}
          </Link>
        </motion.div>

        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex" onMouseLeave={() => setHovered(null)}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-foreground"
            >
              {hovered === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-yellow"
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                />
              )}
              <span className={hovered === item.href ? "text-ink" : undefined}>{item.label}</span>
            </Link>
          ))}
          <div className="ml-2">
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
            className="sticker-sm grid size-10 cursor-pointer place-items-center rounded-full bg-card transition-transform active:scale-90"
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="overflow-hidden border-t-[2.5px] border-line sm:hidden"
          >
            <ul className="flex flex-col gap-2 px-4 py-4">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="sticker-sm block rounded-xl bg-card px-4 py-3 font-display text-lg font-bold"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, background: "linear-gradient(90deg, var(--pink), var(--yellow), var(--mint), var(--blue))" }}
        className="absolute inset-x-0 -bottom-[2.5px] h-1 origin-left"
      />
    </header>
  );
}
