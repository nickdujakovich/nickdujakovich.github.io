import { facts, perfMetrics, productionStackLine, profile, projects, recentSkills, skillGroups, totalSkills } from "../data/resume";

export interface QALink {
  label: string;
  url: string;
}
export interface QAResponse {
  text: string;
  links?: QALink[];
}

const recent = new Set<string>(recentSkills);
const byKey = Object.fromEntries(perfMetrics.map((m) => [m.key, m]));

/** Skills too generic to match by name ("what are your skills?" must hit the skills entry, not "Skills"). */
const GENERIC_SKILLS = new Set(["skills", "agents"]);

const norm = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const padded = (s: string): string => ` ${norm(s)} `;

function skillCandidates(skill: string): string[] {
  const n = norm(skill);
  const extra: Record<string, string[]> = {
    "vue 3": ["vue"],
    "nuxt 3": ["nuxt"],
    "node js": ["node", "nodejs"],
    "tanstack query": ["tanstack"],
    "microsoft azure": ["azure"],
    "microsoft sql server": ["sql server", "sql"],
    "amazon web services aws": ["aws"],
    "amazon ecs": ["ecs"],
    "amazon s3": ["s3"],
    "rest apis": ["rest", "api"],
    "ci cd": ["cicd", "ci"],
    "spring boot": ["spring"],
  };
  return [n, ...(extra[n] ?? [])];
}

function findSkill(query: string): { skill: string; category: string; isRecent: boolean } | null {
  const q = padded(query);
  for (const group of skillGroups) {
    for (const skill of group.items) {
      if (GENERIC_SKILLS.has(norm(skill))) continue;
      if (skillCandidates(skill).some((c) => q.includes(` ${c} `))) {
        return { skill, category: group.label, isRecent: recent.has(skill) };
      }
    }
  }
  return null;
}

interface Entry {
  keys: string[];
  respond: () => QAResponse;
}

