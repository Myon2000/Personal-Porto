"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const sections = ["about", "capabilities", "projects", "credentials", "stack", "contact", "playground"];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = language === "id" ? [
    { name: "Tentang", href: "#about", id: "about" },
    { name: "Keahlian", href: "#capabilities", id: "capabilities" },
    { name: "Karya", href: "#projects", id: "projects" },
    { name: "Prestasi", href: "#credentials", id: "credentials" },
    { name: "Stack", href: "#stack", id: "stack" },
    { name: "Game", href: "#playground", id: "playground" },
    { name: "Kontak", href: "#contact", id: "contact" },
  ] : [
    { name: "About", href: "#about", id: "about" },
    { name: "Capabilities", href: "#capabilities", id: "capabilities" },
    { name: "Work", href: "#projects", id: "projects" },
    { name: "Credentials", href: "#credentials", id: "credentials" },
    { name: "Stack", href: "#stack", id: "stack" },
    { name: "Playground", href: "#playground", id: "playground" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs"
          : "bg-transparent"
      }`}
    >
      {/* Top Reading Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
        <div
          className="h-full bg-slate-900 dark:bg-white transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo with Real Photo Avatar */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-slate-950 dark:text-white hover:opacity-80 transition-opacity focus:outline-none"
          aria-label="Kembali ke atas"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
            <Image
              src="/avatar.png"
              alt="Oktavian Ramadhani"
              fill
              className="object-cover"
              sizes="32px"
              priority
            />
          </div>
          <span className="hidden sm:inline">Oktavian Ramadhani</span>
          <span className="sm:hidden font-bold">Oktavian</span>
        </a>

        {/* Desktop Navigation Links matching Sandeep/CollectUI text navigation */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          <nav className="flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-mono text-[11px] lg:text-xs tracking-[0.18em] uppercase transition-colors relative py-1 focus:outline-none ${
                    isActive
                      ? "text-slate-950 dark:text-white font-bold"
                      : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white font-medium"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-900 dark:bg-white animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Minimal Controls: Language + Theme */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md px-6 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 font-mono">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-xs tracking-[0.2em] uppercase transition-colors ${
                  isActive
                    ? "text-slate-950 dark:text-white font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
