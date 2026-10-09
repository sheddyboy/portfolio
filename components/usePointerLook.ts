"use client";

import { useMotionValue, useSpring } from "motion/react";
import { useEffect, type RefObject } from "react";

// Returns spring values that point from an element toward the pointer, for googly eyes.
// Only active on fine pointers and when the visitor has not asked for reduced motion.
export function usePointerLook(ref: RefObject<Element | null>, max = 6) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 18 });
  const sy = useSpring(y, { stiffness: 320, damping: 18 });

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 160);
      x.set((dx / d) * max * k);
      y.set((dy / d) * max * k);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [ref, max, x, y]);

  return { x: sx, y: sy };
}
