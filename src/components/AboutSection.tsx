"use client";

import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import {
  GraduationCap,
  ShieldCheck,
  BrainCircuit,
  Users,
  MapPin,
  ArrowRight,
  Mail,
} from "lucide-react";

export default function AboutSection() {
  const { language } = useLanguage();

  const highlights = language === "id" ? [
    {
      icon: GraduationCap,
      title: "Pendidikan Akademik",
      description: "Fakultas Ilmu Komputer, Universitas Jember dengan konsentrasi pada rekayasa perangkat lunak dan komputasi cerdas.",
    },
    {
      icon: BrainCircuit,
      title: "Riset Terapan Machine Learning",
      description: "Implementasi arsitektur Deep Learning DenseNet-169 untuk klasifikasi tingkat keparahan Alzheimer melalui citra MRI (99.92% akurasi).",
    },
    {
      icon: ShieldCheck,
      title: "Keamanan Server & Sistem",
      description: "Juara 1 LAOS Arena dalam kompetisi ketahanan server Linux terhadap serangan siber Denial of Service (DDOS).",
    },
    {
      icon: Users,
      title: "Kepemimpinan & Organisasi",
      description: "Ketua Pelaksana Informatics Olympiad 2025 dan pengurus aktif Himpunan Mahasiswa Informatika selama 2 periode.",
    },
  ] : [
    {
      icon: GraduationCap,
      title: "Academic Background",
      description: "Faculty of Computer Science, University of Jember, focusing on software engineering and applied artificial intelligence.",
    },
    {
      icon: BrainCircuit,
      title: "Applied Machine Learning",
      description: "Implemented DenseNet-169 Deep Learning architecture to detect Alzheimer disease progression from brain MRI scans (99.92% accuracy).",
    },
    {
      icon: ShieldCheck,
      title: "Server Security & Defense",
      description: "1st Place winner in LAOS Arena server defense challenge handling simulated Denial of Service (DDOS) traffic.",
    },
    {
      icon: Users,
      title: "Leadership & Impact",
      description: "Project Lead for Informatics Olympiad 2025 and two-term executive board member in Informatics Student Association.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Pinterest "A LITTLE ABOUT ME" Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Oktavian Ramadhani"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover object-top"
              />

              {/* Minimalist Corner Location Tag */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white shadow-md flex items-center justify-between text-xs font-mono">
                <span>Oktavian Ramadhani</span>
                <span className="text-slate-300 text-[11px]">Jember, ID</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Proof-of-Work */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-slate-500 dark:text-slate-400">
                  {language === "id" ? "A Little About Me" : "A Little About Me"}
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 max-w-xs" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {language === "id"
                  ? "Membangun Solusi Digital & Model Komputasi yang Terukur"
                  : "Engineering Scalable Digital Systems & Applied AI"}
              </h2>
            </div>

            {/* Curated Bio */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {PERSONAL_INFO.bio[language]}
            </p>

            {/* Academic Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                <span>{PERSONAL_INFO.faculty}, {PERSONAL_INFO.university}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Proof-of-Work Credibility Ribbon */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-200 dark:border-slate-800 text-center sm:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  99.92%
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {language === "id" ? "Akurasi DenseNet-169" : "DenseNet-169 Accuracy"}
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  21+
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {language === "id" ? "Repositori GitHub" : "Public Repositories"}
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  Juara 1
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  {language === "id" ? "Keamanan Server LAOS" : "LAOS Server Defense"}
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs sm:text-sm tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs min-h-[44px]"
              >
                <span>{language === "id" ? "Eksplorasi Proyek" : "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>{language === "id" ? "Hubungi Saya" : "Get in Touch"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Key Highlight Pillars */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-slate-500 dark:text-slate-400">
              {language === "id" ? "Pilar Fokus & Kompetensi" : "Key Competency Pillars"}
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:border-slate-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
