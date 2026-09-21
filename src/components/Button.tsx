"use client";

import Link from "next/link";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);

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

const arrowVariants = { rest: { x: 0 }, hover: { x: 3 } };
const tapAnimation = { scale: 0.97 };
const hoverTransition = { duration: 0.18, ease: "easeOut" as const };

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
    <MotionLink
      href={href}
      className={`${base} ${variantClasses[variant]} ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap={tapAnimation}
      transition={hoverTransition}
    >
      {children}
      {arrow && (
        <motion.span className="text-[15px]" variants={arrowVariants}>
          →
        </motion.span>
      )}
    </MotionLink>
  );
}

export function CtaButton({
  children,
  variant = "lime",
  className = "",
  arrow = true,
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} cursor-pointer ${variantClasses[variant]} ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap={tapAnimation}
      transition={hoverTransition}
    >
      {children}
      {arrow && (
        <motion.span className="text-[15px]" variants={arrowVariants}>
          →
        </motion.span>
      )}
    </motion.button>
  );
}
