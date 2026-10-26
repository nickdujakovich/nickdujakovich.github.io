/** Guided-tour stops. Every claim below traces to the resume — see tour.test.ts. */

export interface TourStop {
  /** id of the section to spotlight */
  target: string;
  title: string;
  body: string;
}

export const STOPS: TourStop[] = [
  {
    target: "hero",
    title: "The headline",
    // resume: title line, summary (6+ years, technical owner, 33,000+ users, ~60% loans)
    body: "Nikolas Dujakovich — Senior Software Engineer with 6+ years of full-stack experience, and technical owner of InstaWizard: 33,000+ daily users, ~60% of funded loans.",
  },
  {
    target: "impact",
    title: "The flagship story",
    // resume: AmeriSave bullets (Lighthouse 28 → 78, LCP 23.2s → 2.2s)
    body: "AmeriSave, 2025–present. Lighthouse mobile went 28 → 78, LCP 23.2s → 2.2s. Flip the tabs to walk each metric.",
  },
  {
    target: "experience",
    title: "Two senior chapters",
    // resume: role headers (AmeriSave Feb 2025 – Present, Capital One Aug 2020 – Feb 2025)
    body: "AmeriSave (2025–present) and Capital One (2020–2025). Expand each role — the figures inside match the resume exactly.",
  },
  {
    target: "architecture",
    title: "The production stack",
    // resume: AmeriSave modernization stack list
    body: "Vue 3, Nuxt 3, Fastify, TypeScript, Azure, SQL Server, Redis, Cloudflare — the microservices system he leads.",
  },
  {
    target: "ask",
    title: "Interrogate the resume",
    // site behavior: closed-domain Q&A; Redis is in the resume's Backend skills
    body: "A Q&A over everything on this page. Try a suggestion — or ask whether he knows Redis.",
  },
  {
    target: "contact",
    title: "The ending",
    // resume: Piedmont, OK, remote; PDF download exists on this page
    body: "Piedmont, OK, working remotely — and the resume PDF is one click away. Thanks for taking the tour.",
  },
];
