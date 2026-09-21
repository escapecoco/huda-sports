"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaLink } from "@/components/Button";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

const categories = ["All", "Shipping", "Returns", "Products", "Team orders"];

type Faq = { cat: string; question: string; answer: string };

const faqs: Faq[] = [
  {
    cat: "Shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery is 2-4 working days in metro areas, 3-5 to a pickup point and next working day with express. Every order is dispatched within 48 hours of being placed.",
  },
  {
    cat: "Shipping",
    question: "Do you ship outside France?",
    answer:
      "Yes. Belgium, Switzerland and the United States are available at checkout. International parcels take 5-9 working days depending on customs.",
  },
  {
    cat: "Shipping",
    question: "Can I change my delivery address?",
    answer:
      "Within the first hour after ordering, yes — message us with your order number. Once the parcel is handed to the carrier the address is locked.",
  },
  {
    cat: "Returns",
    question: "What's your return policy?",
    answer:
      "Unworn items with tags can be returned within 30 days of delivery. We refund to the original payment method within five working days of receiving the parcel.",
  },
  {
    cat: "Returns",
    question: "Are exchanges free?",
    answer:
      "Size exchanges are free once per order in France. We send the new size as soon as the first parcel is scanned by the carrier.",
  },
  {
    cat: "Returns",
    question: "My item arrived damaged — what now?",
    answer:
      "Send us a photo within 48 hours of delivery. We ship a replacement immediately, no return needed for print defects.",
  },
  {
    cat: "Products",
    question: "How do the tees fit?",
    answer:
      "Boxy and oversized with dropped shoulders. Size down for a cleaner fit — the full measurements are in the size guide.",
  },
  {
    cat: "Products",
    question: "How should I wash the prints?",
    answer:
      "Cold wash inside out, no bleach, no tumble dry. Iron on the reverse only, never directly on the print.",
  },
  {
    cat: "Products",
    question: "When do sold-out pieces come back?",
    answer:
      "Core pieces restock every 4-6 weeks. Drop your email in the newsletter and you'll hear before it goes public.",
  },
  {
    cat: "Team orders",
    question: "What's the minimum for team kit?",
    answer: "Ten pieces, mixed sizes allowed. Names, numbers and club crests are included in the quote.",
  },
  {
    cat: "Team orders",
    question: "How long do team orders take?",
    answer: "Two weeks from artwork approval. Rush production in one week is possible on request.",
  },
];

const highlights = [
  { value: "48h", title: "Dispatch", body: "Every order leaves the studio within two working days." },
  { value: "30 days", title: "Returns", body: "Unworn, tagged items refunded to your original payment method." },
  { value: "$80", title: "Free shipping", body: "Standard delivery is free above this basket value." },
];

const shippingRows = [
  { name: "Pickup point", eta: "3-5 working days", price: "Free" },
  { name: "Standard delivery", eta: "2-4 working days", price: "$6.90" },
  { name: "Express delivery", eta: "Next working day", price: "$14.90" },
];

