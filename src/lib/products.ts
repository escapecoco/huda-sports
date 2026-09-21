export type ProductTag = "New" | "Best seller" | "Team" | "Icon";
export type ProductCategory = "Men" | "Team";

export type ProductColor = { name: string; hex: string };

export type GalleryImage = { image: string; focus: string };

export type Product = {
  slug: string;
  name: string;
  price: number;
  mark: string;
  tag: ProductTag;
  category: ProductCategory;
  image: string;
  focus: string;
  badge?: string;
  description: string;
  gallery: GalleryImage[];
  colors: ProductColor[];
  sizes: string[];
  details: string;
  care: string;
};

export const TAG_COLORS: Record<ProductTag, string> = {
  New: "#C8F32B",
  "Best seller": "#FFFFFF",
  Team: "#8FE3E8",
  Icon: "#FFC53D",
};

const defaultColors: ProductColor[] = [
  { name: "Black", hex: "#141414" },
  { name: "Bone", hex: "#E8E2D6" },
  { name: "Lime", hex: "#C8F32B" },
];

const defaultSizes = ["XS", "S", "M", "L", "XL"];

const careCopy =
  "Wash cold inside out, no bleach, no tumble dry. Iron on the reverse and never directly on the print.";

export const products: Product[] = [
  {
    slug: "essential-t-shirt",
    name: "Essential T-Shirt",
    price: 34.9,
    mark: "HUDA",
    tag: "New",
    category: "Men",
    image: "/assets/brand-banner.jpg",
    focus: "center 34%",
    description:
      "The everyday HUDA tee. Mid-weight cotton, clean chest embroidery, a regular fit built to layer or wear alone.",
    gallery: [
      { image: "/assets/brand-banner.jpg", focus: "center 34%" },
      { image: "/assets/mens-collection.jpg", focus: "center 30%" },
      { image: "/assets/our-story.jpg", focus: "center 40%" },
      { image: "/assets/quote.jpg", focus: "center 60%" },
    ],
    colors: defaultColors,
    sizes: defaultSizes,
    details:
      "200gsm combed cotton, regular fit. Embroidered chest mark. Model is 1.82m wearing size L.",
    care: careCopy,
  },
  {
    slug: "oversized-tee",
    name: "Oversized Tee",
    price: 39.9,
    mark: "HUDA",
    tag: "Best seller",
    category: "Men",
    image: "/assets/mens-collection.jpg",
    focus: "center 24%",
    description:
      "Boxy, heavyweight and built to last. The Oversized Tee is the piece the whole community keeps reordering.",
    gallery: [
      { image: "/assets/mens-collection.jpg", focus: "center 30%" },
      { image: "/assets/quote.jpg", focus: "center 78%" },
      { image: "/assets/brand-banner.jpg", focus: "center 46%" },
      { image: "/assets/our-story.jpg", focus: "center 40%" },
    ],
    colors: defaultColors,
    sizes: defaultSizes,
    details:
      "220gsm combed cotton, boxy oversized cut with dropped shoulders. Embroidered chest mark. Model is 1.82m wearing size L.",
    care: careCopy,
  },
  {
    slug: "combat-ton-nafs-tee",
    name: "Combat Ton Nafs Tee",
    price: 37.9,
    mark: "CTN",
    tag: "Icon",
    category: "Men",
    image: "/assets/quote.jpg",
    focus: "center 60%",
    badge: "Icon piece",
    description:
      "Heavyweight 240gsm cotton tee with the Combat Ton Nafs back print. Boxy fit, ribbed collar, built to survive training and everything after it.",
    gallery: [
      { image: "/assets/mens-collection.jpg", focus: "center 34%" },
      { image: "/assets/quote.jpg", focus: "center 78%" },
      { image: "/assets/brand-banner.jpg", focus: "center 46%" },
      { image: "/assets/team-back-banner.jpg", focus: "center 52%" },
    ],
    colors: defaultColors,
    sizes: defaultSizes,
    details:
      "240gsm combed cotton, boxy oversized cut with dropped shoulders. Screen-printed back graphic, embroidered chest mark. Model is 1.82m wearing size L.",
    care: careCopy,
  },
  {
    slug: "team-tee",
    name: "Team Tee",
    price: 34.9,
    mark: "5KM",
    tag: "Team",
    category: "Team",
    image: "/assets/team-back-banner.jpg",
    focus: "center 46%",
    description:
      "The squad standard. Back-printed team mark, mid-weight cotton, built for training days and everything after.",
    gallery: [
      { image: "/assets/team-back-banner.jpg", focus: "center 45%" },
      { image: "/assets/team-collection.jpg", focus: "center 46%" },
      { image: "/assets/our-story.jpg", focus: "center 44%" },
      { image: "/assets/quote.jpg", focus: "center 60%" },
    ],
    colors: defaultColors,
    sizes: defaultSizes,
    details:
      "220gsm combed cotton, regular fit. Screen-printed back graphic. Model is 1.82m wearing size L.",
    care: careCopy,
  },
  {
    slug: "squad-training-tee",
    name: "Squad Training Tee",
    price: 32.9,
    mark: "5KM",
    tag: "Team",
    category: "Team",
    image: "/assets/team-collection.jpg",
    focus: "center 58%",
    description:
      "Lightweight training tee for reps that add up. Breathable cotton blend, tagless collar, squad mark on the chest.",
    gallery: [
      { image: "/assets/team-collection.jpg", focus: "center 46%" },
      { image: "/assets/team-back-banner.jpg", focus: "center 45%" },
      { image: "/assets/brand-banner.jpg", focus: "center 40%" },
      { image: "/assets/our-story.jpg", focus: "center 44%" },
    ],
    colors: defaultColors,
    sizes: defaultSizes,
    details:
      "190gsm cotton-poly blend, regular fit. Embroidered chest mark. Model is 1.82m wearing size L.",
    care: careCopy,
  },
  {
    slug: "coach-tee",
    name: "Coach Tee",
    price: 36.9,
    mark: "HUDA",
    tag: "New",
    category: "Men",
    image: "/assets/our-story.jpg",
    focus: "center 30%",
    description:
      "What's actually in the photo: a clean, heavyweight tee with a small coach's mark on the chest. No filler, just cotton that lasts.",
    gallery: [
      { image: "/assets/our-story.jpg", focus: "center 40%" },
      { image: "/assets/mens-collection.jpg", focus: "center 30%" },
      { image: "/assets/brand-banner.jpg", focus: "center 34%" },
      { image: "/assets/quote.jpg", focus: "center 60%" },
    ],
    colors: defaultColors,
    sizes: defaultSizes,
    details:
      "220gsm combed cotton, regular fit. Embroidered chest mark. Model is 1.82m wearing size L.",
    care: careCopy,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 2): Product[] {
  const current = getProduct(slug);
  return products
    .filter((p) => p.slug !== slug && (!current || p.category === current.category))
    .slice(0, count);
}

export function bestSellers(count = 4): Product[] {
  return products.slice(0, count);
}

export function byCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
