"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";
import { money } from "@/lib/orders";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

const UNIT_PRICES: Record<string, number> = { Tees: 24, Hoodies: 42, Shorts: 28, Caps: 16 };
const PRINT_PRICES: Record<string, number> = { "Club crest": 4, Names: 3, Numbers: 3 };
const PIECE_LABELS = Object.keys(UNIT_PRICES);
const PRINT_LABELS = Object.keys(PRINT_PRICES);

const STEPS = [
  { num: "01", title: "Tell us", body: "Pieces, quantity, personalisation and your deadline." },
  { num: "02", title: "Quote", body: "A firm quote lands in your inbox within two working days." },
  { num: "03", title: "Proof", body: "We send a digital mock-up. Nothing prints before you approve." },
  { num: "04", title: "Delivery", body: "Two weeks from approval, shipped to one address or split." },
];

const INCLUDED = [
  "Artwork setup and a digital proof before production.",
  "Screen printing or embroidery, your choice per piece.",
  "Mixed sizes at no extra cost, XS to XXL.",
  "Two-week turnaround from proof approval.",
];

function chipClass(active: boolean) {
  return `font-display font-extrabold text-[11px] tracking-[0.14em] uppercase px-3.75 py-2.5 cursor-pointer border transition-colors ${
    active ? "border-lime bg-lime text-ground" : "border-white/16 bg-transparent text-[#BDBDBD]"
  }`;
}

