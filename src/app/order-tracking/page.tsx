"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaLink } from "@/components/Button";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

type EventState = "done" | "active" | "next";

type TimelineEvent = {
  label: string;
  detail: string;
  date: string;
  state: EventState;
};

type ParcelLine = {
  name: string;
  meta: string;
  price: number;
  qty: number;
  image: string;
  focus: string;
};

const PARCEL_LINES: ParcelLine[] = [
  {
    name: "Combat Ton Nafs Tee",
    meta: "Black · M · x2",
    price: 37.9,
    qty: 2,
    image: "/assets/mens-collection.jpg",
    focus: "center 34%",
  },
  {
    name: "Squad Training Tee",
    meta: "Black · L · x1",
    price: 32.9,
    qty: 1,
    image: "/assets/team-collection.jpg",
    focus: "center 58%",
  },
  {
    name: "Coach Tee",
    meta: "Black · XL · x1",
    price: 36.9,
    qty: 1,
    image: "/assets/our-story.jpg",
    focus: "center 40%",
  },
];

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function dayOffset(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return fmtDate(d);
}

function buildEvents(): TimelineEvent[] {
  return [
    {
      label: "Order confirmed",
      detail: "Payment accepted, order sent to the workshop.",
      date: dayOffset(-2),
      state: "done",
    },
    {
      label: "Packed",
      detail: "Picked and packed at the Paris studio.",
      date: dayOffset(-1),
      state: "done",
    },
    {
      label: "Shipped",
      detail: "Handed to the carrier — in transit to your city.",
      date: dayOffset(0),
      state: "active",
    },
    {
      label: "Out for delivery",
      detail: "Final leg, you'll get an SMS on the morning.",
      date: dayOffset(2),
      state: "next",
    },
    {
      label: "Delivered",
      detail: "Left with you or your pickup point.",
      date: dayOffset(2),
      state: "next",
    },
  ];
}

function money(n: number) {
  return "$" + n.toFixed(2);
}

