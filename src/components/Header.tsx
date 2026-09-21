"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { navLinks } from "@/lib/site";

const barVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};
const barVariantsBottom = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-ground/95 backdrop-blur-md border-b border-hairline"
    >
      <div className="max-w-[1240px] mx-auto px-6 py-3.5 flex items-center gap-x-7">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={close}>
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

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6.5 ml-auto">
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

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-4">
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

        {/* Mobile: cart + menu toggle */}
        <div className="flex lg:hidden items-center gap-4 ml-auto">
          <Link href="/cart" className="flex items-center gap-[7px] text-white p-1" onClick={close}>
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
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer p-0"
          >
            <motion.span
              variants={barVariants}
              animate={open ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              className="block w-5.5 h-[1.5px] bg-white"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5.5 h-[1.5px] bg-white"
            />
            <motion.span
              variants={barVariantsBottom}
              animate={open ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              className="block w-5.5 h-[1.5px] bg-white"
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-hairline bg-ground-alt"
          >
            <nav className="flex flex-col px-6 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="py-3 text-[15px] font-medium text-[#E8E8E8] border-b border-white/8 hover:text-lime transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-6 px-6 py-4">
              <Link
                href="/search"
                onClick={close}
                className="font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white hover:text-lime transition-colors"
              >
                Search
              </Link>
              <Link
                href="/account"
                onClick={close}
                className="font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white hover:text-lime transition-colors"
              >
                Account
              </Link>
            </div>
            <div className="px-6 pb-5">
              <Link
                href="/shop"
                onClick={close}
                className="block text-center bg-lime text-ground font-display font-extrabold text-[12.5px] tracking-[0.08em] uppercase px-5 py-3.5 hover:bg-lime-hover transition-colors"
              >
                Shop now →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
