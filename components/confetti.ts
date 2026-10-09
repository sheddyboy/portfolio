// Fires a confetti burst; the Cursor component (mounted per layout) listens and renders it.
export function burst(x: number, y: number, count = 14) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("playful:burst", { detail: { x, y, count } }));
}
