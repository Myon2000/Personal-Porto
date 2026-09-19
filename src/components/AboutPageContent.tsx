"use client";

import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import HowIWork from "@/components/HowIWork";
import ContactSection from "@/components/ContactSection";
import {
  Download,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

interface CvTimelineItem {
  year: string;
  role: { id: string; en: string };
  company: string;
  location: string;
  desc: { id: string; en: string };
  badge?: string;
}

const CV_TIMELINE: CvTimelineItem[] = [
  {
    year: "2023 — 2027",
    role: {
      id: "S1 Informatika (IPK 3.84 / 4.00)",
      en: "B.S. Computer Science - Informatics (GPA 3.84 / 4.00)",
    },
    company: "Fakultas Ilmu Komputer, Universitas Jember",
    location: "Jember, Indonesia",
    desc: {
      id: "Konsentrasi pada rekayasa perangkat lunak dan komputasi cerdas. Aktif mengembangkan proyek kolaboratif, riset Deep Learning Computer Vision, serta kepengurusan himpunan mahasiswa.",
      en: "Focusing on software engineering and applied intelligent systems. Active in full-stack collaborative projects, Computer Vision Deep Learning research, and student governance.",
    },
    badge: "Education",
  },
  {
    year: "2025 — Present",
    role: { id: "Content Creator", en: "Content Creator" },
    company: "Dewi Sri & Cak Ndhoet Tidar Cafe",
    location: "Jember, Indonesia",
    desc: {
      id: "Perencanaan konsep promosi digital, penyusunan naskah script, produksi foto/video on-site, kurasi layout feed Instagram, dan editing pascaproduksi.",
      en: "Digital campaign concepting, creative scriptwriting, on-site photo/video production, Instagram aesthetic curation, and full post-production editing.",
    },
    badge: "Professional Work",
  },
  {
    year: "2025",
    role: { id: "Ketua Panitia (Project Lead)", en: "Project Lead (Head of Committee)" },
    company: "Informatics Olympiad (I/O) 2025",
    location: "Universitas Jember",
    desc: {
      id: "Memimpin perencanaan strategis, manajemen kepanitiaan lintas divisi, alokasi anggaran, dan pertanggungjawaban kegiatan olimpiade informatika nasional 80+ peserta SMA.",
      en: "Directed strategic planning, cross-divisional committee governance, budget allocation, and operational delivery for national informatics competition with 80+ competitors.",
    },
    badge: "Leadership",
  },
  {
    year: "2024 — 2025",
    role: {
      id: "Staff Humas & Konten Kreator (2 Periode)",
      en: "Public Relations Staff (2 Consecutive Terms)",
    },
    company: "Himpunan Mahasiswa Informatika (HMIF) UNEJ",
    location: "Universitas Jember",
    desc: {
      id: "Membuat dan menjadwalkan 15 konten publikasi teknologi tiap bulan, menjalin komunikasi formal dengan mitra eksternal, dan mengawal kegiatan kaderisasi mahasiswa.",
      en: "Authored and scheduled 15 monthly tech publications, facilitated formal external stakeholder communications, and supported department student programs.",
    },
    badge: "Organisational",
  },
  {
    year: "2023",
    role: { id: "Field Promotion Assistant", en: "Field Promotion Assistant" },
    company: "Komunitas Peduli Indonesia Sehat (KOMPIS)",
    location: "Jombang, Indonesia",
    desc: {
      id: "Sosialisasi kesehatan di lingkungan masyarakat, koordinasi perizinan RT hingga 6 wilayah per hari, dan mencapai target penjualan tim hingga 15 produk/hari dengan komunikasi persuasif.",
      en: "Community public health outreach, territory permit coordination across 6 districts daily, achieving team distribution quotas of up to 15 products/day via persuasive communication.",
    },
    badge: "Professional Work",
  },
];

interface PrincipleItem {
  code: string;
  title: { id: string; en: string };
  desc: { id: string; en: string };
}

const BELIEFS: PrincipleItem[] = [
  {
    code: "T. 01",
    title: {
      id: "Integritas Kontrak Data Sebelum Tampilan",
      en: "Data Contracts Before Visual Layers",
    },
    desc: {
      id: "Antarmuka pengguna hanya seandal integritas skema database dan penanganan state di bawahnya. Saya selalu memprioritaskan konsistensi data relasional (MySQL/Postgres), aturan transaksi, dan kontrak REST API yang kokoh sebelum merancang presentasi visual.",
      en: "A user interface is only as reliable as the relational schema and state boundaries underneath it. I always architect strict transactional consistency, relational constraints, and explicit REST contracts before styling visual presentations.",
    },
  },
  {
    code: "T. 02",
    title: {
      id: "Tolok Ukur Empiris Melampaui Hype",
      en: "Empirical Benchmarks Over Speculative Claims",
    },
    desc: {
      id: "Dalam Machine Learning, kualitas model ditentukan oleh data uji independen, confusion matrix, dan mitigasi false-positive, bukan sekadar klaim verbal. Setiap pipeline Deep Learning yang saya bangun divalidasi dengan metrik riil terukur (seperti akurasi 99.92% pada 5.098 sampel MRI).",
      en: "In Machine Learning, a model's true capability is defined by independent test sets, confusion matrices, and false-positive mitigation, not buzzwords. Every pipeline I build is empirically verified on real-world datasets with verifiable benchmarks.",
    },
  },
  {
    code: "T. 03",
    title: {
      id: "Teknologi Wajib Membumi & Berdampak",
      en: "Engineering Grounded in Community Impact",
    },
    desc: {
      id: "Perangkat lunak terbukti bernilai ketika memecahkan masalah nyata di lapangan—seperti berkolaborasi dengan pembudidaya ikan nila di Jember untuk menekan angka mortalitas tambak, atau membangun sistem distribusi pupuk bersubsidi yang terverifikasi resmi.",
      en: "Software demonstrates its highest worth when solving tangible grassroots challenges—such as partnering with local tilapia fish farmers in Jember to prevent mortality losses or building verified subsidized fertilizer distribution workflows.",
    },
  },
];

export default function AboutPageContent() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-white transition-colors">
      {/* 01 / ABOUT ME HEADER & PORTRAIT */}
      <section className="pt-24 sm:pt-32 pb-20 sm:pb-28 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          {/* Section Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              01
            </span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Tentang Saya" : "About Me"}
            </span>
          </div>

          {/* Sandeep About Headline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.04]">
              {language === "id" ? (
                <>
                  Saya membangun <span className="text-[#EA3826]">sistem web yang andal</span> dan model AI yang teruji.
                </>
              ) : (
                <>
                  I build <span className="text-[#EA3826]">resilient web systems</span> and empirically verified AI models.
                </>
              )}
            </h1>
          </div>

          {/* Split Profile Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6">
            {/* Left: Authentic Portrait Photo */}
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

                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center justify-between">
                  <span>Oktavian Ramadhani</span>
                  <span className="text-slate-400 text-[11px]">Jember, Indonesia</span>
                </div>
              </div>

              <div className="pt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <GraduationCap className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                  <span>{PERSONAL_INFO.university}</span>
                </div>
                <p className="pl-6 text-[11px] text-slate-500">
                  {PERSONAL_INFO.faculty} · Informatika (IPK 3.84)
                </p>
              </div>
            </div>

            {/* Right: Narrative Bio & Background Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <p>
                  {language === "id"
                    ? "Halo! Saya Oktavian Ramadhani (Vian), mahasiswa tingkat akhir program studi Informatika di Universitas Jember dengan konsentrasi pada rekayasa perangkat lunak dan komputasi cerdas (Applied Machine Learning)."
                    : "Hello! I am Oktavian Ramadhani (Vian), a senior undergraduate Computer Science student at University of Jember focusing on scalable software engineering and Applied Machine Learning."}
                </p>

                <p>
                  {language === "id"
                    ? "Karier dan proyek saya didorong oleh rasa penasaran mendalam terhadap bagaimana arsitektur sistem informasi dan kecerdasan buatan dapat bersinergi memecahkan masalah nyata. Saya tidak hanya merancang antarmuka, tetapi juga mengawal integritas database relasional, isolasi microservices, dan keakuratan matematis model Computer Vision."
                    : "My development path is driven by a deep conviction in bridging resilient information systems with applied AI. Beyond crafting clean interfaces, I take pride in architecting solid relational schemas, decoupled microservices, and empirically verifiable Computer Vision classification models."}
                </p>

                <p>
                  {language === "id"
                    ? "Di luar layar kode, saya berpengalaman memimpin kepanitiaan berskala nasional, mengkoordinasikan komunikasi publik di organisasi mahasiswa, dan berdialog langsung dengan masyarakat serta mitra usaha lokal."
                    : "Beyond code, I bring hands-on experience directing national-level student competitions, coordinating public communications in student governance, and engaging directly with local industry partners."}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                    {language === "id" ? "Domisili" : "Location"}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    Jember, Indonesia
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                    {language === "id" ? "Status Akademik" : "Academic Standing"}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    Informatika (IPK 3.84)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                    {language === "id" ? "Ketersediaan" : "Availability"}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Open for Roles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 / CURRICULUM VITAE & RESUME DOWNLOAD */}
      <section className="py-20 sm:py-28 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-slate-900 dark:text-white">02</span>
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <span className="uppercase tracking-[0.25em] font-semibold text-slate-900 dark:text-white">
                Curriculum Vitæ
              </span>
            </div>

            {/* Prominent Resume Download Button (Sandeep Style) */}
            <a
              href="/resume.pdf"
              download="Oktavian_Ramadhani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition-colors shadow-2xs self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>{language === "id" ? "UNDUH RESUME (PDF)" : "DOWNLOAD RESUME"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              {language === "id"
                ? "Di mana saya belajar, bekerja, dan sistem apa yang saya bangun."
                : "Where I’ve worked, learned, and what I’ve helped build."}
            </h2>
          </div>

          {/* Timeline List */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {CV_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
              >
                {/* Year & Badge */}
                <div className="lg:col-span-3 space-y-1.5 font-mono">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.year}
                  </span>
                  {item.badge && (
                    <span className="block text-[11px] uppercase tracking-wider text-slate-500">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Role, Company, and Description */}
                <div className="lg:col-span-9 space-y-2">
                  <div className="space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#EA3826] transition-colors">
                      {item.company}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                      {item.role[language]} · {item.location}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
                    {item.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 / THINGS I BELIEVE (SANDEEP STYLE T.01 - T.03) */}
      <section className="py-20 sm:py-28 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              03
            </span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Prinsip Kerja" : "Things I Believe"}
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              {language === "id"
                ? "Keandalan lahir dari pemahaman apa yang harus dibangun, disederhanakan, dan distrukturkan."
                : "Reliability comes from knowing what to keep, remove, and strictly structure."}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
              {language === "id"
                ? "Rekayasa perangkat lunak yang hebat tidak meniadakan kompleksitas secara gegabah, melainkan menatanya sehingga pengguna dan sistem dapat melangkah dengan pasti."
                : "Great software engineering doesn't eliminate complexity for the sake of it. It structures dense requirements so users and teams move forward with confidence."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {BELIEFS.map((b) => (
              <div
                key={b.code}
                className="p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-600 transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {b.code}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {b.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {b.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / HOW I WORK */}
      <HowIWork />

      {/* 05 / COMPLETE CONTACT SECTION (3-CHANNEL DISPATCH) */}
      <ContactSection sectionIndex="05" />
    </div>
  );
}
