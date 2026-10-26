import { Show } from "solid-js";
import { toast } from "../stores/toast";

export function Toast() {
  return (
    <Show when={toast()}>
      <div role="status" aria-live="polite" class="animate-toast fixed inset-x-0 bottom-6 z-[120] mx-auto w-fit rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-canvas shadow-xl dark:bg-bone dark:text-night">
        {toast()}
      </div>
    </Show>
  );
}
