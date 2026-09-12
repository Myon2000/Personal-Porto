"use client";

import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import { ArrowRight, Mail, Terminal, MapPin, GraduationCap } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{PERSONAL_INFO.status[language]}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-sky-600 dark:text-sky-400">
                {PERSONAL_INFO.roles[language]}
              </p>
            </div>

            {/* Bio summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {PERSONAL_INFO.bio[language]}
            </p>

            {/* Academic badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{PERSONAL_INFO.faculty}, {PERSONAL_INFO.university}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* CTAs & Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 min-h-[44px]"
              >
                <span>{language === "id" ? "Eksplorasi Proyek" : "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{language === "id" ? "Hubungi Saya" : "Get in Touch"}</span>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
                aria-label="Profil GitHub Myon2000"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="font-mono text-xs">@Myon2000</span>
              </a>
            </div>
          </div>

          {/* Visual Showcase Card (Interactive Tech Box) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-sky-500" />
                  <span>portfolio ~ oktavian</span>
                </div>
                <span className="text-xs font-mono text-slate-400">v2026</span>
              </div>

              {/* Code-like presentation */}
              <div className="p-6 space-y-4 font-mono text-xs sm:text-sm">
                <div className="space-y-1">
                  <p className="text-slate-400">{"// Personal Profile Core"}</p>
                  <p className="text-slate-900 dark:text-slate-100">
                    <span className="text-sky-600 dark:text-sky-400 font-semibold">const</span> engineer = &#123;
                  </p>
                  <p className="pl-4 text-slate-700 dark:text-slate-300">
                    name: <span className="text-emerald-600 dark:text-emerald-400">&apos;Oktavian Ramadhani&apos;</span>,
                  </p>
                  <p className="pl-4 text-slate-700 dark:text-slate-300">
                    domain: <span className="text-emerald-600 dark:text-emerald-400">&apos;myon.my.id&apos;</span>,
                  </p>
                  <p className="pl-4 text-slate-700 dark:text-slate-300">
                    disciplines: [
                    <span className="text-amber-600 dark:text-amber-400">&apos;Full-Stack Web&apos;</span>,
                    <span className="text-amber-600 dark:text-amber-400">&apos;Deep Learning&apos;</span>
                    ],
                  </p>
                  <p className="pl-4 text-slate-700 dark:text-slate-300">
                    recentModel: <span className="text-sky-600 dark:text-sky-400">&apos;DenseNet-169 (Alzheimer MRI)&apos;</span>,
                  </p>
                  <p className="pl-4 text-slate-700 dark:text-slate-300">
                    defensiveSecurity: <span className="text-emerald-600 dark:text-emerald-400">&apos;Juara 1 LAOS Arena&apos;</span>
                  </p>
                  <p className="text-slate-900 dark:text-slate-100">&#125;;</p>
                </div>

                {/* Tech Pills */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5 font-sans">
                  {["Next.js", "TypeScript", "Python", "PyTorch", "Tailwind CSS", "PHP", "Linux"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
