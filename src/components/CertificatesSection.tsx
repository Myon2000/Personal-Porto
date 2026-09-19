"use client";

import { useLanguage } from "@/context/language-context";
import { ACHIEVEMENTS, EXPERIENCES } from "@/data/portfolio-data";
import { Trophy, Award, Calendar, ShieldCheck, FileCheck } from "lucide-react";

export default function CertificatesSection() {
  const { language } = useLanguage();

  return (
    <section
      id="credentials"
      className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Sandeep-style Section Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">04</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Pengakuan & Rekam Jejak" : "Honors & Credentials"}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {language === "id" ? "Verifikasi & Kepemimpinan" : "Verified Milestones & Leadership"}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            {language === "id"
              ? "Bukti kejuaraan teknis, sertifikasi sistem, dan kepemimpinan organisasi."
              : "Verifiable milestones in technical competitions, systems delivery, and student leadership."}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            {language === "id"
              ? "Pengakuan objektif atas kompetensi pertahanan siber, algoritma, serta komitmen tata kelola organisasi skala fakultas."
              : "Objective verification of server security defenses, algorithmic performance, and organizational governance at the university level."}
          </p>
        </div>

        {/* Privacy Shield Notice */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono text-[11px] sm:text-xs">
            <strong className="text-slate-900 dark:text-white">
              {language === "id" ? "Jaminan Keamanan Data Privasi:" : "Data Privacy Guarantee:"}
            </strong>{" "}
            {language === "id"
              ? "Guna melindungi privasi identitas penerbit dan mahasiswa (NIM & tanda tangan resmi), dokumen fisik lengkap disimpan aman dan dapat diverifikasi melalui komunikasi formal."
              : "To protect confidential credentials (student IDs and official signatures), credentials are presented via verified metadata records. Full physical documents are available upon formal inquiry."}
          </p>
        </div>

        {/* Honors Grid: H. 01 to H. 04 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
              {language === "id" ? "Kompetisi & Sertifikasi Resmi" : "Competitions & Formal Credentials"}
            </span>
            <span className="font-mono text-xs text-slate-400">4 {language === "id" ? "Penghargaan" : "Awards"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      H. 0{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                        item.isWinner
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {item.isWinner ? (
                        <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Award className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      )}
                      <span>
                        {item.isWinner
                          ? language === "id"
                            ? "Juara Kompetisi"
                            : "Winner"
                          : language === "id"
                          ? "Sertifikat Resmi"
                          : "Credential"}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.title[language]}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {item.organizer} · {item.year}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {item.description[language]}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>{item.field[language]}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{language === "id" ? "Terverifikasi" : "Verified"}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Organizational Track */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
              {language === "id" ? "Pengalaman Kepemimpinan & Organisasi" : "Leadership & Governance Roles"}
            </span>
            <span className="font-mono text-xs text-slate-400">Fasilkom UNEJ</span>
          </div>

          <div className="space-y-4">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {exp.role[language]}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period[language]}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {exp.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
