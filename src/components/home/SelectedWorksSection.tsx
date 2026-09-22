"use client";

import { useState } from"react";
import Link from"next/link";
import { useLanguage } from"@/context/language-context";
import { FEATURED_PROJECTS, ProjectItem } from"@/data/portfolio-data";
import { GithubIcon } from"@/components/shared/icons";
import ProjectModal from"@/components/shared/ProjectModal";
import { ExternalLink, ArrowUpRight, Eye } from"lucide-react";

export default function SelectedWorksSection() {
 const { language } = useLanguage();
 const [selectedModalProject, setSelectedModalProject] =
 useState<ProjectItem | null>(null);
 const [isModalOpen, setIsModalOpen] = useState(false);

 // Home features 3 key web systems: SiPuBi, NilaHealth, and Web Klinik Gigi
 const homeSelectedProjects = FEATURED_PROJECTS.filter(
 (p) => p.id ==="sipubi"|| p.id ==="nila-health"|| p.id ==="web-klinik-gigi"
 );

 const handleOpenModal = (project: ProjectItem) => {
 setSelectedModalProject(project);
 setIsModalOpen(true);
 };

 const handleCloseModal = () => {
 setIsModalOpen(false);
 setSelectedModalProject(null);
 };

 return (
 <section
 id="selected-works"
 className="py-20 md:py-28 border-b border-slate-200/80 bg-slate-50/50 transition-colors"
 >
 <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
 {/* Sandeep-style Section Header Ribbon */}
 <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200">
 <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
 <span className="text-xl sm:text-2xl font-bold text-slate-900">
 02
 </span>
 <span className="h-4 w-px bg-slate-300"/>
 <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
 {language ==="id"?"Karya Terpilih":"Selected"}
 </span>
 </div>
 <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
 {language ==="id"?"Sistem Informasi & AI Terapan":"Applied AI & Web Systems"}
 </span>
 </div>

 {/* Massive Headline */}
 <div className="max-w-3xl space-y-3">
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
 {language ==="id"
 ?"Aplikasi web fungsional yang dibangun untuk memecahkan persoalan riil."
 :"Functional web systems engineered to address real-world challenges."}
 </h2>
 <p className="text-base sm:text-lg text-slate-600 font-normal">
 {language ==="id"
 ?"Dari tata kelola distribusi pupuk bersubsidi bersertifikat hingga platform deteksi patologi perikanan berbasis model CNN."
 :"From certified subsidized fertilizer distribution logistics to CNN-powered aquaculture disease detection platforms."}
 </p>
 </div>

 {/* Selected Projects Stack (P. 01 to P. 03) */}
 <div className="space-y-6">
 {homeSelectedProjects.map((project, idx) => (
 <div
 key={project.id}
 className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-400 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group"
 >
 {/* Left Column: Number, Title, Description */}
 <div className="space-y-3 max-w-2xl">
 <div className="flex items-center gap-3">
 <span className="font-mono text-xs font-bold text-slate-900">
 P. 0{idx + 1}
 </span>
 <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700">
 {project.badge[language]}
 </span>
 </div>

 <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-slate-600 transition-colors">
 {project.title}
 </h3>

 <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
 {project.description[language]}
 </p>

 <div className="flex flex-wrap gap-1.5 pt-1">
 {project.tags.map((tag) => (
 <span
 key={tag}
 className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-slate-600"
 >
 {tag}
 </span>
 ))}
 </div>
 </div>

 {/* Right Column: Interactive Buttons */}
 <div className="flex flex-row md:flex-col items-center md:items-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
 <button
 type="button"
 onClick={() => handleOpenModal(project)}
 className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[38px]"
 >
 <Eye className="w-3.5 h-3.5"/>
 <span>{language ==="id"?"Alur Sistem & UI":"System Flow & UI"}</span>
 </button>

 <a
 href={project.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-mono transition-colors min-h-[38px]"
 title="Source Code GitHub"
 >
 <GithubIcon className="w-3.5 h-3.5"/>
 <span className="hidden sm:inline">GitHub</span>
 <ExternalLink className="w-3 h-3 text-slate-400"/>
 </a>
 </div>
 </div>
 ))}
 </div>

 {/* Link to Full Work Page */}
 <div className="pt-2 flex justify-center sm:justify-end">
 <Link
 href="/work"
 className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 hover:text-[#EA3826] transition-colors group"
 >
 <span>
 {language ==="id"
 ?"LIHAT SEMUA KARYA & PENGALAMAN"
 :"EXPLORE ALL WORKS & EXPERIENCE"}
 </span>
 <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#EA3826]"/>
 </Link>
 </div>
 </div>

 {/* Reusable Project Modal */}
 <ProjectModal
 project={selectedModalProject}
 isOpen={isModalOpen}
 onClose={handleCloseModal}
 />
 </section>
 );
}
