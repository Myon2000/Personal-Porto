"use client";

import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import HeroDotField from "./HeroDotField";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-12 sm:pb-16 bg-white dark:bg-[#090d16] transition-colors border-b border-slate-200 dark:border-slate-800 overflow-hidden select-none">
      {/* Interactive Dot Vortex Canvas (z-0 in front of background, behind z-10 text) */}
      <HeroDotField />

      {/* Subheader Status Row (relative z-10) */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 pt-2 sm:pt-4">
        <span>PORTFOLIO &apos;26</span>
        <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
          <span className="w-2 h-2 rounded-full bg-[#EA3826] animate-pulse" />
          <span>{PERSONAL_INFO.status[language]}</span>
        </div>
      </div>

      {/* Massive Left-Aligned Headline (relative z-10) */}
      <div className="relative z-10 max-w-5xl my-auto py-12 sm:py-16">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white leading-[0.98]">
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

      {/* Bottom Footer Row: Bio on Left, Get in Touch on Right (relative z-10) */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
        <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          {language === "id"
            ? "Pengembang web full-stack dan applied AI builder dari Universitas Jember yang berfokus pada arsitektur sistem terukur dan model Deep Learning terapan. Terbuka untuk peluang kerja & magang."
            : "Full-stack web developer and applied AI builder from University of Jember building scalable information architectures and applied Deep Learning models. Currently open to full-time roles & internships."}
        </p>

        <a
          href="/about#contact"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-[0.18em] uppercase font-bold text-slate-950 dark:text-white hover:text-[#EA3826] dark:hover:text-[#EA3826] transition-colors shrink-0 group py-1"
        >
          <span>{language === "id" ? "HUBUNGI SAYA" : "GET IN TOUCH"}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#EA3826]" />
        </a>
      </div>
    </section>
  );
}
