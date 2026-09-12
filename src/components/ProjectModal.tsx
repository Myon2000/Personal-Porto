"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { ProjectItem } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Database,
  ShieldCheck,
  Users,
  Calendar,
  Activity,
} from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const isSiPuBi = project.id === "sipubi";
  const isNilaHealth = project.id === "nila-health";
  const isKlinik = project.id === "web-klinik-gigi";
  const isLeaveSystem = project.id === "leave-system";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              {project.badge[language]}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase">{project.category}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Title and Intro */}
          <div className="space-y-2">
            <h3 id="modal-project-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description[language]}
            </p>
          </div>

          {/* Interactive Flow / Architecture Diagram */}
          {isSiPuBi && (
            <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                  <Layers className="w-4 h-4 text-sky-500" />
                  <span>{language === "id" ? "Alur Verifikasi Distribusi Pupuk Subsidi" : "Subsidized Fertilizer Distribution Workflow"}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  {language === "id" ? "Terverifikasi Resmi" : "Officially Certified"}
                </span>
              </div>

              {/* Step by step interactive workflow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    1
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Petani Terdaftar</p>
                  <p className="text-[11px] text-slate-500 font-sans">Validasi NIK dan kelompok tani penerima alokasi kuota.</p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    2
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Pengecekan Kuota</p>
                  <p className="text-[11px] text-slate-500 font-sans">Verifikasi sisa jatah pupuk (Urea, NPK) secara real-time.</p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    3
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Tebus Kios Resmi</p>
                  <p className="text-[11px] text-slate-500 font-sans">Penebusan tercatat pada outlet distributor resmi wilayah.</p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    4
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Audit &amp; Laporan</p>
                  <p className="text-[11px] text-slate-500 font-sans">Rekapitulasi otomatis neraca penyaluran untuk dinas terkait.</p>
                </div>
              </div>

              {/* Technical Specifications Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Database className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Relational Data Integrity:</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Mencegah selisih pencatatan distribusi pupuk dan manipulasi data kuota ganda.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Role-Based Access Control:</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Pemisahan wewenang antara Admin Wilayah, Pengelola Kios, dan Auditor Pemerintah.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isNilaHealth && (
            <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                  <Activity className="w-4 h-4 text-sky-500" />
                  <span>{language === "id" ? "Arsitektur Layanan Fasilitas Kesehatan Terpadu" : "Integrated Healthcare Services Architecture"}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold">
                  TypeScript + Blade
                </span>
              </div>

              {/* Service Pipeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-bold">
                    <Users className="w-4 h-4" />
                    <span>Portal Pasien</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {language === "id"
                      ? "Pencarian fasilitas kesehatan terdekat, jadwal poliklinik aktif, dan pendaftaran mandiri."
                      : "Healthcare facility locator, active polyclinic schedule, and patient self-registration."}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Calendar className="w-4 h-4" />
                    <span>Antrean &amp; Jadwal</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {language === "id"
                      ? "Estimasi waktu tunggu tindakan medis dan nomor antrean terotomatisasi."
                      : "Automated queue number assignment and medical examination waiting time estimation."}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                    <Database className="w-4 h-4" />
                    <span>Dashboard Tenaga Medis</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {language === "id"
                      ? "Pencatatan riwayat anamnesa, resep obat, dan resume medis terstruktur."
                      : "Structured medical intake records, prescription logs, and clinical summary."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isKlinik && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>{language === "id" ? "Modul Operasional Klinik Digital (Paperless)" : "Paperless Dental Clinic Operations"}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "id"
                  ? "Sistem dirancang untuk meniadakan rekam medis kertas, mengelola waktu tunggu tindakan dokter gigi secara efisien, serta merekam riwayat odontogram pasien."
                  : "Engineered to eliminate paper-based logs, streamline dental appointment waiting times, and track patient dental records digitally."}
              </p>
            </div>
          )}

          {isLeaveSystem && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>{language === "id" ? "Alur Otorisasi & Kuota Cuti Karyawan" : "Leave Authorization & Quota Lifecycle"}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "id"
                  ? "Pengajuan cuti online terintegrasi dengan validasi sisa kuota tahunan, alur persetujuan bertingkat oleh atasan langsung dan HRD, serta laporan rekap absensi otomatis."
                  : "Integrated leave filing with automatic quota calculations, multi-tier manager approval flows, and centralized HR attendance reporting."}
              </p>
            </div>
          )}

          {/* Highlights List */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {language === "id" ? "Fitur Utama & Keunggulan Rekayasa:" : "Key Engineering Highlights:"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.highlights[language].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {language === "id" ? "Teknologi yang Digunakan:" : "Technologies Employed:"}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[38px]"
          >
            {language === "id" ? "Tutup Pratinjau" : "Close Preview"}
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs min-h-[38px]"
          >
            <GithubIcon className="w-4 h-4" />
            <span>{language === "id" ? "Lihat Source Code di GitHub" : "View Source Code on GitHub"}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
