"use client";

import Image from"next/image";
import { useLanguage } from"@/context/language-context";
import { PERSONAL_INFO } from"@/data/portfolio-data";
import HowIWork from"@/components/shared/HowIWork";
import ContactSection from"@/components/shared/ContactSection";
import {
 Download,
 GraduationCap,
 ArrowUpRight,
} from"lucide-react";

interface CvTimelineItem {
 period: string;
 role: { id: string; en: string };
 company: string;
 location: string;
 desc: { id: string; en: string };
 badge: { id: string; en: string };
 highlights?: { id: string[]; en: string[] };
}

const CV_TIMELINE: CvTimelineItem[] = [
 {
 period:"2025 - Sekarang",
 role: { id:"Content Creator", en:"Content Creator"},
 company:"Dewi Sri & Cak Ndhoet Tidar Cafe",
 location:"Jember, Indonesia",
 badge: { id:"Pekerjaan Profesional", en:"Professional Work"},
 desc: {
 id:"Merancang konsep kampanye media sosial, menyusun naskah script, mengarahkan sesi foto dan video on-site, serta mengelola tata letak feed Instagram agar selaras dengan identitas visual brand.",
 en:"Planning social media campaigns, writing creative scripts, directing on-site photo/video shoots, and curating Instagram grid layouts aligned with brand aesthetic standards.",
 },
 highlights: {
 id: [
"Perencanaan dan eksekusi konten foto/video promosi digital secara konsisten",
"Penyusunan naskah kreatif dan editing pascaproduksi sebelum publikasi",
 ],
 en: [
"End-to-end planning and execution of promotional social media content",
"Creative scriptwriting and full post-production media editing",
 ],
 },
 },
 {
 period:"2025",
 role: { id:"Ketua Panitia (Project Lead)", en:"Project Lead (Head of Committee)"},
 company:"Informatics Olympiad (I/O) 2025",
 location:"Universitas Jember",
 badge: { id:"Kepemimpinan", en:"Leadership"},
 desc: {
 id:"Memimpin perencanaan strategis, manajemen kepanitiaan lintas divisi, alokasi anggaran, dan pertanggungjawaban kegiatan olimpiade informatika nasional yang diikuti 80+ peserta SMA dari seluruh Indonesia.",
 en:"Directed strategic planning, cross-divisional committee governance, budget allocation, and operational delivery for a national informatics competition with 80+ high school competitors.",
 },
 highlights: {
 id: [
"Mengatur koordinasi lintas divisi dan memastikan komunikasi berjalan lancar",
"Mengawasi kepatuhan anggaran dan menyusun laporan pertanggungjawaban kegiatan",
 ],
 en: [
"Coordinated multi-divisional committees to ensure synchronous execution",
"Supervised budget compliance and authored formal audit documentation",
 ],
 },
 },
 {
 period:"2024 - 2025",
 role: {
 id:"Staff Humas & Konten Kreator (2 Periode)",
 en:"Public Relations Staff (2 Consecutive Terms)",
 },
 company:"Himpunan Mahasiswa Informatika (HMIF) UNEJ",
 location:"Universitas Jember",
 badge: { id:"Organisasi Mahasiswa", en:"Student Governance"},
 desc: {
 id:"Membuat dan menjadwalkan publikasi konten teknologi tiap bulan, menjalin jalur komunikasi formal dengan pihak eksternal, dan mengawal kegiatan kaderisasi mahasiswa baru di lingkungan program studi.",
 en:"Authored and scheduled monthly tech publications, facilitated formal external stakeholder communications, and supported department student development programs.",
 },
 highlights: {
 id: [
"Membuat dan menjadwalkan hingga 15 konten publikasi teknologi setiap bulan",
"Mengkoordinasikan komunikasi dengan pihak eksternal fakultas dan mitra kampus",
 ],
 en: [
"Authored and published up to 15 technology announcements monthly",
"Coordinated outreach with external faculty and university partners",
 ],
 },
 },
 {
 period:"2024",
 role: { id:"Koordinator Perlengkapan", en:"Logistics Coordinator"},
 company:"Informatics Olympiad (I/O) 2024",
 location:"Universitas Jember",
 badge: { id:"Kepanitiaan", en:"Committee"},
 desc: {
 id:"Bertanggung jawab mengkoordinasikan tim perlengkapan dalam penyiapan inventaris teknis dan sarana laboratorium komputer untuk olimpiade nasional tingkat SMA.",
 en:"Managed technical equipment inventory and computer laboratory infrastructure readiness for national high school trials.",
 },
 },
 {
 period:"2023",
 role: { id:"Field Promotion Assistant", en:"Field Promotion Assistant"},
 company:"Komunitas Peduli Indonesia Sehat (KOMPIS)",
 location:"Jombang, Indonesia",
 badge: { id:"Pekerjaan Lapangan", en:"Field Work"},
 desc: {
 id:"Terlibat langsung dalam sosialisasi kesehatan masyarakat, koordinasi perizinan acara dengan pengurus RT hingga 6 wilayah per hari, dan membantu tim mencapai penjualan hingga 15 produk per hari melalui pendekatan persuasif.",
 en:"Conducted community health outreach, coordinated event permits with local district heads across 6 areas daily, and supported team sales up to 15 units/day via clear, respectful communication.",
 },
 },
];

