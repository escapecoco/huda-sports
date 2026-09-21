"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-context";

const MotionLink = motion.create(Link);

export function CartToastStack() {
  const { toasts, dismissToast } = useCart();

  return (
    <div className="fixed z-[60] bottom-4 right-4 left-4 sm:left-auto flex flex-col-reverse gap-2.5 pointer-events-none max-w-[360px] sm:ml-auto">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="pointer-events-auto flex flex-col bg-card border border-lime/40 shadow-[0_8px_28px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center gap-3 px-3.5 pt-3 pb-2.5">
              <div
                className="w-11 h-11 shrink-0 bg-cover bg-[#121212]"
                style={{ backgroundImage: `url(${t.image})`, backgroundPosition: t.focus }}
              />
              <div className="min-w-0 flex-1">
                <p className="m-0 font-display font-extrabold text-[10.5px] tracking-[0.14em] uppercase text-lime flex items-center gap-1.5">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 20 }}
                  >
                    ✓
                  </motion.span>
                  Added to cart
                </p>
                <p className="m-0 mt-0.5 text-[13.5px] font-semibold text-white truncate">{t.name}</p>
                <p className="m-0 text-[11.5px] text-ink-muted">
                  {t.color} · {t.size}
                  {t.qty > 1 ? ` · x${t.qty}` : ""}
                </p>
              </div>
              <button
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss"
                className="shrink-0 text-ink-muted hover:text-white transition-colors text-lg leading-none px-1 cursor-pointer bg-transparent border-none"
              >
                ×
              </button>
            </div>
            <div className="flex border-t border-white/10">
              <Link
                href="/cart"
                onClick={() => dismissToast(t.id)}
                className="flex-1 text-center py-2.5 font-display font-extrabold text-[10.5px] tracking-[0.1em] uppercase text-white hover:text-lime transition-colors border-r border-white/10"
              >
                View bag
              </Link>
              <MotionLink
                href="/checkout"
                onClick={() => dismissToast(t.id)}
                whileHover={{ backgroundColor: "#E4FF7A" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="flex-1 text-center py-2.5 bg-lime font-display font-extrabold text-[10.5px] tracking-[0.1em] uppercase text-ground"
              >
                Checkout →
              </MotionLink>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
