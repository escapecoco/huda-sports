"use client";

import { motion } from "motion/react";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

export function MarkerNote({
  lines,
  className = "",
  rotate = -8,
  swashWidth = 108,
  align = "center",
}: {
  lines: string[];
  className?: string;
  rotate?: number;
  swashWidth?: number;
  align?: "center" | "left";
}) {
  return (
    <motion.p
      className={`font-marker uppercase tracking-[0.1em] text-[21px] leading-[1.18] text-[#D2D2D2] [text-shadow:0_2px_14px_rgba(0,0,0,0.6)] ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
      initial={{ opacity: 0, scale: 0.88, rotate: rotate + (rotate < 0 ? -8 : 8) }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
      <motion.span
        className="block h-3 bg-brush mt-[9px]"
        style={{
          width: swashWidth,
          clipPath: SWASH_CLIP,
          margin: align === "center" ? "9px auto 0" : "9px 0 0",
          originX: align === "center" ? 0.5 : 0,
        }}
        initial={{ scaleX: 0, rotate: -2 }}
        whileInView={{ scaleX: 1, rotate: -2 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
      />
    </motion.p>
  );
}
