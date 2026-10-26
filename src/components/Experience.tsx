import { createSignal, For } from "solid-js";
import { timeline } from "../data/resume";
import { Section } from "./Header";
import { AmeriSaveLogo, CapitalOneLogo } from "./Logos";
import { RichText } from "./RichText";

export function Experience() {
  const [open, setOpen] = createSignal<Record<string, boolean>>({ amerisave: true });
  const toggle = (id: string) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      sub="Two senior roles, one throughline: business-critical, customer-facing platforms. Select a role to expand."
    >
      <ol class="m-0 flex list-none flex-col gap-3 p-0">
        <For each={timeline}>
          {(item) => {
            const isOpen = () => open()[item.id] ?? false;
            return (
              <li
                class="overflow-hidden rounded-xl border border-line bg-canvas transition-colors duration-300 dark:border-line-dark dark:bg-night"
                classList={{ "!border-ink dark:!border-bone": isOpen() }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen()}
                  class="grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 bg-transparent px-5 py-4 text-left text-ink transition-colors duration-200 hover:bg-canvas-soft lg:grid-cols-[11rem_1fr_auto] dark:text-bone dark:hover:bg-night-soft"
                  classList={{ "bg-canvas-soft dark:bg-night-soft": item.id === "education" }}
                >
                  <span class="whitespace-nowrap font-mono text-xs text-fog lg:col-auto dark:text-fog-pale">{item.when}</span>
                  <span class="col-span-2 flex items-center gap-3 lg:col-span-1">
                    {item.id === "amerisave" && <AmeriSaveLogo testid="logo-amerisave" class="h-5 w-auto shrink-0" />}
                    {item.id === "capitalone" && <CapitalOneLogo testid="logo-capitalone" class="h-5 w-auto shrink-0" />}
                    <span>
                      <strong class="font-display text-lg">{item.role}</strong> · {item.org} · {item.place}
                    </span>
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    class="justify-self-end text-accent transition-transform duration-300 ease-out dark:text-accent-bright"
                    classList={{ "rotate-180": isOpen() }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  data-testid={`tl-panel-${item.id}`}
                  class="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ "grid-template-rows": isOpen() ? "1fr" : "0fr" }}
                >
                  <div class="overflow-hidden">
                    <div class="px-5 pb-6 lg:pl-[13.2rem]">
                      <ul class="m-0 flex flex-col gap-3 border-t border-line pt-5 text-[0.95rem] leading-relaxed text-ink-soft marker:text-accent dark:border-line-dark dark:text-ink-pale dark:marker:text-accent-bright">
                        <For each={item.bullets}>
                          {(bullet, i) => (
                            <li
                              class="pl-1 transition-all duration-300 ease-out"
                              style={{
                                opacity: isOpen() ? 1 : 0,
                                transform: isOpen() ? "none" : "translateY(6px)",
                                "transition-delay": isOpen() ? `${i() * 45}ms` : "0ms",
                              }}
                            >
                              <RichText parts={bullet} />
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          }}
        </For>
      </ol>
    </Section>
  );
}
