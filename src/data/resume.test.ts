import { describe, expect, test } from "vitest";
import { facts, impactArticles, perfMetrics, productionStackLine, profile, projects, recentSkills, skillGroups, timeline, totalSkills } from "./resume";

/** Guards the site's core promise: every figure matches the resume exactly. */
describe("resume data integrity", () => {
  test("profile contact details are exact", () => {
    expect(profile.name).toBe("Nikolas Dujakovich");
    expect(profile.email).toBe("nikolasdujakovich@gmail.com");
    expect(profile.phone).toBe("949-933-1043");
    expect(profile.linkedin).toBe("https://linkedin.com/in/nickdujakovich");
    expect(profile.location).toBe("Piedmont, OK");
  });

  test("performance metrics match the resume deltas", () => {
    const byKey = Object.fromEntries(perfMetrics.map((m) => [m.key, m]));
    expect([byKey.lighthouse.before, byKey.lighthouse.after, byKey.lighthouse.delta]).toEqual([28, 78, "+179%"]);
    expect([byKey.lcp.before, byKey.lcp.after, byKey.lcp.delta]).toEqual([23.2, 2.2, "−91%"]);
    expect(byKey.tbt.delta).toBe("−71%");
  });

  test("AmeriSave bullets carry the headline figures", () => {
    const amerisave = timeline.find((t) => t.id === "amerisave");
    expect(amerisave?.when).toBe("Feb 2025 – Present");
    const joined = amerisave?.bullets.flat().map((p) => p.text).join("") ?? "";
    for (const figure of ["33,000+ daily users", "~60% of funded loans", "28 → 78 (+179%)", "23.2s → 2.2s (−91%)", "−71%", "7-engineer team", "InstaWizard", "Optimizely", "Datadog"]) {
      expect(joined).toContain(figure);
    }
  });

  test("Capital One bullets name the real platforms", () => {
    const capitalOne = timeline.find((t) => t.id === "capitalone");
    expect(capitalOne?.when).toBe("Aug 2020 – Feb 2025");
    const joined = capitalOne?.bullets.flat().map((p) => p.text).join("") ?? "";
    for (const fact of ["Auto Navigator", "Dealer Navigator", "Auto Navigator Search Micro Frontend", "Trade-In Micro Frontend", "hundreds of dealerships", "SolidJS", "New Relic", "Splunk"]) {
      expect(joined).toContain(fact);
    }
  });

  test("education and impact articles are resume-faithful", () => {
    expect(timeline.find((t) => t.id === "education")?.when).toBe("Aug 2015 – May 2020");
    expect(impactArticles).toHaveLength(4);
    expect(impactArticles.map((a) => a.title)).toEqual([
      "Platform modernization",
      "Self-service experimentation",
      "End-to-end observability",
      "Technical leadership",
    ]);
    expect(productionStackLine).toContain("Fastify");
    expect(productionStackLine).toContain("Datadog RUM/APM");
  });

  test("headline facts match the resume", () => {
    expect(facts).toEqual({
      years: "6+ years",
      users: "33,000+",
      loans: "~60%",
      team: "7-engineer team",
      dealerships: "hundreds of dealerships",
    });
  });

  test("project links point at the real live products", () => {
    expect(projects.instaWizard.url).toBe("https://apply.amerisave.com");
    expect(projects.autoSearch.url).toBe("https://capitalone.com/cars/search");
    const amerisaveLinks = timeline
      .find((t) => t.id === "amerisave")
      ?.bullets.flat()
      .filter((p) => p.href)
      .map((p) => p.href);
    expect(amerisaveLinks).toContain("https://apply.amerisave.com");
    const capitalOneLinks = timeline
      .find((t) => t.id === "capitalone")
      ?.bullets.flat()
      .filter((p) => p.href)
      .map((p) => p.href);
    expect(capitalOneLinks).toContain("https://capitalone.com/cars/search");
  });

  test("skill inventory is complete and recent stack is exact", () => {
    expect(totalSkills).toBe(49);
    expect(skillGroups.map((g) => g.label)).toEqual(["Languages", "Frontend", "Backend", "Observability", "Cloud", "DevOps", "Testing", "AI"]);
    expect([...recentSkills]).toEqual(["Vue 3", "Nuxt 3", "Node.js", "Fastify", "TypeScript", "Microsoft Azure"]);
    for (const skill of recentSkills) {
      expect(skillGroups.some((g) => g.items.includes(skill))).toBe(true);
    }
  });
});
