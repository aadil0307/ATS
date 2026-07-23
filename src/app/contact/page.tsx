import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site, SOCIAL } from "@/lib/site";

const SITE = site.url;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's build together. Reach Ace Tech Solutions on LinkedIn, Instagram, or email — we reply with a plan, not a pitch deck.",
  alternates: { canonical: `${SITE}/contact` },
  openGraph: {
    title: "Contact — Ace Tech Solutions",
    description:
      "Let's build together. Reach Ace Tech Solutions on LinkedIn, Instagram, or email.",
    url: `${SITE}/contact`,
    siteName: "Ace Tech Solutions",
    type: "website",
  },
};

type Channel = {
  label: string;
  blurb: string;
  cta: string;
  href: string;
  glyph: React.ReactNode;
};

const CHANNELS: Channel[] = [
  {
    label: "LinkedIn",
    blurb:
      "Connect with us professionally — for partnerships, projects, and longer-form collaborations.",
    cta: "View LinkedIn",
    href: SOCIAL.linkedin,
    glyph: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    blurb:
      "Follow our latest projects, AI experiments, and behind-the-scenes builds — and DM us anytime.",
    cta: "Visit Instagram",
    href: SOCIAL.instagram,
    glyph: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
      </svg>
    ),
  },
  {
    label: "Email",
    blurb:
      "Send us your project requirements — we typically reply within one business day with a plan.",
    cta: "Send Email",
    href: `mailto:${site.email}`,
    glyph: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's Talk"
        title="Let's build together."
        description="Have an idea, business, or project in mind? Let's turn it into something exceptional — websites, AI automation, and digital products that ship. Reach us on whichever channel you prefer."
      />

      <Section
        eyebrow="Get In Touch"
        title="Three ways to reach us"
        description="No forms, no friction. Pick the channel that suits you — we read every message and reply with a plan, not a pitch deck."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(26,26,255,0.12)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(26,26,255,0.16),rgba(123,47,255,0.16))] text-ice transition-transform duration-300 group-hover:scale-105">
                  {c.glyph}
                </div>
                <h3 className="mt-6 text-xl font-bold text-ice">{c.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">
                  {c.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-bright transition-transform group-hover:translate-x-1">
                  {c.cta} <span aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-ink-soft/70 p-10 text-center sm:p-16">
          <div className="aurora absolute inset-x-0 top-1/2 mx-auto h-[320px] max-w-[720px] -translate-y-1/2 opacity-40" aria-hidden="true" />
          <div className="relative">
            <h2 className="font-display text-4xl font-black text-ice sm:text-5xl">
              Ready to build something <span className="text-gradient">amazing?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
              Websites, AI-powered solutions, automation, and digital products —
              designed, built, and shipped by one accountable team.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href={SOCIAL.instagram} className="px-7 py-3.5">
                Start Your Project <span aria-hidden="true">→</span>
              </Button>
              <Button href={site.phone.whatsapp} variant="ghost" className="px-7 py-3.5">
                <span aria-hidden="true">💬</span> WhatsApp us
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-silver">
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-ice"
              >
                {site.email}
              </a>
              <a
                href={site.phone.tel}
                className="transition-colors hover:text-ice"
              >
                {site.phone.display}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
