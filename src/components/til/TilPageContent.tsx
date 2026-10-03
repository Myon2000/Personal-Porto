"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { TIL_ENTRIES, TIL_CATEGORIES, TilEntry } from "@/data/til-data";
import { GithubIcon } from "@/components/shared/icons";
import {
  Search,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Terminal,
  GitCommit,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

function TilCard({ entry }: { entry: TilEntry }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyCode = () => {
    if (!entry.codeSnippet || !navigator.clipboard) return;
    navigator.clipboard.writeText(entry.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      style={{
        backgroundImage: isHovered
          ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(234, 56, 38, 0.04), transparent 80%)`
          : undefined,
      }}
      className="relative p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-slate-400 transition-all duration-200 space-y-6 flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Header Metadata Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-[#EA3826]" />
            <time dateTime={entry.date} className="font-semibold text-slate-800">
              {entry.date}
            </time>
          </div>

          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 font-medium">
            {entry.categoryLabel[language]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 leading-snug">
          {entry.title[language]}
        </h3>

        {/* Core Takeaway Box */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            {language === "id" ? "Intisari Solusi:" : "Core Takeaway:"}
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {entry.takeaway[language]}
          </p>
        </div>

        {/* Code Snippet Box with One-Click Copy */}
        {entry.codeSnippet && (
          <div className="rounded-xl border border-slate-300 bg-slate-950 text-slate-200 overflow-hidden font-mono text-xs">
            {/* Snippet Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-[11px]">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300">{entry.codeSnippet.fileName}</span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
                title={language === "id" ? "Salin Kode" : "Copy Code"}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px] font-bold">
                      {language === "id" ? "Tersalin!" : "Copied!"}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">
                      {language === "id" ? "Salin" : "Copy"}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <pre className="p-4 overflow-x-auto leading-relaxed text-[11px] sm:text-xs text-slate-300">
              <code>{entry.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Expandable Engineering Context */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 hover:text-[#EA3826] transition-colors focus:outline-none"
          >
            <span>
              {isExpanded
                ? language === "id"
                  ? "Tutup Konteks Rekayasa"
                  : "Hide Technical Context"
                : language === "id"
                  ? "Mengapa Ini Penting? (Detail Konteks)"
                  : "Why It Matters (Engineering Context)"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-2.5 p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
              {entry.whyItMatters[language]}
            </div>
          )}
        </div>
      </div>

      {/* Tech Tags Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function TilPageContent() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut: Pressing '/' automatically focuses search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchInputRef.current &&
        !["INPUT", "TEXTAREA"].includes((document.activeElement?.tagName || ""))
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredEntries = TIL_ENTRIES.filter((entry) => {
    const matchesCategory =
      activeCategory === "all" || entry.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      entry.title[language].toLowerCase().includes(query) ||
      entry.takeaway[language].toLowerCase().includes(query) ||
      entry.tags.some((t) => t.toLowerCase().includes(query)) ||
      (entry.codeSnippet?.fileName || "").toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 transition-colors">
      {/* 01 / HEADER & INTRO */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          {/* Section Indicator */}
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900">
              01
            </span>
            <span className="h-4 w-px bg-slate-300" />
            <span className="uppercase tracking-[0.25em] text-slate-900 font-semibold">
              Today I Learned
            </span>
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.04]">
              {language === "id" ? (
                <>
                  Catatan harian dari <span className="text-[#EA3826]">sesi penulisan kode</span>, riset AI, dan eksperimen sistem.
                </>
              ) : (
                <>
                  Daily takeaways from <span className="text-[#EA3826]">code sessions</span>, AI research, and system experiments.
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              {language === "id"
                ? "Dokumentasi temuan teknis riil seputar PyTorch, arsitektur microservices Laravel, keamanan server Linux, dan optimasi query database. Setiap catatan baru memperbarui streak GitHub secara bermakna."
                : "A live repository of empirical insights spanning PyTorch optimization, decoupled web architectures, Linux defense tactics, and relational transactional integrity."}
            </p>
          </div>

          {/* Search Bar with Keyboard Shortcut Hint */}
          <div className="pt-2 max-w-xl">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "id"
                    ? "Cari catatan teknis, topik, atau tag... (Tekan /)"
                    : "Search takeaways, snippets, or tags... (Press /)"
                }
                className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
              />
              <span className="absolute right-3 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-mono text-slate-400 pointer-events-none">
                /
              </span>
            </div>
          </div>

          {/* Category Filter Pills with Counts */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {TIL_CATEGORIES.map((cat) => {
              const count =
                cat.key === "all"
                  ? TIL_ENTRIES.length
                  : TIL_ENTRIES.filter((e) => e.category === cat.key).length;

              const isActive = activeCategory === cat.key;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-colors focus:outline-none min-h-[36px] ${
                    isActive
                      ? "bg-slate-950 text-white font-bold shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200"
                  }`}
                >
                  <span>{cat.label[language]}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? "bg-slate-800 text-slate-200"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 / TIL FEED CARDS */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 font-mono text-xs">
            <span className="text-slate-500 uppercase tracking-widest">
              {language === "id"
                ? `Menampilkan ${filteredEntries.length} Catatan Teknis`
                : `Showing ${filteredEntries.length} Technical Takeaways`}
            </span>

            <span className="text-slate-400 hidden sm:inline">
              Continuous Learning Log
            </span>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white space-y-3">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-mono text-slate-600">
                {language === "id"
                  ? "Tidak ada catatan yang cocok dengan kata kunci pencarian."
                  : "No notes matched your search query."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-mono font-bold text-[#EA3826] underline underline-offset-4"
              >
                {language === "id" ? "Reset Filter" : "Reset Filter"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {filteredEntries.map((entry) => (
                <TilCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 03 / DAILY COMMIT INCENTIVE BANNER */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-wider">
                <GitCommit className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === "id"
                    ? "Komitmen Belajar Berkelanjutan"
                    : "Continuous Engineering Routine"}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                {language === "id"
                  ? "Satu catatan baru, satu commit nyata di GitHub."
                  : "One fresh takeaway, one meaningful GitHub commit."}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {language === "id"
                  ? "Alih-alih sekadar mengisi commit kosong, setiap catatan teknis di halaman ini ditambahkan melalui commit riil ke repositori untuk mendokumentasikan proses belajar nyata."
                  : "Rather than fabricating empty commits, every engineering insight documented here is pushed as verifiable code history tracking daily growth."}
              </p>
            </div>

            <a
              href="https://github.com/Myon2000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors shrink-0 shadow-2xs self-start md:self-auto"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB @MYON2000</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
