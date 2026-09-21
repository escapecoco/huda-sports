"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { formatDayOffset, loadOrder, money, type StoredOrder } from "@/lib/orders";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const EASE = [0.16, 1, 0.3, 1] as const;

type TimelineState = "done" | "active" | "next";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);

  useEffect(() => {
    const stored = loadOrder();
    if (!stored) {
      router.replace("/cart");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, not a React data source
    setOrder(stored);
  }, [router]);

  if (!order) {
    return (
      <div className="font-body w-full">
        <Header />
        <div className="max-w-[1240px] mx-auto px-6 py-24 text-center text-[#8C8C8C]">Loading your order…</div>
        <Footer />
      </div>
    );
  }

  const itemCount = order.items.reduce((t, i) => t + i.qty, 0);
  const etaFrom = formatDayOffset(order.createdAt, order.etaDays[0]);
  const etaTo = formatDayOffset(order.createdAt, order.etaDays[1]);
  const eta = etaFrom === etaTo ? etaFrom : `${etaFrom} – ${etaTo}`;

  const timeline: { label: string; date: string; state: TimelineState }[] = [
    { label: "Ordered", date: formatDayOffset(order.createdAt, 0), state: "active" },
    { label: "Packed", date: formatDayOffset(order.createdAt, 1), state: "next" },
    { label: "Shipped", date: formatDayOffset(order.createdAt, Math.max(1, order.etaDays[0] - 1)), state: "next" },
    { label: "Delivered", date: formatDayOffset(order.createdAt, order.etaDays[1]), state: "next" },
  ];

  return (
    <div className="font-body w-full">
      <Header />

      <section className="relative overflow-hidden border-b border-hairline/90 bg-ground-alt">
        <Image
          src="/assets/hero-group-crop.png"
          alt=""
          fill
          className="object-cover [object-position:center_26%] [filter:contrast(1.05)_brightness(0.62)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(96deg,#0A0A0A_0%,rgba(10,10,10,0.9)_32%,rgba(10,10,10,0.5)_62%,rgba(6,6,6,0.75)_100%)]" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 pt-14 pb-13 flex items-end justify-between gap-7.5 flex-wrap">
          <div className="flex flex-col gap-4 max-w-[46ch]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: EASE }}
              className="m-0 text-[11.5px] tracking-[0.3em] uppercase text-lime"
            >
              Order confirmed
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
              className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(34px,5.4vw,62px)] leading-[0.9] tracking-[-0.02em] uppercase text-white"
            >
              You&apos;re in
              <br />
              the squad
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
              className="w-[190px] h-3 bg-lime"
              style={{
                clipPath:
                  "polygon(0% 74%, 4% 40%, 18% 20%, 48% 8%, 78% 4%, 96% 10%, 100% 34%, 97% 62%, 80% 82%, 50% 92%, 22% 98%, 6% 96%)",
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="m-0 text-[15px] leading-[1.7] text-[#CFCFCF]"
            >
              Thanks {order.shippingAddress.first || "there"} — your order is paid and being picked. A
              confirmation is on its way to {order.email}.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
              className="flex gap-3.5 flex-wrap mt-1.5"
            >
              <Link
                href="/order-tracking"
                className="bg-lime text-ground font-display font-extrabold text-[13px] tracking-[0.1em] uppercase px-6 py-3.5 inline-flex items-center gap-2.5 hover:bg-lime-hover transition-colors"
              >
                Track my order <span className="text-[15px]">→</span>
              </Link>
              <Link
                href="/shop"
                className="bg-white text-ground font-display font-extrabold text-[13px] tracking-[0.1em] uppercase px-6 py-3.5 inline-flex items-center gap-2.5 hover:bg-lime transition-colors"
              >
                Continue shopping <span className="text-[15px]">→</span>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
            className="flex flex-col gap-3.5 bg-[rgba(6,6,6,0.72)] border border-white/14 px-6 py-5.5 min-w-[240px]"
          >
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Order number</p>
              <p className="m-0 font-display font-black text-[22px] text-white">{order.orderNumber}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Estimated delivery</p>
              <p className="m-0 text-[15px] font-semibold text-white">{eta}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="m-0 text-[11px] tracking-[0.16em] uppercase text-[#8C8C8C]">Total paid</p>
              <p className="m-0 font-display font-black text-[22px] text-lime">{money(order.total)}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-9 pb-5">
        <StaggerGroup className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3.5">
          {timeline.map((t) => {
            const on = t.state !== "next";
            return (
              <StaggerItem
                key={t.label}
                className={`flex flex-col gap-2 px-4 py-4.5 border ${
                  t.state === "active" ? "border-lime bg-lime/8" : "border-white/10 bg-card"
                } ${on ? "text-white" : "text-[#8C8C8C]"}`}
              >
                <span
                  className={`w-3 h-3 rounded-full block border-2 ${
                    on ? "bg-lime border-lime" : "bg-transparent border-white/30"
                  }`}
                />
                <p className="m-0 font-display font-extrabold text-[11.5px] tracking-[0.14em] uppercase">
                  {t.label}
                </p>
                <p className="m-0 text-[12.5px] opacity-72">{t.date}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <section className="max-w-[1240px] mx-auto px-6 pt-5.5 pb-15 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
        <Reveal className="flex flex-col gap-3.5">
          <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
            What you ordered ({itemCount})
          </p>
          {order.items.map((item) => (
            <article
              key={`${item.slug}__${item.size}__${item.color}`}
              className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-3.5 items-center bg-card border border-hairline p-3"
            >
              <div className="relative aspect-4/5 bg-[#121212] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#232323_0%,#141414_68%,#0B0B0B_100%)]" />
                <div
                  className="absolute inset-0 bg-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
                  style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.focus }}
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <Link
                  href={`/shop/${item.slug}`}
                  className="text-[14.5px] font-semibold text-[#F0F0F0] hover:text-lime transition-colors truncate"
                >
                  {item.name}
                </Link>
                <p className="m-0 text-[11.5px] tracking-[0.12em] uppercase text-[#8C8C8C]">
                  {item.color} · {item.size} · x{item.qty}
                </p>
              </div>
              <p className="m-0 font-display font-extrabold text-[15px] text-white whitespace-nowrap">
                {money(item.price * item.qty)}
              </p>
            </article>
          ))}
        </Reveal>

        <div className="flex flex-col gap-3.5">
          <Reveal className="bg-ground-alt border border-white/9 px-5.5 pt-5.5 pb-6 flex flex-col gap-3">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              Summary
            </p>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">Subtotal</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">{money(order.subtotal)}</p>
            </div>
            {order.discount > 0 && (
              <div className="flex items-center justify-between gap-3.5">
                <p className="m-0 text-sm text-lime">{order.discountLabel}</p>
                <p className="m-0 text-[14.5px] font-semibold text-lime">−{money(order.discount)}</p>
              </div>
            )}
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">{order.shippingLabel}</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">
                {order.shipping === 0 ? "Free" : money(order.shipping)}
              </p>
            </div>
            <div className="flex items-end justify-between gap-3.5 pt-3 border-t border-white/12">
              <p className="m-0 font-display font-extrabold text-[13px] tracking-[0.14em] uppercase text-white">
                Total paid
              </p>
              <p className="m-0 font-display font-black text-2xl text-white">{money(order.total)}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bg-ground-alt border border-white/9 px-5.5 py-5.5 flex flex-col gap-2.5">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              Shipping to
            </p>
            <p className="m-0 text-sm leading-[1.7] text-[#C4C4C4]">
              {order.shippingAddress.first} {order.shippingAddress.last}
              <br />
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.zip} {order.shippingAddress.city}
              <br />
              {order.shippingAddress.country}
            </p>
            <p className="m-0 mt-1.5 text-[12.5px] text-[#8C8C8C]">
              Wrong address?{" "}
              <Link href="/contact" className="text-lime hover:text-lime-hover">
                Contact us
              </Link>{" "}
              within 2 hours and we&apos;ll fix it.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="bg-lime text-ground px-5.5 py-6 flex flex-col gap-3">
            <p className="m-0 font-display italic font-black text-[22px] leading-none uppercase">
              Tag us when it lands
            </p>
            <p className="m-0 text-sm font-medium leading-[1.6]">
              Post your fit with #HUDASPORTS and we&apos;ll repost the best ones.
            </p>
            <Link
              href="/shop"
              className="self-start mt-1 bg-ground text-white font-display font-extrabold text-xs tracking-[0.1em] uppercase px-5 py-3.5 inline-flex items-center gap-2.5 hover:bg-[#1C1C1C] transition-colors"
            >
              Follow the crew <span className="text-sm">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
