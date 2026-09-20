"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/shared/icons";
import ProjectModal from "@/components/shared/ProjectModal";
import HowIWork from "@/components/shared/HowIWork";
import HomeContactCTA from "@/components/home/HomeContactCTA";
import {
  ExternalLink,
  Eye,
  ArrowUpRight,
} from "lucide-react";

interface ArchivedProject {
  id: string;
  code: string;
  title: string;
  role: { id: string; en: string };
  year: string;
  category: string;
  description: { id: string; en: string };
  url: string;
  isExternal?: boolean;
}

const ARCHIVED_PROJECTS: ArchivedProject[] = [
  {
    id: "hmif-web",
    code: "A. 01",
    title: "Website Resmi Informatika UNEJ",
    role: { id: "Frontend Developer", en: "Frontend Developer" },
    year: "2024",
    category: "Web Engineering",
    description: {
      id: "Pengembangan antarmuka website program studi Informatika Universitas Jember bersama tim HMIF.",
      en: "Frontend architecture development for University of Jember Informatics department portal with HMIF team.",
    },
    url: "https://github.com/HMIF-UNEJ/informatics",
    isExternal: true,
  },
  {
    id: "laos-defense",
    code: "A. 02",
    title: "LAOS Arena Server Defense Suite",
    role: { id: "Security Engineer (Juara 1)", en: "Security Engineer (1st Place)" },
    year: "2024",
    category: "Cyber Security & Linux",
    description: {
      id: "Konfigurasi pengerasan server Linux, iptables firewall, dan skrip mitigasi serangan DDoS tersimulasi.",
      en: "Linux server hardening scripts, iptables firewall tuning, and live DDoS mitigation mechanisms.",
    },
    url: "https://github.com/Myon2000",
    isExternal: true,
  },
  {
    id: "cpc-algo",
    code: "A. 03",
    title: "Friendship CPC Algorithm Repository",
    role: { id: "Algorithmist (Juara Friendship)", en: "Algorithmist (CPC Winner)" },
    year: "2024",
    category: "Algorithms & Competitive Programming",
    description: {
      id: "Penyelesaian tantangan algoritma kompleks, struktur data pohon/graf, dan optimasi kompleksitas waktu.",
      en: "Complex algorithmic problem sets, advanced data structures, and algorithmic time complexity optimizations.",
    },
    url: "https://github.com/Myon2000",
    isExternal: true,
  },
  {
    id: "icom-chal",
    code: "A. 04",
    title: "I-COM Problem Solver Challenge Set",
    role: { id: "Peserta Terverifikasi", en: "Verified Competitor" },
    year: "2024",
    category: "Informatics Challenge",
    description: {
      id: "Penyelesaian studi kasus logika komputasi dan implementasi struktur data di ajang I-COM Fasilkom UNEJ.",
      en: "Computational logic problem-solving and software data modeling challenges at I-COM event.",
    },
    url: "https://github.com/Myon2000",
    isExternal: true,
  },
  {
    id: "github-all",
    code: "A. 05",
    title: "Arsip 21+ Repositori Publik GitHub",
    role: { id: "Creator & Maintainer", en: "Creator & Maintainer" },
    year: "2023 - 2026",
    category: "Open Source & Coursework",
    description: {
      id: "Koleksi lengkap proyek mandiri, eksperimen pemrograman (C#, PHP, Python, JS/TS), dan tugas praktikum.",
      en: "Complete collection of independent open-source utilities, academic coursework, and programming explorations.",
    },
    url: "https://github.com/Myon2000?tab=repositories",
    isExternal: true,
  },
];

interface ResumeExpItem {
  id: string;
  type: "work" | "org";
  title: { id: string; en: string };
  organization: string;
  location: string;
  period: string;
  bullets: { id: string[]; en: string[] };
}

