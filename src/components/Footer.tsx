"use client";

import { useLanguage } from "@/context/language-context";
import { Mail, Globe, ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export default function Footer() {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-slate-900 dark:text-white">
            <span className="w-6 h-6 rounded-md bg-sky-600 text-white flex items-center justify-center text-xs">
              OR
            </span>
            <span>Oktavian Ramadhani</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === "id"
              ? "Web Developer & Pengembang Model AI. Mahasiswa Fasilkom UNEJ."
              : "Web Developer & AI Model Builder. CS Student at UNEJ."}
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <a
            href="https://github.com/Myon2000"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="GitHub Myon2000"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:oktavianramadhani25@gmail.com"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Kirim Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://myon.my.id"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Domain myon.my.id"
          >
            <Globe className="w-5 h-5" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label={language === "id" ? "Kembali ke paling atas" : "Back to top"}
            title={language === "id" ? "Kembali ke atas" : "Back to top"}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-900 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
        &copy; {new Date().getFullYear()} Oktavian Ramadhani. Built with Next.js & Tailwind CSS. Domain:{" "}
        <span className="font-mono text-slate-600 dark:text-slate-400">myon.my.id</span>
      </div>
    </footer>
  );
}
