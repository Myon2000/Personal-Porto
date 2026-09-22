"use client";

import { useLanguage } from"@/context/language-context";

interface HowStep {
 num: string;
 title: string;
 desc: string;
}

export default function HowIWork() {
 const { language } = useLanguage();

 const steps: HowStep[] = language ==="id"? [
 {
 num:"H. 01",
 title:"Eksplorasi & Dialog Terbuka",
 desc:"Saya menjaga proses penemuan solusi tetap kolaboratif dan transparan, berbagi hipotesis awal, batasan teknis, dan trade-off arsitektur sebelum penulisan kode dimulai.",
 },
 {
 num:"H. 02",
 title:"Keputusan Terdokumentasi",
 desc:"Bukan hanya menghasilkan produk akhir, saya mendokumentasikan alasan di balik setiap keputusan desain skema basis data, pemilihan model AI, dan struktur API.",
 },
 {
 num:"H. 03",
 title:"Spesifikasi Jelas, Minim Celah",
 desc:"Merancang dengan memikirkan implementasi riil: mendefinisikan state mesin, edge cases, struktur kontrak data, dan penanganan kegagalan agar sistem handal di produksi.",
 },
 {
 num:"H. 04",
 title:"Dukungan Penuh Pasca Implementasi",
 desc:"Mengawal sistem hingga berjalan stabil di lingkungan produksi, membantu pengujian integrasi, pemantauan performa model, dan verifikasi alur pengguna di lapangan.",
 },
 ] : [
 {
 num:"H. 01",
 title:"Discovery in the Open",
 desc:"I keep discovery collaborative and transparent, sharing early thoughts, technical constraints, and architectural trade-offs so direction is sharpened before code is written.",
 },
 {
 num:"H. 02",
 title:"Decisions Documented, Not Just Coded",
 desc:"Beyond shipping code, I make technical reasoning visible so database schema decisions, AI model selections, and API boundaries are clear and extensible.",
 },
 {
 num:"H. 03",
 title:"Clear Specs, Fewer Gaps",
 desc:"Engineering with production realities in mind, defining explicit states, edge cases, schema constraints, and error boundaries so deployment runs smoothly.",
 },
 {
 num:"H. 04",
 title:"Support Where It Matters",
 desc:"Staying close throughout deployment to ensure system stability, helping resolve edge cases, profiling model inference times, and verifying end-to-end reliability.",
 },
 ];

 return (
 <section
 id="how-i-work"
 className="py-20 md:py-28 border-b border-slate-200/80 bg-slate-50/50 transition-colors"
 >
 <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
 {/* Sandeep-style Section Header Ribbon */}
 <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200">
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">
 04
 </span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Bagaimana Saya Bekerja":"How I Work?"}
 </span>
 </div>
 <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
 {language ==="id"?"Praktek Kolaborasi":"Collaboration Process"}
 </span>
 </div>

 {/* Headline */}
 <div className="max-w-3xl space-y-3">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
 {language ==="id"
 ?"Bagaimana kolaborasi rekayasa berjalan secara nyata."
 :"What working together actually looks like."}
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-normal">
 {language ==="id"
 ?"Saya bekerja erat dengan rekan pengembang, manajer produk, dan mitra pengguna lapangan, memastikan proses berjalan terarah dari ide awal hingga peluncuran."
 :"I collaborate closely with stakeholders, engineering teams, and real users, owning technical execution end-to-end with focus on constraints and clarity."}
 </p>
 </div>

 {/* 4 Cards Grid: H. 01 to H. 04 */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
 {steps.map((step) => (
 <div
 key={step.num}
 className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-400 transition-colors space-y-3 flex flex-col justify-between"
 >
 <div className="space-y-3">
 <span className="font-mono text-xs font-bold text-slate-900">
 {step.num}
 </span>

 <h3 className="text-base sm:text-lg font-bold text-slate-900">
 {step.title}
 </h3>

 <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
 {step.desc}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
