"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkerNote } from "@/components/MarkerNote";
import { CtaLink } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";
import { bestSellers } from "@/lib/products";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function scrollToVideo() {
    const target = document.getElementById("video");
    if (!target) return;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  }

  function playVideo() {
    const v = videoRef.current;
    if (!v) return;
    v.style.filter = "none";
    v.controls = true;
    const overlay = v.nextElementSibling as HTMLElement | null;
    if (overlay) overlay.style.display = "none";
    v.play();
  }

  return (
    <div className="font-body w-full">
      <Header />

      {/* Hero */}
      <section id="top" className="relative flex flex-wrap items-stretch bg-ground-alt border-b border-hairline/90">
        <div className="flex-[1_1_380px] z-10 px-7 py-13 pl-12 flex flex-col justify-center gap-4.5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(200,243,43,0.06)_0%,rgba(6,6,6,0)_58%)] pointer-events-none" />
          <p className="m-0 text-xs tracking-[0.42em] uppercase text-[#BFBFBF] relative">Move Belong Be More</p>
          <h1 className="m-0 font-display italic font-black [font-stretch:82%] text-[clamp(52px,8vw,104px)] leading-[0.86] tracking-[-0.02em] uppercase text-white relative">
            HUDA
            <br />
            Sports
          </h1>
          <div
            className="w-[220px] h-4 bg-lime relative"
            style={{ clipPath: "polygon(0% 62%, 8% 18%, 96% 0%, 100% 52%, 88% 100%, 4% 96%)" }}
          />
          <p className="mt-1.5 text-[18.5px] font-semibold leading-[1.35] max-w-[30ch] text-white relative">
            Streetwear &amp; performance essentials for a new generation.
          </p>
          <p className="text-[14.5px] leading-relaxed max-w-[36ch] text-[#ADADAD] relative">
            More than clothing. A mindset.
            <br />
            Built for those who move, create and belong to something bigger.
          </p>
          <div className="flex items-center gap-5.5 flex-wrap mt-2.5 relative">
            <CtaLink href="/shop">Shop now</CtaLink>
            <button
              onClick={scrollToVideo}
              className="flex items-center gap-3 bg-transparent border-none text-white cursor-pointer p-0"
            >
              <span className="w-10 h-10 border-[1.5px] border-white/70 rounded-full inline-flex items-center justify-center text-xs">
                ▶
              </span>
              <span className="font-display font-bold text-[12.5px] tracking-[0.1em] uppercase">Watch video</span>
            </button>
          </div>
        </div>

        <div className="flex-[1.45_1_460px] relative min-h-[430px] bg-ground-alt">
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(11% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
            <Image
              src="/assets/hero-group-crop.png"
              alt="HUDA Sports athletes"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover [object-position:center_30%] [filter:contrast(1.08)_saturate(1.08)_brightness(1.06)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(97deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.45)_9%,rgba(10,10,10,0)_24%)]" />
            <div
              className="absolute -top-[10%] left-[6%] w-[16%] h-[130%] bg-[linear-gradient(90deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]"
              style={{ transform: "skewX(-11deg)" }}
            />
            <div className="absolute top-0 right-0 w-[42%] h-[74%] bg-[linear-gradient(210deg,rgba(6,6,6,0.92)_0%,rgba(6,6,6,0.6)_30%,rgba(6,6,6,0.2)_56%,rgba(6,6,6,0)_78%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-[34%] bg-[linear-gradient(0deg,rgba(6,6,6,0.72)_0%,rgba(6,6,6,0)_100%)]" />
          </div>
          <MarkerNote lines={["Same", "people", "higher", "goals"]} className="absolute top-10 right-8.5" rotate={-9} />
        </div>
      </section>

      {/* Collection cards */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3.5 p-3.5 bg-ground">
        <div
          className="relative grid grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] min-h-[262px] overflow-hidden"
          style={{ background: "linear-gradient(105deg, #16220A 0%, #0E1207 46%, #0B0B0B 100%)" }}
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/mens-collection.jpg"
              alt="Men's collection"
              fill
              className="object-cover [object-position:center_32%] [filter:contrast(1.05)_brightness(1.02)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0)_66%,rgba(11,11,11,0.6)_100%)]" />
          </div>
          <div className="px-6.5 py-7.5 flex flex-col justify-center gap-3.5 relative">
            <div
              className="absolute -top-[12%] -left-[22%] w-[58%] h-[124%] bg-[linear-gradient(90deg,rgba(200,243,43,0.09)_0%,rgba(200,243,43,0)_100%)] pointer-events-none"
              style={{ transform: "skewX(-12deg)" }}
            />
            <h2 className="m-0 font-display font-extrabold text-[clamp(26px,3vw,34px)] leading-[1.02] text-white">
              Men&#8217;s
              <br />
              Collection
            </h2>
            <p className="m-0 text-[12.5px] tracking-[0.14em] uppercase text-[#C4C4C4] leading-[1.7] whitespace-nowrap">
              Clean style.
              <br />
              Real performance.
            </p>
            <CtaLink href="/men" variant="white" className="self-start mt-1.5 whitespace-nowrap">
              Shop men
            </CtaLink>
          </div>
        </div>

        <div
          className="relative grid grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] min-h-[262px] overflow-hidden"
          style={{ background: "linear-gradient(105deg, #0C1718 0%, #0A1011 46%, #0B0B0B 100%)" }}
        >
          <div className="relative overflow-hidden">
            <Image
              src="/assets/team-collection.jpg"
              alt="Team collection"
              fill
              className="object-cover [object-position:center_46%] [filter:contrast(1.05)_brightness(1.02)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0)_66%,rgba(11,11,11,0.6)_100%)]" />
          </div>
          <div className="px-6.5 py-7.5 flex flex-col justify-center gap-3.5 relative">
            <div
              className="absolute -top-[12%] -left-[22%] w-[58%] h-[124%] bg-[linear-gradient(90deg,rgba(120,220,220,0.07)_0%,rgba(120,220,220,0)_100%)] pointer-events-none"
              style={{ transform: "skewX(-12deg)" }}
            />
            <h2 className="m-0 font-display font-extrabold text-[clamp(26px,3vw,34px)] leading-[1.02] text-white">
              Team
              <br />
              Collection
            </h2>
            <p className="m-0 text-[12.5px] tracking-[0.14em] uppercase text-[#C4C4C4] leading-[1.7] whitespace-nowrap">
              Stronger
              <br />
              together.
            </p>
            <CtaLink href="/team" variant="white" className="self-start mt-1.5 whitespace-nowrap">
              Shop team
            </CtaLink>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground-alt border-y border-hairline/90">
        <div className="relative min-h-[380px] overflow-hidden">
          <Image
            src="/assets/our-story.jpg"
            alt="Team huddle"
            fill
            className="object-cover [object-position:center_44%] [filter:contrast(1.07)_saturate(1.08)_brightness(1.05)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.55)_0%,rgba(6,6,6,0)_26%,rgba(6,6,6,0)_72%,rgba(10,10,10,0.9)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-[46%] bg-[linear-gradient(0deg,rgba(6,6,6,0.82)_0%,rgba(6,6,6,0)_100%)]" />
          <div
            className="absolute -top-[10%] right-[16%] w-[13%] h-[130%] bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_100%)]"
            style={{ transform: "skewX(-11deg)" }}
          />
          <MarkerNote lines={["Good", "people", "better", "tomorrow"]} className="absolute bottom-11 left-7" rotate={-8} />
        </div>
        <div className="pl-12 pr-[150px] py-14.5 flex flex-col justify-center gap-5 relative max-[900px]:pr-8">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(32px,3.8vw,46px)] tracking-[-0.01em] uppercase text-white">
            Our Story
          </h2>
          <p className="m-0 text-[15px] leading-[1.72] text-[#C9C9C9] max-w-[44ch]">
            HUDA Sports is more than a clothing brand. It&#8217;s a community built on movement, discipline
            and self-belief. We create apparel for those who push their limits, support each other and
            turn ambition into action.
          </p>
          <p className="m-0 text-[15px] leading-[1.72] text-[#C9C9C9] max-w-[44ch]">
            From the streets to the field, HUDA Sports represents a new generation &#8212; united by
            purpose, driven by progress.
          </p>
          <div className="flex items-center gap-6.5 mt-3.5 flex-wrap">
            <Image
              src="/assets/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-auto brightness-[1.6] mix-blend-screen"
            />
            <div className="py-4 pl-6.5 pr-5.5 border-l border-white/22 border-t border-white/9 border-r border-white/9 border-b border-white/9 bg-white/[0.02]">
              <p className="m-0 font-display font-extrabold text-[26px] text-white leading-none">+100</p>
              <p className="mt-1.5 text-[11px] tracking-[0.16em] uppercase text-[#9E9E9E] leading-[1.5]">
                Athletes
                <br />
                in our community
              </p>
            </div>
          </div>
          <MarkerNote
            lines={["Move", "together", "grow", "together"]}
            className="absolute top-14 right-4.5 w-[120px]"
            rotate={-8}
          />
        </div>
      </section>

      {/* Best Sellers */}
      <section id="best-sellers" className="px-6 pt-13.5 pb-15 bg-ground">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex items-end justify-between gap-5 mb-6.5 flex-wrap">
            <div className="flex flex-col gap-2.5">
              <span className="w-13.5 h-[5px] bg-lime" />
              <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(28px,3.4vw,42px)] tracking-[-0.01em] uppercase text-white">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-display font-bold text-xs tracking-[0.1em] uppercase text-white border-b-2 border-lime pb-1 hover:text-lime transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3.5">
            {bestSellers(4).map((p) => (
              <ProductCard key={p.slug} product={p} aspect="square" />
            ))}
          </div>
        </div>
      </section>

      {/* More than a brand */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] bg-ground border-t border-hairline/90">
        <div className="relative min-h-[320px] overflow-hidden">
          <Image
            src="/assets/team-back-banner.jpg"
            alt="Team wearing Combat Ton Nafs tees"
            fill
            className="object-cover [object-position:center_45%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.75)_0%,rgba(6,6,6,0.05)_52%)]" />
          <MarkerNote
            lines={["Team", "discipline", "respect", "HUDA"]}
            className="absolute top-10 left-6.5"
            rotate={-8}
            align="left"
            swashWidth={96}
          />
        </div>
        <div className="bg-lime text-ground px-10 py-12 flex flex-col justify-center gap-4.5">
          <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(28px,3.4vw,40px)] leading-[0.98] uppercase">
            More
            <br />
            than a brand
          </h2>
          <p className="m-0 text-[15px] font-medium leading-[1.65] max-w-[40ch]">
            A community. A mindset. A movement. HUDA Sports is for those who believe in better days and
            put in the work.
          </p>
          <CtaLink href="/shop" variant="dark" className="self-start mt-2">
            Shop the collection
          </CtaLink>
        </div>
      </section>

      {/* Quote */}
      <section className="relative min-h-[300px] bg-ground-alt border-t border-hairline/90 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-[36%] right-[17%] bg-cover [filter:contrast(1.05)_brightness(0.92)]"
          style={{
            backgroundImage: "url(/assets/mens-collection.jpg)",
            backgroundPosition: "center 26%",
            WebkitMaskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 26%, #000 48%, rgba(0,0,0,0.8) 74%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 26%, #000 48%, rgba(0,0,0,0.8) 74%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0A0A_0%,rgba(10,10,10,0.9)_24%,rgba(10,10,10,0.1)_46%,rgba(10,10,10,0.35)_100%)] pointer-events-none" />
        <div
          className="absolute -top-[12%] left-[30%] w-[14%] h-[124%] bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_100%)] pointer-events-none"
          style={{ transform: "skewX(-11deg)" }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 pl-12 py-13 flex items-center justify-between gap-7 min-h-[300px] flex-wrap">
          <div className="flex flex-col gap-3.5 max-w-[460px]">
            <p className="m-0 font-display font-black text-[58px] leading-[0.55] text-white">&#8220;</p>
            <p className="m-0 text-[clamp(23px,2.7vw,32px)] font-semibold leading-[1.24] text-white max-w-[24ch] text-pretty">
              Discipline today builds a stronger tomorrow.
            </p>
            <div className="flex items-center gap-3.5 mt-2.5">
              <span className="w-9.5 h-0.5 bg-white" />
              <span className="font-display font-black text-[15px] tracking-[-0.01em] uppercase text-white">HUDA</span>
              <span className="font-body italic font-medium text-[15px] text-white -ml-2">Sports</span>
            </div>
          </div>
          <MarkerNote
            lines={["Same", "mindset", "different", "level"]}
            className="shrink-0"
            rotate={-9}
            align="left"
          />
        </div>
      </section>

      {/* Video */}
      <section id="video" className="px-6 pt-14 pb-15 bg-ground border-t border-hairline/90">
        <div className="max-w-[1240px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 items-center">
          <div className="relative bg-card border border-white/10 overflow-hidden aspect-video">
            <video
              ref={videoRef}
              src="/assets/huda-video.mp4"
              poster="/assets/brand-banner.jpg"
              playsInline
              preload="metadata"
              className="w-full h-full block object-cover [filter:grayscale(0.5)_brightness(0.5)] bg-card"
            />
            <div
              onClick={playVideo}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4.5 cursor-pointer bg-black/20"
            >
              <span className="w-[62px] h-[62px] rounded-full bg-white/92 text-ground inline-flex items-center justify-center text-[19px] pl-1">
                ▶
              </span>
              <p className="m-0 font-display font-extrabold text-[13.5px] tracking-[0.14em] uppercase text-white">
                Click to play
              </p>
              <p className="-mt-1.5 text-[11px] tracking-[0.14em] uppercase text-[#B0B0B0]">
                Training. Team. Lifestyle.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 relative">
            <div className="flex items-start justify-between gap-5">
              <span className="w-13.5 h-[5px] bg-lime" />
              <div className="flex gap-3 items-center flex-wrap">
                {["Instagram", "TikTok", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#video"
                    aria-label={s}
                    className="font-display font-extrabold text-[11px] tracking-[0.14em] text-white uppercase hover:text-lime transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <h2 className="m-0 font-display italic font-black [font-stretch:85%] text-[clamp(26px,3.2vw,38px)] leading-none uppercase text-white">
              Our moments
              <br />
              in action
            </h2>
            <p className="m-0 text-[15px] leading-[1.7] text-[#B8B8B8] max-w-[42ch]">
              Training. Team. Lifestyle. Press play and see the HUDA Sports story — training, team and
              lifestyle.
            </p>
            <button
              onClick={playVideo}
              className="self-start mt-1.5 bg-white text-ground border-none font-display font-extrabold text-[12.5px] tracking-[0.1em] uppercase px-5.5 py-3.5 cursor-pointer inline-flex items-center gap-2.5 hover:bg-lime transition-colors"
            >
              Play the film <span className="text-sm">→</span>
            </button>
            <MarkerNote
              lines={["Stay connected", "stay in motion"]}
              className="mt-4.5 self-end"
              rotate={-6}
              swashWidth={120}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
