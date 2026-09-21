"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const EASE = [0.16, 1, 0.3, 1] as const;

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const stats = [
  { value: "+100", label: "Athletes", body: "Training in HUDA across three countries." },
  { value: "240", label: "GSM cotton", body: "Heavyweight base fabric on every tee." },
  { value: "12", label: "Clubs kitted", body: "Crests, names and numbers printed in-house." },
  { value: "2021", label: "Founded", body: "Started in Paris with twenty tees." },
];

const milestones = [
  {
    year: "2021",
    title: "A print and a group chat",
    body: "Five friends training together order twenty tees with one slogan on the back. They sell out inside the group in a weekend.",
  },
  {
    year: "2022",
    title: "Combat Ton Nafs",
    body: "The back print that became the brand. Made for the part of training nobody sees — showing up when you don't feel like it.",
  },
  {
    year: "2023",
    title: "From friends to clubs",
    body: "Local clubs start asking for their own crest on our pieces. Team orders become half of what we produce.",
  },
  {
    year: "2024",
    title: "Same people, higher goals",
    body: "Over a hundred athletes wear the crest across three countries. Same production runs, same values, bigger room.",
  },
];

const values = [
  { num: "01", title: "Move", body: "Progress over perfection. Every piece is made to be trained in, not kept in a wardrobe." },
  { num: "02", title: "Belong", body: "No gatekeeping. Whoever shows up and puts in the work is part of the squad." },
  { num: "03", title: "Be more", body: "Discipline today, better tomorrow. The print is a reminder, not a slogan." },
];