const ENTRIES: Entry[] = [
  {
    keys: ["email", "e mail", "phone", "contact", "reach", "linkedin", "hire", "telephone", "talk to"],
    respond: () => ({
      text: `Email him at ${profile.email}, call ${profile.phone}, or connect on LinkedIn — he's in ${profile.location}, working remotely.`,
      links: [
        { label: profile.email, url: `mailto:${profile.email}` },
        { label: profile.linkedinLabel, url: profile.linkedin },
      ],
    }),
  },
  {
    keys: ["who are you", "your name", "about you", "about nick", "who is", "role", "title", "position", "summary"],
    respond: () => ({
      text: `${profile.name} — ${profile.role} with ${facts.years} of full-stack experience. He's the technical owner of AmeriSave's InstaWizard lending platform, based in ${profile.location} and working remotely.`,
    }),
  },
  {
    keys: ["currently", "current", "amerisave", "present job", "employer", "company", "where do you work", "working on"],
    respond: () => ({
      text: `Senior Software Engineer at AmeriSave Mortgage (remote, since Feb 2025), leading architecture and modernization of the InstaWizard platform with Vue 3, Nuxt 3, Fastify, TypeScript, and Azure.`,
      links: [{ label: projects.instaWizard.shortUrl, url: projects.instaWizard.url }],
    }),
  },
  {
    keys: ["instawizard", "insta wizard", "lending", "mortgage", "flagship"],
    respond: () => ({
      text: `InstaWizard is AmeriSave's flagship digital lending platform — ${facts.users} daily users, ${facts.loans} of funded loans. Nick is its technical owner.`,
      links: [{ label: projects.instaWizard.shortUrl, url: projects.instaWizard.url }],
    }),
  },
  {
    keys: ["33", "33000", "60", "users", "loans", "scale", "traffic", "daily", "funded", "many people"],
    respond: () => ({
      text: `InstaWizard serves ${facts.users} daily users and powers ${facts.loans} of funded loans.`,
    }),
  },
  {
    keys: ["lighthouse", "lcp", "pagespeed", "performance", "speed", "faster", "78", "web vitals", "blocking"],
    respond: () => ({
      text: `Lighthouse mobile ${byKey.lighthouse.before} → ${byKey.lighthouse.after} (${byKey.lighthouse.delta}), LCP ${byKey.lcp.beforeLabel} → ${byKey.lcp.afterLabel} (${byKey.lcp.delta}), and TBT down ${byKey.tbt.delta.replace("−", "")}.`,
    }),
  },
  {
    keys: ["auto navigator search", "search micro", "car search", "cars search"],
    respond: () => ({
      text: `The Auto Navigator Search Micro Frontend — integrated into Capital One's white-label platform so ${facts.dealerships} could adopt it.`,
      links: [{ label: projects.autoSearch.shortUrl, url: projects.autoSearch.url }],
    }),
  },
  {
    keys: ["capital one", "dealer navigator", "auto navigator", "dealer", "dealership", "plano", "texas", "white label", "previous", "last job", "before amerisave"],
    respond: () => ({
      text: `Senior Software Engineer at Capital One (Aug 2020 – Feb 2025, Plano, TX) on Auto Navigator and Dealer Navigator — he led the Search Micro Frontend white-label integration and owned the Trade-In Micro Frontend end to end.`,
      links: [{ label: projects.autoSearch.shortUrl, url: projects.autoSearch.url }],
    }),
  },
  {
    keys: ["trade in", "tradein"],
    respond: () => ({
      text: `A reusable Trade-In Micro Frontend Nick designed, developed, and owned from architecture through production, integrated into Dealer Navigator.`,
    }),
  },
  {
    keys: ["observab", "datadog", "splunk", "new relic", "pagerduty", "pager duty", "monitor", "alert", "on call", "oncall"],
    respond: () => ({
      text: `Datadog (RUM + APM, dashboards, monitors, alerting) at AmeriSave; New Relic and Splunk at Capital One; PagerDuty for on-call.`,
    }),
  },
  {
    keys: ["team", "lead", "mentor", "manage", "interview", "incident", "intern"],
    respond: () => ({
      text: `Technical leadership for a ${facts.team}: architecture reviews, mentoring, production incident leadership, technical interviews, and engineering standards — plus intern projects led at Capital One.`,
    }),
  },
  {
    keys: ["education", "degree", "college", "school", "university", "study", "studied", "csusm", "san marcos", "computer science", "b s"],
    respond: () => ({
      text: `B.S. in Computer Science from Cal State San Marcos (Aug 2015 – May 2020).`,
    }),
  },
  {
    keys: ["stack", "tech", "technology", "technologies", "framework", "frontend", "backend", "languages", "programming"],
    respond: () => ({
      text: `Most recently: Vue, Nuxt, Node.js, Fastify, TypeScript, and Azure. Full production stack: ${productionStackLine}.`,
    }),
  },
  {
    keys: ["skill", "what can you", "what do you know", "proficient", "expertise"],
    respond: () => ({
      text: `${totalSkills} skills across ${skillGroups.map((g) => g.label).join(", ")} — most recently: ${recentSkills.join(", ")}.`,
    }),
  },
  {
    keys: [" ai ", "artificial", "cursor", "chatgpt", "Muse", "agent", "mcp", "llm"],
    respond: () => ({
      text: `Cursor, Claude, and ChatGPT — plus agents, MCPs, and skills.`,
    }),
  },
  {
    keys: ["project", "live", "demo", "see your work", "link", "portfolio", "website", "site", "built"],
    respond: () => ({
      text: `Two live products: InstaWizard (AmeriSave) and Auto Navigator Search (Capital One).`,
      links: [
        { label: projects.instaWizard.shortUrl, url: projects.instaWizard.url },
        { label: projects.autoSearch.shortUrl, url: projects.autoSearch.url },
      ],
    }),
  },
  {
    keys: ["resume", "cv", "pdf", "download"],
    respond: () => ({
      text: `Grab it with the Resume button in the header — or right here:`,
      links: [{ label: profile.resumePdf, url: profile.resumePdf }],
    }),
  },
  {
    keys: ["where", "located", "location", "live", "based", "remote", "piedmont", "oklahoma"],
    respond: () => ({
      text: `${profile.location} — working remotely.`,
    }),
  },
  {
    keys: ["years", "experience", "senior", "long have", "yoe"],
    respond: () => ({
      text: `${facts.years} full-stack: AmeriSave (2025–present) after Capital One (2020–2025), preceded by a CS degree (2015–2020).`,
    }),
  },
];

const GREETING = /^(hi|hey|hello|yo|sup|thanks|thank you|good morning|good afternoon|good evening)\b/;

export const qaFallback: QAResponse = {
  text: "I don't have an answer for that — try asking about his stack, metrics, or where to see his work.",
};

export function answerQuestion(raw: string): QAResponse {
  const q = padded(raw);
  if (!q.trim()) return qaFallback;

  const skill = findSkill(raw);
  if (skill) {
    return {
      text: `Yes — ${skill.skill} is in his ${skill.category} skillset${skill.isRecent ? ", and part of his most-recent daily stack" : ""}.`,
    };
  }

  let best: Entry | null = null;
  let bestScore = 0;
  for (const entry of ENTRIES) {
    let score = 0;
    for (const key of entry.keys) {
      if (q.includes(key)) score += key.includes(" ") ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  if (best) return best.respond();
  if (GREETING.test(norm(raw))) {
    return { text: "Hello! Ask me anything about Nick's experience." };
  }
  return qaFallback;
}
