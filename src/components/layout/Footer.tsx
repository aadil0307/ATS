import Link from "next/link";
import Button from "@/components/ui/Button";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919690000000";
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
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--ace-gradient)] font-display text-lg font-black text-ice">
              A
            </span>
            <span className="font-display text-lg font-bold text-ice">
              Ace<span className="text-blue">Tech</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
            A premium technology partner. We build digital products,
            scale engineering, and ship fast.
          </p>
          <Button
            href={`https://wa.me/${WHATSAPP}`}
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
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-silver sm:flex-row sm:px-10">
          <p>© {YEAR} Ace Tech Solutions. All rights reserved.</p>
          <p className="font-mono">Build It. Ship It. Dominate.</p>
        </div>
      </div>
    </footer>
  );
}
