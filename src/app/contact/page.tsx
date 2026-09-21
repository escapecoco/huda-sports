"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaButton, CtaLink } from "@/components/Button";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

const topics = ["Order", "Sizing", "Team kit", "Something else"];

export default function ContactPage() {
  const [topic, setTopic] = useState("Order");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [ok, setOk] = useState(false);

  function send() {
    if (!name || !email.includes("@") || message.trim().length < 10) {
      setOk(false);
      setNote("Add your name, a valid email and a few words about your request.");
      return;
    }
    setOk(true);
    setNote(`Message sent — we'll reply to ${email} within 24 hours.`);
    setMessage("");
  }

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline/90">
        <Image
          src="/assets/our-story.jpg"
          alt="HUDA Sports"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_42%] [filter:contrast(1.05)_brightness(0.55)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.5)_66%,rgba(6,6,6,0.78)_100%)]" />
        <div className="relative z-[2] max-w-[1240px] mx-auto px-6 pt-13 pb-12 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Contact
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,58px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              Talk
              <br />
              to us
            </h1>
            <span className="block w-[170px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Orders, sizing, team kit or collabs — one message and a real person answers within 24
              hours.
            </p>
          </div>
          <MarkerNote lines={["Same", "team", "one", "call"]} rotate={-9} />
        </div>
      </section>

      {/* Form + info */}
      <section className="max-w-[1240px] mx-auto px-6 pt-10 pb-15 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
        <div className="flex flex-col gap-4">
          <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.16em] uppercase text-white">
            Send a message
          </p>
          <div className="flex gap-2 flex-wrap">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`font-display font-extrabold text-[11px] tracking-[0.14em] uppercase px-3.5 py-2.5 cursor-pointer border transition-colors ${
                  topic === t
                    ? "border-lime bg-lime text-ground"
                    : "border-white/16 bg-transparent text-[#BDBDBD] hover:border-white/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border border-white/16 text-white text-[14px] px-3.5 py-3.5 min-w-0 outline-none focus:border-lime"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border border-white/16 text-white text-[14px] px-3.5 py-3.5 min-w-0 outline-none focus:border-lime"
            />
          </div>
          <input
            type="text"
            placeholder="Order number (optional)"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="bg-input border border-white/16 text-white text-[14px] px-3.5 py-3.5 outline-none focus:border-lime"
          />
          <textarea
            placeholder="Tell us what you need"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-input border border-white/16 text-white text-[14px] px-3.5 py-3.5 leading-[1.6] outline-none focus:border-lime resize-y"
          />
          <CtaButton onClick={send} className="self-start">
            Send message
          </CtaButton>
          <p className={`m-0 text-[13px] min-h-[19px] ${ok ? "text-lime" : "text-[#FF8A8A]"}`}>{note}</p>
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="bg-ground-alt border border-hairline p-5.5 flex flex-col gap-3.5">
            <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.16em] uppercase text-white">
              Direct lines
            </p>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Customer care</p>
              <a href="mailto:hello@hudasports.com" className="text-[15px] font-semibold text-lime hover:text-lime-hover transition-colors">
                hello@hudasports.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Team &amp; club orders</p>
              <a href="mailto:teams@hudasports.com" className="text-[15px] font-semibold text-lime hover:text-lime-hover transition-colors">
                teams@hudasports.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Press &amp; collabs</p>
              <a href="mailto:press@hudasports.com" className="text-[15px] font-semibold text-lime hover:text-lime-hover transition-colors">
                press@hudasports.com
              </a>
            </div>
          </div>

          <div className="bg-ground-alt border border-hairline p-5.5 flex flex-col gap-2.5">
            <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.16em] uppercase text-white">
              Response times
            </p>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-[14px] text-[#B0B0B0]">Mon &#8211; Fri</p>
              <p className="m-0 text-[14px] font-semibold text-white">Within 24h</p>
            </div>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-[14px] text-[#B0B0B0]">Weekend</p>
              <p className="m-0 text-[14px] font-semibold text-white">Monday morning</p>
            </div>
            <p className="mt-1.5 mb-0 text-[13px] leading-[1.6] text-[#8C8C8C]">
              Tracking a parcel?{" "}
              <Link href="/order-tracking" className="text-lime hover:text-lime-hover transition-colors">
                Check the status
              </Link>{" "}
              first — it&#8217;s usually faster.
            </p>
          </div>

          <div className="bg-lime text-ground px-5.5 py-6 flex flex-col gap-3">
            <h2 className="m-0 font-display italic font-black text-[22px] leading-none uppercase">
              Kitting out a team?
            </h2>
            <p className="m-0 text-[14px] font-medium leading-[1.6]">
              Names, numbers and club crests from ten pieces up. Get a quote in two working days.
            </p>
            <CtaLink href="/team-orders" variant="dark" className="self-start mt-1">
              Request a quote
            </CtaLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
