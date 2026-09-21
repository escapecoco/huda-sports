"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CtaLink } from "@/components/Button";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

type Section = {
  title: string;
  body: string;
  bullets?: string[];
};

const PRIVACY_SECTIONS: Section[] = [
  {
    title: "What we collect",
    body: "When you order we keep your name, email, delivery address, phone number and order history. Card details never reach our servers — they are handled by our payment provider.",
    bullets: [
      "Account and order data, kept for ten years for accounting obligations.",
      "Delivery data, shared only with the carrier handling your parcel.",
      "Newsletter email, kept until you unsubscribe.",
    ],
  },
  {
    title: "Why we use it",
    body: "To ship your order, answer your messages, handle returns and — only if you opted in — to tell you about new drops. We never sell your data to third parties.",
  },
  {
    title: "Cookies",
    body: "Essential cookies keep your bag and session alive. Analytics cookies are anonymised and only set if you accept them; you can change your mind at any time from the banner.",
  },
  {
    title: "Your rights",
    body: "You can access, correct, export or delete your data, and object to marketing at any time.",
    bullets: [
      "Email privacy@hudasports.com with your order number.",
      "We reply within 30 days, free of charge.",
      "You may also complain to your national data protection authority.",
    ],
  },
];

const TERMS_SECTIONS: Section[] = [
  {
    title: "Ordering",
    body: "Placing an order is a binding offer to buy. We confirm by email once payment is accepted; if a piece is out of stock we cancel that line and refund it immediately.",
  },
  {
    title: "Prices and payment",
    body: "Prices include VAT and exclude delivery, which is shown before you pay. We accept cards and wallet payments; the charge is taken when the order is confirmed.",
  },
  {
    title: "Delivery",
    body: "Estimated delivery windows are indicative, not guaranteed. Risk passes to you on delivery; report a damaged parcel within 48 hours and we replace it.",
  },
  {
    title: "Returns and withdrawal",
    body: "You have 14 days to withdraw under EU law, and we extend that to 30 days for unworn, tagged items.",
    bullets: [
      "Custom team prints with names or numbers are excluded from withdrawal.",
      "Return shipping is on us for the first size exchange in France.",
      "Refunds are issued to the original payment method within five working days.",
    ],
  },
  {
    title: "Intellectual property",
    body: "All designs, prints, photography and the HUDA Sports name are our property. Reproducing them for resale is not permitted.",
  },
  {
    title: "Applicable law",
    body: "These terms are governed by French law. Disputes go to the courts of Paris, without prejudice to your rights as a consumer in your country of residence.",
  },
];

type Tab = "Privacy" | "Terms";

export default function LegalPage() {
  const [tab, setTab] = useState<Tab>("Privacy");
  const sections = tab === "Privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const tocTitle = tab === "Privacy" ? "Privacy policy" : "Terms of service";

  return (
    <div className="font-body w-full">
      <Header />

      <section className="bg-ground-alt border-b border-hairline">
        <div className="max-w-[1240px] mx-auto px-6 pt-11.5 pb-10 flex items-end justify-between gap-6.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[46ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="text-[#BFBFBF] hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Legal
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(30px,4.6vw,52px)] leading-[0.92] tracking-[-0.02em] uppercase text-white">
              Privacy &amp; terms
            </h1>
            <span className="block w-40 h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[14.5px] leading-[1.7] text-ink-secondary">
              Plain-language version of how we handle your data and what you agree to when you order.
              Last updated March 2024.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["Privacy", "Terms"] as Tab[]).map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase px-4.5 py-2.75 cursor-pointer border transition-colors ${
                    active ? "border-lime bg-lime text-ground" : "border-white/16 bg-transparent text-[#BDBDBD]"
                  }`}
                >
                  {t === "Privacy" ? "Privacy policy" : "Terms of service"}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-9 pb-15.5 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8.5 items-start">
        <div className="flex flex-col gap-6.5 order-2">
          {sections.map((s, i) => (
            <div key={s.title} className="flex flex-col gap-2.5">
              <p className="m-0 font-display font-extrabold text-[12.5px] tracking-[0.14em] uppercase text-lime">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="m-0 font-display font-extrabold text-[clamp(19px,2.2vw,24px)] leading-[1.15] text-white">
                {s.title}
              </h2>
              <p className="m-0 text-[14.5px] leading-[1.78] text-[#B4B4B4] max-w-[66ch]">{s.body}</p>
              {s.bullets && (
                <div className="flex flex-col gap-2 mt-0.5">
                  {s.bullets.map((b) => (
                    <div key={b} className="grid grid-cols-[10px_minmax(0,1fr)] gap-3 items-start">
                      <span className="w-[7px] h-[7px] bg-lime block mt-2" />
                      <p className="m-0 text-sm leading-[1.7] text-[#A8A8A8] max-w-[62ch]">{b}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="bg-card border border-white/8 px-5.5 py-6 flex flex-col gap-2.5">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              Questions about your data?
            </p>
            <p className="m-0 text-sm leading-[1.7] text-[#A8A8A8] max-w-[52ch]">
              Write to privacy@hudasports.com and we answer within 30 days, as required by GDPR. You can
              ask for a copy or deletion of everything we hold.
            </p>
            <CtaLink href="/contact" className="self-start mt-1.5">
              Contact us
            </CtaLink>
          </div>
        </div>

        <aside className="order-1 bg-ground-alt border border-white/9 p-5.5 flex flex-col gap-3 sticky top-[90px]">
          <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
            {tocTitle}
          </p>
          <div className="flex flex-col gap-2.25">
            {sections.map((s, i) => (
              <p key={s.title} className="m-0 text-[13.5px] leading-[1.5] text-[#A8A8A8]">
                {String(i + 1).padStart(2, "0")} · {s.title}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-3.5 border-t border-white/10">
            <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Company</p>
            <p className="m-0 text-[13.5px] leading-[1.6] text-[#C4C4C4]">
              HUDA Sports SAS
              <br />
              18 rue des Ateliers
              <br />
              75011 Paris, France
            </p>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
