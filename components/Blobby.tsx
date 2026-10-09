"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { burst } from "./confetti";
import { usePointerLook } from "./usePointerLook";

// The hero mascot: googly eyes follow the pointer; click (or Enter) to make it jump.
export function Blobby() {
  const ref = useRef<HTMLButtonElement>(null);
  const look = usePointerLook(ref, 8);
  const controls = useAnimationControls();
  const calm = useReducedMotion();
  const [oh, setOh] = useState(false);

  async function jump() {
    const r = ref.current?.getBoundingClientRect();
    if (r) burst(r.left + r.width / 2, r.top + r.height * 0.3, 28);
    setOh(true);
    if (!calm) {
      await controls.start({
        y: [0, 12, -64, 0],
        scaleX: [1, 1.12, 0.92, 1.06, 1],
        scaleY: [1, 0.86, 1.1, 0.94, 1],
        rotate: [0, 0, -6, 4, 0],
        transition: { duration: 0.8, times: [0, 0.2, 0.55, 0.85, 1], ease: "easeOut" },
      });
    }
    setTimeout(() => setOh(false), calm ? 600 : 250);
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={jump}
      aria-label="Make the blob jump"
      className="group relative block aspect-square w-[min(62vw,19rem)] cursor-pointer rounded-[40%]"
    >
      <motion.div
        animate={controls}
        whileHover={calm ? undefined : { scale: 1.05, rotate: -3 }}
        whileTap={calm ? undefined : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
        className="relative size-full"
      >
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <ellipse cx="100" cy="192" rx="62" ry="7" fill="var(--shadow-c)" opacity="0.25" />
          <path d="M100 30 C98 14 88 8 76 10" stroke="var(--line)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="76" cy="10" r="9" fill="var(--pink)" stroke="var(--line)" strokeWidth="4.5" />
          <path
            d="M100 24 C152 20 192 58 188 112 C184 164 146 190 98 188 C48 186 12 156 14 104 C16 58 52 26 100 24Z"
            fill="var(--yellow)"
            stroke="var(--line)"
            strokeWidth="5"
          />
          <ellipse cx="52" cy="124" rx="14" ry="9" fill="var(--pink)" opacity="0.85" />
          <ellipse cx="148" cy="124" rx="14" ry="9" fill="var(--pink)" opacity="0.85" />
          {oh ? (
            <ellipse cx="100" cy="136" rx="13" ry="16" fill="var(--ink)" />
          ) : (
            <path d="M74 126 Q100 156 126 126" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" fill="none" />
          )}
        </svg>

        <div className="absolute top-[34%] left-1/2 flex -translate-x-1/2 gap-[7%]" style={{ width: "58%" }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              className="blink relative aspect-square flex-1 overflow-hidden rounded-full border-[3px] bg-white"
              style={{ borderColor: "var(--ink)" }}
            >
              <motion.div
                style={{ x: look.x, y: look.y }}
                className="absolute inset-[26%] rounded-full bg-ink"
              />
            </div>
          ))}
        </div>

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={oh ? { opacity: 1, scale: 1, rotate: 8 } : { opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
          className="sticker-sm absolute -top-4 -right-4 rounded-full bg-pink px-3 py-1 font-display text-lg font-extrabold text-ink"
        >
          boing!
        </motion.span>
      </motion.div>
    </button>
  );
}
