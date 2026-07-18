import Button from "@/components/ui/Button";

export default function ComingSoon({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
      <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
      <div
        className="aurora absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 opacity-30"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-blue">
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl font-black leading-tight text-ice sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver">
          {blurb}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/contact" className="px-7 py-3.5">
            Talk to us
          </Button>
          <Button href="/" variant="ghost" className="px-7 py-3.5">
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
