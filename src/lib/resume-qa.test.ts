import { describe, expect, test } from "vitest";
import { answerQuestion } from "./resume-qa";

describe("ask-my-resume", () => {
  test("answers performance questions with exact figures", () => {
    const r = answerQuestion("What was the Lighthouse improvement?");
    expect(r.text).toContain("28 → 78");
    expect(r.text).toContain("23.2s → 2.2s");
    expect(r.text).toContain("71%");
  });

  test("answers scale questions", () => {
    expect(answerQuestion("how many daily users?").text).toContain("33,000+");
  });

  test("looks up specific skills with category and recency", () => {
    const redis = answerQuestion("Do you know Redis?");
    expect(redis.text).toContain("Backend");
    expect(redis.text).not.toContain("most-recent");
    const vue = answerQuestion("vue?");
    expect(vue.text).toContain("Frontend");
    expect(vue.text).toContain("most-recent daily stack");
    expect(answerQuestion("have you used azure?").text).toContain("Cloud");
  });

  test("does not confuse the skills question with the Skills item", () => {
    expect(answerQuestion("what are your skills?").text).toContain("49 skills");
  });

  test("answers contact, team, education, and capital one", () => {
    expect(answerQuestion("how do I reach him?").text).toContain("nikolasdujakovich@gmail.com");
    expect(answerQuestion("how big is your team?").text).toContain("7-engineer team");
    expect(answerQuestion("where did he study?").text).toContain("San Marcos");
    const co = answerQuestion("tell me about capital one");
    expect(co.text).toContain("Plano");
    expect(co.links?.[0].url).toBe("https://capitalone.com/cars/search");
  });

  test("links live products and the resume", () => {
    const p = answerQuestion("where can I see your work?");
    expect(p.links).toHaveLength(2);
    expect(p.links?.map((l) => l.url)).toEqual(["https://apply.amerisave.com", "https://capitalone.com/cars/search"]);
    expect(answerQuestion("can I download the resume?").links?.[0].url).toBe("NikolasDujakovichResume.pdf");
  });

  test("greets and falls back honestly", () => {
    expect(answerQuestion("hello!").text).toContain("Ask me anything");
    expect(answerQuestion("what is your favorite color?").text).toContain("I don't have an answer");
    expect(answerQuestion("   ").text).toContain("I don't have an answer");
  });
});
