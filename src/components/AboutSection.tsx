"use client";

import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GraduationCap, ShieldCheck, BrainCircuit, Users, Award } from "lucide-react";

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
      description: "Implementasi arsitektur Deep Learning DenseNet-169 untuk klasifikasi tingkat keparahan Alzheimer melalui citra MRI.",
    },
    {
      icon: ShieldCheck,
      title: "Keamanan Server & Sistem",
      description: "Juara 1 LAOS Arena dalam kompetisi ketahanan server terhadap serangan siber Denial of Service (DDOS).",
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
      description: "Implemented DenseNet-169 Deep Learning architecture to detect Alzheimer disease progression from brain MRI scans.",
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
    <section id="about" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>{language === "id" ? "Profil & Rekam Jejak" : "Profile & Background"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "id" ? "Membangun Solusi Digital yang Terukur" : "Engineering Scalable Digital Solutions"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "id"
              ? "Kombinasi kemampuan pengembangan aplikasi web fungsional dan penguasaan teknik komputasi Machine Learning."
              : "Bridging solid full-stack web engineering with practical Machine Learning model development."}
          </p>
        </div>

        {/* 2x2 Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
