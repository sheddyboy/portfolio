"use client";

import { Home, FolderOpen } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { burst } from "./confetti";
import { Burst, Floaty, Plus, Ring, Squiggle, Star, Triangle } from "./Shapes";
import { usePointerLook } from "./usePointerLook";

const LINES = [
  "Poke the zero. It has opinions.",
  "Ow. Rude.",
  "That tickles, keep going.",
  "I am getting dizzy.",
  "Okay, okay, you found the secret. Go home now.",
];

// The giant 404 where the zero is a draggable, googly-eyed character.
function Zero({ onBonk }: { onBonk: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const look = usePointerLook(ref, 9);
  const controls = useAnimationControls();
  const calm = useReducedMotion();

  function bonk() {
    const r = ref.current?.getBoundingClientRect();
    if (r) burst(r.left + r.width / 2, r.top + r.height / 2, 24);
    onBonk();
    if (!calm) {
      controls.start({
        rotate: [0, 360],
        scaleX: [1, 0.85, 1.12, 1],
        scaleY: [1, 1.15, 0.9, 1],
        transition: { duration: 0.7, ease: "easeOut" },
      });
    }
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={bonk}
      aria-label="Poke the zero"
      drag={!calm}
      dragSnapToOrigin
      dragElastic={0.45}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 12 }}
      whileHover={calm ? undefined : { scale: 1.06 }}
      whileTap={calm ? undefined : { scale: 0.92, cursor: "grabbing" }}
      whileDrag={calm ? undefined : { scale: 1.1, rotate: 8 }}
      className="relative mx-[-0.02em] block h-[0.82em] w-[0.72em] shrink-0 cursor-grab touch-none rounded-[50%] text-[inherit]"
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 9, delay: 0.5 }}
    >
      <motion.span animate={controls} className="absolute inset-0 block">
        <svg viewBox="0 0 100 114" className="size-full overflow-visible" aria-hidden="true">
          <ellipse cx="50" cy="57" rx="46" ry="53" fill="var(--yellow)" stroke="var(--line)" strokeWidth="4" />
          <ellipse cx="50" cy="57" rx="20" ry="26" fill="var(--background)" stroke="var(--line)" strokeWidth="4" />
        </svg>
        <span className="absolute top-[26%] left-1/2 flex w-[44%] -translate-x-1/2 gap-[8%]" aria-hidden="true">
          {[0, 1].map((i) => (
            <span key={i} className="blink relative aspect-square flex-1 overflow-hidden rounded-full border-[3px] border-ink bg-white">
              <motion.span style={{ x: look.x, y: look.y }} className="absolute inset-[24%] rounded-full bg-ink" />
            </span>
          ))}
        </span>
      </motion.span>
    </motion.button>
  );
}

export function NotFoundScene() {
  const [bonks, setBonks] = useState(0);
  const calm = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <Floaty className="absolute top-16 left-[6%] -z-10 size-14 text-pink" rotate={20}>
        <Burst className="size-full" />
      </Floaty>
      <Floaty className="absolute top-28 right-[8%] -z-10 size-12 text-blue" delay={0.5}>
        <Ring className="size-full" />
      </Floaty>
      <Floaty className="absolute bottom-24 left-[10%] -z-10 size-12 text-mint" delay={0.9} amp={16}>
        <Triangle className="size-full" />
      </Floaty>
      <Floaty className="absolute right-[12%] bottom-32 -z-10 size-10 text-orange" delay={0.3}>
        <Plus className="size-full" />
      </Floaty>
      <Floaty className="absolute top-[45%] right-[3%] -z-10 h-8 w-28 text-violet" delay={0.2} rotate={4}>
        <Squiggle className="size-full" />
      </Floaty>
      <Floaty className="absolute top-[40%] left-[3%] -z-10 size-9 text-yellow" delay={0.7} rotate={25}>
        <Star className="size-full" />
      </Floaty>

      <div className="wrap flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center py-12 text-center">
        <div className="flex items-center justify-center font-display text-[min(34vw,15rem)] leading-none font-extrabold select-none">
          <motion.span
            aria-hidden="true"
            initial={{ y: -200, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 160, damping: 10, delay: 0.1 }}
            className="text-pink [-webkit-text-stroke:3px_var(--line)] [paint-order:stroke_fill]"
          >
            4
          </motion.span>
          <Zero onBonk={() => setBonks((b) => b + 1)} />
          <motion.span
            aria-hidden="true"
            initial={{ y: -200, opacity: 0, rotate: 30 }}
            animate={{ y: 0, opacity: 1, rotate: 4 }}
            transition={{ type: "spring", stiffness: 160, damping: 10, delay: 0.25 }}
            className="text-blue [-webkit-text-stroke:3px_var(--line)] [paint-order:stroke_fill]"
          >
            4
          </motion.span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.9 }}
          className="mt-8 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-5xl"
        >
          <span className="sr-only">404. </span>
          This page wandered off.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 1 }}
          className="mt-4 max-w-md text-lg text-muted-foreground text-pretty"
        >
          The link may be broken, or the page may have moved. Drag the zero around while you are here, then let me
          point you somewhere real.
        </motion.p>

        <p aria-live="polite" className="mt-5 min-h-7 font-mono text-sm font-bold text-accent">
          {bonks > 0 && `${LINES[Math.min(bonks, LINES.length) - 1]}${bonks > LINES.length ? ` (x${bonks})` : ""}`}
        </p>

        <motion.div
          initial={{ opacity: 0, scale: calm ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 12, delay: 1.15 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/" className="btn btn-pink">
            <Home className="size-4" aria-hidden="true" /> Take me home
          </Link>
          <Link href="/#projects" className="btn btn-plain">
            <FolderOpen className="size-4" aria-hidden="true" /> See my projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