export default function TeamOrdersPage() {
  const [pieces, setPieces] = useState<string[]>(["Tees"]);
  const [prints, setPrints] = useState<string[]>(["Club crest"]);
  const [qty, setQty] = useState(20);

  const [club, setClub] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [note, setNote] = useState("");
  const [ok, setOk] = useState(false);

  function togglePiece(label: string) {
    setPieces((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
  }

  function togglePrint(label: string) {
    setPrints((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
  }

  const pieceAvg = useMemo(
    () => (pieces.length ? pieces.reduce((t, p) => t + UNIT_PRICES[p], 0) / pieces.length : 0),
    [pieces]
  );
  const printAdd = useMemo(() => prints.reduce((t, p) => t + PRINT_PRICES[p], 0), [prints]);
  const discountRate = qty >= 100 ? 0.15 : qty >= 50 ? 0.1 : qty >= 25 ? 0.05 : 0;
  const gross = (pieceAvg + printAdd) * qty;
  const total = gross * (1 - discountRate);

  function submit() {
    if (!pieces.length || !club.trim() || !contactName.trim() || !email.includes("@")) {
      setOk(false);
      setNote("Pick at least one piece and fill in your club, name and a valid email.");
      return;
    }
    setOk(true);
    setSubmitted(true);
    setNote(`Request sent — your quote lands at ${email} within two working days.`);
  }

  return (
    <div className="font-body w-full">
      <Header />

      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline">
        <Image
          src="/assets/team-back-banner.jpg"
          alt=""
          fill
          priority
          className="object-cover [object-position:center_42%] [filter:contrast(1.05)_brightness(0.55)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.5)_66%,rgba(6,6,6,0.78)_100%)]" />
        <div className="relative z-2 max-w-[1240px] mx-auto px-6 pt-13 pb-12 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="text-[#BFBFBF] hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Team orders
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,58px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Kit out
              <br />
              your team
            </h1>
            <span className="block w-[170px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Names, numbers and club crests on any HUDA piece. From ten items, quoted in two working
              days.
            </p>
          </div>
          <MarkerNote lines={["One", "crest", "one", "squad"]} rotate={-9} swashWidth={116} />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-8.5 pb-4.5 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3.5">
        {STEPS.map((s) => (
          <div key={s.num} className="bg-card border border-white/8 px-5 py-5.5 flex flex-col gap-2">
            <p className="m-0 font-display font-black text-xl text-lime">{s.num}</p>
            <p className="m-0 font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white">
              {s.title}
            </p>
            <p className="m-0 text-[13.5px] leading-[1.65] text-[#A8A8A8]">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-4.5 pb-15 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
        <div className="flex flex-col gap-4.5">
          <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
            Request a quote
          </p>

          <div className="flex flex-col gap-2.5">
            <p className="m-0 text-[11.5px] tracking-[0.14em] uppercase text-[#8C8C8C]">Which pieces?</p>
            <div className="flex gap-2 flex-wrap">
              {PIECE_LABELS.map((label) => (
                <button key={label} onClick={() => togglePiece(label)} className={chipClass(pieces.includes(label))}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="m-0 text-[11.5px] tracking-[0.14em] uppercase text-[#8C8C8C]">Personalisation</p>
            <div className="flex gap-2 flex-wrap">
              {PRINT_LABELS.map((label) => (
                <button key={label} onClick={() => togglePrint(label)} className={chipClass(prints.includes(label))}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-[11.5px] tracking-[0.14em] uppercase text-[#8C8C8C]">Quantity</p>
              <p className="m-0 font-display font-extrabold text-[15px] text-white">{qty} pieces</p>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              step={5}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full accent-lime"
            />
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-xs text-[#8C8C8C]">Min. 10</p>
              <p className="m-0 text-xs text-[#8C8C8C]">150+? Ask us</p>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            <input
              type="text"
              placeholder="Club or team name"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="min-w-0 bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
            <input
              type="text"
              placeholder="Contact name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="min-w-0 bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
            <input
              type="text"
              placeholder="Needed by (date)"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="min-w-0 bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
          </div>
          <textarea
            placeholder="Sizes breakdown, artwork notes, anything else"
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-input border border-white/16 text-white text-sm p-3.5 leading-[1.6] resize-y outline-none focus:border-lime placeholder:text-[#6E6E6E]"
          />

          {submitted && ok ? (
            <div className="bg-card border border-lime/40 px-5.5 py-5 flex flex-col gap-1.5">
              <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-lime">
                Request submitted
              </p>
              <p className="m-0 text-sm leading-[1.7] text-[#B4B4B4]">{note}</p>
            </div>
          ) : (
            <>
              <button
                onClick={submit}
                className="self-start bg-lime text-ground border-none font-display font-extrabold text-[13px] tracking-[0.1em] uppercase px-6 py-4 cursor-pointer inline-flex items-center gap-2.5 hover:bg-lime-hover transition-colors"
              >
                Send request <span className="text-[15px]">→</span>
              </button>
              <p className={`m-0 text-[13px] min-h-[19px] ${ok ? "text-lime" : "text-[#FF8A8A]"}`}>{note}</p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="bg-ground-alt border border-white/9 p-5.5 flex flex-col gap-3.25">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              Indicative estimate
            </p>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">Base pieces</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">
                {pieceAvg ? `${money(pieceAvg)} / pc` : "Pick a piece"}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">Personalisation</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">
                {printAdd ? `+${money(printAdd)} / pc` : "None"}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-lime">Volume discount</p>
              <p className="m-0 text-[14.5px] font-semibold text-lime">
                {discountRate ? `−${Math.round(discountRate * 100)}%` : "From 25 pcs"}
              </p>
            </div>
            <div className="flex items-end justify-between gap-3.5 pt-3.25 border-t border-white/12">
              <p className="m-0 font-display font-extrabold text-[12.5px] tracking-[0.14em] uppercase text-white">
                From
              </p>
              <p className="m-0 font-display font-black text-2xl text-white">
                {pieceAvg ? money(total) : "—"}
              </p>
            </div>
            <p className="m-0 text-[12.5px] leading-[1.6] text-[#8C8C8C]">
              Indicative only, VAT excluded. Your final quote arrives by email within two working days.
            </p>
          </div>

          <div className="bg-ground-alt border border-white/9 p-5.5 flex flex-col gap-2.75">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              What&apos;s included
            </p>
            {INCLUDED.map((i) => (
              <div key={i} className="grid grid-cols-[10px_minmax(0,1fr)] gap-3 items-start">
                <span className="w-[7px] h-[7px] bg-lime block mt-1.75" />
                <p className="m-0 text-[13.5px] leading-[1.65] text-[#B0B0B0]">{i}</p>
              </div>
            ))}
          </div>

          <div className="bg-lime text-ground px-5.5 py-6 flex flex-col gap-3">
            <h2 className="m-0 font-display italic font-black text-[22px] leading-none uppercase">
              Need it faster?
            </h2>
            <p className="m-0 text-sm font-medium leading-[1.6]">
              Rush production in one week is possible on most pieces. Tell us your deadline and we&apos;ll
              confirm.
            </p>
            <CtaLink href="/contact" variant="dark" className="self-start mt-1">
              Talk to us
            </CtaLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
