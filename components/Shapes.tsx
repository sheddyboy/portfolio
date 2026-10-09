"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type P = { className?: string };

export function Star({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 6 L61 37 L94 38 L68 58 L77 90 L50 71 L23 90 L32 58 L6 38 L39 37 Z"
        fill="currentColor"
        stroke="var(--line)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Burst({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 4 L58 28 L80 14 L72 40 L96 44 L76 60 L92 80 L66 76 L62 98 L50 80 L38 98 L34 76 L8 80 L24 60 L4 44 L28 40 L20 14 L42 28 Z"
        fill="currentColor"
        stroke="var(--line)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Ring({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="18" />
      <circle cx="50" cy="50" r="43" fill="none" stroke="var(--line)" strokeWidth="4" />
      <circle cx="50" cy="50" r="25" fill="none" stroke="var(--line)" strokeWidth="4" />
    </svg>
  );
}

export function Triangle({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 10 L92 86 L8 86 Z" fill="currentColor" stroke="var(--line)" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus({ className }: P) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M38 8 H62 V38 H92 V62 H62 V92 H38 V62 H8 V38 H38 Z"
        fill="currentColor"
        stroke="var(--line)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className }: P) {
  return (
    <svg viewBox="0 0 120 30" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 15 Q 19 -2 34 15 T 64 15 T 94 15 T 116 15"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// A hand-drawn underline that draws itself when it scrolls into view.
export function DrawnUnderline({ className, color = "var(--pink)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" className={className} aria-hidden="true" fill="none">
      <motion.path
        d="M3 9 Q 25 1 50 9 T 100 9 T 150 9 T 197 8"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

// Gently bobbing wrapper for decorative shapes. Stays still for reduced motion.
export function Floaty({
  children,
  className,
  delay = 0,
  amp = 10,
  rotate = 8,
  duration = 4,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amp?: number;
  rotate?: number;
  duration?: number;
}) {
  const calm = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{ scale: 0, rotate: -40 }}
      animate={
        calm
          ? { scale: 1, rotate: 0 }
          : { scale: 1, y: [0, -amp, 0], rotate: [0, rotate, 0] }
      }
      transition={{
        scale: { type: "spring", stiffness: 260, damping: 12, delay: 0.5 + delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}
