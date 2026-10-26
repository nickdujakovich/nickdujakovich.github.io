import { createSignal } from "solid-js";
import { prefersReducedMotion } from "../lib/media";

/** Command-palette visibility, shared by Footer hint and Palette. */
const [paletteOpen, setPaletteOpen] = createSignal(false);

export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export { paletteOpen, setPaletteOpen };
