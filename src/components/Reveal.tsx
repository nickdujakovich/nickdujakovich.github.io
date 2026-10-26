import { createSignal, onCleanup, onMount, type JSX } from "solid-js";
import { hasIntersectionObserver, prefersReducedMotion } from "../lib/media";

/** Subtle once-only rise-in for major blocks. Disabled under reduced motion. */
export function Reveal(props: { children: JSX.Element; class?: string }) {
  const [shown, setShown] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  onMount(() => {
    if (prefersReducedMotion() || !hasIntersectionObserver()) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    if (ref) obs.observe(ref);
    onCleanup(() => obs.disconnect());
  });

  return (
    <div
      ref={ref}
      class={props.class}
      style={{
        opacity: shown() ? 1 : 0,
        transform: shown() ? "none" : "translateY(14px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {props.children}
    </div>
  );
}
