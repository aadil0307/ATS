import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/ace.png"
      alt="Ace Tech logo mark"
      width={64}
      height={64}
      className={cn("object-contain", className)}
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
        <LogoMark className="h-14 w-14 -mt-1 transition-transform duration-300 hover:scale-105" />
      </Link>
    );
  }
  return (
    <Link
      href="/"
      aria-label="Ace Tech Solutions home"
      className={cn("group flex items-center gap-3.5 -mt-2 ml-2", className)}
    >
      <LogoMark className="h-16 w-16 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col">
        <span className="block font-logo text-2xl font-bold leading-tight tracking-tight text-ice">
          ACE<span className="text-blue-bright"> TECH</span>
        </span>
        <span className="mt-1 block font-logo text-xs font-medium uppercase leading-tight tracking-[0.28em] text-silver">
          Solutions
        </span>
      </span>
    </Link>
  );
}