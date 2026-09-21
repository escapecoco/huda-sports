import type { Metadata } from "next";
import { Archivo, Barlow, Sedgwick_Ave } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartToastStack } from "@/components/CartToast";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const sedgwickAve = Sedgwick_Ave({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "HUDA Sports — Move Belong Be More",
  description:
    "Streetwear & performance essentials for a new generation. HUDA Sports — a youth athletic apparel and community brand.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${barlow.variable} ${sedgwickAve.variable}`}
    >
      <body className="min-h-screen bg-ground text-white font-body antialiased">
        <CartProvider>
          {children}
          <CartToastStack />
        </CartProvider>
      </body>
    </html>
  );
}
