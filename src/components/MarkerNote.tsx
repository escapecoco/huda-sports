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
    <p
      className={`font-marker uppercase tracking-[0.1em] text-[21px] leading-[1.18] text-[#D2D2D2] [text-shadow:0_2px_14px_rgba(0,0,0,0.6)] ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
      <span
        className="block h-3 bg-brush mt-[9px]"
        style={{
          width: swashWidth,
          clipPath: SWASH_CLIP,
          transform: "rotate(-2deg)",
          margin: align === "center" ? "9px auto 0" : "9px 0 0",
        }}
      />
    </p>
  );
}
