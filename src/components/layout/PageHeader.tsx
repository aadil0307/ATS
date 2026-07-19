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
    <header className="relative overflow-hidden border-b border-white/10 pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
      <div
        className="aurora absolute -top-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 opacity-30"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-10">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-blue-bright">
          <span className="h-px w-10 bg-white/20" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-black leading-tight text-ice sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
