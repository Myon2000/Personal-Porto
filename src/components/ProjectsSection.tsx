"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import AlzheimerSimulator from "@/components/AlzheimerSimulator";
import ProjectModal from "@/components/ProjectModal";
import {
  ExternalLink,
  Layers,
  ArrowRight,
  FolderGit2,
  Eye,
} from "lucide-react";

export default function ProjectsSection() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<"all" | "ml" | "web" | "system">("all");
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterTabs = [
    { key: "all", label: language === "id" ? "Semua Proyek" : "All Projects" },
    { key: "ml", label: "Machine Learning (AI)" },
    { key: "web", label: "Web Applications" },
    { key: "system", label: language === "id" ? "Sistem Informasi" : "Information Systems" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  const spotlightProject = FEATURED_PROJECTS.find((p) => p.id === "alzheimer-densenet");
  const otherProjects = filteredProjects.filter((p) =>
    activeFilter === "all" ? p.id !== "alzheimer-densenet" : true
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
      id="projects"
      className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#090d16] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Sandeep-style Section Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">03</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Karya Terpilih" : "Featured Works"}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {language === "id" ? "Riset AI & Aplikasi Web" : "AI Research & Web Platforms"}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            {language === "id"
              ? "Studi kasus rekayasa dari riset Deep Learning hingga aplikasi web produksi."
              : "Engineering case studies from Deep Learning research to production web systems."}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            {language === "id"
              ? "Koleksi proyek yang membuktikan kemampuan membangun sistem dari data contract, model inference, hingga antarmuka pengguna."
              : "A curated body of work demonstrating capability from database design and neural model training to real-world deployment."}
          </p>
        </div>

        {/* Minimalist Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key as "all" | "ml" | "web" | "system")}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all focus:outline-none min-h-[38px] ${
                activeFilter === tab.key
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sandeep Flagship Case Study: 01 / FEATURED CASE */}
        {(activeFilter === "all" || activeFilter === "ml") && spotlightProject && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-6 sm:p-10 shadow-xs space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
                <span className="font-bold text-slate-900 dark:text-white">F. 01</span>
                <span>•</span>
                <span className="uppercase tracking-widest text-slate-700 dark:text-slate-300 font-semibold">
                  {language === "id" ? "Studi Kasus Riset AI Utama" : "Featured Research Case"}
                </span>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                Deep Learning &amp; Computer Vision
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {spotlightProject.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {spotlightProject.description[language]}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {language === "id"
                      ? "Metodologi & Sorotan Teknis:"
                      : "Technical Methodology & Highlights:"}
                  </h4>
                  <ul className="space-y-2 font-mono text-xs">
                    {spotlightProject.highlights[language].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3">
                  {spotlightProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
                    <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                    <span>
                      {language === "id"
                        ? "Arsitektur Model: DenseNet-169"
                        : "Model Architecture: DenseNet-169"}
                    </span>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1.5">
                    <p className="text-slate-900 dark:text-white font-bold">
                      {language === "id"
                        ? "Input: Citra MRI Otak (axial/coronal)"
                        : "Input: Brain MRI Scans (axial/coronal)"}
                    </p>
                    <p>• Dense Blocks: 4 layers with dense cross-links</p>
                    <p>• Transition Layers: Conv (1x1) + AvgPool (2x2)</p>
                    <p>• Output: Multi-class Alzheimer progression</p>
                  </div>
                </div>

                <a
                  href={spotlightProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs font-mono tracking-wider uppercase transition-colors min-h-[44px]"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>
                    {language === "id"
                      ? "Buka Kode di GitHub"
                      : "View Repository on GitHub"}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Live Interactive Alzheimer Simulator */}
            <AlzheimerSimulator />
          </div>
        )}

        {/* Selected Works Stack (Sandeep P. 01 to P. 05) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
              {language === "id" ? "Katalog Proyek Terpilih" : "Selected Projects"}
            </span>
            <span className="font-mono text-xs text-slate-400">
              {otherProjects.length} {language === "id" ? "Aplikasi" : "Applications"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, pIdx) => (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      P. 0{pIdx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {project.badge[language]}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {project.description[language]}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {project.highlights[language].slice(0, 2).map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono"
                      >
                        <span className="text-slate-400 font-bold">•</span>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dual Actions: System Flow Modal + GitHub */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[38px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === "id" ? "Alur Sistem & Bukti" : "System Flow & UI"}</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 transition-colors min-h-[38px]"
                      title={language === "id" ? "Buka GitHub" : "View on GitHub"}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Full Archive CTA Box */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 mx-auto">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === "id"
                ? "Mencari Eksplorasi Kode Lainnya?"
                : "Looking for More Repositories?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[42px]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>
                {language === "id"
                  ? "Buka Arsip GitHub @Myon2000"
                  : "Open GitHub Archive @Myon2000"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Project Architecture Modal */}
      <ProjectModal
        project={selectedModalProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