const making = [
  "Small runs printed in Europe, restocked when they sell out.",
  "Heavyweight 240gsm combed cotton, pre-shrunk.",
  "Screen printing and embroidery done in-house for team kit.",
];

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  function subscribe() {
    if (email.includes("@")) {
      setNote("You're in. Watch your inbox.");
      setEmail("");
    } else {
      setNote("Enter a valid email.");
    }
  }

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative flex flex-wrap items-stretch bg-ground-alt border-b border-hairline/90">
        <motion.div
          className="flex-[1_1_380px] z-10 px-8 pt-14 pb-13.5 pl-12 flex flex-col justify-center gap-4.5"
          initial="hidden"
          animate="show"
          variants={heroContainer}
        >
          <motion.p variants={heroItem} className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
            <Link href="/" className="hover:text-lime transition-colors">
              Home
            </Link>{" "}
            / Our story
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(34px,5.4vw,64px)] leading-[0.88] tracking-[-0.02em] uppercase text-white"
          >
            More than
            <br />a brand
          </motion.h1>
          <motion.span
            variants={heroItem}
            className="block w-[200px] h-3 bg-lime"
            style={{
              clipPath:
                "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)",
            }}
          />
          <motion.p variants={heroItem} className="mt-1 text-[18px] font-semibold leading-[1.4] max-w-[30ch] text-white">
            HUDA Sports started with a handful of friends, one print and a group chat.
          </motion.p>
          <motion.p variants={heroItem} className="m-0 text-[15px] leading-[1.75] max-w-[44ch] text-[#B4B4B4]">
            Today it&#8217;s a community that trains together, travels together and wears the same
            crest. This is how it happened — and where it&#8217;s going.
          </motion.p>
          <motion.div variants={heroItem} className="flex items-center gap-3 flex-wrap mt-2">
            <CtaLink href="/shop">Shop the collection</CtaLink>
            <CtaLink href="/community" variant="outline">
              Meet the community
            </CtaLink>
          </motion.div>
        </motion.div>

        <div className="flex-[1.4_1_460px] relative min-h-[440px] overflow-hidden">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "polygon(11% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Image
              src="/assets/hero-group-crop.png"
              alt="HUDA Sports athletes"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover [object-position:center_30%] [filter:contrast(1.07)_saturate(1.06)_brightness(1.02)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(97deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.45)_9%,rgba(10,10,10,0)_26%)]" />
            <div className="absolute top-0 right-0 w-[42%] h-[72%] bg-[linear-gradient(210deg,rgba(6,6,6,0.9)_0%,rgba(6,6,6,0.55)_32%,rgba(6,6,6,0)_76%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[32%] bg-[linear-gradient(0deg,rgba(6,6,6,0.7)_0%,rgba(6,6,6,0)_100%)]" />
          </motion.div>
          <MarkerNote lines={["Started", "with", "five", "of us"]} rotate={-9} className="absolute top-10 right-7.5" />
        </div>
      </section>

      {/* Stats */}
      <StaggerGroup className="max-w-[1240px] mx-auto px-6 pt-10 pb-3.5 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3.5">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="bg-card border border-hairline p-5.5 pt-5.5 flex flex-col gap-1.5">
            <p className="m-0 font-display font-black text-[30px] leading-none text-white">{s.value}</p>
            <p className="m-0 font-display font-extrabold text-[11px] tracking-[0.16em] uppercase text-lime">
              {s.label}
            </p>
            <p className="m-0 text-[13px] leading-[1.6] text-[#A0A0A0]">{s.body}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Timeline */}
      <section className="max-w-[1240px] mx-auto px-6 pt-8 pb-5">
        <Reveal className="flex flex-col gap-3 mb-6.5">
          <span className="w-13.5 h-[5px] bg-lime" />
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,40px)] tracking-[-0.01em] uppercase text-white">
            How we got here
          </h2>
        </Reveal>
        <StaggerGroup className="border border-hairline bg-ground-alt">
          {milestones.map((m, i) => (
            <StaggerItem
              key={m.year}
              className={`grid grid-cols-[70px_minmax(0,1fr)] gap-4.5 items-start px-5.5 py-5 ${
                i < milestones.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <p className="m-0 font-display font-black text-[16px] text-lime whitespace-nowrap">{m.year}</p>
              <div className="flex flex-col gap-1.5 min-w-0">
                <p className="m-0 font-display font-extrabold text-[13px] tracking-[0.12em] uppercase text-white">
                  {m.title}
                </p>
                <p className="m-0 text-[14px] leading-[1.7] text-[#A8A8A8] max-w-[62ch]">{m.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* What we stand for */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90 mt-8.5">
        <Reveal className="relative min-h-[360px] overflow-hidden">
          <Image
            src="/assets/our-story.jpg"
            alt="HUDA Sports community"
            fill
            className="object-cover [object-position:center_42%] [filter:contrast(1.06)_saturate(1.06)_brightness(1.02)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.55)_0%,rgba(6,6,6,0)_28%,rgba(6,6,6,0)_70%,rgba(10,10,10,0.9)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-[linear-gradient(0deg,rgba(6,6,6,0.78)_0%,rgba(6,6,6,0)_100%)]" />
          <MarkerNote lines={["Good", "people", "better", "tomorrow"]} rotate={-8} className="absolute bottom-10 left-7" />
        </Reveal>
        <div className="px-11 py-13 flex flex-col justify-center gap-5.5">
          <Reveal delay={0.1} className="flex flex-col gap-3">
            <span className="w-13.5 h-[5px] bg-lime" />
            <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] tracking-[-0.01em] uppercase text-white">
              What we stand for
            </h2>
          </Reveal>
          <StaggerGroup className="flex flex-col">
            {values.map((v) => (
              <StaggerItem key={v.num} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3.5 items-start pb-5">
                <p className="m-0 font-display font-black text-[14px] text-lime">{v.num}</p>
                <div className="flex flex-col gap-1.5">
                  <p className="m-0 font-display font-extrabold text-[12.5px] tracking-[0.14em] uppercase text-white">
                    {v.title}
                  </p>
                  <p className="m-0 text-[14px] leading-[1.7] text-[#A8A8A8] max-w-[44ch]">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* How we make it */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90">
        <Reveal className="bg-lime text-ground px-10 py-12.5 flex flex-col justify-center gap-4.5">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(28px,3.4vw,40px)] leading-[0.98] uppercase">
            How we make it
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.7] max-w-[42ch]">
            Heavyweight cotton, printed in small runs in Europe. We produce what the community
            actually orders instead of filling a warehouse — fewer pieces, made better, restocked
            when they sell out.
          </p>
          <div className="flex flex-col gap-2.5 mt-1">
            {making.map((m) => (
              <div key={m} className="grid grid-cols-[10px_minmax(0,1fr)] gap-3 items-start">
                <span className="w-[7px] h-[7px] bg-ground block mt-[7px]" />
                <p className="m-0 text-[14px] font-medium leading-[1.65]">{m}</p>
              </div>
            ))}
          </div>
          <CtaLink href="/shop" variant="dark" className="self-start mt-2">
            See the pieces
          </CtaLink>
        </Reveal>
        <Reveal delay={0.12} className="relative min-h-[320px] overflow-hidden">
          <Image
            src="/assets/brand-banner.jpg"
            alt="HUDA Sports production"
            fill
            className="object-cover [object-position:center_42%] [filter:contrast(1.05)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(6,6,6,0.5)_0%,rgba(6,6,6,0)_40%)]" />
        </Reveal>
      </section>

      {/* Founder quote + newsletter */}
      <section className="max-w-[1240px] mx-auto px-6 pt-13 pb-14.5 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-center">
        <Reveal className="flex flex-col gap-4">
          <p className="m-0 font-display font-black text-[54px] leading-[0.6] text-white">&#8220;</p>
          <p className="m-0 text-[clamp(22px,2.8vw,32px)] font-semibold leading-[1.25] text-white max-w-[28ch] text-pretty">
            We never wanted customers. We wanted a squad that shows up.
          </p>
          <div className="flex items-center gap-3.5 mt-1.5">
            <span className="w-8.5 h-0.5 bg-white" />
            <span className="font-body italic font-semibold text-[15px] text-white">Founders, HUDA Sports</span>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-col gap-3.5">
          <div className="bg-ground-alt border border-hairline px-5.5 py-6 flex flex-col gap-3">
            <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.16em] uppercase text-white">
              Join the next drop
            </p>
            <p className="m-0 text-[14px] leading-[1.7] text-[#A8A8A8] max-w-[42ch]">
              Restocks and new pieces go out to the list first. No noise, a few mails a year.
            </p>
            <div className="flex max-w-[340px]">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-input border border-white/16 text-white text-[13.5px] px-3 py-[13px] outline-none focus:border-lime"
              />
              <motion.button
                onClick={subscribe}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="bg-lime border-none text-ground text-[15px] font-bold px-4.5 cursor-pointer hover:bg-lime-hover transition-colors"
              >
                →
              </motion.button>
            </div>
            <p className="m-0 text-[12.5px] text-lime min-h-[18px]">{note}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <CtaLink href="/team-orders" variant="white">
              Team orders
            </CtaLink>
            <CtaLink href="/contact" variant="outline">
              Work with us
            </CtaLink>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
