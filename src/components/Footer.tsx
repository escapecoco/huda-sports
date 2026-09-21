"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import {
  footerCompanyLinks,
  footerLegalLinks,
  footerShopLinks,
  siteTagline,
  socialLinks,
} from "@/lib/site";

export function Footer() {
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
    <footer className="bg-ground-alt border-t border-hairline pt-12 px-6 pb-5.5">
      <StaggerGroup className="max-w-[1240px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-6">
        <StaggerItem className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Image
              src="/assets/logo.png"
              alt="HUDA Sports"
              width={80}
              height={26}
              className="h-[26px] w-auto brightness-[1.6] mix-blend-screen"
            />
            <span className="font-display font-black text-[18px] uppercase text-white">HUDA</span>
            <span className="font-body italic font-medium text-[17px] text-white">Sports</span>
          </div>
          <p className="text-[10.5px] tracking-[0.34em] uppercase text-[#8C8C8C]">{siteTagline}</p>
          <div className="flex gap-3.5 items-center flex-wrap mt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="font-display font-extrabold text-[11px] tracking-[0.14em] uppercase text-white hover:text-lime transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-2.5">
          <p className="mb-1 font-display font-extrabold text-[11.5px] tracking-[0.16em] uppercase text-white">
            Shop
          </p>
          {footerShopLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13.5px] text-[#B0B0B0] hover:text-lime transition-colors">
              {l.label}
            </Link>
          ))}
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-2.5">
          <p className="mb-1 font-display font-extrabold text-[11.5px] tracking-[0.16em] uppercase text-white">
            Company
          </p>
          {footerCompanyLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13.5px] text-[#B0B0B0] hover:text-lime transition-colors">
              {l.label}
            </Link>
          ))}
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-3">
          <p className="font-display font-extrabold text-[11.5px] tracking-[0.16em] uppercase text-white">
            Newsletter
          </p>
          <p className="text-[13px] leading-relaxed text-[#A8A8A8] max-w-[30ch]">
            Be the first to know about new drops, exclusive content and more.
          </p>
          <div className="flex max-w-[300px]">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 bg-input border border-white/16 text-white text-[13px] px-3 py-[11px] outline-none focus:border-lime"
            />
            <motion.button
              onClick={subscribe}
              whileHover={{ backgroundColor: "#E4FF7A", x: 2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.15 }}
              className="bg-lime border-none text-ground text-[15px] font-bold px-4 cursor-pointer"
            >
              →
            </motion.button>
          </div>
          <p className="text-[12px] text-lime min-h-4">{note}</p>
        </StaggerItem>
      </StaggerGroup>

      <div className="max-w-[1240px] mx-auto mt-8.5 pt-4.5 border-t border-hairline flex items-center justify-between gap-4.5 flex-wrap">
        <p className="text-[12px] text-ink-muted">© 2024 HUDA Sports. All rights reserved.</p>
        <div className="flex gap-5.5 flex-wrap">
          {footerLegalLinks.map((l, i) => (
            <Link key={i} href={l.href} className="text-[12px] text-ink-muted hover:text-lime transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
