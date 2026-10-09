"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useRichPointer } from "@/lib/pointer";

// A trailing ring and dot. The native cursor is never hidden, and nothing renders on touch or reduced motion.
export function CustomCursor() {
  const rich = useRichPointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!rich) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target instanceof Element ? e.target : null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(tagged?.dataset.cursor ?? null);
      setActive(!!t?.closest("a, button, input, textarea, summary, [role='button']"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [rich, x, y]);

  if (!rich) return null;

  const big = !!label;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div style={{ x: rx, y: ry }} className="absolute top-0 left-0">
        <motion.div
          animate={{ width: big ? 88 : active ? 56 : 32, height: big ? 88 : active ? 56 : 32, scale: down ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full font-mono text-[11px] font-semibold tracking-widest uppercase ${
            big ? "bg-accent text-on-accent" : "border-2 border-white mix-blend-difference"
          }`}
        >
          {big && label}
        </motion.div>
      </motion.div>
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference" />
      </motion.div>
    </div>
  );
}
