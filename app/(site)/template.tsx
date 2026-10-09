"use client";

import { animate } from "motion/react";
import { useLayoutEffect, useRef, type ReactNode } from "react";

let visited = false;

// Re-mounts on every navigation: an accent curtain wipes upward to reveal the new page.
export default function Template({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = curtain.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !visited || reduce) {
      visited = true;
      return;
    }
    el.style.transform = "scaleY(1)";
    const controls = animate(el, { scaleY: [1, 0] }, { duration: 0.75, ease: [0.76, 0, 0.24, 1] });
    return () => controls.stop();
  }, []);

  return (
    <>
      <div
        ref={curtain}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-accent"
        style={{ transform: "scaleY(0)" }}
      />
      {children}
    </>
  );
}
