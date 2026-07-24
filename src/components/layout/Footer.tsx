import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";
import { site, socialLinks } from "@/lib/site";

const YEAR = 2026;

const COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Web & App" },
      { href: "/services", label: "AI & Automation" },
      { href: "/services", label: "Cloud & DevOps" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-soft/60">
      <div className="mx-auto grid max-w-[1100px] gap-12 px-6 py-16 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="full" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
            A premium technology partner. We build digital products,
            scale engineering, and ship fast.
          </p>
          <Button
            href={site.phone.whatsapp}
            variant="ghost"
            className="mt-6 px-5 py-2.5"
          >
            <span aria-hidden="true">💬</span> WhatsApp us
          </Button>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-silver">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-silver transition-colors hover:text-ice"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-6 py-6 text-xs text-silver sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {YEAR} Ace Tech Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
            <span className="hidden text-white/15 sm:inline" aria-hidden="true">·</span>
            {socialLinks.length > 0 && (
              <span className="flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ice"
                  >
                    {s.label}
                  </a>
                ))}
              </span>
            )}
            <p className="font-mono sm:ml-auto">Build It. Ship It. Dominate.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
