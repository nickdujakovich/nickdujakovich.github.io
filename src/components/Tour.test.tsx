import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import { startTour, stopTour } from "../stores/tour";
import { Tour } from "./Tour";

afterEach(() => {
  cleanup();
  stopTour();
});

describe("Tour", () => {
  test("is hidden until started", () => {
    render(() => <Tour />);
    expect(screen.queryByTestId("tour-card")).toBeNull();
  });

  test("walks forward and back through the stops", () => {
    render(() => <Tour />);
    startTour();
    expect(screen.getByTestId("tour-step").textContent).toBe("1 / 6");
    expect(screen.getByTestId("tour-card").textContent).toContain("The headline");
    fireEvent.click(screen.getByTestId("tour-next"));
    expect(screen.getByTestId("tour-step").textContent).toBe("2 / 6");
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByTestId("tour-step").textContent).toBe("1 / 6");
  });

  test("finish on the last stop and Escape both exit", () => {
    render(() => <Tour />);
    startTour();
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByTestId("tour-next"));
    expect(screen.queryByTestId("tour-card")).toBeNull();

    startTour();
    expect(screen.getByTestId("tour-card")).not.toBeNull();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(screen.queryByTestId("tour-card")).toBeNull();
  });

  test("arrow keys navigate when active", () => {
    render(() => <Tour />);
    startTour();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    expect(screen.getByTestId("tour-step").textContent).toBe("2 / 6");
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    expect(screen.getByTestId("tour-step").textContent).toBe("1 / 6");
  });
});
