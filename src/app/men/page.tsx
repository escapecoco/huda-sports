"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { byCategory } from "@/lib/products";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

// The prototype's "Shorts" filter has no matching catalog items, so it is
// dropped here — "Tees" mirrors "All" honestly since every Men's piece is a tee.
const FILTERS = ["All", "Tees"] as const;
type Filter = (typeof FILTERS)[number];
type Sort = "featured" | "low" | "high";

const mensProducts = byCategory("Men");

export default function MenPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<Sort>("featured");

  const shown = useMemo(() => {
    void filter; // both filters currently resolve to the full Men's catalog
    const list = [...mensProducts];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline/90">
        <div
          className="absolute inset-0 bg-cover [filter:contrast(1.05)_brightness(0.55)]"
          style={{ backgroundImage: "url(/assets/mens-collection.jpg)", backgroundPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.48)_66%,rgba(6,6,6,0.78)_100%)]" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-13 pb-12 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="hover:text-lime transition-colors">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/shop" className="hover:text-lime transition-colors">
                Shop
              </Link>{" "}
              / Men
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,58px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Men&#8217;s
              <br />
              collection
            </h1>
            <span className="w-[176px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Clean style, real performance. Heavyweight cotton built for training and everything after it.
            </p>
          </div>
          <MarkerNote lines={["Clean", "style", "real", "work"]} rotate={-9} swashWidth={116} />
        </div>
      </section>

      {/* Filters + grid */}
      <section className="max-w-[1240px] mx-auto px-6 pt-8 pb-16">
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
      </section>

      {/* Team collection promo */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/assets/team-collection.jpg"
            alt="Team collection"
            fill
            className="object-cover [object-position:center_44%] [filter:contrast(1.05)_brightness(0.98)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.6)_0%,rgba(6,6,6,0)_38%,rgba(6,6,6,0.2)_100%)]" />
        </div>
        <div className="bg-lime text-ground px-10 py-12 flex flex-col justify-center gap-4.5">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(28px,3.4vw,40px)] leading-[0.98] uppercase">
            Training
            <br />
            with a squad?
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.65] max-w-[40ch]">
            The team collection carries the same fabrics with club crests, names and numbers.
          </p>
          <CtaLink href="/team" variant="dark" className="self-start mt-2">
            See team collection
          </CtaLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
