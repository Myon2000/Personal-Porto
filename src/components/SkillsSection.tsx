"use client";

import { useLanguage } from "@/context/language-context";
import { SKILL_CATEGORIES } from "@/data/portfolio-data";
import { Code, Brain, Shield, CheckCircle2 } from "lucide-react";

export default function SkillsSection() {
  const { language } = useLanguage();

  const getIcon = (name: string) => {
    switch (name) {
      case "Code":
        return Code;
      case "Brain":
        return Brain;
      case "Shield":
        return Shield;
      default:
        return Code;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>{language === "id" ? "Kemampuan Teknis" : "Technical Capabilities"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "id" ? "Pilar Keahlian & Teknologi" : "Core Skillsets & Stack"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "id"
              ? "Teknologi yang saya gunakan secara aktif dalam perancangan aplikasi dan penelitian model cerdas."
              : "Technologies actively employed in software development and intelligent model training."}
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = getIcon(category.iconName);
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {category.title[language]}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {category.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{skill.name}</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between">
                  <span>Category {idx + 1}/3</span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">Active Track</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
