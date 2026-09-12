"use client";

import { useLanguage } from "@/context/language-context";
import { ACHIEVEMENTS } from "@/data/portfolio-data";
import { Award, Trophy, Shield, Calendar, ShieldCheck, FileCheck } from "lucide-react";

export default function CertificatesSection() {
  const { language } = useLanguage();

  return (
    <section id="certificates" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>{language === "id" ? "Pengakuan & Prestasi" : "Honors & Credentials"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "id" ? "Sertifikasi & Kompetisi" : "Certifications & Competitions"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "id"
              ? "Bukti keikutsertaan kompetisi teknis, kejuaraan keamanan server, dan implementasi sistem perangkat lunak."
              : "Verifiable milestones across technical challenges, server defense competitions, and software implementations."}
          </p>
        </div>

        {/* Privacy Shield Notice */}
        <div className="mb-10 p-4 rounded-xl border border-sky-200/70 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-white">
              {language === "id" ? "Jaminan Keamanan Data:" : "Data Privacy Commitment:"}
            </strong>{" "}
            {language === "id"
              ? "Untuk melindungi privasi identitas (NIM dan tanda tangan pihak penerbit), dokumen asli disajikan melalui pencatatan metadata terverifikasi. Dokumen fisik lengkap dapat diberikan melalui kontak resmi."
              : "To protect personal data (such as student IDs and official signatures), credentials are presented via verified metadata. Complete physical documents are accessible via formal inquiry."}
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between ${
                item.isWinner
                  ? "border-amber-300/80 dark:border-amber-500/40 hover:border-amber-500"
                  : "border-slate-200 dark:border-slate-800 hover:border-sky-500/50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      item.isWinner
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.isWinner ? <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}
                    <span>{item.isWinner ? (language === "id" ? "Juara Kompetisi" : "Competition Winner") : (language === "id" ? "Sertifikat Resmi" : "Official Credential")}</span>
                  </span>

                  <div className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.title[language]}
                  </h3>
                  <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-medium">
                    {item.organizer}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description[language]}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono">{item.field}</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{language === "id" ? "Terverifikasi" : "Verified Record"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
