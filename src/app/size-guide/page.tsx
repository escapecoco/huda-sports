"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

type Garment = "Tees" | "Hoodies" | "Shorts";
type Unit = "cm" | "in";

const DATA: Record<Garment, { columns: string[]; rows: [string, number, number, number, number][] }> = {
  Tees: {
    columns: ["Chest (flat)", "Length", "Shoulder", "Sleeve"],
    rows: [
      ["XS", 50, 66, 44, 19],
      ["S", 53, 69, 46, 20],
      ["M", 56, 72, 49, 21],
      ["L", 59, 74, 52, 22],
      ["XL", 62, 76, 55, 23],
    ],
  },
  Hoodies: {
    columns: ["Chest (flat)", "Length", "Shoulder", "Sleeve"],
    rows: [
      ["XS", 54, 64, 47, 58],
      ["S", 57, 67, 50, 60],
      ["M", 60, 70, 53, 62],
      ["L", 63, 72, 56, 64],
      ["XL", 66, 74, 59, 66],
    ],
  },
  Shorts: {
    columns: ["Waist (flat)", "Inseam", "Hip", "Leg opening"],
    rows: [
      ["XS", 36, 18, 52, 30],
      ["S", 38, 19, 55, 31],
      ["M", 40, 20, 58, 32],
      ["L", 43, 21, 61, 33],
      ["XL", 46, 22, 64, 34],
    ],
  },
};

const HOW_TO = [
  {
    num: "01",
    title: "Chest",
    body: "Measure a tee you already like flat, armpit to armpit, and match that number in the table.",
  },
  {
    num: "02",
    title: "Length",
    body: "From the highest point of the shoulder straight down to the hem.",
  },
  {
    num: "03",
    title: "Between sizes",
    body: "Size down for a cleaner fit, stay up for the full oversized look the team wears.",
  },
];

export default function SizeGuidePage() {
  const [garment, setGarment] = useState<Garment>("Tees");
  const [unit, setUnit] = useState<Unit>("cm");
  const set = DATA[garment];
  const inches = unit === "in";

  return (
    <div className="font-body w-full">
      <Header />

      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline">
        <Image
          src="/assets/mens-collection.jpg"
          alt=""
          fill
          priority
          className="object-cover [object-position:center_30%] [filter:contrast(1.05)_brightness(0.55)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.5)_66%,rgba(6,6,6,0.78)_100%)]" />
        <div className="relative z-2 max-w-[1240px] mx-auto px-6 pt-13 pb-12 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="text-[#BFBFBF] hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Size guide
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,58px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Find
              <br />
              your fit
            </h1>
            <span className="block w-[170px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Our tees run boxy and oversized. If you&apos;re between sizes and want a cleaner fit, take
              the smaller one.
            </p>
          </div>
          <MarkerNote lines={["Wear", "it", "boxy"]} rotate={-9} swashWidth={110} />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-9.5 pb-6.5">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
          <div className="flex gap-2 flex-wrap">
            {(["Tees", "Hoodies", "Shorts"] as Garment[]).map((g) => {
              const active = garment === g;
              return (
                <button
                  key={g}
                  onClick={() => setGarment(g)}
                  className={`font-display font-extrabold text-[11px] tracking-[0.14em] uppercase px-3.75 py-2.5 cursor-pointer border transition-colors ${
                    active ? "border-lime bg-lime text-ground" : "border-white/16 bg-transparent text-[#BDBDBD]"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["cm", "in"] as Unit[]).map((u) => {
              const active = unit === u;
              return (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`font-display font-extrabold text-[11px] tracking-[0.14em] uppercase px-3.75 py-2.5 cursor-pointer border transition-colors ${
                    active ? "border-lime bg-lime text-ground" : "border-white/16 bg-transparent text-[#BDBDBD]"
                  }`}
                >
                  {u.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border border-white/10 bg-ground-alt overflow-x-auto">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[90px_repeat(4,minmax(0,1fr))] bg-[#101010] border-b border-white/12">
              <p className="m-0 px-4 py-3.5 font-display font-extrabold text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">
                Size
              </p>
              {set.columns.map((c) => (
                <p
                  key={c}
                  className="m-0 px-4 py-3.5 font-display font-extrabold text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]"
                >
                  {c}
                </p>
              ))}
            </div>
            {set.rows.map((r, i) => {
              const [size, ...values] = r;
              const isLast = i === set.rows.length - 1;
              return (
                <div
                  key={size}
                  className={`grid grid-cols-[90px_repeat(4,minmax(0,1fr))] ${
                    isLast ? "" : "border-b border-white/8"
                  } ${i % 2 === 1 ? "bg-white/2" : ""}`}
                >
                  <p className="m-0 px-4 py-3.75 font-display font-black text-sm text-white">{size}</p>
                  {values.map((v, ci) => (
                    <p key={ci} className="m-0 px-4 py-3.75 text-sm text-[#D2D2D2]">
                      {inches ? `${(v / 2.54).toFixed(1)}"` : `${v} cm`}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-3.5 mb-0 text-[13px] leading-[1.6] text-[#8C8C8C]">
          Measurements are of the garment laid flat, with a tolerance of ±1.5 cm.{" "}
          {inches ? "Values converted from centimetres." : "Prefer inches? Switch the unit above."}
        </p>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-4.5 pb-14.5 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
        {HOW_TO.map((h) => (
          <div key={h.num} className="bg-card border border-white/8 px-5 py-5.5 flex flex-col gap-2.25">
            <p className="m-0 font-display font-black text-[22px] text-lime">{h.num}</p>
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.14em] uppercase text-white">
              {h.title}
            </p>
            <p className="m-0 text-[13.5px] leading-[1.65] text-[#A8A8A8]">{h.body}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline">
        <div className="relative min-h-[280px] overflow-hidden">
          <Image
            src="/assets/team-collection.jpg"
            alt=""
            fill
            className="object-cover [object-position:center_46%] [filter:contrast(1.05)_brightness(0.98)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.62)_0%,rgba(6,6,6,0)_38%,rgba(6,6,6,0.2)_100%)]" />
        </div>
        <div className="bg-lime text-ground px-10 py-11.5 flex flex-col justify-center gap-4">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] leading-[0.98] uppercase">
            Still unsure?
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.65] max-w-[40ch]">
            Send us your height and usual size — we&apos;ll tell you exactly which one to take. Free
            exchanges within 30 days either way.
          </p>
          <div className="flex gap-3 flex-wrap mt-1.5">
            <CtaLink href="/contact" variant="dark">
              Ask us
            </CtaLink>
            <Link
              href="/faq"
              className="bg-transparent border border-ground/40 text-ground font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase px-5.5 py-3.75 inline-flex items-center gap-2.5 hover:border-ground transition-colors"
            >
              Returns policy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
