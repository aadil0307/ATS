import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div
        className="aurora absolute inset-x-0 top-1/2 mx-auto h-[300px] max-w-[1000px] -translate-y-1/2 opacity-40 sm:h-[400px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-ink-soft/70 p-8 text-center sm:p-12 md:p-16">
          <h2 className="font-display text-2xl font-black text-ice sm:text-3xl md:text-4xl lg:text-5xl">
            Let&apos;s build something that{" "}
            <span className="text-gradient">ships.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-silver sm:mt-5 sm:text-base md:text-lg">
            Tell us what you&apos;re building. We&apos;ll reply with a plan, not a
            pitch deck.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-4">
            <Button href="/contact" className="px-5 py-3 sm:px-7 sm:py-3.5">
              Start a Project
            </Button>
            <Button
              href={site.phone.whatsapp}
              variant="ghost"
              className="px-5 py-3 sm:px-7 sm:py-3.5"
            >
              <span aria-hidden="true">💬</span> WhatsApp us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
