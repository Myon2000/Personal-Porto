"use client";

import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import { Mail, Globe, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-between pt-16 pb-10 sm:pt-24 sm:pb-12 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#090d16] transition-colors">
      {/* Top / Center Hero Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-auto text-center space-y-6">
        {/* Minimalist Monospace Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-mono tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{PERSONAL_INFO.status[language]}</span>
        </div>

        {/* Massive Bold Center Typography - Inspired by Pinterest "WIZARD" Hero */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white uppercase">
            {PERSONAL_INFO.name}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400 tracking-wide">
            {PERSONAL_INFO.roles[language]}
          </p>
        </div>

        {/* Subtle Tagline Mission Statement */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {language === "id"
            ? "Fakultas Ilmu Komputer, Universitas Jember. Berfokus pada rekayasa sistem web terdistribusi dan model komputasi Deep Learning terapan."
            : "Faculty of Computer Science, University of Jember. Focused on scalable web architectures and applied Deep Learning solutions."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs sm:text-sm tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs min-h-[44px]"
          >
            <span>{language === "id" ? "Profil & Pengalaman" : "About & Experience"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
          >
            <span>{language === "id" ? "Lihat Proyek" : "View Projects"}</span>
          </a>
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-4 pt-4 text-slate-500 dark:text-slate-400">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="GitHub Myon2000"
            title="GitHub @Myon2000"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Kirim Email"
            title={PERSONAL_INFO.email}
          >
            <Mail className="w-5 h-5" />
          </a>

          <a
            href={`https://${PERSONAL_INFO.domain}`}
            className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Domain Pribadi"
            title={PERSONAL_INFO.domain}
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Mouse Scroll Down Indicator (Iconic Pinterest Template Element) */}
      <div className="pt-6 text-center">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none group"
          aria-label={language === "id" ? "Gulir ke bawah ke bagian Tentang" : "Scroll down to About section"}
        >
          {/* Animated Mouse Outline */}
          <div className="w-5 h-8 rounded-full border-2 border-slate-400 dark:border-slate-600 group-hover:border-slate-800 dark:group-hover:border-slate-300 flex justify-center pt-1.5 transition-colors">
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
