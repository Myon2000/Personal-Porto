"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  Eye,
} from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const SIPUBI_SCREENSHOTS = [
  {
    id: "dashboard",
    title: {
      id: "Dashboard Petani",
      en: "Farmer Dashboard",
    },
    url: "127.0.0.1:8000/dashboard",
    image: "/projects/sipubi/dashboard.png",
    description: {
      id: "Ringkasan metrik kuota pupuk aktif, total pengajuan, status persetujuan, dan notifikasi kegiatan pertanian.",
      en: "Overview of active fertilizer quota metrics, total requests, approval status, and agricultural notifications.",
    },
  },
  {
    id: "kuota",
    title: {
      id: "Detail Kuota Pribadi",
      en: "Personal Quota Detail",
    },
    url: "127.0.0.1:8000/quotas",
    image: "/projects/sipubi/kuota-pribadi.png",
    description: {
      id: "Monitoring sisa alokasi kuota pupuk bersubsidi (Urea 600 kg, NPK 450 kg, Organik) dan stok gudang terdekat.",
      en: "Real-time monitoring of subsidized fertilizer quotas (Urea 600kg, NPK 450kg, Organic) and warehouse stocks.",
    },
  },
  {
    id: "stok",
    title: {
      id: "Stok Pupuk Gudang",
      en: "Warehouse Fertilizer Stock",
    },
    url: "127.0.0.1:8000/fertilizers",
    image: "/projects/sipubi/stok-gudang.png",
    description: {
      id: "Informasi ketersediaan riil pupuk bersubsidi dengan indikator batas aman minimum dan tombol alur penebusan.",
      en: "Real-time warehouse inventory levels with safe minimum threshold indicators and purchase redemption flows.",
    },
  },
  {
    id: "lahan",
    title: {
      id: "Peta & Verifikasi Lahan",
      en: "GIS Map & Land Verification",
    },
    url: "127.0.0.1:8000/profile",
    image: "/projects/sipubi/profile-map.png",
    description: {
      id: "Pemetaan spasial koordinat lahan tani via Leaflet/OpenStreetMap dan verifikasi dokumen KTP sebelum kuota cair.",
      en: "Geographic spatial mapping of farm coordinates via Leaflet/OpenStreetMap and citizen ID verification.",
    },
  },
];

interface NilaPrediction {
  id: string;
  title: { id: string; en: string };
  image: string;
  historyImage?: string;
  disease: string;
  categoryType: string;
  confidence: string;
  severity: { id: string; en: string };
  symptom: { id: string; en: string };
  treatment: { id: string; en: string };
}

