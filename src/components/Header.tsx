import type { JSX } from "solid-js";
import { profile } from "../data/resume";
import { Reveal } from "./Reveal";

export function Section(props: { id: string; index: string; title: string; sub: JSX.Element; aside?: JSX.Element; children: JSX.Element }) {
  return (
    <section id={props.id} aria-labelledby={`${props.id}-title`} class="scroll-mt-20 border-t border-line py-14 sm:py-20 dark:border-line-dark">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="mb-3 flex items-center gap-3 font-mono text-xs text-fog dark:text-fog-pale" aria-hidden="true">
            <span class="text-accent dark:text-accent-bright">{props.index}</span>
            <span class="inline-block h-px w-10 bg-line dark:bg-line-dark" />
          </p>
          <h2 id={`${props.id}-title`} class="font-display text-4xl sm:text-5xl">
            {props.title}
          </h2>
          <div class="mt-3 max-w-[60ch] text-fog dark:text-fog-pale">{props.sub}</div>
        </div>
        {props.aside}
      </div>
      <Reveal>{props.children}</Reveal>
    </section>
  );
}

const linkCls =
  "text-ink-soft no-underline transition-colors hover:text-accent dark:text-ink-pale dark:hover:text-accent-bright";

export function Header() {
  return (
    <header class="no-print sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur dark:border-line-dark dark:bg-night/90">
      <div class="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-3">
        <a href="#top" class="font-display text-lg text-ink no-underline dark:text-bone" aria-label="Nikolas Dujakovich — back to top">
          Nikolas Dujakovich
        </a>
        <nav class="flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Sections">
          <a href="#impact" class={linkCls}>
            Work
          </a>
          <a href="#experience" class={linkCls}>
            Experience
          </a>
          <a href="#contact" class={linkCls}>
            Contact
          </a>
          <a href={profile.resumePdf} download="" class={linkCls}>
            Resume ↓
          </a>
        </nav>
      </div>
    </header>
  );
}
