import { For } from "solid-js";
import { heroHighlights, profile, projects } from "../data/resume";
import { copyText } from "../lib/clipboard";
import { showToast } from "../stores/toast";
import { startTour } from "../stores/tour";
import { LinkedInLogo } from "./Logos";

function copyEmail() {
  void copyText(profile.email).then(() => showToast("Email copied to clipboard"));
}

const textLink =
  "text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent dark:text-bone dark:decoration-line-dark dark:hover:text-accent-bright dark:hover:decoration-accent-bright";

export function Hero() {
  const live = [projects.instaWizard, projects.autoSearch];
  return (
    <section id="hero" aria-labelledby="hero-name" class="scroll-mt-20 pb-16 pt-14 sm:pt-20">
      <h1 id="hero-name" class="animate-rise font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] tracking-tight" style={{ "animation-delay": "70ms" }}>
        Nikolas <em class="font-light">Dujakovich</em>
      </h1>
      <p class="animate-rise mb-6 mt-5 font-display text-2xl italic text-ink-soft dark:text-ink-pale" style={{ "animation-delay": "150ms" }}>
        {profile.tagline}
      </p>
      <p class="animate-rise max-w-[62ch] text-lg leading-relaxed" style={{ "animation-delay": "230ms" }}>
        Technical owner of AmeriSave's flagship digital lending platform, serving <strong>{heroHighlights.dailyUsers} daily users</strong> and powering
        approximately <strong>{heroHighlights.fundedLoans} of funded loans</strong>. I lead architecture and modernization of cloud-native microservices —
        most recently with <strong>{heroHighlights.recentStack}</strong>.
      </p>
      <div class="animate-rise no-print mt-8 flex flex-wrap items-center gap-x-7 gap-y-3" style={{ "animation-delay": "310ms" }}>
        <a
          href={profile.resumePdf}
          download=""
          class="inline-flex items-center rounded-full border border-accent bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-white no-underline transition hover:bg-accent-hover dark:border-accent-bright dark:bg-accent-bright dark:text-ink dark:hover:opacity-90"
        >
          Download resume
        </a>
        <button type="button" onClick={copyEmail} class={`cursor-pointer bg-transparent px-0 font-sans text-[0.95rem] ${textLink}`}>
          Copy email
        </button>
        <a href={profile.linkedin} target="_blank" rel="noopener" class={`inline-flex items-center gap-1.5 text-[0.95rem] ${textLink}`}>
          <LinkedInLogo class="h-4 w-4" />
          LinkedIn ↗
        </a>
        <button type="button" onClick={startTour} data-testid="start-tour" class={`cursor-pointer bg-transparent px-0 font-sans text-[0.95rem] ${textLink}`}>
          Take the 60-second tour →
        </button>
      </div>
      <div class="animate-rise mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-line pt-6 dark:border-line-dark" style={{ "animation-delay": "390ms" }}>
        <p class="m-0 font-mono text-xs uppercase tracking-[0.18em] text-fog dark:text-fog-pale">Live products</p>
        <For each={live}>
          {(p) => (
            <a href={p.url} target="_blank" rel="noopener" class="group no-underline">
              <span class="font-display text-xl text-ink dark:text-bone">
                {p.name}{" "}
                <span class="inline-block text-base text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-accent-bright" aria-hidden="true">
                  ↗
                </span>
              </span>
              <span class="ml-3 font-mono text-xs text-fog dark:text-fog-pale">{p.shortUrl}</span>
            </a>
          )}
        </For>
      </div>
    </section>
  );
}
