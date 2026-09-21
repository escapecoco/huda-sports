"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

const SUGGESTIONS = ["Combat Ton Nafs", "Hoodie", "Team kit", "Returns", "Size"];

const PAGE_INDEX = [
  {
    title: "Size guide",
    body: "Garment measurements for tees, hoodies and shorts, in cm or inches.",
    href: "/size-guide",
    keys: "size fit measurements cm inches tee hoodie shorts",
  },
  {
    title: "Shipping, returns & FAQ",
    body: "Delivery times, prices, 30-day returns and exchanges.",
    href: "/faq",
    keys: "shipping delivery returns exchange refund faq help",
  },
  {
    title: "Track my order",
    body: "Follow a parcel with your order number and email.",
    href: "/order-tracking",
    keys: "track order parcel delivery status tracking",
  },
  {
    title: "Contact",
    body: "Message us about an order, sizing or a collab.",
    href: "/contact",
    keys: "contact email support help message",
  },
];

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL, not a React data source
    setQuery(searchParams.get("q") ?? "");
    // Only re-sync when the URL query param itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("q")]);

  const q = query.trim().toLowerCase();

  const matchedProducts = useMemo(() => {
    if (!q) return products;
    return products.filter((p) => (p.name + " " + p.category).toLowerCase().includes(q));
  }, [q]);

  const matchedPages = useMemo(() => {
    if (!q) return PAGE_INDEX;
    return PAGE_INDEX.filter((p) => (p.title + " " + p.body + " " + p.keys).toLowerCase().includes(q));
  }, [q]);

  const total = matchedProducts.length + matchedPages.length;
  const hasProducts = matchedProducts.length > 0;
  const hasPages = matchedPages.length > 0;
  const noResults = total === 0;

  return (
    <div className="font-body w-full">
      <Header />

      <section className="bg-ground-alt border-b border-hairline/90">
        <div className="max-w-[1240px] mx-auto px-6 pt-10.5 pb-9 flex flex-col gap-4.5">
          <div className="flex flex-col gap-3">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="text-[#BFBFBF] hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Search
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(30px,4.6vw,52px)] leading-[0.92] tracking-[-0.02em] uppercase text-white">
              Search
            </h1>
            <span className="block w-[150px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
          </div>

          <input
            type="text"
            placeholder="Search products, pages or help topics"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-[620px] bg-input border border-white/20 text-white text-base p-4 outline-none focus:border-lime"
          />

          <div className="flex items-center gap-3 flex-wrap">
            <p className="m-0 text-[11.5px] tracking-[0.16em] uppercase text-[#8C8C8C]">Popular</p>
            <div className="flex gap-2 flex-wrap">
              {SUGGESTIONS.map((label) => (
                <button
                  key={label}
                  onClick={() => setQuery(label)}
                  className="font-display font-extrabold text-[11px] tracking-[0.12em] uppercase px-3.5 py-2.5 cursor-pointer border border-white/16 bg-transparent text-[#DCDCDC] hover:border-lime hover:text-lime transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="m-0 text-[12.5px] tracking-[0.12em] uppercase text-lime">
            {q ? `${total} results for “${query.trim()}”` : "Browse everything, or type to narrow it down"}
          </p>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-8.5 pb-15 flex flex-col gap-8.5">
        {hasProducts && (
          <div className="flex flex-col gap-4">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              Products
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3.5">
              {matchedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} aspect="portrait" />
              ))}
            </div>
          </div>
        )}

        {hasPages && (
          <div className="flex flex-col gap-3.5">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              Pages &amp; help
            </p>
            <div className="border border-white/9 bg-ground-alt">
              {matchedPages.map((pg, i) => (
                <Link
                  key={pg.href}
                  href={pg.href}
                  className={`flex items-center justify-between gap-4.5 px-5.5 py-4.5 text-inherit hover:bg-white/[0.03] transition-colors ${
                    i < matchedPages.length - 1 ? "border-b border-hairline" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="m-0 font-display font-extrabold text-[12.5px] tracking-[0.12em] uppercase text-white">
                      {pg.title}
                    </p>
                    <p className="m-0 text-[13.5px] leading-[1.6] text-[#A0A0A0] max-w-[60ch]">{pg.body}</p>
                  </div>
                  <span className="text-[15px] text-lime shrink-0">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {noResults && (
          <div className="border border-white/9 bg-card px-6.5 py-11 flex flex-col gap-3.5 items-start">
            <p className="m-0 font-display italic font-black text-[26px] uppercase text-white">Nothing found</p>
            <p className="m-0 text-[14.5px] leading-[1.7] text-[#A8A8A8] max-w-[44ch]">
              No product or page matches &#8220;{query}&#8221;. Try a shorter word, or browse the full collection.
            </p>
            <div className="flex gap-3 flex-wrap mt-1">
              <Link
                href="/shop"
                className="bg-lime hover:bg-lime-hover text-ground font-display font-extrabold text-xs tracking-[0.1em] uppercase px-5 py-3.5 inline-flex items-center gap-2.5 transition-colors"
              >
                Shop all <span className="text-sm">→</span>
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-white/40 hover:border-lime hover:text-lime text-white font-display font-extrabold text-xs tracking-[0.1em] uppercase px-5 py-3.5 inline-flex items-center gap-2.5 transition-colors"
              >
                Ask us <span className="text-sm">→</span>
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
