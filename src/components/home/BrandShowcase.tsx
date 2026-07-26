import AutoplayVideo from "@/components/ui/AutoplayVideo";

export default function BrandShowcase() {
  return (
    <section className="relative border-y border-white/10 bg-ink-soft/40 py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-6 text-center sm:px-10">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-bright sm:text-xs">
          Our Mark, In Motion
        </p>
        <h2 className="font-display text-2xl font-black text-ice sm:text-3xl md:text-4xl">
          The Ace Core
        </h2>
        <div className="mx-auto mt-6 w-full max-w-[280px] sm:mt-8 sm:max-w-[360px]">
          <AutoplayVideo
            src="/animations/brand-mark.mp4"
            poster="/animations/brand-mark-poster.jpg"
            alt="The Ace Core — the Ace Tech Solutions brand mark, in motion"
            frameClassName="rounded-2xl border border-white/10 bg-void shadow-[0_0_70px_-15px_rgba(123,43,255,0.55)]"
            mediaClassName="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