interface PrincipleItem {
 code: string;
 title: { id: string; en: string };
 desc: { id: string; en: string };
}

const BELIEFS: PrincipleItem[] = [
 {
 code:"T. 01",
 title: {
 id:"Integritas Kontrak Data Sebelum Tampilan",
 en:"Data Contracts Before Visual Layers",
 },
 desc: {
 id:"Antarmuka pengguna hanya seandal integritas skema database dan penanganan state di bawahnya. Saya memprioritaskan konsistensi data relasional (MySQL), aturan transaksi, dan kontrak REST API yang kokoh sebelum merancang presentasi visual.",
 en:"A user interface is only as reliable as the relational schema and state boundaries underneath it. I architect strict transactional consistency, relational constraints, and explicit REST contracts before styling visual presentations.",
 },
 },
 {
 code:"T. 02",
 title: {
 id:"Tolok Ukur Empiris Melampaui Hype",
 en:"Empirical Benchmarks Over Speculative Claims",
 },
 desc: {
 id:"Dalam Machine Learning, kualitas model dibuktikan melalui data uji independen, confusion matrix, dan mitigasi false-positive, bukan sekadar klaim verbal. Setiap pipeline Deep Learning yang saya bangun divalidasi dengan metrik riil terukur (akurasi 99.92% pada 5.098 sampel MRI).",
 en:"In Machine Learning, model quality is proven through independent test sets, confusion matrices, and false-positive mitigation, not buzzwords. Every pipeline I build is empirically verified on real-world datasets with verifiable benchmarks.",
 },
 },
 {
 code:"T. 03",
 title: {
 id:"Teknologi Wajib Membumi dan Berdampak",
 en:"Engineering Grounded in Real Impact",
 },
 desc: {
 id:"Perangkat lunak terbukti bernilai ketika memecahkan masalah nyata di lapangan, seperti kemitraan dengan pembudidaya ikan nila di Jember untuk menekan angka mortalitas tambak, atau membangun sistem distribusi pupuk bersubsidi yang terverifikasi resmi.",
 en:"Software demonstrates its highest worth when solving tangible grassroots challenges, such as partnering with local tilapia fish farmers in Jember to prevent mortality losses or building verified subsidized fertilizer distribution workflows.",
 },
 },
];

