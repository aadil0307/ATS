import Link from "next/link";
import Section from "@/components/ui/Section";
import TiltCard from "@/components/ui/TiltCard";
import Tag from "@/components/ui/Tag";
import { SERVICES } from "@/lib/content/services";

export default function ServicesPreview() {
  return (
    <Section
      eyebrow="What We Do"
      title="Services engineered for impact"
      description="A full-stack technology partner. Whatever you need built, we bring the team, process and guarantees to ship it."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <TiltCard
            key={s.title}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(26,26,255,0.12)]"
          >
            <Link href="/services" className="block h-full">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(26,26,255,0.12),rgba(123,47,255,0.12))] text-xl">
                <span aria-hidden="true">{s.icon}</span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <h3 className="text-lg font-bold text-ice">{s.title}</h3>
                <Tag variant="cyan">{s.tag}</Tag>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-silver">
                {s.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-bright transition-transform group-hover:translate-x-1">
                Explore <span aria-hidden="true">→</span>
              </span>
            </Link>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
