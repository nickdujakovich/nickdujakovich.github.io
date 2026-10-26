/* Single source of truth for portfolio content.
   Every figure here is taken directly from the resume — see resume.test.ts. */

export const profile = {
  name: "Nikolas Dujakovich",
  role: "Senior Software Engineer",
  tagline: "Senior Software Engineer — full-stack, 6+ years",
  email: "nikolasdujakovich@gmail.com",
  phone: "949-933-1043",
  phoneHref: "tel:+19499331043",
  location: "Piedmont, OK",
  linkedin: "https://linkedin.com/in/nickdujakovich",
  linkedinLabel: "linkedin.com/in/nickdujakovich",
  resumePdf: "NikolasDujakovichResume.pdf",
} as const;

export const heroHighlights = {
  dailyUsers: "33,000+",
  fundedLoans: "~60%",
  recentStack: "Vue, Nuxt, Node.js, Fastify, TypeScript, and Microsoft Azure",
} as const;

/** Structured headline facts (all pinned against the resume by tests) for data-driven answers. */
export const facts = {
  years: "6+ years",
  users: "33,000+",
  loans: "~60%",
  team: "7-engineer team",
  dealerships: "hundreds of dealerships",
} as const;

/** Rich-text segment for resume bullets that need inline emphasis. */
export interface RichPart {
  text: string;
  bold?: boolean;
  href?: string;
}
export const r = (text: string): RichPart => ({ text });
export const b = (text: string): RichPart => ({ text, bold: true });
export const l = (text: string, href: string): RichPart => ({ text, href });

export const projects = {
  instaWizard: {
    name: "InstaWizard",
    url: "https://apply.amerisave.com",
    shortUrl: "apply.amerisave.com",
    blurb: "AmeriSave's flagship digital lending platform",
  },
  autoSearch: {
    name: "Auto Navigator Search",
    url: "https://capitalone.com/cars/search",
    shortUrl: "capitalone.com/cars/search",
    blurb: "Capital One's car search experience",
  },
} as const;

export interface TimelineItem {
  id: string;
  when: string;
  role: string;
  org: string;
  place: string;
  bullets: RichPart[][];
  featured?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    id: "amerisave",
    when: "Feb 2025 – Present",
    role: "Senior Software Engineer",
    org: "AmeriSave Mortgage",
    place: "Remote",
    featured: true,
    bullets: [
      [r("Technical owner of "), l("InstaWizard", projects.instaWizard.url), r(", the flagship digital lending platform serving "), b("33,000+ daily users"), r(" and powering "), b("~60% of funded loans"), r(".")],
      [r("Lead architecture and modernization into cloud-native microservices: Vue 3, Nuxt 3, Fastify, TypeScript, Azure, SQL Server, Redis, Cloudflare.")],
      [r("Led frontend performance work: Lighthouse Mobile "), b("28 → 78 (+179%)"), r(", LCP "), b("23.2s → 2.2s (−91%)"), r(", TBT "), b("−71%"), r(".")],
      [r("Built a self-service "), b("Optimizely A/B testing framework"), r(" for product and marketing teams.")],
      [r("Implemented end-to-end observability with "), b("Datadog RUM, APM"), r(", dashboards, monitors, and alerting.")],
      [r("Provide technical leadership for a "), b("7-engineer team"), r(": architecture reviews, mentoring, incident leadership, interviews, standards.")],
    ],
  },
  {
    id: "capitalone",
    when: "Aug 2020 – Feb 2025",
    role: "Senior Software Engineer",
    org: "Capital One",
    place: "Plano, TX",
    bullets: [
      [r("Built enterprise apps with "), b("TypeScript, SolidJS, React, and LitElement"), r(" for "), b("Auto Navigator"), r(" and "), b("Dealer Navigator"), r(", nationwide auto-financing platforms.")],
      [r("Led integration of the "), l("Auto Navigator Search Micro Frontend", projects.autoSearch.url), r(" into the white-label platform, enabling "), b("hundreds of dealerships"), r(" to adopt it.")],
      [r("Designed, developed, and owned the "), b("Trade-In Micro Frontend"), r(" from architecture through production — a reusable solution integrated into Dealer Navigator.")],
      [r("Used "), b("New Relic and Splunk"), r(" to monitor production, troubleshoot, and improve reliability.")],
      [r("Mentored engineers, led intern projects, owned production releases, and contributed to technical design and standards.")],
    ],
  },
  {
    id: "education",
    when: "Aug 2015 – May 2020",
    role: "B.S., Computer Science",
    org: "Cal State San Marcos",
    place: "San Marcos, CA",
    bullets: [[r("Bachelor of Science in Computer Science, California State University San Marcos.")]],
  },
];

