import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 pb-12 pt-24 sm:pb-16 sm:pt-32 md:pb-20 md:pt-40">
      <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
      <div
        className="aurora absolute -top-24 left-1/2 h-[300px] w-[300px] -translate-x-1/2 opacity-30 sm:h-[380px] sm:w-[380px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10">
        <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-bright sm:text-xs">
          <span className="h-px w-8 bg-white/20 sm:w-10" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-2xl font-black leading-tight text-ice sm:mt-4 sm:text-3xl md:text-4xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver sm:mt-5 sm:text-base md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
