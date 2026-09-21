"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Wrap a grid/list; each StaggerItem child fades up in sequence once in view. */
export function StaggerGroup(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={containerVariants}
      {...props}
    />
  );
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={itemVariants} {...props} />;
}
