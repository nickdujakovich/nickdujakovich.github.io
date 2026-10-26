import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import { Skills } from "./Skills";

afterEach(() => cleanup());

describe("Skills", () => {
  test("renders all 8 groups and all 49 skills", () => {
    render(() => <Skills />);
    const groups = screen.getByTestId("skill-groups");
    expect(groups.querySelectorAll("h3")).toHaveLength(8);
    expect(groups.querySelectorAll("li")).toHaveLength(49);
    expect(groups.textContent).toContain("Zustand");
    expect(groups.textContent).toContain("PagerDuty");
  });

  test("marks the 6 most-recent daily stack skills", () => {
    render(() => <Skills />);
    const groups = screen.getByTestId("skill-groups");
    const marked = groups.querySelectorAll('[data-recent="true"]');
    expect(marked).toHaveLength(6);
    expect(groups.textContent).toContain("Nuxt 3");
  });
});
