import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section
      id={id}
      className={`relative py-24 sm:py-32 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 sm:px-10">
        {hasHeader && (
          <Reveal className="mb-14">
            {eyebrow && (
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-blue">
                {eyebrow}
                <span className="h-px max-w-[60px] flex-1 bg-white/15" />
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ice sm:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 max-w-[680px] text-base leading-relaxed text-silver">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
