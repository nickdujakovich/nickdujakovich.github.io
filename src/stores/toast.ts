import { createSignal } from "solid-js";

const [toast, setToast] = createSignal<string | null>(null);
let timer: number | undefined;

export function showToast(msg: string): void {
  setToast(msg);
  window.clearTimeout(timer);
  timer = window.setTimeout(() => setToast(null), 2400);
}

export { toast };
