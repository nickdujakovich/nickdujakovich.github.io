import { createEffect, createSignal, For, Show } from "solid-js";
import { answerQuestion, type QALink } from "../lib/resume-qa";
import { Section } from "./Header";

interface Message {
  from: "user" | "bot";
  text: string;
  links?: QALink[];
}

const SUGGESTIONS = [
  "What was the Lighthouse improvement?",
  "Where can I see your work?",
  "Do you know Redis?",
  "How big is your team?",
];

const GREETING: Message = {
  from: "bot",
  text: "Ask me anything about Nick's background.",
};

export function Ask() {
  const [messages, setMessages] = createSignal<Message[]>([GREETING]);
  let screenRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    messages();
    if (screenRef) screenRef.scrollTop = screenRef.scrollHeight;
  });

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const answer = answerQuestion(text);
    setMessages((prev) => [...prev, { from: "user", text }, { from: "bot", text: answer.text, links: answer.links }]);
  };

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    if (inputRef) {
      send(inputRef.value);
      inputRef.value = "";
    }
  };

  return (
    <Section
      id="ask"
      index="06"
      title="Ask my resume"
      sub="A closed-domain Q&A."
    >
      <div class="overflow-hidden rounded-xl border border-line dark:border-line-dark">
        <div ref={screenRef} class="flex max-h-[24rem] min-h-[16rem] flex-col gap-4 overflow-y-auto p-4 sm:p-5" aria-live="polite" data-testid="ask-screen">
          <For each={messages()}>
            {(m) =>
              m.from === "user" ? (
                <p class="animate-msg m-0 max-w-[85%] self-end rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[0.92rem] text-canvas dark:bg-bone dark:text-night">
                  {m.text}
                </p>
              ) : (
                <div class="animate-msg max-w-[95%] self-start">
                  <p class="m-0 text-[0.95rem] leading-relaxed">{m.text}</p>
                  <Show when={m.links?.length}>
                    <p class="mb-0 mt-2 flex flex-wrap gap-2">
                      <For each={m.links}>
                        {(l) => (
                          <a
                            href={l.url}
                            target={l.url.startsWith("mailto:") ? undefined : "_blank"}
                            rel="noopener"
                            class="rounded-full border border-line px-3 py-1 font-mono text-xs no-underline hover:border-accent hover:text-accent dark:border-line-dark dark:hover:border-accent-bright dark:hover:text-accent-bright"
                          >
                            {l.label} ↗
                          </a>
                        )}
                      </For>
                    </p>
                  </Show>
                </div>
              )
            }
          </For>
        </div>
        <div class="no-print flex flex-wrap gap-2 border-t border-line px-4 py-3 dark:border-line-dark">
          <For each={SUGGESTIONS}>
            {(s) => (
              <button
                type="button"
                onClick={() => send(s)}
                class="rounded-full bg-canvas-soft px-3 py-1.5 text-xs text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent dark:bg-night-soft dark:text-ink-pale dark:hover:text-accent-bright"
              >
                {s}
              </button>
            )}
          </For>
        </div>
        <form onSubmit={submit} class="no-print flex items-center gap-2 border-t border-line p-3 dark:border-line-dark">
          <label for="ask-input" class="sr-only">
            Ask about Nick's resume
          </label>
          <input
            ref={inputRef}
            id="ask-input"
            type="text"
            autocomplete="off"
            placeholder="Ask about experience, stack, metrics…"
            aria-label="Ask about Nick's resume"
            data-testid="ask-input"
            class="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-[0.92rem] outline-none placeholder:text-fog/70 focus:border-accent dark:border-line-dark dark:focus:border-accent-bright"
          />
          <button
            type="submit"
            aria-label="Send question"
            class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-white transition hover:bg-accent-hover dark:bg-accent-bright dark:text-ink dark:hover:opacity-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </button>
        </form>
      </div>
    </Section>
  );
}
