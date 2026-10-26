import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, test } from "vitest";
import { b, l, r } from "../data/resume";
import { RichText } from "./RichText";

afterEach(() => cleanup());

describe("RichText", () => {
  test("renders plain, bold, and linked segments", () => {
    render(() => <RichText parts={[r("owner of "), l("InstaWizard", "https://apply.amerisave.com"), r(" serving "), b("33,000+ users")]} />);
    expect(screen.getByText("33,000+ users").tagName).toBe("STRONG");
    const link = screen.getByRole("link", { name: /InstaWizard/ });
    expect(link.getAttribute("href")).toBe("https://apply.amerisave.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener");
  });
});
