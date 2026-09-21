"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { TAG_COLORS, type Product } from "@/lib/products";

export function ProductCard({
  product,
  aspect = "portrait",
}: {
  product: Product;
  aspect?: "square" | "portrait";
}) {
  const { addItem } = useCart();

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: product.sizes[1] ?? product.sizes[0],
      color: product.colors[0].name,
      image: product.image,
      focus: product.focus,
    });
  }

  return (
    <article className="bg-card border border-hairline flex flex-col transition-[border-color,transform] duration-200 hover:border-lime/55 hover:-translate-y-[3px]">
      <Link href={`/shop/${product.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-[#121212] ${
            aspect === "square" ? "aspect-square" : "aspect-4/5"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#232323_0%,#141414_68%,#0B0B0B_100%)]" />
          <div
            className="absolute inset-0 bg-cover [filter:contrast(1.06)_saturate(1.04)_brightness(1.02)]"
            style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.focus }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.32)_0%,rgba(6,6,6,0)_38%,rgba(6,6,6,0.5)_100%)]" />
          <span
            className="absolute top-2.5 left-2.5 text-ground font-display font-extrabold text-[9.5px] tracking-[0.14em] uppercase px-2.5 py-[5px]"
            style={{ background: TAG_COLORS[product.tag] }}
          >
            {product.tag}
          </span>
          <p className="absolute bottom-2.5 left-3 m-0 font-display font-black text-[13px] tracking-[0.06em] uppercase text-white/90">
            {product.mark}
          </p>
        </div>
      </Link>
      <div className="p-3.5 pb-4 flex flex-col gap-2.5 flex-1">
        <Link
          href={`/shop/${product.slug}`}
          className="text-[14px] font-semibold text-[#F0F0F0] hover:text-lime transition-colors"
        >
          {product.name}
        </Link>
        {aspect === "portrait" && (
          <p className="text-[11.5px] tracking-[0.12em] uppercase text-[#8C8C8C]">{product.category}</p>
        )}
        <div className="flex gap-1.5 flex-wrap">
          {product.sizes
            .filter((s) => ["S", "M", "L", "XL"].includes(s))
            .map((sz) => (
              <span
                key={sz}
                className="text-[10.5px] font-semibold tracking-[0.08em] text-[#9A9A9A] border border-white/14 px-[7px] py-[3px]"
              >
                {sz}
              </span>
            ))}
        </div>
        <div className="flex items-center justify-between gap-3 mt-auto">
          <p className="font-display font-extrabold text-[16px] text-white">${product.price.toFixed(2)}</p>
          <button
            onClick={quickAdd}
            className="w-[38px] h-[38px] bg-lime border-none text-ground text-[15px] cursor-pointer inline-flex items-center justify-center hover:bg-lime-hover transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            🛒
          </button>
        </div>
      </div>
    </article>
  );
}
