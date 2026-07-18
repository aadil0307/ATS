import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "blue" | "violet" | "cyan" | "gold" | "success" | "danger";

const variantMap: Record<Variant, string> = {
  blue: "bg-blue/10 text-blue",
  violet: "bg-violet/10 text-violet",
  cyan: "bg-cyan/10 text-cyan",
  gold: "bg-gold/10 text-gold",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
};

export default function Tag({
  children,
  variant = "blue",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
