"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { FEATURED_PROJECTS } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import { ExternalLink, Brain, Layers, CheckCircle, ArrowRight, FolderGit2 } from "lucide-react";

export default function ProjectsSection() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "ml" | "web" | "system">("all");

  const filterTabs = [
    { key: "all", label: language === "id" ? "Semua Proyek" : "All Projects" },
    { key: "ml", label: "Machine Learning (AI)" },
    { key: "web", label: "Web Applications" },
    { key: "system", label: language === "id" ? "Sistem Informasi" : "Information Systems" },
  ];

  const filteredProjects = activeFilter === "all"
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  const spotlightProject = FEATURED_PROJECTS.find((p) => p.id === "alzheimer-densenet");
  const otherProjects = filteredProjects.filter((p) => activeFilter === "all" ? p.id !== "alzheimer-densenet" : true);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>{language === "id" ? "Karya Terkurasi" : "Featured Portfolio"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "id" ? "Proyek Rekayasa Web & Model AI" : "Web Engineering & AI Model Projects"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "id"
              ? "Enam proyek pilihan yang mencerminkan kapabilitas arsitektur perangkat lunak dan komputasi cerdas."
              : "Six selected projects demonstrating full-stack software development and practical machine learning."}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key as "all" | "ml" | "web" | "system")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[40px] ${
                activeFilter === tab.key
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* AI & Machine Learning Spotlight (Shown when 'all' or 'ml' is selected) */}
        {(activeFilter === "all" || activeFilter === "ml") && spotlightProject && (
          <div className="mb-12 rounded-2xl border-2 border-sky-500/30 bg-gradient-to-b from-sky-500/5 via-white to-white dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-600 text-white text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>{spotlightProject.badge[language]}</span>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {language === "id" ? "Riset Deep Learning Terapan" : "Deep Learning Research Track"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {spotlightProject.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {spotlightProject.description[language]}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === "id" ? "Sorotan Teknis & Metodologi:" : "Technical Highlights & Methodology:"}
                  </h4>
                  <ul className="space-y-1.5">
                    {spotlightProject.highlights[language].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {spotlightProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-mono font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <Layers className="w-4 h-4 text-sky-500" />
                    <span>{language === "id" ? "Arsitektur Model: DenseNet-169" : "Model Architecture: DenseNet-169"}</span>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
                    <p className="text-sky-600 dark:text-sky-400 font-semibold">
                      {language === "id" ? "Input: Citra MRI Otak (axial/coronal)" : "Input: Brain MRI Scans (axial/coronal)"}
                    </p>
                    <p>{language === "id" ? "> Blok Dense: 4 layer dengan tautan padat" : "> Dense Blocks: 4 layers with dense links"}</p>
                    <p>{language === "id" ? "> Lapisan Transisi: Conv (1x1) + AvgPool (2x2)" : "> Transition Layers: Conv (1x1) + AvgPool (2x2)"}</p>
                    <p>{language === "id" ? "> Output: Multi-kelas perkembangan Alzheimer" : "> Output: Multi-class Alzheimer progression"}</p>
                  </div>
                </div>

                <a
                  href={spotlightProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{language === "id" ? "Buka Repositori Kode di GitHub" : "View Code Repository on GitHub"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                    {project.badge[language]}
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-400">
                    {project.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {project.description[language]}
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  {project.highlights[language].slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <span className="text-sky-500 font-bold">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[38px]"
                >
                  <span className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>{language === "id" ? "Lihat Source Code" : "Inspect Code"}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Full Archive Explorer CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mx-auto">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === "id" ? "Mencari Eksplorasi Kode Lainnya?" : "Looking for More Repositories?"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {language === "id"
                ? "Total ada 21 repositori publik di profil GitHub saya, mencakup proyek kuliah, eksperimen script, dan utilitas open source."
                : "Explore all 21 public repositories on my GitHub profile, including academic coursework, code experiments, and open-source utilities."}
            </p>
          </div>
          <div>
            <a
              href="https://github.com/Myon2000?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[42px]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{language === "id" ? "Buka Arsip GitHub @Myon2000" : "Open GitHub Archive @Myon2000"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