export type MetricKey = "lighthouse" | "lcp" | "tbt";

export interface PerfMetric {
  key: MetricKey;
  tab: string;
  before: number;
  after: number;
  beforeLabel: string;
  afterLabel: string;
  delta: string;
  caption: string;
  max: number;
  small?: boolean;
}

export const perfMetrics: PerfMetric[] = [
  { key: "lighthouse", tab: "Lighthouse", before: 28, after: 78, beforeLabel: "28", afterLabel: "78", delta: "+179%", caption: "Lighthouse Mobile Performance: 28 → 78 (+179%)", max: 100 },
  { key: "lcp", tab: "LCP", before: 23.2, after: 2.2, beforeLabel: "23.2s", afterLabel: "2.2s", delta: "−91%", caption: "Largest Contentful Paint: 23.2s → 2.2s (−91%)", max: 23.2 },
  { key: "tbt", tab: "TBT", before: 100, after: 29, beforeLabel: "baseline", afterLabel: "−71%", delta: "−71%", caption: "Total Blocking Time: down 71% (relative scale)", max: 100, small: true },
];

export const impactArticles = [
  {
    title: "Platform modernization",
    body: "Rebuilding frontend and backend into scalable cloud-native microservices: Vue 3, Nuxt 3, Fastify, TypeScript, Azure, SQL Server, Redis, Cloudflare.",
  },
  {
    title: "Self-service experimentation",
    body: "Self-service Optimizely A/B testing framework enabling product and marketing to launch experiments and validate decisions with data.",
  },
  {
    title: "End-to-end observability",
    body: "Datadog RUM, APM, dashboards, monitors, and alerting — better production visibility, faster detection and resolution.",
  },
  {
    title: "Technical leadership",
    body: "Technical leadership for a 7-engineer team: architecture reviews, mentoring, incident leadership, interviews, standards.",
  },
] as const;

export interface StackLayer {
  layer: string;
  tech: string;
}

export const stackLayers: StackLayer[] = [
  { layer: "Client", tech: "Vue 3 · Nuxt 3 · Pinia · TanStack Query" },
  { layer: "Edge", tech: "Cloudflare" },
  { layer: "APIs", tech: "Fastify · REST · TypeScript" },
  { layer: "Services", tech: "Node.js microservices · Microsoft Azure" },
  { layer: "Data", tech: "Microsoft SQL Server · Redis" },
  { layer: "Observe", tech: "Datadog RUM + APM · Optimizely A/B tests" },
];

export const archAlsoRan =
  "React, SolidJS, Angular, LitElement, Redux, Zustand, Spring Boot, ElasticSearch, AWS (ECS, S3, CloudFront), OpenShift, Splunk, New Relic, PagerDuty, Docker, CI/CD, Playwright, Cypress, Jest, Vite.";

export interface SkillGroup {
  cat: string;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { cat: "languages", label: "Languages", items: ["JavaScript", "TypeScript", "Kotlin", "Java", "HTML", "CSS"] },
  { cat: "frontend", label: "Frontend", items: ["Vue 3", "Nuxt 3", "React", "SolidJS", "Angular", "LitElement", "Pinia", "TanStack Query", "Redux", "Zustand"] },
  { cat: "backend", label: "Backend", items: ["Node.js", "Fastify", "Spring Boot", "REST APIs", "Redis", "Microsoft SQL Server", "ElasticSearch"] },
  { cat: "observability", label: "Observability", items: ["Datadog", "Splunk", "New Relic", "PagerDuty"] },
  { cat: "cloud", label: "Cloud", items: ["Amazon Web Services (AWS)", "Microsoft Azure", "Cloudflare", "Amazon ECS", "Amazon S3", "CloudFront", "OpenShift"] },
  { cat: "devops", label: "DevOps", items: ["Git", "GitLab", "GitHub", "CI/CD", "Docker"] },
  { cat: "testing", label: "Testing", items: ["Playwright", "Cypress", "Jest", "Vite"] },
  { cat: "ai", label: "AI", items: ["Cursor", "Claude", "ChatGPT", "Agents", "MCPs", "Skills"] },
];

/** Most-recent daily stack, per the resume summary. */
export const recentSkills: readonly string[] = [
  "Vue 3",
  "Nuxt 3",
  "Node.js",
  "Fastify",
  "TypeScript",
  "Microsoft Azure",
];

export const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0);

export const productionStackLine =
  "Vue 3 · Nuxt 3 · Fastify · TypeScript · Node.js · Azure · SQL Server · Redis · Cloudflare · Datadog RUM/APM · Optimizely";
