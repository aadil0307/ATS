import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: Props) {
  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 will-change-transform",
    variant === "primary"
      ? "text-ice glow-accent hover:scale-[1.03]"
      : "border border-white/15 text-ice hover:border-white/30 hover:bg-white/5",
    className,
  );

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-[var(--ace-gradient)]" />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 translate-x-[-101%] bg-[var(--ace-gradient)] opacity-60 transition-transform duration-500 ease-out group-hover:translate-x-0" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
