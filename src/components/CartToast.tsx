"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-context";

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
            className="pointer-events-auto flex items-center gap-3 bg-card border border-lime/40 shadow-[0_8px_28px_rgba(0,0,0,0.55)] px-3.5 py-3"
          >
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
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
