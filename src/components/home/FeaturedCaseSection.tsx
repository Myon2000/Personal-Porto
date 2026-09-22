"use client";

import { useLanguage } from"@/context/language-context";
import { FEATURED_PROJECTS } from"@/data/portfolio-data";
import { GithubIcon } from"@/components/shared/icons";
import AlzheimerSimulator from"./AlzheimerSimulator";
import { ExternalLink, Layers } from"lucide-react";

export default function FeaturedCaseSection() {
 const { language } = useLanguage();
 const spotlightProject = FEATURED_PROJECTS.find(
 (p) => p.id ==="alzheimer-densenet"
 );

 if (!spotlightProject) return null;

 return (
 <section
 id="featured-case"
 className="py-20 md:py-28 border-b border-slate-200/80 bg-white transition-colors"
 >
 <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
 {/* Sandeep-style Section Header Ribbon */}
 <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200">
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">
 01
 </span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Studi Kasus Utama":"Featured Case"}
 </span>
 </div>
 <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
 {language ==="id"
 ?"Machine Learning & Computer Vision"
 :"Machine Learning & Computer Vision"}
 </span>
 </div>

 {/* Headline and Narrative */}
 <div className="space-y-4 max-w-4xl">
 <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[11px] font-mono bg-slate-100 text-slate-800">
 <span>{spotlightProject.badge[language]}</span>
 </div>
 <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.05]">
 {spotlightProject.title}
 </h2>
 <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
 {spotlightProject.description[language]}
 </p>
 </div>

 {/* Highlights & Architecture Breakdown */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
 {/* Key Highlights */}
 <div className="lg:col-span-7 space-y-4">
 <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
 {language ==="id"?"Metodologi & Temuan Kunci":"Key Highlights & Findings"}
 </h3>
 <ul className="space-y-2.5 font-mono text-xs">
 {spotlightProject.highlights[language].map((item, idx) => (
 <li
 key={idx}
 className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700"
 >
 <span className="text-emerald-500 font-bold shrink-0">✓</span>
 <span className="leading-relaxed">{item}</span>
 </li>
 ))}
 </ul>

 <div className="flex flex-wrap gap-1.5 pt-2">
 {spotlightProject.tags.map((tag) => (
 <span
 key={tag}
 className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
 >
 {tag}
 </span>
 ))}
 </div>
 </div>

 {/* Model Architecture Box */}
 <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-5">
 <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-bold">
 <Layers className="w-4 h-4 text-slate-900"/>
 <span>
 {language ==="id"
 ?"Spesifikasi Arsitektur DenseNet-169"
 :"DenseNet-169 Model Specification"}
 </span>
 </div>

 <div className="space-y-1.5 text-xs font-mono text-slate-600">
 <p className="text-slate-900 font-semibold">
 • Input: 224x224 Axial/Coronal MRI
 </p>
 <p>• Dense Blocks: 4 layers with dense cross-links</p>
 <p>• Transition Layers: Conv (1x1) + AvgPool (2x2)</p>
 <p>• Output: 4-Class progression classification</p>
 </div>

 <a
 href={spotlightProject.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs font-mono tracking-wider uppercase transition-colors"
 >
 <GithubIcon className="w-4 h-4"/>
 <span>
 {language ==="id"
 ?"Buka Repositori di GitHub"
 :"View Repository on GitHub"}
 </span>
 <ExternalLink className="w-3.5 h-3.5"/>
 </a>
 </div>
 </div>

 {/* Live Interactive Alzheimer Simulator */}
 <div className="pt-4">
 <AlzheimerSimulator />
 </div>
 </div>
 </section>
 );
}
