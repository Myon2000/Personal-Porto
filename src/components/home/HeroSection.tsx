"use client";

import { useLanguage } from"@/context/language-context";
import { PERSONAL_INFO } from"@/data/portfolio-data";
import HeroDotField from"./HeroDotField";
import { ArrowUpRight } from"lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative w-full border-b border-slate-200 bg-white transition-colors overflow-hidden select-none">
      {/* Interactive Dot Vortex Canvas */}
      <HeroDotField />

      {/* Unified Master Container: Same max-width and padding as all other sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col gap-12 sm:gap-16 lg:gap-20">
        {/* Subheader Status Row */}
        <div className="flex items-center justify-between text-xs font-mono tracking-[0.2em] uppercase text-slate-500">
          <span>PORTFOLIO &apos;26</span>
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#EA3826] animate-pulse" />
            <span>{PERSONAL_INFO.status[language]}</span>
          </div>
        </div>

        {/* Massive Left-Aligned Headline */}
        <div className="max-w-5xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[6.8rem] font-extrabold tracking-[-0.04em] text-slate-950 leading-[0.98]">
            {language === "id" ? (
              <>
                <span className="text-[#EA3826]">Rekayasa web</span> untuk sistem kompleks yang andal
              </>
            ) : (
              <>
                <span className="text-[#EA3826]">Web engineering</span> for complex systems that feel simple
              </>
            )}
          </h1>
        </div>

        {/* Bottom Footer Row: Bio on Left, Get in Touch on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-slate-100">
          <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed">
            {language === "id"
              ? "Pengembang web full-stack dan applied AI builder dari Universitas Jember yang berfokus pada arsitektur sistem terukur dan model Deep Learning terapan. Terbuka untuk peluang kerja & magang."
              : "Full-stack web developer and applied AI builder from University of Jember building scalable information architectures and applied Deep Learning models. Currently open to full-time roles & internships."}
          </p>

          <a
            href="/about#contact"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-[0.18em] uppercase font-bold text-slate-950 hover:text-[#EA3826] transition-colors shrink-0 group py-1"
          >
            <span>{language === "id" ? "HUBUNGI SAYA" : "GET IN TOUCH"}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#EA3826]" />
          </a>
        </div>
      </div>
    </section>
  );
}