const RESUME_EXPERIENCES: ResumeExpItem[] = [
  {
    id: "kompis",
    type: "work",
    title: { id: "Field Promotion Assistant", en: "Field Promotion Assistant" },
    organization: "Komunitas Peduli Indonesia Sehat (KOMPIS)",
    location: "Jombang, Indonesia",
    period: "Feb 2023 - Jun 2023",
    bullets: {
      id: [
        "Terlibat langsung dalam sosialisasi kesehatan masyarakat dan edukasi produk preventif.",
        "Bertanggung jawab atas perizinan acara lintas wilayah dengan pengurus RT (hingga 6 wilayah per hari).",
        "Mencapai target penjualan tim hingga 15 produk per hari melalui komunikasi persuasif dan profesional.",
        "Mengembangkan kemampuan komunikasi publik, negosiasi, dan kerja sama tim yang adaptif.",
      ],
      en: [
        "Led grassroots public health outreach and preventive wellness product education.",
        "Coordinated event permits and territorial logistics with local community heads (up to 6 neighborhoods daily).",
        "Consistently achieved team distribution quotas of up to 15 units/day through persuasive communication.",
        "Refined public relations, stakeholder coordination, and high-adaptability teamwork skills.",
      ],
    },
  },
  {
    id: "cafe-dewisri",
    type: "work",
    title: { id: "Content Creator", en: "Content Creator" },
    organization: "Dewi Sri & Cak Ndhoet Tidar Cafe",
    location: "Jember, Indonesia",
    period: "Dec 2025 - Present",
    bullets: {
      id: [
        "Merancang konsep kampanye media sosial dan menyusun script kreatif untuk promosi brand.",
        "Melakukan pengambilan gambar dan video (take konten) sesuai identitas visual brand.",
        "Mengatur tata letak feed Instagram agar selaras dengan citra kafe yang estetis dan konsisten.",
        "Melakukan proses editing konten foto dan video sebelum dipublikasikan ke audiens publik.",
      ],
      en: [
        "Planned social media promotional campaigns and drafted engaging video/photo narrative scripts.",
        "Directed on-site photo and video shoots aligned with brand aesthetic standards.",
        "Curated and formatted Instagram grid layouts to maintain consistent, compelling brand storytelling.",
        "Executed full post-production editing for promotional media assets prior to public release.",
      ],
    },
  },
  {
    id: "io-2025",
    type: "org",
    title: { id: "Ketua Panitia / Project Lead", en: "Project Lead / Head of Committee" },
    organization: "Informatics Olympiad (I/O) 2025",
    location: "Universitas Jember",
    period: "Aug 2025 - Oct 2025",
    bullets: {
      id: [
        "Memimpin rapat koordinasi dan pengambilan keputusan strategis pelaksanaan olimpiade informatika nasional.",
        "Mengelola kepanitiaan lintas divisi dan memastikan komunikasi antar divisi berjalan lancar.",
        "Mengawasi pelaksanaan acara berskala nasional yang diikuti 80+ peserta SMA dari seluruh Indonesia.",
        "Menyusun laporan pertanggungjawaban kegiatan dan transparansi pengelolaan anggaran.",
      ],
      en: [
        "Spearheaded strategic governance and critical decision-making for national-scale informatics competition.",
        "Supervised multi-divisional student committees, ensuring synchronized cross-functional communication.",
        "Directed operational execution for 80+ high school participants from across Indonesia.",
        "Compiled formal accountability audit reports and transparent budget allocation reviews.",
      ],
    },
  },
  {
    id: "hmif-core",
    type: "org",
    title: { id: "Staff Divisi Humas (Konten Kreator)", en: "Public Relations Staff (Content Sub-division)" },
    organization: "Himpunan Mahasiswa Informatika (HMIF) UNEJ",
    location: "Universitas Jember",
    period: "Jan 2024 - Dec 2025 (2 Periode)",
    bullets: {
      id: [
        "Membuat dan menjadwalkan hingga 15 konten teknologi dan publikasi tiap bulan secara konsisten.",
        "Mengkoordinasikan jalur komunikasi formal dengan pihak eksternal fakultas dan mitra kampus.",
        "Mendukung kegiatan kaderisasi mahasiswa baru dan tata kelola program kerja informatika.",
      ],
      en: [
        "Authored and scheduled up to 15 technology and department announcements monthly.",
        "Facilitated formal communication pipelines with external university and industry partners.",
        "Active contributor across two consecutive executive terms supporting student development.",
      ],
    },
  },
  {
    id: "io-2024",
    type: "org",
    title: { id: "Koordinator Perlengkapan", en: "Logistics Coordinator" },
    organization: "Informatics Olympiad (I/O) 2024",
    location: "Universitas Jember",
    period: "May 2024 - Oct 2024",
    bullets: {
      id: [
        "Bertanggung jawab mengkoordinasikan tim logistik dalam pengadaan perangkat keras penunjang.",
        "Memastikan kesiapan infrastruktur teknis laboratorium komputer selama kompetisi berlangsung.",
      ],
      en: [
        "Led hardware and equipment preparation for computer lab infrastructure during national trials.",
        "Managed logistical inventory readiness supporting over 80 high school competitors.",
      ],
    },
  },
];

