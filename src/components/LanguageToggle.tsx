"use client";

import { useLanguage } from "@/context/language-context";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-16 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
      aria-label="Toggle language between ID and EN"
      title={language === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
    >
      <Globe className="w-3.5 h-3.5 text-sky-500" />
      <span className="uppercase tracking-wider">{language}</span>
    </button>
  );
}
