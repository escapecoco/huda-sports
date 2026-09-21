"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
};

/** Fades + slides an element up once, the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 28, duration = 0.6, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    />
  );
}