export default function WorkPageContent() {
  const { language } = useLanguage();
  const [selectedModalProject, setSelectedModalProject] =
    useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: ProjectItem) => {
    setSelectedModalProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModalProject(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-white transition-colors">
      {/* 01 / WORK HEADER */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          {/* Section Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              01
            </span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Karya & Proyek" : "Work"}
            </span>
          </div>

          {/* Sandeep Work Headline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.04]">
              {language === "id" ? (
                <>
                  Karya terpilih yang mencakup <span className="text-[#EA3826]">arsitektur sistem</span>, riset AI, dan aplikasi produksi.
                </>
              ) : (
                <>
                  Selected work across <span className="text-[#EA3826]">products, systems</span>, and experiments.
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-normal">
              {language === "id"
                ? "Koleksi lengkap rekayasa perangkat lunak, kemitraan budidaya perikanan, sistem logistik bersertifikat, dan model klasifikasi medis teruji."
                : "A rigorous body of software engineering works, local aquaculture partnerships, certified logistical systems, and empirical Deep Learning models."}
            </p>
          </div>
        </div>
      </section>

      {/* 02 / SELECTED CASE STUDIES */}
      <section className="py-20 sm:py-28 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-slate-900 dark:text-white">02</span>
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <span className="uppercase tracking-[0.25em] font-semibold text-slate-900 dark:text-white">
                {language === "id" ? "Studi Kasus Utama" : "Selected"}
              </span>
            </div>
            <span className="text-slate-500 uppercase tracking-widest hidden sm:inline">
              {FEATURED_PROJECTS.length} {language === "id" ? "Sistem Lengkap" : "Systems"}
            </span>
          </div>

          <div className="space-y-6">
            {FEATURED_PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      P. 0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {project.badge[language]}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {project.description[language]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(project)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[38px]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{language === "id" ? "Alur Sistem & UI" : "System Flow & UI"}</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors min-h-[38px]"
                    title="Source Code GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">GitHub</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 / ARCHIVED & COURSEWORK REPOSITORIES */}
      <section className="py-20 sm:py-28 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090d16]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-slate-900 dark:text-white">03</span>
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <span className="uppercase tracking-[0.25em] font-semibold text-slate-900 dark:text-white">
                {language === "id" ? "Arsip & Proyek Kampus" : "Archived"}
              </span>
            </div>
            <span className="text-slate-500 uppercase tracking-widest hidden sm:inline">
              GitHub Coursework
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {ARCHIVED_PROJECTS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group hover:pl-2 transition-all duration-200"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {item.code}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#EA3826] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-normal pl-9">
                    {item.description[language]}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 shrink-0 pl-9 sm:pl-0">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.role[language]}
                  </span>
                  <span>{item.year}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#EA3826] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / WORK & LEADERSHIP EXPERIENCE (FROM VIAN'S CV) */}
      <section className="py-20 sm:py-28 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-slate-900 dark:text-white">04</span>
              <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
              <span className="uppercase tracking-[0.25em] font-semibold text-slate-900 dark:text-white">
                {language === "id" ? "Pengalaman Kerja & Organisasi" : "Experience"}
              </span>
            </div>
            <span className="text-slate-500 uppercase tracking-widest hidden sm:inline">
              Curriculum Vitæ Records
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              {language === "id"
                ? "Rekam jejak kerja profesional, komunikasi publik, dan kepemimpinan."
                : "Professional work history, public communications, and event leadership."}
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
              {language === "id"
                ? "Pengalaman lapangan di luar kode, dari perizinan sosial kemasyarakatan hingga memimpin puluhan panitia olimpiade nasional."
                : "Real-world experience beyond pure code, from community outreach and permits to directing national student olympiads."}
            </p>
          </div>

          {/* Timeline Stack */}
          <div className="space-y-6 pt-2">
            {RESUME_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        exp.type === "work"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          : "bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                      }`}>
                        {exp.type === "work" ? "Professional Work" : "Organisational"}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.title[language]}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {exp.organization} · {exp.location}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-md self-start sm:self-auto shrink-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                  {exp.bullets[language].map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 / HOW I WORK */}
      <HowIWork />

      {/* 06 / GET IN TOUCH */}
      <HomeContactCTA />

      {/* Reusable Project Modal */}
      <ProjectModal
        project={selectedModalProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
