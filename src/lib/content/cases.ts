export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  metrics: [string, string][];
  tags: string[];
  services: string[];
  challenge: string;
  outcome: string;
};

export const CASES: CaseStudy[] = [
  {
    slug: "ledgerly-fintech-super-app",
    title: "Fintech Super App",
    client: "Ledgerly",
    category: "Web & App",
    year: "2025",
    summary:
      "Unified payments + banking wallet for 2M users, rebuilt on a single Next.js platform.",
    metrics: [
      ["2M", "users"],
      ["40%", "faster onboarding"],
      ["6 wks", "to delivery"],
    ],
    tags: ["Web/App", "Cloud"],
    services: ["Web & App Development", "Cloud & DevOps"],
    challenge:
      "Ledgerly ran payments, wallet and banking on three legacy stacks that couldn't share data or scale past a few hundred thousand users.",
    outcome:
      "We rebuilt the experience on a single Next.js + API platform with a typed domain layer, cutting onboarding time by 40% and shipping the first unified release in six weeks.",
  },
  {
    slug: "northwind-ai-ops-copilot",
    title: "AI Ops Copilot",
    client: "Northwind",
    category: "AI & Automation",
    year: "2025",
    summary:
      "LLM agent that triages incidents and drafts runbooks, wired into their on-call flow.",
    metrics: [
      ["60%", "less MTTR"],
      ["3x", "throughput"],
    ],
    tags: ["AI", "API"],
    services: ["AI & Automation", "API & Integrations"],
    challenge:
      "On-call engineers wasted hours correlating alerts across dashboards and writing runbooks by hand during incidents.",
    outcome:
      "A retrieval-augmented agent now triages alerts, drafts runbooks and posts a remediation plan to Slack — cutting mean-time-to-recovery by 60% and tripling incident throughput.",
  },
  {
    slug: "maison-d2c-commerce",
    title: "D2C Commerce Platform",
    client: "Maison",
    category: "Web & App",
    year: "2024",
    summary:
      "Headless storefront with sub-second navigation and a 3x lift in conversion.",
    metrics: [
      ["3x", "conversion"],
      ["99.99%", "uptime"],
    ],
    tags: ["Web", "DevOps"],
    services: ["Web & App Development", "Cloud & DevOps"],
    challenge:
      "Maison's monolithic storefront was slow, hard to merchandise and losing customers at every page load.",
    outcome:
      "We rebuilt it as a headless storefront on the edge with sub-second navigation, lifting conversion 3x while holding 99.99% uptime through peak sale events.",
  },
  {
    slug: "vitalink-health-telemetry",
    title: "Health Telemetry Grid",
    client: "Vitalink",
    category: "Cloud & DevOps",
    year: "2024",
    summary:
      "Real-time IoT dashboard ingesting 1.2M events/min with live alerting.",
    metrics: [
      ["1.2M", "events/min"],
      ["<50ms", "p99 latency"],
    ],
    tags: ["Cloud", "UI/UX"],
    services: ["Cloud & DevOps", "UI/UX Design"],
    challenge:
      "Vitalink's devices streamed telemetry faster than their dashboards could render, with alerting too slow for clinical use.",
    outcome:
      "A streaming ingestion layer and a real-time dashboard now process 1.2M events/min at <50ms p99, with live alerts clinicians actually trust.",
  },
];
