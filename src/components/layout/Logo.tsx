import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/ace-tech-logo-mark.svg"
      alt="Ace Core mark"
      width={120}
      height={120}
      className={className}
      role="img"
      priority
    />
  );
}

export default function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <Link href="/" aria-label="Ace Tech Solutions home" className={className}>
        <LogoMark className="h-9 w-9" />
      </Link>
    );
  }
  return (
    <Link
      href="/"
      aria-label="Ace Tech Solutions home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[16deg]" />
      <span className="leading-none">
        <span className="block font-logo text-lg font-bold tracking-tight text-ice">
          ACE<span className="text-blue-bright"> TECH</span>
        </span>
        <span className="block font-logo text-[10px] font-medium uppercase tracking-[0.24em] text-silver">
          Solutions
        </span>
      </span>
    </Link>
  );
}