"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SWASH_CLIP =
  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)";

type Order = {
  number: string;
  date: string;
  items: number;
  total: string;
  status: "In transit" | "Delivered" | "Packed";
  contents: string;
};

const ORDERS: Order[] = [
  {
    number: "#HS-4821",
    date: "12 Mar 2024",
    items: 4,
    total: "$145.60",
    status: "In transit",
    contents: "Combat Ton Nafs Tee ×2, Squad Training Tee, Coach Tee",
  },
  {
    number: "#HS-4106",
    date: "28 Jan 2024",
    items: 2,
    total: "$74.80",
    status: "Delivered",
    contents: "Oversized Tee, Training Shorts",
  },
  {
    number: "#HS-3877",
    date: "04 Dec 2023",
    items: 1,
    total: "$36.90",
    status: "Delivered",
    contents: "Coach Tee",
  },
];

const STATUS_COLORS: Record<Order["status"], string> = {
  Delivered: "#8FE3E8",
  "In transit": "#C8F32B",
  Packed: "#FFC53D",
};

const ADDRESSES = [
  {
    label: "Default",
    name: "Yanis Benali",
    street: "18 rue des Ateliers",
    city: "75011 Paris",
    country: "France",
  },
  {
    label: "Club",
    name: "AS Belleville",
    street: "4 avenue du Stade",
    city: "75020 Paris",
    country: "France",
  },
];

