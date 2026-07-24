import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { TESTIMONIALS } from "@/lib/content/testimonials";

export default function Testimonials() {
  return (
    <Section
      eyebrow="What Our Clients Say"
      title="Trusted by innovative companies"
      description="Hear from founders and tech leaders who've worked with us to ship real products."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <Reveal key={testimonial.name} delay={TESTIMONIALS.indexOf(testimonial) * 0.04}>
            <TiltCard
              className="group rounded-lg border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(26,26,255,0.12)]"
            >
              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-silver/80 italic">
                  “{testimonial.text}”
                </p>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-ice">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-ice">{testimonial.name}</h3>
                    <p className="text-sm text-silver/70">{testimonial.role}</p>
                    <p className="text-xs text-silver/50">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}