import { createSignal } from "solid-js";

export type Theme = "light" | "dark";

function initialTheme(): Theme {
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  return "light";
}

const [theme, setThemeSignal] = createSignal<Theme>(initialTheme());

export function setTheme(t: Theme): void {
  setThemeSignal(t);
  document.documentElement.classList.toggle("dark", t === "dark");
  try {
    localStorage.setItem("nd-theme", t);
  } catch {
    /* private mode: theme simply won't persist */
  }
}

export function toggleTheme(): void {
  setTheme(theme() === "dark" ? "light" : "dark");
}

export { theme };
