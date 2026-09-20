"use client";

import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GraduationCap } from "lucide-react";

export default function AboutSection() {
  const { language } = useLanguage();

  const philosophy = language === "id" ? [
    {
      marker: "A",
      title: "Arsitektur & Integritas Sistem Lebih Dulu",
      description: "Saya merancang struktur basis data relasional (MySQL), otorisasi bertingkat (RBAC), dan model transaksi yang aman sebelum menulis baris kode antarmuka. Fondasi yang kuat menjamin keandalan sistem jangka panjang.",
    },
    {
      marker: "B",
      title: "Machine Learning Berbasis Bukti Empiris",
      description: "Bukan sekadar menjalankan skrip pelatihan, saya membangun pipeline Deep Learning (DenseNet-169 & EfficientNet) yang dievaluasi secara ketat dengan metrik riil (akurasi 99.92% pada 5.098 data uji).",
    },
    {
      marker: "C",
      title: "Solusi Nyata Berdampak ke Lapangan",
      description: "Teknologi terbaik adalah yang menyelesaikan masalah riil di masyarakat, seperti kemitraan dengan pembudidaya ikan nila di Jember untuk menekan angka mortalitas dan sistem pemantauan distribusi pupuk bersubsidi.",
    },
  ] : [
    {
      marker: "A",
      title: "Systems & Data Integrity First",
      description: "I architect relational schemas, strict RBAC authorization, and ACID transaction lifecycles before styling interfaces. Solid foundational data contracts guarantee long-term stability.",
    },
    {
      marker: "B",
      title: "Empirical & Verifiable Machine Learning",
      description: "Beyond running training scripts, I engineer end-to-end Deep Learning pipelines (DenseNet-169 & EfficientNet) validated against stringent metrics (99.92% test accuracy on 5,098 MRI scans).",
    },
    {
      marker: "C",
      title: "Grounded Impact on Real-World Challenges",
      description: "Software proves its worth when serving communities, such as partnering with local tilapia fish farmers in Jember to curb mortality rates and engineering transparent fertilizer quota systems.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Sandeep-style Section Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">01</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Tentang Saya" : "About Me"}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {language === "id" ? "Filosofi & Profil Rekayasa" : "Engineering Philosophy & Background"}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            {language === "id"
              ? "Menghubungkan arsitektur web yang terukur dengan model kecerdasan buatan terapan."
              : "Bridging resilient full-stack web architectures with applied artificial intelligence."}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {PERSONAL_INFO.bio[language]}
          </p>
        </div>

        {/* Split Grid: Photo on Left, Alphabetical Philosophy Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Authentic Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Oktavian Ramadhani"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top"
                priority
              />

              {/* Discreet Bottom Bar */}
              <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center justify-between">
                <span>Oktavian Ramadhani</span>
                <span className="text-slate-400 text-[11px]">Jember, Indonesia</span>
              </div>
            </div>

            {/* Academic Credentials Note */}
            <div className="pt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-200 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  {PERSONAL_INFO.faculty}
                </span>
              </div>
              <p className="pl-6 text-slate-500 font-mono text-[11px]">
                {PERSONAL_INFO.university} · Konsentrasi Rekayasa Perangkat Lunak &amp; Komputasi Cerdas
              </p>
            </div>
          </div>

          {/* Right Column: Cards A, B, C */}
          <div className="lg:col-span-7 space-y-4">
            {philosophy.map((item) => (
              <div
                key={item.marker}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-600 transition-colors space-y-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {item.marker}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Proof-of-Work Ribbon */}
            <div className="grid grid-cols-3 gap-3 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center sm:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  99.92%
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {language === "id" ? "Akurasi MRI" : "MRI Accuracy"}
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  21+
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {language === "id" ? "Repositori GitHub" : "Public Repos"}
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  Juara 1
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {language === "id" ? "Keamanan Server" : "Server Defense"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
