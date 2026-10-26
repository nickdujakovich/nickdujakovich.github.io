import { profile } from "../data/resume";
import { theme, toggleTheme } from "../stores/theme";
import { LinkedInLogo } from "./Logos";
import { setPaletteOpen } from "../stores/ui";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" class="scroll-mt-20 border-t border-line py-14 sm:py-20 dark:border-line-dark">
      <p class="mb-3 flex items-center gap-3 font-mono text-xs text-fog dark:text-fog-pale" aria-hidden="true">
        <span class="text-accent dark:text-accent-bright">07</span>
        <span class="inline-block h-px w-10 bg-line dark:bg-line-dark" />
      </p>
      <h2 id="contact-title" class="font-display text-4xl sm:text-6xl">
        Let's talk.
      </h2>
      <a
        href={`mailto:${profile.email}`}
        class="mt-6 block break-all font-display text-2xl italic text-accent no-underline hover:underline sm:text-4xl dark:text-accent-bright"
      >
        {profile.email}
      </a>
      <div class="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-fog dark:text-fog-pale">
        <a href={profile.phoneHref} class="text-fog no-underline hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright">
          {profile.phone}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-fog no-underline hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright">
          <LinkedInLogo class="h-3.5 w-3.5" />
          {profile.linkedinLabel} ↗
        </a>
        <a href={profile.resumePdf} download="" class="text-fog no-underline hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright">
          Resume ↓
        </a>
      </div>
      <p class="mt-8 max-w-[60ch] text-sm text-fog dark:text-fog-pale">
        {profile.location} · working remotely · open to onsite/hybrid roles.
      </p>
    </section>
  );
}

export function Footer() {
  return (
    <footer class="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line px-5 py-6 text-sm text-fog dark:border-line-dark dark:text-fog-pale">
      <p class="m-0 font-mono text-xs">© 2026 {profile.name} · SolidJS + Tailwind + Vite</p>
      <p class="m-0 flex flex-wrap gap-x-5 gap-y-1">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          class="cursor-pointer bg-transparent p-0 font-sans text-sm text-fog transition-colors hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright"
        >
          Press ⌘K
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          class="cursor-pointer bg-transparent p-0 font-sans text-sm text-fog transition-colors hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright"
        >
          {theme() === "dark" ? "Light" : "Dark"}
        </button>
        <a href="#top" class="text-fog no-underline hover:text-accent dark:text-fog-pale dark:hover:text-accent-bright">
          Top ↑
        </a>
      </p>
    </footer>
  );
}
