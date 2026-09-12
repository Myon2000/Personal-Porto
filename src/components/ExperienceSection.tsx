"use client";

import { useLanguage } from "@/context/language-context";
import { EXPERIENCES } from "@/data/portfolio-data";
import { Calendar } from "lucide-react";

export default function ExperienceSection() {
  const { language } = useLanguage();

  return (
    <section id="experience" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>{language === "id" ? "Kepemimpinan & Organisasi" : "Leadership & Community"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "id" ? "Pengalaman Kolaborasi & Manajemen" : "Collaborative & Management Experience"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "id"
              ? "Kiprah aktif dalam mengelola tim kepanitiaan, tata kelola organisasi mahasiswa, dan pelaksanaan acara skala besar."
              : "Active contribution in leading event committees, student organization governance, and high-impact campus initiatives."}
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="max-w-3xl mx-auto space-y-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-sky-500/40 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {exp.role[language]}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-sky-600 dark:text-sky-400 font-medium">
                    {exp.organization}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period[language]}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {exp.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