const NILAHEALTH_PREDICTIONS: NilaPrediction[] = [
  {
    id: "pred1",
    title: {
      id: "Streptococcosis (98.2%)",
      en: "Streptococcosis (98.2%)",
    },
    image: "/projects/nilahealth/streptococcosis.jpg",
    disease: "Streptococcosis",
    categoryType: "Bakteri (Streptococcus agalactiae)",
    confidence: "98.2%",
    severity: {
      id: "Tinggi (High Risk)",
      en: "High Risk",
    },
    symptom: {
      id: "Mata menonjol (exophthalmia), pembengkakan rongga perut (dropsy), dan pendarahan di pangkal sirip.",
      en: "Exophthalmia (pop-eye), abdominal dropsy, and hemorrhages around fin bases.",
    },
    treatment: {
      id: "Isolasi ikan sakit, berikan antibiotik spektrum luas sesuai dosis dinas, dan tingkatkan aerasi oksigen kolam.",
      en: "Isolate symptomatic fish, administer broad-spectrum antibiotics, and increase dissolved oxygen aeration.",
    },
  },
  {
    id: "pred2",
    title: {
      id: "Columnaris Disease (96.8%)",
      en: "Columnaris Disease (96.8%)",
    },
    image: "/projects/nilahealth/columnaris.jpg",
    disease: "Columnaris Disease",
    categoryType: "Bakteri (Flavobacterium columnare)",
    confidence: "96.8%",
    severity: {
      id: "Menengah (Moderate)",
      en: "Moderate",
    },
    symptom: {
      id: "Lesi putih menyerupai kapas di punggung (saddleback), erosi sirip (fin rot), serta kerusakan filamen insang.",
      en: "Cotton-like white lesions on skin, dorsal fin erosion (fin rot), and necrotic gill filaments.",
    },
    treatment: {
      id: "Kuras lumpur dasar kolam, ganti air 40-50%, dan lakukan perendaman larutan garam (NaCl 1-3%) atau oxytetracycline.",
      en: "Siphon bottom sludge, perform 40-50% water exchange, and apply salt immersion (NaCl) or oxytetracycline bath.",
    },
  },
  {
    id: "pred3",
    title: {
      id: "Normal Nile Tilapia (99.1%)",
      en: "Normal Nile Tilapia (99.1%)",
    },
    image: "/projects/nilahealth/normal.jpg",
    disease: "Normal Nile Tilapia",
    categoryType: "Ikan Sehat (Kontrol Normal)",
    confidence: "99.1%",
    severity: {
      id: "Kondisi Sehat",
      en: "Healthy Condition",
    },
    symptom: {
      id: "Morfologi ikan prima, sisik utuh berkilau, refleks renang gesit, dan bebas dari lesi atau pendarahan eksternal.",
      en: "Intact reflective scales, active swimming reflex, clear cornea, and zero external lesions or hemorrhages.",
    },
    treatment: {
      id: "Kondisi optimal. Pertahankan jadwal pemberian pakan berbobot dan pembersihan berkala tambak.",
      en: "Optimal condition. Maintain regular feeding schedule and periodic water exchange cycles.",
    },
  },
  {
    id: "eval",
    title: {
      id: "Confusion Matrix & Metrik",
      en: "Confusion Matrix & Metrics",
    },
    image: "/projects/nilahealth/confusion_matrix.png",
    historyImage: "/projects/nilahealth/training_history.png",
    disease: "Model Evaluation Report",
    categoryType: "EfficientNet CNN Metrics",
    confidence: "6 Classes",
    severity: {
      id: "Evaluasi Empiris",
      en: "Empirical Evaluation",
    },
    symptom: {
      id: "Matriks konfusi riil dan kurva akurasi/loss pelatihan model EfficientNet pada klasifikasi 6 kondisi ikan nila.",
      en: "Empirical Confusion Matrix and training accuracy/loss curves for the EfficientNet tilapia classifier.",
    },
    treatment: {
      id: "Model dilatih hingga konvergen dengan evaluasi seimbang antar kelas penyakit untuk menekan false negative.",
      en: "Model trained to optimal convergence with balanced evaluation across classes to minimize false negatives.",
    },
  },
];

