"use client";

import { useLanguage } from"@/context/language-context";

export default function WhyWorkWithMe() {
 const { language } = useLanguage();

 const principles = language ==="id"? [
 {
 letter:"A",
 title:"Arsitektur & Integritas Data Lebih Dulu",
 description:"Saya merancang struktur basis data relasional (MySQL), otorisasi bertingkat (RBAC), dan model transaksi yang aman sebelum menulis baris kode antarmuka. Fondasi yang kokoh menjamin keandalan sistem jangka panjang.",
 },
 {
 letter:"B",
 title:"Machine Learning Berbasis Bukti Empiris",
 description:"Bukan sekadar menjalankan skrip pelatihan, saya membangun pipeline Deep Learning (DenseNet-169 & EfficientNet) yang dievaluasi secara ketat dengan metrik riil (akurasi 99.92% pada 5.098 data uji MRI).",
 },
 {
 letter:"C",
 title:"Solusi Nyata Berdampak ke Lapangan",
 description:"Teknologi terbaik adalah yang menyelesaikan masalah riil di masyarakat, seperti kemitraan dengan pembudidaya ikan nila di Jember untuk menekan angka mortalitas dan sistem pemantauan distribusi pupuk bersubsidi.",
 },
 ] : [
 {
 letter:"A",
 title:"Systems & Data Integrity First",
 description:"I architect relational schemas, strict RBAC authorization, and ACID transaction lifecycles before styling interfaces. Solid foundational data contracts guarantee long-term stability.",
 },
 {
 letter:"B",
 title:"Empirical & Verifiable Machine Learning",
 description:"Beyond running training scripts, I engineer end-to-end Deep Learning pipelines (DenseNet-169 & EfficientNet) validated against stringent metrics (99.92% test accuracy on 5,098 MRI scans).",
 },
 {
 letter:"C",
 title:"Grounded Impact on Real-World Challenges",
 description:"Software proves its worth when serving communities, such as partnering with local tilapia fish farmers in Jember to curb mortality rates and engineering transparent fertilizer quota systems.",
 },
 ];

 return (
 <section
 id="why-me"
 className="py-20 md:py-28 border-b border-slate-200/80 bg-white transition-colors"
 >
 <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
 {/* Sandeep-style Section Header Ribbon */}
 <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200">
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">
 03
 </span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Mengapa Berkolaborasi?":"Why Work With Me?"}
 </span>
 </div>
 <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
 {language ==="id"?"Prinsip Rekayasa Perangkat Lunak":"Engineering Principles"}
 </span>
 </div>

 {/* Massive Dual Headline (Exact Sandeep.design pattern) */}
 <div className="max-w-4xl space-y-4">
 <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.08]">
 {language ==="id"
 ?"Pengembang yang menguasai arsitektur web dan riset AI terapan terbilang langka."
 :"Engineers who can bridge robust software architectures with applied AI are rare."}
 </h2>
 <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
 {language ==="id"
 ?"Saya bekerja paling baik saat data bersifat padat dan taruhan sistem bersifat nyata. Tugas saya adalah menghilangkan friksi teknis sehingga keputusan rekayasa berikutnya datang lebih cepat dan andal."
 :"I work best where data is dense and the stakes are real. My job is to eliminate architectural friction so the next engineering decision comes faster and with confidence."}
 </p>
 </div>

 {/* 3 Principles Cards: A, B, C */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
 {principles.map((item) => (
 <div
 key={item.letter}
 className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-slate-400 transition-colors space-y-4 flex flex-col justify-between"
 >
 <div className="space-y-3">
 <span className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-900 font-mono text-xs font-bold flex items-center justify-center">
 {item.letter}
 </span>

 <h3 className="text-lg sm:text-xl font-bold text-slate-900">
 {item.title}
 </h3>

 <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
 {item.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
