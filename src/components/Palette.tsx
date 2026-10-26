import { createShortcut } from "@solid-primitives/keyboard";
import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { profile } from "../data/resume";
import { copyText } from "../lib/clipboard";
import { fuzzyMatch } from "../lib/format";
import { toggleTheme } from "../stores/theme";
import { showToast } from "../stores/toast";
import { startTour } from "../stores/tour";
import { paletteOpen, scrollToId, setPaletteOpen } from "../stores/ui";

interface Command {
  label: string;
  hint: string;
  run: () => void;
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = profile.resumePdf;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const COMMANDS: Command[] = [
  { label: "Go to Impact — InstaWizard case study", hint: "section", run: () => scrollToId("impact") },
  { label: "Go to Experience", hint: "section", run: () => scrollToId("experience") },
  { label: "Go to Stack diagram", hint: "section", run: () => scrollToId("architecture") },
  { label: "Go to Skills explorer", hint: "section", run: () => scrollToId("skills") },
  {
    label: "Go to Terminal",
    hint: "section",
    run: () => {
      scrollToId("terminal");
      window.setTimeout(() => document.getElementById("term-input")?.focus(), 350);
    },
  },
  { label: "Go to Resume Q&A", hint: "section", run: () => scrollToId("ask") },
  { label: "Go to Contact", hint: "section", run: () => scrollToId("contact") },
  {
    label: "Start guided tour",
    hint: "tour",
    run: () => {
      setPaletteOpen(false);
      startTour();
    },
  },
  { label: "Download resume PDF", hint: "file", run: downloadResume },
  { label: "Copy email address", hint: "action", run: () => void copyText(profile.email).then(() => showToast("Email copied to clipboard")) },
  { label: "Toggle light / dark theme", hint: "action", run: toggleTheme },
];

export function Palette() {
  const [query, setQuery] = createSignal("");
  const [selIdx, setSelIdx] = createSignal(0);
  let inputRef: HTMLInputElement | undefined;
  let lastFocus: Element | null = null;

  const visible = createMemo(() => COMMANDS.filter((c) => fuzzyMatch(query(), c.label)));

  const open = () => {
    lastFocus = document.activeElement;
    setPaletteOpen(true);
  };
  const close = () => {
    setPaletteOpen(false);
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  };
  const runSelected = () => {
    const cmd = visible()[selIdx()];
    if (cmd) {
      close();
      cmd.run();
    }
  };

  onMount(() => {
    createShortcut(["CONTROL", "K"], () => (paletteOpen() ? close() : open()));
    createShortcut(["META", "K"], () => (paletteOpen() ? close() : open()));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && paletteOpen()) close();
    };
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });

  createEffect(() => {
    if (paletteOpen()) {
      setQuery("");
      setSelIdx(0);
      inputRef?.focus();
    }
  });

  const onInputKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelIdx((i) => Math.min(i + 1, visible().length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runSelected();
    }
  };

  return (
    <Show when={paletteOpen()}>
      <div
        class="no-print fixed inset-0 z-[100] flex items-start justify-center bg-black/45 px-4 pb-4 pt-[12vh]"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div class="animate-pop w-full max-w-xl overflow-hidden rounded-xl border border-line bg-canvas shadow-2xl dark:border-line-dark dark:bg-night" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="flex items-center gap-2.5 border-b border-line px-4 py-3.5 text-fog dark:border-line-dark dark:text-fog-pale">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query()}
              onInput={(e) => {
                setQuery(e.currentTarget.value);
                setSelIdx(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Type a command — “resume”, “theme”, “skills”…"
              aria-label="Command search"
              autocomplete="off"
              class="min-w-0 flex-1 border-0 bg-transparent text-ink outline-none dark:text-bone"
            />
            <kbd class="rounded border border-line px-1.5 py-0.5 font-mono text-xs dark:border-line-dark">esc</kbd>
          </div>
          <ul class="m-0 max-h-[22rem] list-none overflow-y-auto p-1.5" role="listbox" aria-label="Commands">
            <Show when={visible().length > 0} fallback={<li class="px-4 py-4 text-sm text-fog dark:text-fog-pale">No matching command.</li>}>
              <For each={visible()}>
                {(cmd, i) => (
                  <li role="option" aria-selected={selIdx() === i()}>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        cmd.run();
                      }}
                      onMouseMove={() => setSelIdx(i())}
                      class="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-[0.92rem] text-ink transition-colors dark:text-bone"
                      classList={{ "bg-canvas-soft outline outline-2 outline-accent -outline-offset-2 dark:bg-night-soft dark:outline-accent-bright": selIdx() === i() }}
                    >
                      <span>{cmd.label}</span>
                      <span class="shrink-0 font-mono text-xs text-fog dark:text-fog-pale">{cmd.hint}</span>
                    </button>
                  </li>
                )}
              </For>
            </Show>
          </ul>
        </div>
      </div>
    </Show>
  );
}