const NILA_CLASSES = [
  {
    name: "Streptococcosis",
    type: "Bakteri (Streptococcus)",
    sop: "Antibiotik spektrum luas, isolasi ikan sakit, dan perbaikan aerasi.",
  },
  {
    name: "Columnaris Disease",
    type: "Bakteri (Flavobacterium)",
    sop: "Ganti air kolam 50%, kuras lumpur, dan gunakan oxytetracycline.",
  },
  {
    name: "Motile Aeromonad (MAS)",
    type: "Bakteri (Aeromonas)",
    sop: "Enrofloxacin terukur pada pakan, kurangi pakan sisa, dan pantau amonia.",
  },
  {
    name: "Tilapia Lake Virus (TiLV)",
    type: "Virus Patogen",
    sop: "Karantina ketat, pakan berimunostimulan, dan desinfeksi perlengkapan tambak.",
  },
  {
    name: "Parasitic Diseases",
    type: "Parasit (Trichodina)",
    sop: "Perendaman garam dapur (NaCl) 1-3% atau formalin terukur.",
  },
  {
    name: "Normal Nile Tilapia",
    type: "Ikan Sehat (Kontrol)",
    sop: "Kondisi ikan prima, sisik cerah, dan refleks aktif. Lanjutkan SOP pakan rutin.",
  },
];

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language } = useLanguage();
  const [activeSipubiTab, setActiveSipubiTab] = useState(SIPUBI_SCREENSHOTS[0].id);
  const [activeNilaTab, setActiveNilaTab] = useState(NILAHEALTH_PREDICTIONS[0].id);

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

  const currentSipubiScreen =
    SIPUBI_SCREENSHOTS.find((s) => s.id === activeSipubiTab) || SIPUBI_SCREENSHOTS[0];

  const currentNilaScreen =
    NILAHEALTH_PREDICTIONS.find((s) => s.id === activeNilaTab) || NILAHEALTH_PREDICTIONS[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
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

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
          {/* Title and Intro */}
          <div className="space-y-2">
            <h3
              id="modal-project-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.description[language]}
            </p>
          </div>

          {/* Special Authentic UI Gallery for SiPuBi */}
          {isSiPuBi && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                  <Eye className="w-4 h-4 text-sky-500" />
                  <span>{language === "id" ? "Tangkapan Layar Sistem Asli (SiPuBi)" : "Authentic System Interface (SiPuBi)"}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  Laravel + Blade + MySQL
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {SIPUBI_SCREENSHOTS.map((screen) => (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setActiveSipubiTab(screen.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none ${
                      activeSipubiTab === screen.id
                        ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {screen.title[language]}
                  </button>
                ))}
              </div>

              {/* Browser Window Mockup Frame with Real Screenshot */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                {/* Browser Top Chrome */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/90 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 w-full max-w-sm justify-center">
                    <span className="text-emerald-400 text-[10px]">https://</span>
                    <span>{currentSipubiScreen.url}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">SiPuBi</span>
                </div>

                {/* Real Image Canvas */}
                <div className="relative w-full aspect-[16/9] bg-slate-900">
                  <Image
                    src={currentSipubiScreen.image}
                    alt={currentSipubiScreen.title[language]}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority
                  />
                </div>

                {/* Screenshot caption footer */}
                <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-sky-400 font-bold font-mono shrink-0">&gt;</span>
                  <p className="leading-relaxed">{currentSipubiScreen.description[language]}</p>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Flow / Architecture Diagram */}
          {isSiPuBi && (
            <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                  <Layers className="w-4 h-4 text-sky-500" />
                  <span>
                    {language === "id"
                      ? "Alur Verifikasi Distribusi Pupuk Subsidi"
                      : "Subsidized Fertilizer Distribution Workflow"}
                  </span>
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
                  <p className="text-[11px] text-slate-500 font-sans">
                    Validasi NIK dan kelompok tani penerima alokasi kuota.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    2
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Pengecekan Kuota</p>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Verifikasi sisa jatah pupuk (Urea, NPK) secara real-time.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    3
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Tebus Kios Resmi</p>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Penebusan tercatat pada outlet distributor resmi wilayah.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-[10px]">
                    4
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white font-sans text-xs">Audit &amp; Laporan</p>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Rekapitulasi otomatis neraca penyaluran untuk dinas terkait.
                  </p>
                </div>
              </div>

              {/* Technical Specifications Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Database className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Relational Data Integrity:</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Mencegah selisih pencatatan distribusi pupuk dan manipulasi data kuota ganda.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Role-Based Access Control:</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Pemisahan wewenang antara Admin Wilayah, Pengelola Kios, dan Petani Terdaftar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isNilaHealth && (
            <div className="space-y-6">
              {/* Top Partnership & Tech Ribbon */}
              <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-sky-600 p-1 shrink-0 shadow-xs">
                    <Image
                      src="/projects/nilahealth/logo.png"
                      alt="NilaHealth Logo"
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {language === "id"
                        ? "Kemitraan Pembudidaya Ikan Nila Jember"
                        : "Jember Tilapia Aquaculture Farmer Partnership"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === "id"
                        ? "Proyek Mata Kuliah ADPL / PPL Fasilkom UNEJ untuk Menekan Angka Kematian Ikan"
                        : "Software Engineering (ADPL/PPL) Project to Mitigate Tilapia Mortality Rates"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold border border-sky-200 dark:border-sky-800">
                    Laravel 12
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                    Flask AI API
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                    EfficientNet CNN
                  </span>
                </div>
              </div>

              {/* Real Prediction Showcase with Bounding Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    <Eye className="w-4 h-4 text-sky-500" />
                    <span>
                      {language === "id"
                        ? "Hasil Deteksi Citra Model CNN Lapangan (Bounding Box)"
                        : "Field CNN Model Detection Outputs (Automated Bounding Box)"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Confidence Threshold &ge; 80%
                  </span>
                </div>

                {/* Prediction Selector Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  {NILAHEALTH_PREDICTIONS.map((screen) => (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => setActiveNilaTab(screen.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none ${
                        activeNilaTab === screen.id
                          ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {screen.title[language]}
                    </button>
                  ))}
                </div>

                {/* Image Frame */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
                  {currentNilaScreen.id === "eval" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-900">
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-mono text-slate-400 text-center">Confusion Matrix (6 Classes)</p>
                        <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden border border-slate-800">
                          <Image
                            src={currentNilaScreen.image}
                            alt="Confusion Matrix"
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 768px) 100vw, 400px"
                            priority
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-mono text-slate-400 text-center">Training &amp; Validation Curves</p>
                        <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden border border-slate-800">
                          <Image
                            src={currentNilaScreen.historyImage || currentNilaScreen.image}
                            alt="Training History"
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 768px) 100vw, 400px"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-slate-900 flex items-center justify-center">
                      <Image
                        src={currentNilaScreen.image}
                        alt={currentNilaScreen.title[language]}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, 800px"
                        priority
                      />

                      {/* Automated Green Bounding Box Overlay matching Flask Matplotlib style */}
                      <div className="absolute inset-4 sm:inset-6 border-2 sm:border-4 border-lime-400 rounded-lg pointer-events-none shadow-[0_0_15px_rgba(163,230,53,0.35)]">
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-emerald-700/95 text-white font-bold font-mono text-[11px] sm:text-xs shadow-md border border-emerald-500/40">
                          {currentNilaScreen.disease}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-slate-900/95 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {currentNilaScreen.disease}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {currentNilaScreen.severity[language]}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {currentNilaScreen.categoryType}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] text-slate-300">
                      <div>
                        <strong className="text-slate-400 block mb-0.5">
                          {language === "id" ? "Gejala Terdeteksi / Lingkup Evaluasi:" : "Observed Pathology / Metric Scope:"}
                        </strong>
                        <p>{currentNilaScreen.symptom[language]}</p>
                      </div>
                      <div>
                        <strong className="text-emerald-400 block mb-0.5">
                          {language === "id" ? "Rekomendasi Tindakan (SOP):" : "Curative Protocol (SOP):"}
                        </strong>
                        <p>{currentNilaScreen.treatment[language]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-Tier Microservices Architecture Flow */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    <Layers className="w-4 h-4 text-sky-500" />
                    <span>
                      {language === "id"
                        ? "Arsitektur Microservices (Laravel + Flask AI)"
                        : "Microservices Architecture (Laravel + Flask AI)"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-medium">
                    REST API HTTP Client
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-bold">
                      <Users className="w-4 h-4" />
                      <span>1. Web App Peternak</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      {language === "id"
                        ? "Peternak mengunggah foto ikan nila bergejala melalui form Blade/Tailwind dan mengelola jadwal pakan tambak."
                        : "Farmers upload symptomatic tilapia photos through Blade/Tailwind UI and manage pond feeding schedules."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                      <Activity className="w-4 h-4" />
                      <span>2. Flask AI Microservice</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      {language === "id"
                        ? "Validasi dimensi 224x224, inferensi EfficientNet CNN, verifikasi confidence ≥80%, dan pembuatan bounding box."
                        : "Image 224x224 normalization, EfficientNet CNN forward pass, confidence filtering ≥80%, and bounding box drawing."}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Database className="w-4 h-4" />
                      <span>3. SOP Penanganan &amp; DB</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      {language === "id"
                        ? "MySQL menarik dosis antibiotik, protokol karantina, serta memicu notifikasi email jadwal perawatan kolam."
                        : "MySQL pulls curative antibiotic dosages, quarantine guidelines, and triggers pond maintenance email alerts."}
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Pathology Classes Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === "id"
                      ? "6 Klasifikasi Kondisi Ikan Nila pada Model:"
                      : "6 Tilapia Pathology & Health Classes in Model:"}
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    final_model.keras
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {NILA_CLASSES.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 dark:text-white font-medium">
                          {item.name}
                        </strong>
                      </div>
                      <p className="text-[10px] font-mono text-sky-600 dark:text-sky-400">{item.type}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">SOP:</span> {item.sop}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pond Management Highlight */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">
                      {language === "id" ? "Fitur Manajemen Tambak:" : "Pond Management Suite:"}
                    </strong>{" "}
                    {language === "id"
                      ? "Penjadwalan rutin pemberian pakan, pembersihan lumpur kolam, dan notifikasi email terotomatisasi."
                      : "Recurring feeding schedules, pond silt cleaning, and automated email alerts for farmers."}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  ADPL &amp; PPL Project
                </span>
              </div>
            </div>
          )}

          {isKlinik && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>
                  {language === "id"
                    ? "Modul Operasional Klinik Digital (Paperless)"
                    : "Paperless Dental Clinic Operations"}
                </span>
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
                <span>
                  {language === "id"
                    ? "Alur Otorisasi & Kuota Cuti Karyawan"
                    : "Leave Authorization & Quota Lifecycle"}
                </span>
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
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                >
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
            <span>
              {language === "id" ? "Lihat Source Code di GitHub" : "View Source Code on GitHub"}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
