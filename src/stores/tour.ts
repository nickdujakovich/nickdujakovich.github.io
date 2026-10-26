import { createSignal } from "solid-js";
import { STOPS } from "../lib/tour";

/** Active tour step, or null when the tour is off. */
const [tourIndex, setTourIndex] = createSignal<number | null>(null);
let lastFocus: Element | null = null;

export function startTour(): void {
  lastFocus = document.activeElement;
  setTourIndex(0);
}

export function stopTour(): void {
  setTourIndex(null);
  if (lastFocus instanceof HTMLElement) lastFocus.focus();
}

export function nextTour(): void {
  const i = tourIndex();
  if (i === null) return;
  if (i + 1 >= STOPS.length) stopTour();
  else setTourIndex(i + 1);
}

export function prevTour(): void {
  const i = tourIndex();
  if (i !== null && i > 0) setTourIndex(i - 1);
}

export { tourIndex };
