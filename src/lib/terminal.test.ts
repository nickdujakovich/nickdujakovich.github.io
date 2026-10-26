import { describe, expect, test } from "vitest";
import { runTermCommand } from "./terminal";

const text = (cmd: string, theme: "light" | "dark" = "light") =>
  runTermCommand(cmd, theme).lines.map((l) => l.text);

describe("terminal", () => {
  test("help lists the available commands", () => {
    const lines = text("help");
    expect(lines[1]).toBe("Available commands:");
    expect(lines.join("\n")).toContain("metrics");
    expect(lines.join("\n")).toContain("contact");
  });

  test("metrics reports the exact resume figures", () => {
    const out = text("metrics").join("\n");
    expect(out).toContain("33,000+ daily users");
    expect(out).toContain("~60% of funded loans");
    expect(out).toContain("28 → 78 (+179%)");
    expect(out).toContain("23.2s → 2.2s (−91%)");
    expect(out).toContain("TBT −71%");
    expect(out).toContain("7-engineer team");
  });

  test("experience covers both roles and education", () => {
    const out = text("experience").join("\n");
    expect(out).toContain("AmeriSave Mortgage");
    expect(out).toContain("Capital One");
    expect(out).toContain("Cal State San Marcos");
  });

  test("skills prints every resume group", () => {
    const out = text("skills").join("\n");
    for (const group of ["Languages:", "Frontend:", "Backend:", "Observability:", "Cloud:", "DevOps:", "Testing:", "AI:"]) {
      expect(out).toContain(group);
    }
    expect(out).toContain("Playwright");
    expect(out).toContain("Zustand");
  });

  test("contact prints real contact details", () => {
    const out = text("contact").join("\n");
    expect(out).toContain("nikolasdujakovich@gmail.com");
    expect(out).toContain("949-933-1043");
    expect(out).toContain("linkedin.com/in/nickdujakovich");
  });

  test("projects lists the live product URLs", () => {
    const out = text("projects").join("\n");
    expect(out).toContain("https://apply.amerisave.com");
    expect(out).toContain("https://capitalone.com/cars/search");
    expect(text("help").join("\n")).toContain("projects");
  });

  test("theme validates its argument and returns an action", () => {
    expect(runTermCommand("theme", "dark").action).toBeNull();
    expect(text("theme")[1]).toContain("current: light");
    expect(runTermCommand("theme dark", "light").action).toEqual({ type: "theme", theme: "dark" });
    expect(runTermCommand("theme banana", "light").action).toBeNull();
  });

  test("resume opens the PDF and clear empties the screen", () => {
    expect(runTermCommand("resume", "light").action).toEqual({ type: "open", url: "NikolasDujakovichResume.pdf" });
    const cleared = runTermCommand("clear", "light");
    expect(cleared.action).toEqual({ type: "clear" });
    expect(cleared.lines).toHaveLength(0);
  });

  test("unknown commands get a helpful error, sudo gets a joke", () => {
    expect(text("frobnicate")[1]).toContain("Unknown command: frobnicate");
    expect(text("sudo")[1]).toContain("nice try");
  });

  test("blank input is a no-op", () => {
    expect(runTermCommand("   ", "light")).toEqual({ lines: [], action: null });
  });
});
