"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import {
  clearPromo,
  generateOrderNumber,
  loadPromo,
  money,
  saveOrder,
} from "@/lib/orders";

const FREE_SHIPPING_THRESHOLD = 80;
const PROMO_RATE = 0.1;
const COUNTRIES = ["France", "Belgium", "Switzerland", "United States"];

type ShippingMethod = {
  key: "pickup" | "standard" | "express";
  label: string;
  eta: string;
  price: number;
  etaDays: [number, number];
};

const stepLabels = ["Bag", "Details", "Payment"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);

  const [methodIndex, setMethodIndex] = useState(1);
  const [payTab, setPayTab] = useState<"card" | "wallet">("card");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const [error, setError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const promo = loadPromo();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, not a React data source
    if (promo?.applied) setPromoApplied(true);
  }, []);

  const discount = promoApplied ? subtotal * PROMO_RATE : 0;
  const discountedSubtotal = subtotal - discount;

  const methods: ShippingMethod[] = useMemo(
    () => [
      { key: "pickup", label: "Pickup point", eta: "3-5 working days", price: 0, etaDays: [3, 5] },
      {
        key: "standard",
        label: "Standard delivery",
        eta: "2-4 working days",
        price: discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 6.9,
        etaDays: [2, 4],
      },
      { key: "express", label: "Express delivery", eta: "Next working day", price: 14.9, etaDays: [1, 1] },
    ],
    [discountedSubtotal]
  );

  const chosenMethod = methods[methodIndex];
  const total = Math.max(0, discountedSubtotal + chosenMethod.price);
  const vat = total - total / 1.2;
  const isEmpty = items.length === 0;

  function placeOrder() {
    if (isEmpty) {
      setError("Your bag is empty — add something before checking out.");
      return;
    }
    const missing =
      !email.includes("@") ||
      !first.trim() ||
      !last.trim() ||
      !street.trim() ||
      !zip.trim() ||
      !city.trim() ||
      (payTab === "card" && (card.replace(/\s/g, "").length < 12 || !exp.trim() || !cvc.trim()));

    if (missing) {
      setError("Fill in your contact, address and payment details to continue.");
      return;
    }
    setError("");

    const createdAt = new Date().toISOString();
    const order = {
      orderNumber: generateOrderNumber(),
      createdAt,
      items,
      subtotal,
      discount,
      discountLabel: promoApplied ? "Promo HUDA10" : null,
      shippingLabel: chosenMethod.label,
      shipping: chosenMethod.price,
      vat,
      total,
      email,
      phone,
      shippingAddress: { first, last, street, zip, city, country },
      etaDays: chosenMethod.etaDays,
    };

    saveOrder(order);
    clearPromo();
    clear();
    router.push("/order-confirmation");
  }

  return (
    <div className="font-body w-full">
      <Header />

      <div className="max-w-[1240px] mx-auto px-6 pt-6.5 pb-0">
        <div className="flex items-end justify-between gap-5.5 flex-wrap pb-5 border-b border-hairline">
          <div className="flex flex-col gap-3">
            <span className="w-13.5 h-[5px] bg-lime" />
            <h1 className="m-0 font-display italic font-black [font-stretch:84%] text-[clamp(30px,4.6vw,50px)] leading-[0.92] tracking-[-0.02em] uppercase text-white">
              Checkout
            </h1>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {stepLabels.map((label, i) => {
              const active = i > 0;
              return (
                <div
                  key={label}
                  className={`font-display font-extrabold text-[10.5px] tracking-[0.14em] uppercase px-3.5 py-2.5 border ${
                    active ? "border-lime bg-lime text-ground" : "border-white/16 bg-transparent text-[#BDBDBD]"
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="max-w-[1240px] mx-auto px-6 pt-6.5 pb-16 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8.5 items-start">
        <div className="flex flex-col gap-6.5">
          <div className="flex flex-col gap-3.5">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              1 · Contact
            </p>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
            <input
              type="tel"
              placeholder="Phone (for delivery updates)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              2 · Shipping address
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
              <input
                type="text"
                placeholder="First name"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className="min-w-0 bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
              />
              <input
                type="text"
                placeholder="Last name"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                className="min-w-0 bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
              />
            </div>
            <input
              type="text"
              placeholder="Street and number"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
            />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <input
                type="text"
                placeholder="Postal code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="min-w-0 bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="min-w-0 bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
              />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="min-w-0 bg-input border border-white/16 text-white text-sm px-3 py-3.5 outline-none focus:border-lime"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              3 · Delivery
            </p>
            {methods.map((m, i) => {
              const active = methodIndex === i;
              return (
                <button
                  key={m.key}
                  onClick={() => setMethodIndex(i)}
                  className={`flex items-center justify-between gap-4 w-full px-4 py-3.5 cursor-pointer text-left border text-white transition-colors ${
                    active ? "border-lime bg-lime/8" : "border-white/16 bg-[#101010]"
                  }`}
                >
                  <span className="flex flex-col gap-1 text-left">
                    <span className="font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase">
                      {m.label}
                    </span>
                    <span className="font-body font-medium text-[13px] opacity-75">{m.eta}</span>
                  </span>
                  <span className="font-display font-extrabold text-sm">
                    {m.price === 0 ? "Free" : money(m.price)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
              4 · Payment
            </p>
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  { key: "card" as const, label: "Card" },
                  { key: "wallet" as const, label: "Apple / Google Pay" },
                ]
              ).map((t) => {
                const active = payTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setPayTab(t.key)}
                    className={`font-display font-extrabold text-[10.5px] tracking-[0.14em] uppercase px-3.5 py-2.5 cursor-pointer border ${
                      active ? "border-lime bg-lime text-ground" : "border-white/16 bg-transparent text-[#BDBDBD]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            {payTab === "card" && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Card number"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  className="bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
                />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    className="min-w-0 bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="min-w-0 bg-input border border-white/16 text-white text-sm px-3.5 py-3.5 outline-none focus:border-lime placeholder:text-[#6E6E6E]"
                  />
                </div>
              </div>
            )}
            {payTab === "wallet" && (
              <p className="m-0 text-[13.5px] leading-[1.6] text-[#B0B0B0]">
                You&apos;ll confirm the payment in your wallet app after placing the order.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-1.5">
            <button
              onClick={placeOrder}
              className="bg-lime text-ground border-none font-display font-extrabold text-[13px] tracking-[0.1em] uppercase px-5.5 py-4.5 cursor-pointer flex items-center justify-center gap-2.5 hover:bg-lime-hover transition-colors"
            >
              Place order · {money(total)} <span className="text-[15px]">→</span>
            </button>
            <p className="m-0 text-[12.5px] text-[#FF8A8A] min-h-[18px]">{error}</p>
            <p className="m-0 text-xs leading-[1.6] text-[#8C8C8C]">
              By placing this order you accept our terms of service and return policy. Payments are
              encrypted end to end.
            </p>
          </div>
        </div>

        <aside className="bg-ground-alt border border-white/9 px-5.5 pt-6 pb-6.5 flex flex-col gap-4 sticky top-[90px]">
          <p className="m-0 font-display font-extrabold text-xs tracking-[0.16em] uppercase text-white">
            Your order · {items.reduce((t, i) => t + i.qty, 0)} items
          </p>

          {isEmpty ? (
            <p className="m-0 text-sm leading-[1.7] text-[#B0B0B0]">
              Your bag is empty.{" "}
              <Link href="/shop" className="text-lime hover:text-lime-hover">
                Go find something to wear
              </Link>
              .
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={`${item.slug}__${item.size}__${item.color}`}
                  className="grid grid-cols-[56px_minmax(0,1fr)_auto] gap-3 items-center"
                >
                  <div className="relative aspect-4/5 bg-[#121212] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#232323_0%,#141414_68%,#0B0B0B_100%)]" />
                    <div
                      className="absolute inset-0 bg-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
                      style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.focus }}
                    />
                  </div>
                  <div className="flex flex-col gap-[3px] min-w-0">
                    <p className="m-0 text-[13.5px] font-semibold text-[#F0F0F0] truncate">{item.name}</p>
                    <p className="m-0 text-[11px] tracking-[0.1em] uppercase text-[#8C8C8C]">
                      {item.color} · {item.size} · x{item.qty}
                    </p>
                  </div>
                  <p className="m-0 font-display font-extrabold text-sm text-white whitespace-nowrap">
                    {money(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2.5 pt-3.5 border-t border-white/12">
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">Subtotal</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">{money(subtotal)}</p>
            </div>
            {promoApplied && discount > 0 && (
              <div className="flex items-center justify-between gap-3.5">
                <p className="m-0 text-sm text-lime">Promo HUDA10</p>
                <p className="m-0 text-[14.5px] font-semibold text-lime">−{money(discount)}</p>
              </div>
            )}
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">{chosenMethod.label}</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">
                {chosenMethod.price === 0 ? "Free" : money(chosenMethod.price)}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3.5">
              <p className="m-0 text-sm text-[#B0B0B0]">VAT included</p>
              <p className="m-0 text-[14.5px] font-semibold text-white">{money(vat)}</p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3.5 pt-3.5 border-t border-white/12">
            <p className="m-0 font-display font-extrabold text-[13px] tracking-[0.14em] uppercase text-white">
              Total
            </p>
            <p className="m-0 font-display font-black text-2xl text-white">{money(total)}</p>
          </div>

          <p className="m-0 text-xs leading-[1.6] text-[#8C8C8C]">
            Need a team order?{" "}
            <Link href="/team-orders" className="text-lime hover:text-lime-hover">
              Request a quote
            </Link>{" "}
            instead of checking out.
          </p>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
