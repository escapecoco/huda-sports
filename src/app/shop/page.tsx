"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { products, byCategory, type ProductCategory } from "@/lib/products";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

type Filter = "All" | ProductCategory;
const FILTERS: Filter[] = ["All", "Men", "Team"];
type Sort = "featured" | "low" | "high";

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("featured");

  const shown = useMemo(() => {
    const base = filter === "All" ? products : byCategory(filter);
    const list = [...base];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[260px] bg-ground-alt border-b border-hairline/90 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover [filter:contrast(1.05)_brightness(0.8)]"
          style={{ backgroundImage: "url(/assets/team-back-banner.jpg)", backgroundPosition: "center 38%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(94deg,#0A0A0A_0%,rgba(10,10,10,0.88)_26%,rgba(10,10,10,0.35)_58%,rgba(6,6,6,0.6)_100%)]" />
        <div className="relative z-10 max-w-[1240px] mx-auto pt-13.5 pr-6 pb-11.5 pl-12 flex items-end justify-between gap-7.5 flex-wrap min-h-[260px]">
          <div className="flex flex-col gap-3.5">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Shop
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(38px,6vw,72px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Shop
              <br />
              all
            </h1>
            <span className="w-[180px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="mt-1 text-[15px] leading-[1.6] text-[#B8B8B8] max-w-[40ch]">
              Tees, hoodies and team kit. Built for training, worn everywhere else.
            </p>
          </div>
          <MarkerNote lines={["Wear", "the", "mindset"]} rotate={-9} />
        </div>
      </section>

      {/* Filters + grid */}
      <section id="grid" className="px-6 pt-8 pb-16 bg-ground">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex items-center justify-between gap-4.5 flex-wrap pb-5 border-b border-hairline mb-6.5">
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-display font-extrabold text-[11.5px] tracking-[0.12em] uppercase px-4 py-2.75 cursor-pointer border transition-colors ${
                    filter === f
                      ? "border-lime bg-lime text-ground"
                      : "border-white/16 bg-transparent text-[#DCDCDC] hover:border-white/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3.5 flex-wrap">
              <p className="m-0 text-xs tracking-[0.14em] uppercase text-[#8C8C8C]">
                {shown.length} products
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-input border border-white/16 text-white text-[12.5px] tracking-[0.06em] uppercase px-3 py-2.5"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3.5">
            {shown.map((p) => (
              <ProductCard key={p.slug} product={p} aspect="portrait" />
            ))}
          </div>
        </div>
      </section>

      {/* Team Orders promo */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/assets/our-story.jpg"
            alt="HUDA team huddle"
            fill
            className="object-cover [object-position:center_42%] [filter:contrast(1.06)_brightness(1.02)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.6)_0%,rgba(6,6,6,0)_34%,rgba(6,6,6,0.25)_100%)]" />
          <MarkerNote
            lines={["Team", "first", "always"]}
            className="absolute top-9 left-6.5"
            rotate={-8}
            align="left"
            swashWidth={120}
          />
        </div>
        <div className="bg-lime text-ground px-10 py-12 flex flex-col justify-center gap-4.5">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] leading-[0.98] uppercase">
            Team orders
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.65] max-w-[40ch]">
            Custom names, numbers and club logos on any HUDA piece. Ten items minimum, two-week turnaround.
          </p>
          <CtaLink href="/team-orders" variant="dark" className="self-start mt-2">
            Request a quote
          </CtaLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
