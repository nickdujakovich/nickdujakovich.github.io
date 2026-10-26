import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import { Experience } from "./Experience";

afterEach(() => cleanup());

describe("Experience accordion", () => {
  test("first role starts open, the rest start closed", () => {
    render(() => <Experience />);
    expect(screen.getByRole("button", { name: /AmeriSave/ }).getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("button", { name: /Capital One/ }).getAttribute("aria-expanded")).toBe("false");
    expect(screen.getByRole("button", { name: /San Marcos/ }).getAttribute("aria-expanded")).toBe("false");
  });

  test("shows employer logos for both roles and none for education", () => {
    const { container } = render(() => <Experience />);
    expect(screen.getByTestId("logo-amerisave")).not.toBeNull();
    expect(screen.getByTestId("logo-capitalone")).not.toBeNull();
    expect(container.querySelectorAll('[data-testid^="logo-"]')).toHaveLength(2);
  });

  test("clicking a head expands and collapses its panel", () => {
    render(() => <Experience />);
    const head = screen.getByRole("button", { name: /Capital One/ });
    const panel = screen.getByTestId("tl-panel-capitalone");
    expect(panel.style.gridTemplateRows).toBe("0fr");
    fireEvent.click(head);
    expect(head.getAttribute("aria-expanded")).toBe("true");
    expect(panel.style.gridTemplateRows).toBe("1fr");
    fireEvent.click(head);
    expect(head.getAttribute("aria-expanded")).toBe("false");
    expect(panel.style.gridTemplateRows).toBe("0fr");
  });
});
