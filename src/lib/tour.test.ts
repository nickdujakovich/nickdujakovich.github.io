import { describe, expect, test } from "vitest";
import { STOPS } from "./tour";

const KNOWN_SECTIONS = ["hero", "impact", "experience", "architecture", "skills", "terminal", "ask", "contact"];

describe("tour stops", () => {
  test("is a six-stop arc from hero to contact", () => {
    expect(STOPS).toHaveLength(6);
    expect(STOPS[0].target).toBe("hero");
    expect(STOPS[STOPS.length - 1].target).toBe("contact");
    expect(new Set(STOPS.map((s) => s.target)).size).toBe(6);
  });

  test("targets only real sections with complete copy", () => {
    for (const stop of STOPS) {
      expect(KNOWN_SECTIONS).toContain(stop.target);
      expect(stop.title.length).toBeGreaterThan(0);
      expect(stop.body.length).toBeGreaterThan(20);
    }
  });

  test("narrates only resume figures", () => {
    const script = STOPS.map((s) => s.body).join(" ");
    for (const figure of ["6+ years", "33,000+", "~60%", "28 → 78", "23.2s → 2.2s", "AmeriSave", "Capital One", "Redis"]) {
      expect(script).toContain(figure);
    }
  });
});
