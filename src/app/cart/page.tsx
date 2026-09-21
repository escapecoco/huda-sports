"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { money, savePromo } from "@/lib/orders";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const FREE_SHIPPING_THRESHOLD = 80;
const STANDARD_SHIPPING = 6.9;
const PROMO_CODE = "HUDA10";
const PROMO_RATE = 0.1;

export default function CartPage() {
  const { items, count, subtotal, removeItem, setQty } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [codeNote, setCodeNote] = useState("");

  const isEmpty = items.length === 0;
  const discount = applied ? subtotal * PROMO_RATE : 0;
  const discountedSubtotal = subtotal - discount;
  const shipping = isEmpty ? 0 : discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = Math.max(0, discountedSubtotal + shipping);
  const toFree = FREE_SHIPPING_THRESHOLD - discountedSubtotal;
  const progressPct = Math.min(100, Math.max(0, (discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const freeShipNote = isEmpty
    ? "free shipping over $80"
    : toFree > 0
      ? `${money(toFree)} to free shipping`
      : "free shipping unlocked";

  function applyCode() {
    if (isEmpty) {
      setApplied(false);
      setCodeNote("Add something to your bag first.");
      return;
    }
    const ok = code.trim().toUpperCase() === PROMO_CODE;
    setApplied(ok);
    setCodeNote(ok ? "HUDA10 applied — 10% off." : "That code isn't valid.");
    if (ok) {
      savePromo({ code: PROMO_CODE, applied: true });
    } else {
      savePromo({ code: code.trim().toUpperCase(), applied: false });
    }
  }

  return (
    <div className="font-body w-full">
      <Header />

      <Reveal className="max-w-[1240px] mx-auto px-6 pt-6.5 pb-0">
        <p className="m-0 mb-4 text-[11.5px] tracking-[0.24em] uppercase text-[#8C8C8C]">
          <Link href="/" className="text-[#8C8C8C] hover:text-lime transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="text-[#8C8C8C] hover:text-lime transition-colors">
            Shop
          </Link>{" "}
          / <span className="text-[#E0E0E0]">Cart</span>
        </p>
        <div className="flex items-end justify-between gap-5.5 flex-wrap pb-5.5 border-b border-hairline">
          <div className="flex flex-col gap-3">
            <span className="w-13.5 h-[5px] bg-lime" />
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(32px,5vw,54px)] leading-[0.92] tracking-[-0.02em] uppercase text-white">
              Your bag
            </h1>
          </div>
          <p className="m-0 text-xs tracking-[0.14em] uppercase text-[#8C8C8C]">
            {count} items · {freeShipNote}
          </p>
        </div>
      </Reveal>

      <section className="max-w-[1240px] mx-auto px-6 pt-6.5 pb-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
        <div className="flex flex-col gap-3.5">
        <StaggerGroup className="flex flex-col gap-3.5">
          {items.map((item) => {
            const lineTotal = item.price * item.qty;
            return (
              <StaggerItem key={`${item.slug}__${item.size}__${item.color}`}>
                <article className="grid grid-cols-[104px_minmax(0,1fr)] gap-4 bg-card border border-hairline p-3.5">
                  <div className="relative aspect-4/5 bg-[#121212] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#232323_0%,#141414_68%,#0B0B0B_100%)]" />
                    <div
                      className="absolute inset-0 bg-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
                      style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.focus }}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 min-w-0">
                    <div className="flex items-start justify-between gap-3.5">
                      <div className="flex flex-col gap-[5px] min-w-0">
                        <Link
                          href={`/shop/${item.slug}`}
                          className="text-[15px] font-semibold text-[#F0F0F0] hover:text-lime transition-colors truncate"
                        >
                          {item.name}
                        </Link>
                        <p className="m-0 text-[11.5px] tracking-[0.12em] uppercase text-[#8C8C8C]">
                          {item.color} · {item.size}
                        </p>
                      </div>
                      <p className="m-0 font-display font-extrabold text-[16px] text-white whitespace-nowrap">
                        {money(lineTotal)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3.5 flex-wrap mt-auto">
                      <div className="flex items-center border border-white/16 bg-[#101010]">
                        <motion.button
                          onClick={() =>
                            setQty(item.slug, item.size, item.color, Math.max(1, item.qty - 1))
                          }
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-10 bg-transparent border-none text-white text-base cursor-pointer"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </motion.button>
                        <span className="min-w-[30px] text-center font-display font-extrabold text-sm text-white">
                          {item.qty}
                        </span>
                        <motion.button
                          onClick={() =>
                            setQty(item.slug, item.size, item.color, Math.min(9, item.qty + 1))
                          }
                          whileTap={{ scale: 0.9 }}
                          className="w-9 h-10 bg-transparent border-none text-white text-base cursor-pointer"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => removeItem(item.slug, item.size, item.color)}
                        whileTap={{ scale: 0.9 }}
                        className="bg-transparent border-none p-0 cursor-pointer font-display font-extrabold text-[11px] tracking-[0.14em] uppercase text-[#8C8C8C] border-b border-white/20 hover:text-lime hover:border-lime transition-colors"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="flex flex-col gap-3.5">
          {isEmpty && (
            <Reveal className="border border-hairline bg-card px-7 py-11.5 flex flex-col items-start gap-4">
              <p className="m-0 font-display italic font-black text-[26px] uppercase text-white">
                Your bag is empty
              </p>
              <p className="m-0 text-[14.5px] leading-[1.7] text-[#B0B0B0] max-w-[40ch]">
                Nothing in here yet. Start with the pieces the whole squad wears.
              </p>
              <Link
                href="/shop"
                className="bg-lime text-ground font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase px-5.5 py-3.5 inline-flex items-center gap-2.5 hover:bg-lime-hover transition-colors"
              >
                Shop the collection <span className="text-sm">→</span>
              </Link>
            </Reveal>
          )}

          <Link
            href="/shop"
            className="self-start mt-1.5 font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase text-white border-b-2 border-lime pb-1 hover:text-lime transition-colors"
          >
            ← Continue shopping
          </Link>
        </div>
        </div>

        <Reveal delay={0.12} className="bg-ground-alt border border-white/9 px-6 pt-6.5 pb-7 flex flex-col gap-4.5 sticky top-[90px]">
          <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
            Order summary
          </p>

          {!isEmpty && (
            <div className="flex flex-col gap-1.5">
              <div className="h-[5px] bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-lime"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <p className="m-0 text-[11.5px] text-[#9E9E9E]">
                {toFree > 0 ? `${money(toFree)} away from free shipping` : "Free shipping unlocked"}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">Subtotal</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">{money(subtotal)}</p>
            </div>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">Shipping</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">
                {isEmpty ? "—" : shipping === 0 ? "Free" : money(shipping)}
              </p>
            </div>
            {applied && discount > 0 && !isEmpty && (
              <div className="flex items-center justify-between gap-3.5">
                <p className="m-0 text-sm text-lime">Promo HUDA10</p>
                <p className="m-0 text-[14.5px] font-semibold text-lime">−{money(discount)}</p>
              </div>
            )}
          </div>

          {!isEmpty && (
            <div className="flex flex-col gap-2 pt-4 border-t border-white/12">
              <p className="m-0 font-display font-extrabold text-[11.5px] tracking-[0.16em] uppercase text-white">
                Promo code
              </p>
              <div className="flex gap-0">
                <input
                  type="text"
                  placeholder="HUDA10"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 min-w-0 bg-input border border-white/16 text-white text-[13px] tracking-[0.1em] uppercase px-3 py-3 outline-none focus:border-lime"
                />
                <button
                  onClick={applyCode}
                  className="bg-white border-none text-ground font-display font-extrabold text-[11.5px] tracking-[0.12em] uppercase px-4 cursor-pointer hover:bg-lime transition-colors"
                >
                  Apply
                </button>
              </div>
              <p className="m-0 text-xs text-lime min-h-[17px]">{codeNote}</p>
            </div>
          )}

          <div className="flex items-end justify-between gap-3.5 pt-4 border-t border-white/12">
            <p className="m-0 font-display font-extrabold text-[13px] tracking-[0.14em] uppercase text-white">
              Total
            </p>
            <p className="m-0 font-display font-black text-2xl text-white">{money(total)}</p>
          </div>

          <Link
            href={isEmpty ? "/shop" : "/checkout"}
            className={`font-display font-extrabold text-[13px] tracking-[0.1em] uppercase px-5 py-4.5 flex items-center justify-center gap-2.5 text-ground ${
              isEmpty ? "bg-white hover:bg-lime" : "bg-lime hover:bg-lime-hover"
            } transition-colors`}
          >
            {isEmpty ? "Shop the collection" : "Proceed to checkout"} <span className="text-[15px]">→</span>
          </Link>
          <p className="m-0 text-xs leading-[1.6] text-[#8C8C8C]">
            Taxes calculated at checkout. Free shipping over $80 · 30-day returns.
          </p>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
