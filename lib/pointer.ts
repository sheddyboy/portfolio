"use client";

import { useSyncExternalStore } from "react";

// Subscribes to a media query without effects; the server snapshot is always false.
function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True only for a mouse-like device that can hover. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");

/** True when the visitor asked the OS for reduced motion. */
export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** Pointer effects (cursor, magnetic) run only when this is true. */
export function useRichPointer() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  return fine && !reduce;
}
