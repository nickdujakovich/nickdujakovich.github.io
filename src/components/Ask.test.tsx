import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import { Ask } from "./Ask";

afterEach(() => cleanup());

function ask(text: string) {
  fireEvent.input(screen.getByTestId("ask-input"), { target: { value: text } });
  fireEvent.submit(screen.getByTestId("ask-input").closest("form")!);
}

describe("Ask", () => {
  test("greets with resume-only framing", () => {
    render(() => <Ask />);
    expect(screen.getByTestId("ask-screen").textContent).toContain("Ask me anything about Nick's background.");
  });

  test("answers from resume data with links", () => {
    render(() => <Ask />);
    ask("Where can I see your work?");
    const screen_ = screen.getByTestId("ask-screen");
    expect(screen_.textContent).toContain("Two live products");
    const links = screen_.querySelectorAll("a");
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute("href")).toBe("https://apply.amerisave.com");
  });

  test("falls back honestly outside the resume", () => {
    render(() => <Ask />);
    ask("do you like pineapple pizza?");
    expect(screen.getByTestId("ask-screen").textContent).toContain("I don't have an answer");
  });

  test("suggestion chips send questions", () => {
    render(() => <Ask />);
    fireEvent.click(screen.getByRole("button", { name: "How big is your team?" }));
    expect(screen.getByTestId("ask-screen").textContent).toContain("7-engineer team");
  });
});
