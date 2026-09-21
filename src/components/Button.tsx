import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "lime" | "white" | "dark" | "outline";

const variantClasses: Record<Variant, string> = {
  lime: "bg-lime text-ground hover:bg-lime-hover",
  white: "bg-white text-ground hover:bg-lime",
  dark: "bg-ground text-white hover:bg-[#1C1C1C]",
  outline:
    "bg-transparent text-white border border-white/30 hover:border-lime hover:text-lime",
};

const base =
  "inline-flex items-center gap-2.5 font-display font-extrabold text-[12.5px] uppercase tracking-[0.1em] px-6 py-[15px] transition-colors";

export function CtaLink({
  href,
  children,
  variant = "lime",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
      {arrow && <span className="text-[15px]">→</span>}
    </Link>
  );
}

export function CtaButton({
  children,
  variant = "lime",
  className = "",
  arrow = true,
  ...rest
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} cursor-pointer ${variantClasses[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <span className="text-[15px]">→</span>}
    </button>
  );
}