export default function FaqPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = faqs.filter((f) => category === "All" || f.cat === category);
    if (q) {
      items = items.filter((f) => (f.question + " " + f.answer).toLowerCase().includes(q));
    }
    return items;
  }, [category, query]);

  const resultNote = query.trim()
    ? `${list.length} matching answers`
    : `${faqs.length} answers`;

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline/90">
        <Image
          src="/assets/brand-banner.jpg"
          alt="HUDA Sports"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_40%] [filter:contrast(1.05)_brightness(0.52)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.5)_66%,rgba(6,6,6,0.78)_100%)]" />
        <div className="relative z-[2] max-w-[1240px] mx-auto px-6 pt-13 pb-12 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Help
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,58px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Shipping,
              <br />
              returns &amp; FAQ
            </h1>
            <span className="block w-[170px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Everything about delivery, exchanges and team orders in one place.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 min-w-[260px] flex-[0_1_340px]">
            <input
              type="text"
              placeholder="Search a question"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(0);
              }}
              className="bg-ground/80 border border-white/22 text-white text-[14px] px-3.5 py-4 outline-none focus:border-lime"
            />
            <p className="m-0 text-[12.5px] tracking-[0.1em] uppercase text-[#8C8C8C]">{resultNote}</p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-[1240px] mx-auto px-6 pt-8.5 pb-5 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3.5">
        {highlights.map((h) => (
          <div key={h.title} className="bg-card border border-hairline px-5 py-5.5 flex flex-col gap-2">
            <p className="m-0 font-display font-black text-[20px] text-lime">{h.value}</p>
            <p className="m-0 font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white">
              {h.title}
            </p>
            <p className="m-0 text-[13.5px] leading-[1.65] text-[#A8A8A8]">{h.body}</p>
          </div>
        ))}
      </section>

      {/* Content */}
      <section className="max-w-[1240px] mx-auto px-6 pt-3.5 pb-15 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
        <div className="flex flex-col gap-5.5">
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setOpen(0);
                }}
                className={`font-display font-extrabold text-[11px] tracking-[0.14em] uppercase px-3.5 py-2.5 cursor-pointer border transition-colors ${
                  category === c
                    ? "border-lime bg-lime text-ground"
                    : "border-white/16 bg-transparent text-[#BDBDBD] hover:border-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col border-t border-white/10">
            {list.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.question} className="border-b border-white/10">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full bg-none border-none py-4.5 px-0.5 flex items-center justify-between gap-4 cursor-pointer text-white text-left"
                  >
                    <span className="font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase">
                      {f.question}
                    </span>
                    <span className="text-[17px] text-lime">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <p className="m-0 pb-5 px-0.5 text-[14px] leading-[1.75] text-[#B0B0B0] max-w-[60ch]">
                      {f.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {list.length === 0 && (
            <div className="border border-hairline bg-card px-6 py-7.5 flex flex-col gap-3 items-start">
              <p className="m-0 font-display font-extrabold text-[14px] tracking-[0.1em] uppercase text-white">
                Nothing matches that
              </p>
              <p className="m-0 text-[14px] leading-[1.7] text-[#A8A8A8] max-w-[44ch]">
                Try another word, or ask us directly — we answer within 24 hours.
              </p>
              <CtaLink href="/contact">Contact us</CtaLink>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="bg-ground-alt border border-hairline p-5.5 flex flex-col gap-3">
            <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.16em] uppercase text-white">
              Delivery &amp; pricing
            </p>
            {shippingRows.map((s, i) => (
              <div
                key={s.name}
                className={`flex items-start justify-between gap-3.5 pb-2.5 ${
                  i < shippingRows.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="m-0 text-[14px] font-semibold text-white">{s.name}</p>
                  <p className="m-0 text-[12.5px] text-[#8C8C8C]">{s.eta}</p>
                </div>
                <p className="m-0 font-display font-extrabold text-[14px] text-lime whitespace-nowrap">
                  {s.price}
                </p>
              </div>
            ))}
            <p className="mt-0.5 mb-0 text-[13px] leading-[1.6] text-[#8C8C8C]">
              Free standard shipping on orders over $80.
            </p>
          </div>

          <div className="bg-ground-alt border border-hairline p-5.5 flex flex-col gap-2.5">
            <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.16em] uppercase text-white">
              Useful links
            </p>
            <Link href="/order-tracking" className="text-[13.5px] text-lime hover:text-lime-hover transition-colors">
              Track my order →
            </Link>
            <Link href="/size-guide" className="text-[13.5px] text-lime hover:text-lime-hover transition-colors">
              Size guide →
            </Link>
            <Link href="/team-orders" className="text-[13.5px] text-lime hover:text-lime-hover transition-colors">
              Team orders →
            </Link>
            <Link href="/legal" className="text-[13.5px] text-lime hover:text-lime-hover transition-colors">
              Privacy &amp; terms →
            </Link>
          </div>

          <div className="bg-lime text-ground px-5.5 py-6 flex flex-col gap-3">
            <h2 className="m-0 font-display italic font-black text-[22px] leading-none uppercase">
              Question not here?
            </h2>
            <p className="m-0 text-[14px] font-medium leading-[1.6]">
              Message us with your order number and we come back within 24 hours, weekdays.
            </p>
            <CtaLink href="/contact" variant="dark" className="self-start mt-1">
              Contact us
            </CtaLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
