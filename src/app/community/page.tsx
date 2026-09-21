"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

type Session = {
  day: string;
  time: string;
  title: string;
  place: string;
  level: string;
};

const sessionsByCity: Record<string, Session[]> = {
  Paris: [
    { day: "Tuesday", time: "19:30", title: "Track session", place: "Stade Jules Ladoumègue, gate 3", level: "All levels" },
    { day: "Thursday", time: "07:00", title: "Strength & core", place: "Parc de Belleville, upper terrace", level: "Intermediate" },
    { day: "Sunday", time: "10:00", title: "Long run", place: "Canal de l'Ourcq, Jaurès bridge", level: "All levels" },
  ],
  Lyon: [
    { day: "Wednesday", time: "19:00", title: "Track session", place: "Stade du Rhône, main entrance", level: "All levels" },
    { day: "Saturday", time: "09:30", title: "Hill repeats", place: "Parc de la Tête d'Or, north gate", level: "Advanced" },
  ],
  Brussels: [
    { day: "Monday", time: "19:00", title: "Conditioning", place: "Parc du Cinquantenaire, arch side", level: "All levels" },
    { day: "Saturday", time: "10:00", title: "Long run", place: "Bois de la Cambre, main lawn", level: "Intermediate" },
  ],
};

const cities = Object.keys(sessionsByCity);

const voices = [
  {
    name: "Sofia",
    role: "Joined 2022",
    quote:
      "I came for one session and stayed two years. Nobody cares how fast you are, only that you turned up.",
    img: "/assets/our-story.jpg",
    focus: "center 38%",
  },
  {
    name: "Karim",
    role: "Club captain",
    quote:
      "We kitted the whole club in HUDA. Seeing twenty of us in the same crest changed how we train.",
    img: "/assets/team-back-banner.jpg",
    focus: "center 44%",
  },
  {
    name: "Noor",
    role: "Joined 2023",
    quote:
      "The back print is a reminder more than a slogan. Some mornings it's the only reason I go.",
    img: "/assets/brand-banner.jpg",
    focus: "center 34%",
  },
];