export default function OrderTrackingPage() {
  const [orderInput, setOrderInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    orderNumber: string;
    eta: string;
    events: TimelineEvent[];
  } | null>(null);

  const trackingNumber = "3S-9741-2208-FR";

  function lookup() {
    const trimmedOrder = orderInput.trim();
    const ok = trimmedOrder.length >= 4 && emailInput.includes("@");
    if (ok) {
      const formatted = trimmedOrder.toUpperCase().startsWith("#")
        ? trimmedOrder.toUpperCase()
        : `#${trimmedOrder.toUpperCase()}`;
      setNote("Order found — status below.");
      setResult({ orderNumber: formatted, eta: dayOffset(2), events: buildEvents() });
      setCopied(false);
    } else {
      setNote("Enter both your order number and email.");
      setResult(null);
    }
  }

  function copyTracking() {
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(trackingNumber);
    } catch {
      // ignore clipboard errors (unsupported / denied)
    }
    setCopied(true);
  }

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline/90">
        <div
          className="absolute inset-0 bg-cover [filter:contrast(1.05)_brightness(0.55)]"
          style={{ backgroundImage: "url(/assets/team-back-banner.jpg)", backgroundPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_30%,rgba(10,10,10,0.55)_64%,rgba(6,6,6,0.8)_100%)]" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-12.5 pb-11.5 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Track order
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,56px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Where&#8217;s
              <br />
              my order
            </h1>
            <span className="w-[170px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Enter your order number and the email you checked out with.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 bg-ground/74 border border-white/14 p-5.5 min-w-[280px] flex-[0_1_380px]">
            <input
              type="text"
              placeholder="Order number (HS-4821)"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
            />
            <input
              type="email"
              placeholder="Email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
            />
            <button
              onClick={lookup}
              className="bg-lime hover:bg-lime-hover text-ground border-none font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase py-3.75 px-5 cursor-pointer flex items-center justify-center gap-2.5 transition-colors"
            >
              Track order <span className="text-sm">→</span>
            </button>
            <p className="m-0 text-[12.5px] text-lime min-h-[18px]">{note}</p>
          </div>
        </div>
      </section>

      {result && (
        <section className="max-w-[1240px] mx-auto px-6 pt-9.5 pb-15 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
          <div className="flex flex-col gap-5.5">
            <div className="flex items-end justify-between gap-4.5 flex-wrap">
              <div className="flex flex-col gap-2">
                <p className="m-0 text-[11.5px] tracking-[0.16em] uppercase text-[#8C8C8C]">
                  Order {result.orderNumber}
                </p>
                <p className="m-0 font-display italic font-black text-[clamp(24px,3vw,34px)] leading-none uppercase text-white">
                  In transit
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Arriving</p>
                <p className="m-0 text-[15px] font-semibold text-white">{result.eta}</p>
              </div>
            </div>

            <div className="border border-white/9 bg-ground-alt">
              {result.events.map((e, i) => {
                const on = e.state !== "next";
                return (
                  <div
                    key={e.label}
                    className={`grid grid-cols-[14px_minmax(0,1fr)_auto] gap-4 items-start px-5 py-4.5 ${
                      i < result.events.length - 1 ? "border-b border-white/8" : ""
                    } ${e.state === "active" ? "bg-lime/[0.06]" : ""}`}
                  >
                    <span
                      className={`w-[13px] h-[13px] rounded-full mt-[3px] block border-2 ${
                        on ? "bg-lime border-lime" : "bg-transparent border-white/30"
                      }`}
                    />
                    <div className="flex flex-col gap-1.25 min-w-0">
                      <p
                        className={`m-0 font-display font-extrabold text-[12.5px] tracking-[0.14em] uppercase ${
                          on ? "text-white" : "text-[#8C8C8C]"
                        }`}
                      >
                        {e.label}
                      </p>
                      <p className="m-0 text-[13.5px] leading-[1.6] text-[#9E9E9E]">{e.detail}</p>
                    </div>
                    <p className="m-0 text-xs tracking-[0.1em] uppercase text-[#8C8C8C] whitespace-nowrap">
                      {e.date}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
                In this parcel
              </p>
              {PARCEL_LINES.map((l) => (
                <article
                  key={l.name}
                  className="grid grid-cols-[72px_minmax(0,1fr)_auto] gap-3.5 items-center bg-card border border-hairline p-3"
                >
                  <div className="relative aspect-4/5 bg-[#121212] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#232323_0%,#141414_68%,#0B0B0B_100%)]" />
                    <div
                      className="absolute inset-0 bg-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
                      style={{ backgroundImage: `url(${l.image})`, backgroundPosition: l.focus }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <Link
                      href="/shop"
                      className="text-[14.5px] font-semibold text-[#F0F0F0] hover:text-lime transition-colors"
                    >
                      {l.name}
                    </Link>
                    <p className="m-0 text-[11.5px] tracking-[0.12em] uppercase text-[#8C8C8C]">{l.meta}</p>
                  </div>
                  <p className="m-0 font-display font-extrabold text-[15px] text-white">
                    {money(l.price * l.qty)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="bg-ground-alt border border-white/9 p-5.5 flex flex-col gap-3">
              <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
                Carrier
              </p>
              <div className="flex items-center justify-between gap-3.5">
                <p className="m-0 text-sm text-[#B0B0B0]">Service</p>
                <p className="m-0 text-[14.5px] font-semibold text-white">Standard delivery</p>
              </div>
              <div className="flex items-center justify-between gap-3.5">
                <p className="m-0 text-sm text-[#B0B0B0]">Tracking no.</p>
                <p className="m-0 text-[14.5px] font-semibold text-white">{trackingNumber}</p>
              </div>
              <button
                onClick={copyTracking}
                className="mt-1 bg-white hover:bg-lime text-ground border-none font-display font-extrabold text-[11.5px] tracking-[0.12em] uppercase py-3.25 px-4.5 cursor-pointer transition-colors"
              >
                {copied ? "Copied" : "Copy tracking number"}
              </button>
            </div>

            <div className="bg-ground-alt border border-white/9 p-5.5 flex flex-col gap-2.5">
              <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
                Delivering to
              </p>
              <p className="m-0 text-sm leading-[1.7] text-[#C4C4C4]">
                Yanis Benali
                <br />
                18 rue des Ateliers
                <br />
                75011 Paris
                <br />
                France
              </p>
            </div>

            <div className="bg-lime text-ground px-5.5 py-6 flex flex-col gap-3">
              <h2 className="m-0 font-display italic font-black text-[22px] leading-none uppercase">
                Something off?
              </h2>
              <p className="m-0 text-sm font-medium leading-[1.6]">
                Late, damaged or wrong size — tell us and we&#39;ll sort it within 24 hours.
              </p>
              <CtaLink href="/contact" variant="dark" className="self-start mt-1">
                Contact support
              </CtaLink>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
