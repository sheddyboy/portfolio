"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type GlassProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the entrance starts; use index * 0.07 for staggers. */
  delay?: number;
  /** Subtle 3D tilt that follows a mouse pointer. */
  tilt?: boolean;
  /** Keep the animated aurora gradient border switched on. */
  border?: boolean;
  /** Animate on page load instead of when scrolled into view. */
  load?: boolean;
};

const hidden = { opacity: 0, y: 28, scale: 0.97 };
const shown = { opacity: 1, y: 0, scale: 1 };

// The bento panel: staggered reveal, cursor spotlight, mouse tilt, gradient border on hover.
export function Glass({ children, className = "", delay = 0, tilt = true, border = false, load = false }: GlassProps) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 220, damping: 22 });
  const ry = useSpring(0, { stiffness: 220, damping: 22 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty("--mx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--my", `${y * 100}%`);
    if (tilt && !reduce) {
      ry.set((x - 0.5) * 5);
      rx.set(-(y - 0.5) * 5);
    }
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  const transition = { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      className={`glass ${border ? "gborder" : ""} ${className}`}
      initial={hidden}
      {...(load
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "-60px" } })}
      transition={transition}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
