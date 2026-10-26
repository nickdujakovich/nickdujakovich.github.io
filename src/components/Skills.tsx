import { For, Show } from "solid-js";
import { recentSkills, skillGroups } from "../data/resume";
import { Section } from "./Header";

const recent = new Set<string>(recentSkills);

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      title="Skills"
      sub="The full inventory, grouped by craft. Highlighted items are my most-recent daily stack."
    >
      <div class="grid gap-x-10 gap-y-8 sm:grid-cols-2" data-testid="skill-groups">
        <For each={skillGroups}>
          {(group) => (
            <div>
              <h3 class="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-fog dark:text-fog-pale">{group.label}</h3>
              <ul class="m-0 list-none p-0 leading-loose">
                <For each={group.items}>
                  {(skill, i) => (
                    <li class="inline">
                      <Show
                        when={recent.has(skill)}
                        fallback={<span class="text-ink-soft dark:text-ink-pale">{skill}</span>}
                      >
                        <span data-recent="true" title="Most-recent daily stack" class="font-semibold text-accent dark:text-accent-bright">
                          {skill}
                        </span>
                      </Show>
                      <Show when={i() < group.items.length - 1}>
                        <span class="text-line dark:text-line-dark" aria-hidden="true">
                          {"  ·  "}
                        </span>
                      </Show>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </div>
    </Section>
  );
}
