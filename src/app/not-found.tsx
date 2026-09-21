"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaLink } from "@/components/Button";
import { MarkerNote } from "@/components/MarkerNote";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

const SHORTCUT_LINKS = [
  { label: "Men", href: "/men" },
  { label: "Team", href: "/team" },
  { label: "Track order", href: "/order-tracking" },
  { label: "Size guide", href: "/size-guide" },
  { label: "Our story", href: "/about" },
];

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function goSearch() {
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <div className="font-body w-full min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 relative flex flex-wrap items-stretch bg-ground-alt">
        <div className="flex-[1_1_380px] z-10 px-8 py-14.5 pl-12 flex flex-col justify-center gap-4.5">
          <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-lime">Error 404</p>
          <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(40px,7vw,86px)] leading-[0.86] tracking-[-0.02em] uppercase text-white">
            Wrong
            <br />
            turn
          </h1>
          <span className="w-[210px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
          <p className="mt-1 mb-0 text-[17px] font-semibold leading-[1.4] text-white max-w-[30ch]">
            This page doesn&#8217;t exist — or it sold out and moved on.
          </p>
          <p className="m-0 text-[15px] leading-[1.7] text-[#B0B0B0] max-w-[40ch]">
            Get back on track below, or search for what you were after.
          </p>

          <div className="flex max-w-[400px] mt-1.5">
            <input
              type="text"
              placeholder="Search products or pages"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
              className="flex-1 min-w-0 bg-input border border-white/20 text-white text-sm p-3.75 outline-none focus:border-lime"
            />
            <button
              onClick={goSearch}
              className="bg-lime hover:bg-lime-hover text-ground font-display font-extrabold text-xs tracking-[0.12em] uppercase px-5 inline-flex items-center cursor-pointer transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex gap-3 flex-wrap mt-2">
            <CtaLink href="/" variant="white">
              Back home
            </CtaLink>
            <CtaLink href="/shop" variant="outline">
              Shop all
            </CtaLink>
          </div>

          <div className="flex gap-x-5 gap-y-2.5 flex-wrap mt-3.5 pt-4.5 border-t border-white/10">
            {SHORTCUT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-[#DCDCDC] hover:text-lime transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex-[1.15_1_420px] relative min-h-[400px]">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "polygon(11% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <Image
              src="/assets/hero-group-crop.png"
              alt="HUDA Sports"
              fill
              className="object-cover [object-position:center_30%] [filter:contrast(1.06)_saturate(1.04)_brightness(0.86)_grayscale(0.25)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(97deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.45)_10%,rgba(10,10,10,0)_30%)]" />
            <div className="absolute top-0 right-0 w-2/5 h-[70%] bg-[linear-gradient(210deg,rgba(6,6,6,0.9)_0%,rgba(6,6,6,0.5)_34%,rgba(6,6,6,0)_76%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[34%] bg-[linear-gradient(0deg,rgba(6,6,6,0.75)_0%,rgba(6,6,6,0)_100%)]" />
          </div>
          <MarkerNote
            lines={["Lost", "not", "beaten"]}
            rotate={-9}
            swashWidth={116}
            className="absolute top-11 right-7.5"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
