"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Springs content into view once, the first time it scrolls on screen.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ type: "spring", stiffness: 190, damping: 17, delay }}
    >
      {children}
    </motion.div>
  );
}