export default function CommunityPage() {
  const [city, setCity] = useState("Paris");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const sessions = useMemo(() => sessionsByCity[city], [city]);

  function join() {
    if (email.includes("@")) {
      setNote("You're on the list — see you at the next session.");
      setEmail("");
    } else {
      setNote("Enter a valid email.");
    }
  }

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ground-alt border-b border-hairline/90">
        <Image
          src="/assets/team-collection.jpg"
          alt="HUDA Sports community"
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_44%] [filter:contrast(1.05)_brightness(0.55)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.48)_66%,rgba(6,6,6,0.78)_100%)]" />
        <div className="relative z-[2] max-w-[1240px] mx-auto px-6 pt-13 pb-12 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[44ch]">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Community
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,58px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              The squad
            </h1>
            <span
              className="block w-[170px] h-3 bg-lime"
              style={{ clipPath: SWASH_CLIP }}
            />
            <p className="m-0 text-[15px] leading-[1.7] text-[#C4C4C4]">
              Weekly sessions, club kit and the people wearing the crest. Open to anyone who shows up.
            </p>
            <div className="flex gap-3 flex-wrap mt-1.5">
              <CtaLink href="#sessions">Next sessions</CtaLink>
              <CtaLink href="/team-orders" variant="outline">
                Kit my club
              </CtaLink>
            </div>
          </div>
          <MarkerNote lines={["Move", "together", "grow", "together"]} rotate={-9} />
        </div>
      </section>

      {/* Weekly sessions */}
      <section id="sessions" className="max-w-[1240px] mx-auto px-6 pt-9.5 pb-4.5">
        <div className="flex items-end justify-between gap-5 flex-wrap mb-5.5">
          <div className="flex flex-col gap-3">
            <span className="w-13.5 h-[5px] bg-lime" />
            <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] tracking-[-0.01em] uppercase text-white">
              Weekly sessions
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`font-display font-extrabold text-[11px] tracking-[0.14em] uppercase px-3.5 py-2.5 cursor-pointer border transition-colors ${
                  city === c
                    ? "border-lime bg-lime text-ground"
                    : "border-white/16 bg-transparent text-[#BDBDBD] hover:border-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="border border-hairline bg-ground-alt">
          {sessions.map((s, i) => (
            <div
              key={s.day + s.title}
              className={`grid grid-cols-[110px_minmax(0,1fr)_auto] gap-4.5 items-center px-5.5 py-4.5 ${
                i < sessions.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <div className="flex flex-col gap-[3px] min-w-0">
                <p className="m-0 font-display font-black text-[15px] text-white">{s.day}</p>
                <p className="m-0 text-[12.5px] tracking-[0.1em] uppercase text-[#8C8C8C]">{s.time}</p>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <p className="m-0 font-display font-extrabold text-[12.5px] tracking-[0.12em] uppercase text-white">
                  {s.title}
                </p>
                <p className="m-0 text-[13.5px] leading-[1.6] text-[#A8A8A8]">{s.place}</p>
              </div>
              <p className="m-0 text-[12.5px] tracking-[0.1em] uppercase text-lime whitespace-nowrap">
                {s.level}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3.5 mb-0 text-[13px] leading-[1.6] text-[#8C8C8C]">
          Sessions are free and open. Bring water, wear whatever you train in — the crest is optional.
        </p>
      </section>

      {/* Voices */}
      <section className="max-w-[1240px] mx-auto px-6 pt-8.5 pb-5">
        <div className="flex flex-col gap-3 mb-5.5">
          <span className="w-13.5 h-[5px] bg-lime" />
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] tracking-[-0.01em] uppercase text-white">
            Voices from the squad
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-3.5">
          {voices.map((v) => (
            <article key={v.name} className="bg-card border border-hairline flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#121212]">
                <Image
                  src={v.img}
                  alt={v.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: v.focus }}
                  className="object-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.15)_0%,rgba(6,6,6,0)_40%,rgba(6,6,6,0.6)_100%)]" />
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <p className="m-0 text-[15px] leading-[1.7] text-[#DCDCDC]">{v.quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <span className="w-6.5 h-0.5 bg-lime" />
                  <div className="flex flex-col gap-0.5">
                    <p className="m-0 font-display font-extrabold text-[12px] tracking-[0.1em] uppercase text-white">
                      {v.name}
                    </p>
                    <p className="m-0 text-[12px] text-[#8C8C8C]">{v.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Run with us */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90 mt-8.5">
        <div className="relative min-h-[320px] overflow-hidden">
          <Image
            src="/assets/team-back-banner.jpg"
            alt="HUDA Sports team"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover [object-position:center_46%] [filter:contrast(1.05)_brightness(0.98)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.6)_0%,rgba(6,6,6,0)_36%,rgba(6,6,6,0.22)_100%)]" />
          <MarkerNote
            lines={["Team", "discipline", "respect", "HUDA"]}
            rotate={-8}
            className="absolute top-9 left-6.5"
          />
        </div>
        <div className="bg-lime text-ground px-10 py-12 flex flex-col justify-center gap-4.5">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(28px,3.4vw,40px)] leading-[0.98] uppercase">
            Run with us
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.7] max-w-[40ch]">
            Drop your email and we send the week&#8217;s session, the meeting point and nothing else.
            Turn up once and you&#8217;re in.
          </p>
          <div className="flex max-w-[340px] mt-1">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 bg-ground border border-ground/60 text-white text-[13.5px] px-3 py-3.5 outline-none"
            />
            <button
              onClick={join}
              className="bg-ground border-none text-white font-display font-extrabold text-[12px] tracking-[0.12em] uppercase px-4.5 cursor-pointer hover:bg-[#1C1C1C] transition-colors"
            >
              Join
            </button>
          </div>
          <p className="m-0 text-[13px] font-semibold min-h-[18px]">{note}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
