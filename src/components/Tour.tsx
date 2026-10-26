import { createEffect, onCleanup, onMount, Show } from "solid-js";
import { prefersReducedMotion } from "../lib/media";
import { STOPS } from "../lib/tour";
import { nextTour, prevTour, stopTour, tourIndex } from "../stores/tour";

export function Tour() {
  let cardRef: HTMLDivElement | undefined;
  let highlighted: Element | null = null;

  const clearHighlight = () => {
    highlighted?.removeAttribute("data-tour-active");
    highlighted = null;
  };

  createEffect(() => {
    const i = tourIndex();
    clearHighlight();
    if (i === null) return;
    const el = document.getElementById(STOPS[i].target);
    el?.scrollIntoView?.({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    el?.setAttribute("data-tour-active", "true");
    highlighted = el;
    cardRef?.focus({ preventScroll: true });
  });

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (tourIndex() === null) return;
      if (e.key === "Escape") stopTour();
      else if (e.key === "ArrowRight") nextTour();
      else if (e.key === "ArrowLeft") prevTour();
    };
    window.addEventListener("keydown", onKey);
    onCleanup(() => {
      window.removeEventListener("keydown", onKey);
      clearHighlight();
    });
  });

  return (
    <Show when={tourIndex() !== null}>
      <div class="no-print pointer-events-none fixed inset-x-0 bottom-0 z-[95] flex justify-center p-4">
        <div
          ref={cardRef}
          tabindex={-1}
          role="dialog"
          aria-label={`Guided tour, step ${(tourIndex() ?? 0) + 1} of ${STOPS.length}`}
          data-testid="tour-card"
          class="animate-pop pointer-events-auto w-full max-w-md rounded-xl border border-line bg-canvas p-5 shadow-2xl outline-none dark:border-line-dark dark:bg-night"
        >
          <div class="mb-3 flex items-center justify-between gap-4">
            <p class="m-0 font-mono text-xs text-fog dark:text-fog-pale" data-testid="tour-step">
              {(tourIndex() ?? 0) + 1} / {STOPS.length}
            </p>
            <button
              type="button"
              onClick={stopTour}
              aria-label="Exit tour"
              class="cursor-pointer bg-transparent p-0 font-mono text-xs text-fog hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright"
            >
              Skip ✕
            </button>
          </div>
          <div class="mb-3 h-1 overflow-hidden rounded-full bg-line dark:bg-line-dark" aria-hidden="true">
            <div
              class="h-full rounded-full bg-accent transition-all duration-300 dark:bg-accent-bright"
              style={{ width: `${(((tourIndex() ?? 0) + 1) / STOPS.length) * 100}%` }}
            />
          </div>
          <h2 class="mb-1.5 font-display text-xl">{STOPS[tourIndex() ?? 0].title}</h2>
          <p class="mb-4 mt-0 text-[0.92rem] leading-relaxed text-ink-soft dark:text-ink-pale">{STOPS[tourIndex() ?? 0].body}</p>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="m-0 font-mono text-[0.7rem] text-fog dark:text-fog-pale">← → navigate · esc exits</p>
            <div class="flex gap-2">
              <button
                type="button"
                onClick={prevTour}
                disabled={(tourIndex() ?? 0) === 0}
                class="cursor-pointer rounded-full border border-line px-4 py-1.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink dark:border-line-dark dark:disabled:hover:border-line-dark dark:disabled:hover:text-bone"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextTour}
                data-testid="tour-next"
                class="cursor-pointer rounded-full border border-accent bg-accent px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-hover dark:border-accent-bright dark:bg-accent-bright dark:text-ink dark:hover:opacity-90"
              >
                {(tourIndex() ?? 0) + 1 >= STOPS.length ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
