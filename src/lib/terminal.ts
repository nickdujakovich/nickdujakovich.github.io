import { productionStackLine, profile, projects, skillGroups } from "../data/resume";

export type TermLineKind = "echo" | "dim" | "ok" | "plain";
export interface TermLine {
  text: string;
  kind: TermLineKind;
}
export type TermAction =
  | { type: "clear" }
  | { type: "theme"; theme: "light" | "dark" }
  | { type: "open"; url: string }
  | null;
export interface TermResult {
  lines: TermLine[];
  action: TermAction;
}

const line = (text: string, kind: TermLineKind = "plain"): TermLine => ({ text, kind });

export const termWelcome: TermLine[] = [
  line("Welcome to nick@portfolio.", "dim"),
  line("Type 'help' to see what I can do.", "dim"),
];

export function runTermCommand(raw: string, currentTheme: "light" | "dark"): TermResult {
  const parts = raw.trim().split(/\s+/);
  const cmd = (parts[0] ?? "").toLowerCase();
  if (!cmd) return { lines: [], action: null };
  const echo = line(`❯ ${raw.trim()}`, "echo");

  switch (cmd) {
    case "help":
      return {
        lines: [
          echo,
          line("Available commands:", "dim"),
          line("  whoami      — who is Nikolas Dujakovich?"),
          line("  metrics     — headline numbers"),
          line("  experience  — roles: AmeriSave, Capital One, education"),
          line("  stack       — the production stack I run"),
          line("  projects    — live products I've built"),
          line("  skills      — the full list, by group"),
          line("  contact     — email, phone, LinkedIn"),
          line("  theme [light|dark] — switch page theme"),
          line("  resume      — download the resume PDF"),
          line("  clear       — clear this terminal"),
        ],
        action: null,
      };
    case "whoami":
      return {
        lines: [echo, line(`${profile.name} — Senior Software Engineer, 6+ years full-stack. Technical owner of AmeriSave's InstaWizard lending platform. Piedmont, OK (Remote).`)],
        action: null,
      };
    case "metrics":
      return {
        lines: [
          echo,
          line("33,000+ daily users · ~60% of funded loans (InstaWizard)", "ok"),
          line("Lighthouse mobile 28 → 78 (+179%) · LCP 23.2s → 2.2s (−91%) · TBT −71%", "ok"),
          line("7-engineer team · hundreds of dealerships via white-label (Capital One)"),
        ],
        action: null,
      };
    case "experience":
      return {
        lines: [
          echo,
          line("2025–now  Senior SWE · AmeriSave Mortgage (Remote) — InstaWizard owner, Vue 3/Nuxt 3/Fastify/TS/Azure"),
          line("2020–2025 Senior SWE · Capital One (Plano, TX) — Auto/Dealer Navigator, SolidJS/React/LitElement"),
          line("2015–2020 B.S. Computer Science · Cal State San Marcos"),
        ],
        action: null,
      };
    case "stack":
      return { lines: [echo, line(productionStackLine)], action: null };
    case "projects":
      return {
        lines: [
          echo,
          line(`${projects.instaWizard.name} — ${projects.instaWizard.blurb}: ${projects.instaWizard.url}`, "ok"),
          line(`${projects.autoSearch.name} — ${projects.autoSearch.blurb}: ${projects.autoSearch.url}`, "ok"),
        ],
        action: null,
      };
    case "skills":
      return {
        lines: [echo, ...skillGroups.map((g) => line(`${g.label}: ${g.items.join(", ")}`))],
        action: null,
      };
    case "contact":
      return {
        lines: [
          echo,
          line(`email:    ${profile.email}`),
          line(`phone:    ${profile.phone}`),
          line(`linkedin: ${profile.linkedinLabel}`),
          line(`location: ${profile.location} · Remote`),
        ],
        action: null,
      };
    case "theme": {
      const t = (parts[1] ?? "").toLowerCase();
      if (t === "light" || t === "dark") {
        return { lines: [echo, line(`Theme set to ${t}.`, "ok")], action: { type: "theme", theme: t } };
      }
      return { lines: [echo, line(`Usage: theme [light|dark] — current: ${currentTheme}`)], action: null };
    }
    case "resume":
      return {
        lines: [echo, line(`Opening ${profile.resumePdf} …`, "ok")],
        action: { type: "open", url: profile.resumePdf },
      };
    case "clear":
      return { lines: [], action: { type: "clear" } };
    case "sudo":
      return {
        lines: [echo, line("nice try. This terminal has no sudo — but my production systems have proper RBAC.", "dim")],
        action: null,
      };
    default:
      return { lines: [echo, line(`Unknown command: ${cmd} — type 'help'.`, "dim")], action: null };
  }
}
