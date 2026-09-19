"use client";

import { useLanguage } from "@/context/language-context";
import { ArrowRight, Mail } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 bg-white dark:bg-[#090d16] transition-colors border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Top Status Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {language === "id"
            ? "Portofolio '26 · Terbuka untuk Peluang Kerja & Magang"
            : "Portfolio '26 · Open to Work & Internship Roles"}
        </span>
      </div>

      {/* Main Center Editorial Typography Block */}
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 my-auto">
        {/* Massive Serif Italic Name */}
        <h1 className="font-editorial italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] tracking-tight text-slate-950 dark:text-white leading-[0.92] select-none">
          Oktavian Ramadhani
        </h1>

        {/* 2-Line Monospace Tracked Subtitle */}
        <div className="space-y-1.5 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.22em] text-slate-600 dark:text-slate-400 uppercase font-medium">
          <p>
            {language === "id"
              ? "FULL-STACK WEB DEVELOPER & APPLIED AI BUILDER"
              : "FULL-STACK WEB DEVELOPER & APPLIED AI BUILDER"}
          </p>
          <p className="text-slate-500 dark:text-slate-500">
            {language === "id"
              ? "JEMBER, INDONESIA · FASILKOM UNIVERSITAS JEMBER"
              : "JEMBER, INDONESIA · CS AT UNIVERSITY OF JEMBER"}
          </p>
        </div>

        {/* Summary Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {language === "id"
            ? "Membangun sistem web terdistribusi yang terukur dan pipeline model Deep Learning terapan. Berpengalaman dalam Computer Vision, arsitektur backend andal, serta rekayasa perangkat lunak berdampak nyata."
            : "Engineering scalable web applications and applied Deep Learning classification pipelines. Experienced in Computer Vision, reliable backend architectures, and mission-critical software delivery."}
        </p>

        {/* Minimalist Boxed Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 sm:pt-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 border border-slate-950 dark:border-white px-7 sm:px-8 py-3 text-xs font-mono font-semibold tracking-[0.22em] text-slate-950 dark:text-white uppercase hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all duration-300 shadow-2xs min-h-[44px]"
          >
            <span>{language === "id" ? "LIHAT KARYA" : "VIEW SELECTED WORK"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-800 px-6 sm:px-7 py-3 text-xs font-mono font-medium tracking-[0.22em] text-slate-700 dark:text-slate-300 uppercase hover:border-slate-900 dark:hover:border-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors duration-200 min-h-[44px]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{language === "id" ? "HUBUNGI SAYA" : "GET IN TOUCH"}</span>
          </a>
        </div>
      </div>

      {/* Bottom Mouse Scroll Down Indicator */}
      <div className="pt-8">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none group"
          aria-label={language === "id" ? "Gulir ke bawah ke bagian Tentang" : "Scroll down to About section"}
        >
          <div className="w-5 h-8 rounded-full border border-slate-400 dark:border-slate-600 group-hover:border-slate-800 dark:group-hover:border-slate-300 flex justify-center pt-1.5 transition-colors">
            <div className="w-1 h-2 rounded-full bg-slate-500 dark:bg-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-white animate-bounce" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase">
            {language === "id" ? "Gulir ke bawah" : "Scroll down"}
          </span>
        </a>
      </div>
    </section>
  );
}