type AuthMode = "signin" | "signup";
type Tab = "Orders" | "Addresses" | "Details";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase px-[17px] py-[11px] cursor-pointer border transition-colors ${
        active ? "bg-lime border-lime text-ground" : "bg-transparent border-white/16 text-[#BDBDBD] hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}

export default function AccountPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [tab, setTab] = useState<Tab>("Orders");

  const [first, setFirst] = useState("Yanis");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");

  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const isSignup = mode === "signup";

  function submit() {
    if (!email.includes("@") || password.length < 6) {
      setError("Enter a valid email and a password of at least six characters.");
      return;
    }
    setError("");
    setPassword("");
    setSignedIn(true);
  }

  function signOut() {
    setSignedIn(false);
    setMode("signin");
    setEmail("");
    setPassword("");
    setTab("Orders");
  }

  function saveDetails() {
    setSaved("Details saved.");
  }

  return (
    <div className="font-body w-full">
      <Header />

      {!signedIn && (
        <section className="relative flex flex-wrap items-stretch bg-ground-alt border-b border-hairline/90">
          <div className="flex-[1_1_340px] z-[2] pt-[54px] px-8 pb-[52px] pl-12 flex flex-col justify-center gap-4.5">
            <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">
              <Link href="/" className="text-[#BFBFBF] hover:text-lime transition-colors">
                Home
              </Link>{" "}
              / Account
            </p>
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(30px,4.6vw,52px)] leading-[0.9] tracking-[-0.02em] uppercase text-white">
              {isSignup ? "Join the squad" : "Welcome back"}
            </h1>
            <span
              className="block w-40 h-3 bg-lime"
              style={{ clipPath: SWASH_CLIP }}
            />
            <p className="m-0 text-[15px] leading-[1.7] text-[#B4B4B4] max-w-[40ch]">
              {isSignup
                ? "One account to follow your orders, save your sizes and hear about restocks first."
                : "Sign in to see your orders, addresses and saved sizes."}
            </p>

            <div className="flex gap-2 flex-wrap mt-1">
              <Chip active={mode === "signin"} onClick={() => { setMode("signin"); setError(""); }}>
                Sign in
              </Chip>
              <Chip active={mode === "signup"} onClick={() => { setMode("signup"); setError(""); }}>
                Create account
              </Chip>
            </div>

            <div className="flex flex-col gap-3 max-w-[420px] mt-1">
              {isSignup && (
                <input
                  type="text"
                  placeholder="First name"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
                />
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
              />
              <button
                onClick={submit}
                className="bg-lime hover:bg-lime-hover text-ground border-none font-display font-extrabold text-[13px] tracking-[0.1em] uppercase px-[22px] py-4 cursor-pointer flex items-center justify-center gap-2.5 transition-colors"
              >
                {isSignup ? "Create account" : "Sign in"} <span className="text-[15px]">→</span>
              </button>
              <p className="m-0 text-[12.5px] text-[#FF8A8A] min-h-[18px]">{error}</p>
              <p className="m-0 text-[13px] leading-[1.6] text-[#8C8C8C]">
                No account needed to follow a parcel —{" "}
                <Link href="/order-tracking" className="text-lime hover:text-lime-hover">
                  track it here
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex-[1.15_1_400px] relative min-h-[380px]">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "polygon(11% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <Image
                src="/assets/brand-banner.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover [object-position:center_38%] [filter:contrast(1.06)_brightness(0.92)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(97deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.45)_10%,rgba(10,10,10,0)_30%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-[34%] bg-[linear-gradient(0deg,rgba(6,6,6,0.72)_0%,rgba(6,6,6,0)_100%)]" />
            </div>
          </div>
        </section>
      )}

      {signedIn && (
        <div className="flex flex-col">
          <section className="bg-ground-alt border-b border-hairline/90">
            <div className="max-w-[1240px] mx-auto px-6 pt-11 pb-9.5 flex items-end justify-between gap-6 flex-wrap">
              <div className="flex flex-col gap-3">
                <p className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-[#BFBFBF]">Account</p>
                <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(30px,4.6vw,50px)] leading-[0.92] tracking-[-0.02em] uppercase text-white">
                  Hey {first || "athlete"}
                </h1>
                <span className="block w-[150px] h-3 bg-lime" style={{ clipPath: SWASH_CLIP }} />
              </div>
              <button
                onClick={signOut}
                className="bg-transparent border border-white/40 text-white font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase px-5 py-[13px] cursor-pointer hover:border-lime hover:text-lime transition-colors"
              >
                Sign out
              </button>
            </div>
          </section>

          <section className="max-w-[1240px] mx-auto px-6 pt-7.5 pb-15 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
            <div className="flex flex-col gap-5.5">
              <div className="flex gap-2 flex-wrap">
                {(["Orders", "Addresses", "Details"] as Tab[]).map((t) => (
                  <Chip key={t} active={tab === t} onClick={() => { setTab(t); setSaved(""); }}>
                    {t}
                  </Chip>
                ))}
              </div>

              {tab === "Orders" && (
                <div className="flex flex-col gap-3.5">
                  {ORDERS.map((o) => (
                    <article
                      key={o.number}
                      className="bg-card border border-hairline px-5 py-4.5 flex flex-col gap-3.5"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex flex-col gap-1">
                          <p className="m-0 font-display font-black text-[15px] text-white">{o.number}</p>
                          <p className="m-0 text-xs tracking-[0.12em] uppercase text-[#8C8C8C]">
                            {o.date} · {o.items} items
                          </p>
                        </div>
                        <div className="flex items-center gap-3.5 flex-wrap">
                          <span
                            className="font-display font-extrabold text-[10px] tracking-[0.14em] uppercase px-2.5 py-1.5 text-ground"
                            style={{ background: STATUS_COLORS[o.status] }}
                          >
                            {o.status}
                          </span>
                          <p className="m-0 font-display font-extrabold text-[16px] text-white">{o.total}</p>
                        </div>
                      </div>
                      <p className="m-0 text-[13.5px] leading-[1.6] text-[#A8A8A8]">{o.contents}</p>
                      <div className="flex gap-2.5 flex-wrap">
                        <Link
                          href="/order-tracking"
                          className="bg-white hover:bg-lime text-ground font-display font-extrabold text-[11px] tracking-[0.12em] uppercase px-[17px] py-[11px] transition-colors"
                        >
                          Track
                        </Link>
                        <Link
                          href="/shop"
                          className="bg-transparent border border-white/22 text-[#DCDCDC] hover:border-lime hover:text-lime font-display font-extrabold text-[11px] tracking-[0.12em] uppercase px-[17px] py-[11px] transition-colors"
                        >
                          Buy again
                        </Link>
                        <Link
                          href="/contact"
                          className="bg-transparent border border-white/22 text-[#DCDCDC] hover:border-lime hover:text-lime font-display font-extrabold text-[11px] tracking-[0.12em] uppercase px-[17px] py-[11px] transition-colors"
                        >
                          Get help
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {tab === "Addresses" && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
                  {ADDRESSES.map((a) => (
                    <div key={a.label} className="bg-card border border-hairline p-5 flex flex-col gap-2.5">
                      <p className="m-0 font-display font-extrabold text-[11px] tracking-[0.16em] uppercase text-lime">
                        {a.label}
                      </p>
                      <p className="m-0 text-sm leading-[1.7] text-[#DCDCDC]">
                        {a.name}
                        <br />
                        {a.street}
                        <br />
                        {a.city}
                        <br />
                        {a.country}
                      </p>
                      <Link
                        href="/contact"
                        className="mt-1 font-display font-extrabold text-[11px] tracking-[0.12em] uppercase text-lime hover:text-lime-hover"
                      >
                        Edit →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {tab === "Details" && (
                <div className="flex flex-col gap-3 max-w-[440px]">
                  <input
                    type="text"
                    placeholder="First name"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-input border border-white/16 text-white text-sm p-3.5 outline-none focus:border-lime"
                  />
                  <button
                    onClick={saveDetails}
                    className="self-start bg-lime hover:bg-lime-hover text-ground border-none font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase px-[22px] py-[15px] cursor-pointer transition-colors"
                  >
                    Save changes
                  </button>
                  <p className="m-0 text-[12.5px] text-lime min-h-[18px]">{saved}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3.5">
              <div className="bg-ground-alt border border-white/9 p-5.5 flex flex-col gap-3">
                <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
                  Your stats
                </p>
                <div className="flex items-center justify-between gap-3.5">
                  <p className="m-0 text-sm text-[#B0B0B0]">Orders placed</p>
                  <p className="m-0 font-display font-extrabold text-[15px] text-white">3</p>
                </div>
                <div className="flex items-center justify-between gap-3.5">
                  <p className="m-0 text-sm text-[#B0B0B0]">Member since</p>
                  <p className="m-0 font-display font-extrabold text-[15px] text-white">2023</p>
                </div>
                <div className="flex items-center justify-between gap-3.5">
                  <p className="m-0 text-sm text-[#B0B0B0]">Usual size</p>
                  <p className="m-0 font-display font-extrabold text-[15px] text-white">M</p>
                </div>
              </div>
              <div className="bg-lime text-ground px-5.5 py-6 flex flex-col gap-3">
                <h2 className="m-0 font-display italic font-black text-[22px] leading-none uppercase">
                  Train with us
                </h2>
                <p className="m-0 text-sm font-medium leading-[1.6]">
                  Weekly sessions in Paris, Lyon and Brussels. Free, open, no level required.
                </p>
                <Link
                  href="/community"
                  className="self-start mt-1 bg-ground hover:bg-[#1C1C1C] text-white font-display font-extrabold text-xs tracking-[0.1em] uppercase px-5 py-[13px] inline-flex items-center gap-2.5 transition-colors"
                >
                  See sessions <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      <Footer />
    </div>
  );
}
