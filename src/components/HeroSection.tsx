"use client";

import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";
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

          {/* Visual Showcase Card with Profile Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md group">
              {/* Subtle ambient backplate glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-sky-500/5 to-transparent blur-lg -z-10 group-hover:from-sky-500/30 transition-all duration-500" />

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-sky-500" />
                    <span>oktavian ~ profile</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">UNEJ</span>
                </div>

                {/* Profile Photo Display */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <Image
                    src="/profile.jpg"
                    alt="Oktavian Ramadhani"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Floating Status Pill on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white shadow-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-mono tracking-tight">Oktavian Ramadhani</p>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium">
                        Web &amp; Applied ML
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      {language === "id"
                        ? "Mahasiswa Fasilkom UNEJ | Pengembang Model AI"
                        : "Computer Science at UNEJ | AI Model Builder"}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills Footer */}
                <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-wrap gap-1.5">
                  {["Next.js", "Python", "DenseNet-169", "PyTorch", "TypeScript", "PHP", "Linux"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs"
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
