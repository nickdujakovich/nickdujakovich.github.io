/** Guarded browser capability checks (safe in jsdom, SSR, and older browsers). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasIntersectionObserver(): boolean {
  return typeof window !== "undefined" && "IntersectionObserver" in window;
}
