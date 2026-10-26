import { createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { impactArticles, perfMetrics, projects, type MetricKey } from "../data/resume";
import { Section } from "./Header";

const BASE_Y = 260;
const MAX_H = 200;
const BARS = [
  { x: 120, cx: 180, tag: "Before" },
  { x: 320, cx: 380, tag: "After" },
] as const;

export function Impact() {
  const [key, setKey] = createSignal<MetricKey>("lighthouse");
  const [entered, setEntered] = createSignal(false);
  let svgRef: SVGSVGElement | undefined;

  const metric = createMemo(() => perfMetrics.find((m) => m.key === key()) ?? perfMetrics[0]);
  const values = createMemo(() => [metric().before, metric().after] as const);
  const labels = createMemo(() => [metric().beforeLabel, metric().afterLabel] as const);
  const barHeight = (v: number) => Math.max((v / metric().max) * MAX_H, 8);
  const barY = (v: number) => BASE_Y - (entered() ? barHeight(v) : 8);

  onMount(() => {
    if (!("IntersectionObserver" in window)) {
      setEntered(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (svgRef) obs.observe(svgRef);
    onCleanup(() => obs.disconnect());
  });

  const tabs = (
    <div class="no-print flex gap-1.5 rounded-[10px] border border-line bg-canvas-soft p-1 dark:border-line-dark dark:bg-night-soft" role="tablist" aria-label="Performance metrics">
      <For each={perfMetrics}>
        {(m) => (
          <button
            type="button"
            role="tab"
            aria-selected={key() === m.key}
            onClick={() => setKey(m.key)}
            class="rounded-md px-3.5 py-1.5 text-sm font-semibold text-fog transition-colors dark:text-fog-pale"
            classList={{ "bg-canvas text-ink shadow-sm dark:bg-night dark:text-bone": key() === m.key }}
          >
            {m.tab}
          </button>
        )}
      </For>
    </div>
  );

  return (
    <Section
      id="impact"
      index="01"
      title="Flagship impact: InstaWizard"
      sub={
        <>
          AmeriSave Mortgage · Senior Software Engineer · Feb 2025 – Present · Remote.
          <br />
          I technically own and am rebuilding the mortgage application platform into scalable cloud-native microservices.{" "}
          <a href={projects.instaWizard.url} target="_blank" rel="noopener">
            View the live product ↗
          </a>
        </>
      }
      aside={tabs}
    >
      <div class="grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <figure class="m-0 rounded-xl border border-line bg-canvas-soft p-4 pb-3 dark:border-line-dark dark:bg-night-soft" aria-live="polite">
          <figcaption class="mb-2 font-mono text-sm font-bold">{metric().caption}</figcaption>
          <svg ref={svgRef} viewBox="0 0 560 300" role="img" aria-label={metric().caption} class="block h-auto w-full">
            <g aria-hidden="true">
              <For each={[0, 1, 2, 3, 4]}>
                {(g) => {
                  const y = BASE_Y - (g / 4) * MAX_H;
                  return <line x1="40" x2="520" y1={y} y2={y} stroke="currentColor" opacity="0.12" />;
                }}
              </For>
            </g>
            <For each={BARS}>
              {(bar, i) => (
                <g>
                  <rect
                    x={bar.x}
                    y={barY(values()[i()])}
                    width="120"
                    height={entered() ? barHeight(values()[i()]) : 8}
                    rx="6"
                    class={i() === 0 ? "chart-bar-anim fill-line dark:fill-line-dark" : "chart-bar-anim fill-accent dark:fill-accent-bright"}
                  />
                  <text x={bar.cx} y={barY(values()[i()]) - 12} text-anchor="middle" font-size={metric().small ? "17" : "26"} font-weight="700" class="fill-ink font-mono dark:fill-bone">
                    {labels()[i()]}
                  </text>
                  <text x={bar.cx} y="278" text-anchor="middle" font-size="13" class="fill-fog font-mono dark:fill-fog-pale">
                    {bar.tag}
                  </text>
                </g>
              )}
            </For>
            <text x="280" y="150" text-anchor="middle" font-size="20" font-weight="700" aria-hidden="true" class="fill-accent font-mono dark:fill-accent-bright">
              {metric().delta}
            </text>
          </svg>
          <p class="mb-0 mt-2 text-sm text-fog dark:text-fog-pale">Frontend performance optimization I led. LCP fell 23.2s → 2.2s (−91%); TBT fell 71%.</p>
        </figure>
        <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <For each={impactArticles}>
            {(a) => (
              <article class="border-t-2 border-ink pt-2.5 dark:border-bone">
                <h3 class="mb-1.5 font-sans text-[1.12rem] font-bold">{a.title}</h3>
                <p class="m-0 text-[0.93rem] text-ink-soft dark:text-ink-pale">{a.body}</p>
              </article>
            )}
          </For>
        </div>
      </div>
    </Section>
  );
}
