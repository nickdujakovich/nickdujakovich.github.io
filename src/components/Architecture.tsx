import { For } from "solid-js";
import { archAlsoRan, stackLayers } from "../data/resume";
import { Section } from "./Header";

export function Architecture() {
  return (
    <Section
      id="architecture"
      index="03"
      title="The stack I run in production"
      sub="The system I own at AmeriSave, by layer."
    >
      <dl class="m-0 max-w-3xl p-0">
        <For each={stackLayers}>
          {(row) => (
            <div class="flex flex-col gap-1 border-t border-line py-4 sm:flex-row sm:items-baseline sm:gap-8 dark:border-line-dark">
              <dt class="m-0 w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-fog dark:text-fog-pale">{row.layer}</dt>
              <dd class="m-0 text-[1.02rem]">{row.tech}</dd>
            </div>
          )}
        </For>
      </dl>
      <p class="mt-6 max-w-3xl border-t border-line pt-4 text-sm text-fog dark:border-line-dark dark:text-fog-pale">
        <strong>Also in production over my career:</strong> {archAlsoRan}
      </p>
    </Section>
  );
}
