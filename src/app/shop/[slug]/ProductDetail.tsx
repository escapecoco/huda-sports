"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useCart } from "@/lib/cart-context";
import { getRelated, type Product } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

const shippingCopy =
  "Free standard shipping over $80. Dispatched within 48 hours, 2-4 working days in metro areas. Unworn items can be returned within 30 days.";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();

  const [photoIndex, setPhotoIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [openRow, setOpenRow] = useState(0);
  const [sizeNote, setSizeNote] = useState("");

  const related = getRelated(product.slug);
  const activePhoto = product.gallery[photoIndex] ?? product.gallery[0];
  const activeColor = product.colors[colorIndex] ?? product.colors[0];

  const rows = [
    { title: "Details & fit", body: product.details },
    { title: "Shipping & returns", body: shippingCopy },
    { title: "Care", body: product.care },
  ];

  function handleAddToCart() {
    if (!size) {
      setSizeNote("Pick a size first.");
      return;
    }
    addItem(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        size,
        color: activeColor.name,
        image: activePhoto.image,
        focus: activePhoto.focus,
      },
      qty
    );
    setSizeNote(`Added — size ${size}, ${qty} pc.`);
  }

  return (
    <div className="font-body w-full">
      <Header />

      <div className="max-w-[1240px] mx-auto px-6 pt-5.5 pb-2">
        <p className="m-0 text-[11.5px] tracking-[0.24em] uppercase text-[#8C8C8C]">
          <Link href="/" className="hover:text-lime transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:text-lime transition-colors">
            Shop
          </Link>{" "}
          / <span className="text-[#E0E0E0]">{product.name}</span>
        </p>
      </div>

      <section className="max-w-[1240px] mx-auto px-6 pt-3.5 pb-15 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 items-start">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <div className="relative aspect-4/5 bg-[#121212] border border-hairline overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#232323_0%,#141414_68%,#0B0B0B_100%)]" />
            <div
              className="absolute inset-0 bg-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
              style={{ backgroundImage: `url(${activePhoto.image})`, backgroundPosition: activePhoto.focus }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.22)_0%,rgba(6,6,6,0)_34%,rgba(6,6,6,0.4)_100%)]" />
            {product.badge && (
              <span className="absolute top-3.5 left-3.5 bg-[#FFC53D] text-ground font-display font-extrabold text-[10px] tracking-[0.14em] uppercase px-2.5 py-1.5">
                {product.badge}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((g, i) => (
              <motion.button
                key={i}
                onClick={() => setPhotoIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                whileTap={{ scale: 0.92 }}
                className={`aspect-square p-0 cursor-pointer bg-cover border transition-[filter,border-color] ${
                  photoIndex === i ? "border-lime brightness-[1.04]" : "border-white/12 brightness-[0.72]"
                }`}
                style={{ backgroundImage: `url(${g.image})`, backgroundPosition: g.focus }}
              />
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="flex flex-col gap-5 pt-1"
        >
          <div className="flex flex-col gap-3">
            <span className="w-13.5 h-[5px] bg-lime" />
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(30px,4vw,46px)] leading-[0.96] tracking-[-0.01em] uppercase text-white">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <p className="m-0 font-display font-extrabold text-[26px] text-white">
                ${product.price.toFixed(2)}
              </p>
              <p className="m-0 text-xs tracking-[0.14em] uppercase text-[#8C8C8C]">
                In stock &middot; ships in 48h
              </p>
            </div>
            <p className="m-0 text-[15px] leading-[1.7] text-[#B8B8B8] max-w-[44ch]">{product.description}</p>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="m-0 font-display font-extrabold text-[11.5px] tracking-[0.16em] uppercase text-white">
              Color &middot; {activeColor.name}
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {product.colors.map((c, i) => (
                <motion.button
                  key={c.name}
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  whileTap={{ scale: 0.92 }}
                  className="w-8.5 h-8.5 rounded-full cursor-pointer"
                  style={{
                    background: c.hex,
                    border: `2px solid ${colorIndex === i ? "#C8F32B" : "rgba(255,255,255,0.22)"}`,
                    boxShadow: colorIndex === i ? "0 0 0 3px rgba(200,243,43,0.18)" : "none",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 font-display font-extrabold text-[11.5px] tracking-[0.16em] uppercase text-white">
                Size
              </p>
              <Link href="/size-guide" className="text-[11.5px] tracking-[0.12em] uppercase text-lime hover:text-lime-hover transition-colors">
                Size guide
              </Link>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((sz) => (
                <motion.button
                  key={sz}
                  onClick={() => {
                    setSize(sz);
                    setSizeNote("");
                  }}
                  whileTap={{ scale: 0.92 }}
                  className={`min-w-13 px-2.5 py-3.25 cursor-pointer font-display font-extrabold text-xs tracking-[0.08em] border transition-colors ${
                    size === sz
                      ? "border-lime bg-lime text-ground"
                      : "border-white/16 bg-transparent text-[#DCDCDC] hover:border-white/40"
                  }`}
                >
                  {sz}
                </motion.button>
              ))}
            </div>
            <p className="mt-0.5 mb-0 text-[12.5px] text-lime min-h-4.25">{sizeNote}</p>
          </div>

          <div className="flex gap-3 flex-wrap items-stretch">
            <div className="flex items-center border border-white/16 bg-input">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-11 h-13 bg-transparent border-none text-white text-lg cursor-pointer"
              >
                &minus;
              </button>
              <span className="min-w-8.5 text-center font-display font-extrabold text-[15px] text-white">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                aria-label="Increase quantity"
                className="w-11 h-13 bg-transparent border-none text-white text-lg cursor-pointer"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[220px] h-13 bg-lime hover:bg-lime-hover text-ground border-none font-display font-extrabold text-[13px] tracking-[0.1em] uppercase cursor-pointer inline-flex items-center justify-center gap-2.5 transition-colors"
            >
              Add to cart <span className="text-[15px]">&rarr;</span>
            </button>
          </div>
          <p className="-mt-1.5 mb-0 text-[12.5px] tracking-[0.1em] uppercase text-[#8C8C8C]">
            Free shipping over $80 &middot; 30-day returns
          </p>

          <div className="flex flex-col border-t border-white/10 mt-1.5">
            {rows.map((row, i) => {
              const open = openRow === i;
              return (
                <div key={row.title} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenRow((s) => (s === i ? -1 : i))}
                    className="w-full bg-transparent border-none py-4 px-0.5 flex items-center justify-between gap-3.5 cursor-pointer text-white font-display font-extrabold text-xs tracking-[0.14em] uppercase text-left"
                  >
                    {row.title} <span className="text-base text-lime">{open ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="m-0 px-0.5 pb-4.5 text-sm leading-[1.7] text-[#B0B0B0] max-w-[52ch]">
                          {row.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Print it for your team */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90">
        <Reveal className="relative min-h-[300px] overflow-hidden">
          <Image
            src="/assets/team-back-banner.jpg"
            alt="Team wearing HUDA prints"
            fill
            className="object-cover [object-position:center_42%] [filter:contrast(1.05)_brightness(0.96)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.66)_0%,rgba(6,6,6,0)_36%,rgba(6,6,6,0.2)_100%)]" />
          <MarkerNote
            lines={["Worn", "by the", "whole", "squad"]}
            className="absolute top-9 left-6.5"
            rotate={-8}
            align="left"
            swashWidth={120}
          />
        </Reveal>
        <Reveal delay={0.12} className="bg-lime text-ground px-10 py-12 flex flex-col justify-center gap-4.5">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] leading-[0.98] uppercase">
            Print it
            <br />
            for your team
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.65] max-w-[40ch]">
            Add names, numbers or your club crest on this tee. Ten pieces minimum, two-week turnaround.
          </p>
          <CtaLink href="/team-orders" variant="dark" className="self-start mt-2">
            Request a quote
          </CtaLink>
        </Reveal>
      </section>

      {/* Complete the fit */}
      {related.length > 0 && (
        <section className="px-6 pt-13.5 pb-15.5 bg-ground border-t border-hairline/90">
          <div className="max-w-[1240px] mx-auto">
            <Reveal className="flex items-end justify-between gap-5 mb-6.5 flex-wrap">
              <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] tracking-[-0.01em] uppercase text-white">
                Complete the fit
              </h2>
              <Link
                href="/shop"
                className="font-display font-bold text-xs tracking-[0.1em] uppercase text-white border-b-2 border-lime pb-1 hover:text-lime transition-colors"
              >
                Shop all &rarr;
              </Link>
            </Reveal>
            <StaggerGroup className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3.5">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProductCard product={p} aspect="portrait" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
