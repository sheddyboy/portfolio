"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = dark ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      suppressHydrationWarning
      className="sticker-sm group relative grid size-10 cursor-pointer place-items-center overflow-hidden rounded-full bg-yellow text-ink transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] hover:-rotate-12 hover:scale-110 active:scale-90"
    >
      {/* Both icons are always rendered; CSS picks one so there is no flash on load. */}
      <Sun className="absolute size-5 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] dark:translate-y-8 dark:rotate-90" aria-hidden="true" />
      <Moon className="absolute size-5 -translate-y-8 -rotate-90 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.34,1.7,0.64,1)] dark:translate-y-0 dark:rotate-0" aria-hidden="true" />
    </button>
  );
}
