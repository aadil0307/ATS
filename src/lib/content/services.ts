export type Service = {
  icon: string;
  title: string;
  desc: string;
  tag: "P0" | "P1";
  accent: "blue" | "violet" | "cyan" | "gold";
  points: string[];
};

export const SERVICES: Service[] = [
  {
    icon: "⚙️",
    title: "Web & App Development",
    desc: "Full-stack custom software, mobile apps (iOS + Android), PWAs and SaaS platforms.",
    tag: "P0",
    accent: "blue",
    points: [
      "Next.js, React & React Native apps",
      "Type-safe APIs and backend services",
      "Progressive Web Apps with offline support",
      "Multi-tenant SaaS architecture",
    ],
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    desc: "LLM integrations, workflow automation, data pipelines and ML model deployment.",
    tag: "P0",
    accent: "violet",
    points: [
      "RAG pipelines & agentic workflows",
      "Document, vision & speech automation",
      "Data engineering & ETL pipelines",
      "Model fine-tuning & serving",
    ],
  },
  {
    icon: "🎤",
    title: "AI & Voice Agents",
    desc: "Voice-enabled AI agents, conversational AI, voice bots and speech-to-text solutions.",
    tag: "P0",
    accent: "violet",
    points: [
      "Custom voice AI agents",
      "Natural language processing",
      "Speech recognition & synthesis",
      "Voice bot integration",
    ],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "AWS/GCP setup, CI/CD pipelines, Kubernetes, monitoring and cost optimization.",
    tag: "P0",
    accent: "cyan",
    points: [
      "Infrastructure as Code (Terraform)",
      "CI/CD & zero-downtime deploys",
      "Kubernetes & container orchestration",
      "Observability & FinOps cost control",
    ],
  },
  {
    icon: "📊",
    title: "Marketing",
    desc: "Digital marketing strategy, campaign management, SEO/SEM and growth hacking.",
    tag: "P1",
    accent: "gold",
    points: [
      "Digital marketing strategy",
      "SEO & SEM optimization",
      "Social media marketing",
      "Email marketing campaigns",
    ],
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Product design, design systems, Figma prototypes, research and accessibility audits.",
    tag: "P1",
    accent: "gold",
    points: [
      "Product & interaction design",
      "Design systems & component libraries",
      "Prototyping & usability testing",
      "WCAG accessibility audits",
    ],
  },
  {
    icon: "🔌",
    title: "API & Integrations",
    desc: "Third-party integrations, payment gateways, CRMs, ERPs and custom API development.",
    tag: "P1",
    accent: "blue",
    points: [
      "Payments, KYC & identity providers",
      "CRM & ERP integrations",
      "Event-driven & webhook systems",
      "Legacy system modernization",
    ],
  },
  {
    icon: "🛡️",
    title: "Security & Audits",
    desc: "Code reviews, penetration testing, GDPR/ISO compliance and security hardening.",
    tag: "P1",
    accent: "violet",
    points: [
      "Secure code reviews",
      "Penetration testing",
      "GDPR / ISO 27001 readiness",
      "Threat modeling & hardening",
    ],
  },
];
