import { createEffect, createSignal, For, onMount } from "solid-js";
import { runTermCommand, termWelcome, type TermLine } from "../lib/terminal";
import { setTheme, theme } from "../stores/theme";
import { Section } from "./Header";

const KIND_CLASS: Record<TermLine["kind"], string> = {
  echo: "text-accent-bright font-bold",
  dim: "text-term-dim",
  ok: "text-good-bright",
  plain: "",
};

export function Terminal() {
  const [lines, setLines] = createSignal<TermLine[]>([...termWelcome]);
  const [history, setHistory] = createSignal<string[]>([]);
  const [histIdx, setHistIdx] = createSignal(-1);
  let screenRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    lines();
    if (screenRef) screenRef.scrollTop = screenRef.scrollHeight;
  });

  onMount(() => {
    // Seed one demonstration so visitors see the terminal is alive.
    setLines((prev) => [...prev, ...runTermCommand("metrics", theme()).lines]);
  });

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    const value = inputRef?.value ?? "";
    if (inputRef) inputRef.value = "";
    if (value.trim()) {
      setHistory((h) => [value, ...h]);
      setHistIdx(-1);
    }
    const result = runTermCommand(value, theme());
    if (result.action?.type === "clear") {
      setLines([]);
      return;
    }
    if (result.action?.type === "theme") setTheme(result.action.theme);
    if (result.action?.type === "open") window.open(result.action.url, "_blank", "noopener");
    setLines((prev) => [...prev, ...result.lines]);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const h = history();
    if ((e.key === "ArrowUp" || e.key === "ArrowDown") && h.length > 0) {
      e.preventDefault();
      const next = e.key === "ArrowUp" ? Math.min(histIdx() + 1, h.length - 1) : Math.max(histIdx() - 1, -1);
      setHistIdx(next);
      if (inputRef) inputRef.value = next === -1 ? "" : h[next];
    }
  };

  return (
    <Section
      id="terminal"
      index="05"
      title="Prefer the command line?"
      sub={
        <>
          A working terminal for this portfolio. Type <code class="rounded bg-canvas-soft px-1.5 py-0.5 font-mono text-[0.88em] dark:bg-night-soft">help</code> to start.
        </>
      }
    >
      <div class="overflow-hidden rounded-xl border border-line-dark bg-coal font-mono text-[0.88rem] text-bone" role="region" aria-label="Interactive portfolio terminal">
        <div class="flex items-center gap-1.5 border-b border-line-dark bg-night-soft px-4 py-2.5" aria-hidden="true">
          <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span class="ml-2.5 text-xs text-term-dim">nick@portfolio ~ %</span>
        </div>
        <div ref={screenRef} class="term-screen max-h-[22rem] min-h-[15rem] overflow-y-auto whitespace-pre-wrap break-words px-4 pb-1.5 pt-4" aria-live="polite">
          <For each={lines()}>{(l) => <div class={KIND_CLASS[l.kind]}>{l.text}</div>}</For>
        </div>
        <form onSubmit={submit} class="flex items-center gap-2.5 px-4 pb-4 pt-2.5">
          <label for="term-input" aria-hidden="true" class="font-bold text-accent-bright">
            ❯
          </label>
          <input
            ref={inputRef}
            id="term-input"
            name="cmd"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            spellcheck={false}
            placeholder="type a command…"
            aria-label="Terminal command"
            onKeyDown={onKeyDown}
            class="w-full min-w-0 flex-1 border-0 bg-transparent font-mono text-inherit caret-[#ff6b2c] outline-none placeholder:text-[#5a636d]"
          />
        </form>
      </div>
    </Section>
  );
}
