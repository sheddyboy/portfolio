"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export function BackToTop() {
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -6, rotate: -8, scale: 1.1 }}
      whileTap={{ scale: 0.8, y: 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 12 }}
      className="sticker-sm grid size-12 cursor-pointer place-items-center rounded-full bg-pink text-ink"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </motion.button>
  );
}
