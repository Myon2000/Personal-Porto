"use client";

import { useLanguage } from"@/context/language-context";

interface TechItem {
 name: string;
 category: string;
 discipline:"ai"|"web"|"infra";
}

const ROW_1: TechItem[] = [
 { name:"Next.js 15", category:"Full-Stack React", discipline:"web"},
 { name:"Python", category:"Scientific Computing", discipline:"ai"},
 { name:"TypeScript", category:"Strict Typing", discipline:"web"},
 { name:"PyTorch", category:"Deep Learning Engine", discipline:"ai"},
 { name:"Laravel 12", category:"Modern PHP Core", discipline:"web"},
 { name:"TensorFlow", category:"Keras Ecosystem", discipline:"ai"},
 { name:"DenseNet-169", category:"Medical Vision", discipline:"ai"},
 { name:"Tailwind CSS", category:"Design System", discipline:"web"},
];

const ROW_2: TechItem[] = [
 { name:"MySQL", category:"Relational Schemas", discipline:"infra"},
 { name:"Linux Server", category:"DDoS Mitigation & OS", discipline:"infra"},
 { name:"EfficientNet", category:"Aquaculture AI", discipline:"ai"},
 { name:"Flask Microservice", category:"Python REST API", discipline:"ai"},
 { name:"OpenCV", category:"Image Processing", discipline:"ai"},
 { name:"RESTful APIs", category:"Contract Architecture", discipline:"web"},
 { name:"Git & GitHub", category:"Version Control", discipline:"infra"},
 { name:"Vercel Cloud", category:"Edge Production", discipline:"infra"},
];

export default function TechStackMarquee() {
 const { language } = useLanguage();

 return (
 <section
 id="stack"
 className="py-20 md:py-28 border-b border-slate-200/80 bg-white transition-colors overflow-hidden"
 >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
 {/* Sandeep-style Section Header Ribbon */}
 <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200">
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">05</span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Teknologi & Alat":"Tech Stack & Tools"}
 </span>
 </div>
 <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
 {language ==="id"?"Ticker Bergerak Mulus":"Infinite Smooth Marquee"}
 </span>
 </div>

 {/* Massive Editorial Headline */}
 <div className="max-w-3xl space-y-3">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
 {language ==="id"
 ?"Alat dan tumpukan teknologi yang aktif digunakan dalam rekayasa sistem."
 :"Technologies, frameworks, and tooling actively deployed in production and research."}
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-normal">
 {language ==="id"
 ?"Dari pipeline pelatihan model Machine Learning hingga sistem informasi berskala penuh."
 :"Spanning deep learning inference pipelines, relational databases, and decoupled web architectures."}
 </p>
 </div>
 </div>

 {/* Marquee Container with Fade Edges */}
 <div className="relative mt-12 w-full overflow-hidden space-y-4">
 {/* Gradient Mask on left and right for seamless look */}
 <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"/>
 <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"/>

 {/* Row 1: Left to Right */}
 <div className="animate-marquee-ltr gap-3 py-1">
 {[...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1].map((item, idx) => (
 <div
 key={`r1-${idx}`}
 className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-400 transition-colors shadow-2xs shrink-0 select-none"
 >
 <span
 className={`w-2 h-2 rounded-full shrink-0 ${
 item.discipline ==="ai"
 ?"bg-sky-500"
 : item.discipline ==="web"
 ?"bg-emerald-500"
 :"bg-indigo-500"
 }`}
 />
 <div className="flex items-baseline gap-2">
 <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase">
 {item.name}
 </span>
 <span className="text-[10px] font-mono text-slate-500">
 {item.category}
 </span>
 </div>
 </div>
 ))}
 </div>

 {/* Row 2: Right to Left */}
 <div className="animate-marquee-rtl gap-3 py-1">
 {[...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2].map((item, idx) => (
 <div
 key={`r2-${idx}`}
 className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-400 transition-colors shadow-2xs shrink-0 select-none"
 >
 <span
 className={`w-2 h-2 rounded-full shrink-0 ${
 item.discipline ==="ai"
 ?"bg-sky-500"
 : item.discipline ==="web"
 ?"bg-emerald-500"
 :"bg-indigo-500"
 }`}
 />
 <div className="flex items-baseline gap-2">
 <span className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase">
 {item.name}
 </span>
 <span className="text-[10px] font-mono text-slate-500">
 {item.category}
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Ticker Legend / Subtext */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
 <div className="flex items-center gap-4">
 <span className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-sky-500"/>
 <span>Applied AI / ML</span>
 </span>
 <span className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-emerald-500"/>
 <span>Full-Stack Web</span>
 </span>
 <span className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-indigo-500"/>
 <span>Infra &amp; Security</span>
 </span>
 </div>
 <span>*Hover to pause ticker</span>
 </div>
 </section>
 );
}
