"use client";

import Image from "next/image";
import { useLanguage } from "@/context/language-context";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center text-center pt-10 sm:pt-14 md:pt-16 pb-0 overflow-hidden bg-white dark:bg-[#090d16] transition-colors border-b border-slate-200 dark:border-slate-800/80">
      {/* Top Center Content (Exact Typographic Hierarchy from CollectUI) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-5 z-10 pt-4 sm:pt-6">
        {/* Massive Elegant Italic Serif Headline */}
        <h1 className="font-editorial italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] tracking-tight text-slate-950 dark:text-white leading-[0.92] select-none">
          Oktavian Ramadhani
        </h1>

        {/* 2-Line Monospace Tracked Subtitle */}
        <div className="space-y-1 pt-2 sm:pt-3 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.24em] text-slate-600 dark:text-slate-400 uppercase font-medium">
          <p>
            {language === "id"
              ? "WEB DEVELOPER & APPLIED ML BUILDER"
              : "WEB DEVELOPER & APPLIED ML BUILDER"}
          </p>
          <p>
            {language === "id"
              ? "JEMBER, INDONESIA · FASILKOM UNIVERSITAS JEMBER"
              : "JEMBER, INDONESIA · CS AT UNIVERSITY OF JEMBER"}
          </p>
        </div>

        {/* Minimalist Boxed Button [ VIEW WORK ] */}
        <div className="pt-3 sm:pt-4">
          <a
            href="#projects"
            className="inline-block border border-slate-900 dark:border-white px-8 py-2.5 text-xs font-mono font-semibold tracking-[0.25em] text-slate-900 dark:text-white uppercase hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors duration-300 shadow-2xs"
          >
            {language === "id" ? "LIHAT KARYA" : "VIEW WORK"}
          </a>
        </div>
      </div>

      {/* Bottom Center Cutout Image Rising from Bottom (Exact Match to Reference) */}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-4 sm:mt-6 flex justify-center items-end pointer-events-none">
        <div className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[450px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
          <Image
            src="/profile-hero.png"
            alt="Oktavian Ramadhani"
            fill
            priority
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 440px, 480px"
          />
        </div>
      </div>
    </section>
  );
}
