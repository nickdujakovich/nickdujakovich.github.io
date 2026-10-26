import { For } from "solid-js";
import type { RichPart } from "../data/resume";

/** Renders typed rich-text segments without innerHTML. Segments with href become external links. */
export function RichText(props: { parts: RichPart[] }) {
  return (
    <For each={props.parts}>
      {(part) =>
        part.href ? (
          <a
            href={part.href}
            target="_blank"
            rel="noopener"
            class="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent dark:text-accent-bright dark:decoration-accent-bright/40 dark:hover:decoration-accent-bright"
          >
            {part.text} ↗
          </a>
        ) : part.bold ? (
          <strong>{part.text}</strong>
        ) : (
          <>{part.text}</>
        )
      }
    </For>
  );
}
