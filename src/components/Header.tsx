"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { navLinks } from "@/lib/site";

export function Header() {
  const { count } = useCart();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-ground/95 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1240px] mx-auto px-6 py-3.5 flex items-center gap-x-7 gap-y-3.5 flex-wrap">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/assets/logo.png"
            alt="HUDA Sports"
            width={80}
            height={26}
            className="h-[26px] w-auto brightness-[1.6] contrast-[1.2] mix-blend-screen"
          />
          <span className="font-display font-black text-[19px] tracking-[-0.01em] text-white uppercase">
            HUDA
          </span>
          <span className="font-body italic font-medium text-[18px] text-white">Sports</span>
        </Link>

        <nav className="flex items-center gap-6.5 ml-auto flex-wrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium tracking-[0.02em] text-[#E8E8E8] pb-[3px] border-b-2 border-transparent hover:text-lime hover:border-lime transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white hover:text-lime transition-colors"
          >
            Search
          </Link>
          <Link
            href="/account"
            className="font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white hover:text-lime transition-colors"
          >
            Account
          </Link>
          <Link href="/cart" className="flex items-center gap-[7px] text-white p-1">
            <span className="text-[17px] leading-none">🛒</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="min-w-5 h-5 inline-flex items-center justify-center bg-lime text-ground text-[11.5px] font-bold rounded-full px-1.5"
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </Link>
          <Link
            href="/shop"
            className="bg-lime text-ground font-display font-extrabold text-[12.5px] tracking-[0.08em] uppercase px-5 py-3 inline-flex items-center gap-2 whitespace-nowrap hover:bg-lime-hover transition-colors"
          >
            Shop now <span className="text-[14px]">→</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
