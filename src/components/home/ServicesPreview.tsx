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
      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <TiltCard
            key={s.title}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(26,26,255,0.12)] sm:p-7"
          >
            <Link href="/services" className="block h-full">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(26,26,255,0.12),rgba(123,47,255,0.12))] text-lg sm:h-11 sm:w-11 sm:text-xl">
                <span aria-hidden="true">{s.icon}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 sm:mt-5 sm:gap-3">
                <h3 className="text-base font-bold text-ice sm:text-lg">{s.title}</h3>
                <Tag variant="cyan">{s.tag}</Tag>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-silver sm:text-sm">
                {s.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-bright transition-transform group-hover:translate-x-1 sm:mt-5 sm:text-sm">
                Explore <span aria-hidden="true">→</span>
              </span>
            </Link>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
