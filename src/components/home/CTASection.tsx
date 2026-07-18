import Button from "@/components/ui/Button";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919690000000";

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div
        className="aurora absolute inset-x-0 top-1/2 mx-auto h-[400px] max-w-[1000px] -translate-y-1/2 opacity-40"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-ink-soft/70 p-10 text-center sm:p-16">
          <h2 className="font-display text-4xl font-black text-ice sm:text-5xl">
            Let&apos;s build something that{" "}
            <span className="text-gradient">ships.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-silver">
            Tell us what you&apos;re building. We&apos;ll reply with a plan, not a
            pitch deck.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/contact" className="px-7 py-3.5">
              Start a Project
            </Button>
            <Button
              href={`https://wa.me/${WHATSAPP}`}
              variant="ghost"
              className="px-7 py-3.5"
            >
              <span aria-hidden="true">💬</span> WhatsApp us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
