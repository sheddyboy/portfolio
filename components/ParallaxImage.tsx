"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/pointer";

// Full-width banner whose image drifts slower than the page and is revealed with a wipe.
export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = !!usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      className="relative mt-12 aspect-[16/10] overflow-hidden border-2 border-foreground bg-muted sm:aspect-[16/8]"
    >
      <motion.div style={still ? undefined : { y, scale: 1.18 }} className="absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="(min-width: 1536px) 1536px, 100vw" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