export default function AboutPageContent() {
 const { language } = useLanguage();

 return (
 <div className="flex flex-col min-h-screen bg-white text-slate-900 transition-colors">
      {/* 01 / ABOUT ME HEADER & PORTRAIT */}
      <section className="pt-24 sm:pt-32 pb-20 sm:pb-28 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
 {/* Section Indicator */}
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">
 01
 </span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Tentang Saya":"About Me"}
 </span>
 </div>

 {/* Sandeep About Headline */}
 <div className="max-w-4xl space-y-4">
 <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.04]">
 {language ==="id"? (
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
 <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
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

 <div className="pt-4 space-y-1 text-xs text-slate-600 font-mono">
 <div className="flex items-center gap-2 text-slate-900 font-semibold">
 <GraduationCap className="w-4 h-4 text-slate-700 shrink-0"/>
 <span>{PERSONAL_INFO.university}</span>
 </div>
 <p className="pl-6 text-[11px] text-slate-500">
 {PERSONAL_INFO.faculty} · S1 Informatika (IPK 3.84)
 </p>
 </div>
 </div>

 {/* Right: Narrative Bio & Background Details */}
 <div className="lg:col-span-7 space-y-6">
 <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
 <p>
 {language ==="id"
 ?"Halo! Saya Oktavian Ramadhani (Vian), mahasiswa tingkat akhir program studi Informatika di Universitas Jember dengan fokus pada rekayasa perangkat lunak dan komputasi cerdas (Applied Machine Learning)."
 :"Hello! I am Oktavian Ramadhani (Vian), a senior undergraduate Computer Science student at University of Jember focusing on scalable software engineering and Applied Machine Learning."}
 </p>

 <p>
 {language ==="id"
 ?"Perjalanan rekayasa saya didorong oleh keyakinan bahwa sistem informasi yang kokoh harus berpadu dengan kecerdasan buatan terapan untuk memecahkan masalah riil. Saya tidak hanya merancang antarmuka yang bersih, tetapi juga memastikan keandalan skema relasional, pemisahan microservices yang terisolasi, serta validasi matematis model Computer Vision."
 :"My engineering journey is driven by a focus on bridging resilient information systems with applied AI to solve real-world problems. Beyond building clean interfaces, I prioritize relational schema integrity, decoupled microservice boundaries, and verifiable Computer Vision classification models."}
 </p>

 <p>
 {language ==="id"
 ?"Di luar penulisan kode, saya berpengalaman memimpin kepanitiaan berskala nasional, mengkoordinasikan komunikasi publik di organisasi mahasiswa, dan berdialog langsung dengan masyarakat serta mitra usaha lokal."
 :"Beyond code, I bring hands-on experience directing national-level student competitions, coordinating public communications in student governance, and engaging directly with community and local business partners."}
 </p>
 </div>

 {/* Quick Info Grid */}
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs font-mono">
 <div>
 <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
 {language ==="id"?"Domisili":"Location"}
 </span>
 <span className="text-slate-900 font-semibold">
 Jember, Indonesia
 </span>
 </div>
 <div>
 <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
 {language ==="id"?"Pendidikan":"Education"}
 </span>
 <span className="text-slate-900 font-semibold">
 Informatika (IPK 3.84)
 </span>
 </div>
 <div>
 <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
 {language ==="id"?"Ketersediaan":"Availability"}
 </span>
 <span className="text-emerald-600 font-semibold">
 Open for Roles
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

      {/* 02 / CURRICULUM VITAE & RESUME DOWNLOAD */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 font-mono text-xs">
 <div className="flex items-center gap-3">
 <span className="text-xl font-bold text-slate-900">02</span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] font-semibold text-slate-900">
 Curriculum Vitæ
 </span>
 </div>

 {/* Prominent Resume Download Button (Sandeep Style) */}
 <a
 href="/resume.pdf"
 download="Oktavian_Ramadhani_Resume.pdf"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors shadow-2xs self-start sm:self-auto"
 >
 <Download className="w-4 h-4"/>
 <span>{language ==="id"?"UNDUH RESUME (PDF)":"DOWNLOAD RESUME"}</span>
 <ArrowUpRight className="w-3.5 h-3.5"/>
 </a>
 </div>

 <div className="max-w-3xl space-y-3">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
 {language ==="id"
 ?"Riwayat pengalaman kerja, kepemimpinan, dan pendidikan akademik."
 :"Work history, organizational leadership, and academic background."}
 </h2>
 <p className="text-base text-slate-600 font-normal">
 {language ==="id"
 ?"Daftar terstruktur pengalaman profesional dan kontribusi organisasi dari curriculum vitae resmi."
 :"Structured timeline of professional work experience, event leadership, and academic records from formal curriculum vitae."}
 </p>
 </div>

 {/* Timeline List */}
 <div className="divide-y divide-slate-200">
 {CV_TIMELINE.map((item, idx) => (
 <div
 key={idx}
 className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
 >
 {/* Year & Badge */}
 <div className="lg:col-span-3 space-y-1.5 font-mono">
 <span className="text-sm font-bold text-slate-900">
 {item.period}
 </span>
 <span className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium">
 {item.badge[language]}
 </span>
 </div>

 {/* Role, Company, and Description */}
 <div className="lg:col-span-9 space-y-3">
 <div className="space-y-0.5">
 <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#EA3826] transition-colors">
 {item.company}
 </h3>
 <p className="text-xs sm:text-sm font-mono text-slate-500">
 {item.role[language]} · {item.location}
 </p>
 </div>

 <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
 {item.desc[language]}
 </p>

 {item.highlights && (
 <ul className="space-y-1 pt-1 font-mono text-xs text-slate-500">
 {item.highlights[language].map((h, hIdx) => (
 <li key={hIdx} className="flex items-start gap-2">
 <span className="text-emerald-500 font-bold shrink-0">✓</span>
 <span>{h}</span>
 </li>
 ))}
 </ul>
 )}
 </div>
 </div>
 ))}
 </div>

 {/* Formal Education Summary Block */}
 <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
 <div className="space-y-1.5">
 <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-wider">
 <GraduationCap className="w-4 h-4 text-slate-700"/>
 <span>{language ==="id"?"Pendidikan Formal":"Formal Education"}</span>
 </div>
 <h3 className="text-lg sm:text-xl font-bold text-slate-900">
 Universitas Jember (UNEJ)
 </h3>
 <p className="text-xs sm:text-sm text-slate-600 font-mono">
 S1 Informatika · Fakultas Ilmu Komputer · IPK 3.84 / 4.00 (2023 - 2027)
 </p>
 </div>

 <a
 href="/resume.pdf"
 download="Oktavian_Ramadhani_Resume.pdf"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
 >
 <Download className="w-3.5 h-3.5"/>
 <span>PDF Resume</span>
 </a>
 </div>
 </div>
 </section>

      {/* 03 / THINGS I BELIEVE (SANDEEP STYLE T.01 - T.03) */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400 pb-6 border-b border-slate-200">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">
 03
 </span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Prinsip Kerja":"Things I Believe"}
 </span>
 </div>

 <div className="max-w-3xl space-y-3">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
 {language ==="id"
 ?"Keandalan lahir dari pemahaman apa yang harus dibangun, disederhanakan, dan distrukturkan."
 :"Reliability comes from knowing what to keep, remove, and strictly structure."}
 </h2>
 <p className="text-base text-slate-600 font-normal">
 {language ==="id"
 ?"Rekayasa perangkat lunak yang hebat tidak meniadakan kompleksitas secara gegabah, melainkan menatanya sehingga pengguna dan sistem dapat melangkah dengan pasti."
 :"Great software engineering does not eliminate complexity for the sake of it. It structures dense requirements so users and teams move forward with confidence."}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
 {BELIEFS.map((b) => (
 <div
 key={b.code}
 className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-400 transition-colors space-y-3 flex flex-col justify-between"
 >
 <div className="space-y-3">
 <span className="font-mono text-xs font-bold text-slate-900">
 {b.code}
 </span>
 <h3 className="text-base sm:text-lg font-bold text-slate-900">
 {b.title[language]}
 </h3>
 <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
 <ContactSection sectionIndex="05"/>
 </div>
 );
}
