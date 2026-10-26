import { describe, expect, test } from "vitest";
import { formatNum, fuzzyMatch } from "./format";

describe("formatNum", () => {
  test("adds thousands separators", () => {
    expect(formatNum(33000)).toBe("33,000");
    expect(formatNum(78)).toBe("78");
  });

  test("respects fixed decimals", () => {
    expect(formatNum(23.2, 1)).toBe("23.2");
    expect(formatNum(2.2, 1)).toBe("2.2");
  });

  test("renders zero for the counter start frame", () => {
    expect(formatNum(0)).toBe("0");
    expect(formatNum(0, 1)).toBe("0.0");
  });
});

describe("fuzzyMatch", () => {
  test("matches case-insensitive substrings", () => {
    expect(fuzzyMatch("theme", "Toggle light / dark theme")).toBe(true);
    expect(fuzzyMatch("REDIS", "Redis")).toBe(true);
  });

  test("matches ordered subsequences", () => {
    expect(fuzzyMatch("gti", "Go to Terminal")).toBe(true);
  });

  test("rejects out-of-order and absent queries", () => {
    expect(fuzzyMatch("tgi", "Go to Terminal")).toBe(false);
    expect(fuzzyMatch("zzz", "Go to Terminal")).toBe(false);
  });

  test("empty query matches everything", () => {
    expect(fuzzyMatch("", "Anything")).toBe(true);
    expect(fuzzyMatch("   ", "Anything")).toBe(true);
  });
});
