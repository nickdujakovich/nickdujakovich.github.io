import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import App from "./App";
import { stopTour } from "./stores/tour";
import { setPaletteOpen } from "./stores/ui";

afterEach(() => {
  cleanup();
  stopTour();
  setPaletteOpen(false);
});

describe("App", () => {
  test("mounts the full page without crashing", () => {
    render(() => <App />);
    expect(screen.getByRole("heading", { name: "Nikolas Dujakovich" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Flagship impact: InstaWizard" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Experience" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Ask my resume" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Let's talk." })).not.toBeNull();
  });
});
