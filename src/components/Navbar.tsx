"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
    { name: "BERANDA", href: "/" },
    { name: "KARYA", href: "/work" },
    { name: "TENTANG", href: "/about" },
  ] : [
    { name: "HOME", href: "/" },
    { name: "WORK", href: "/work" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-slate-200 dark:border-slate-800 ${
        scrolled
          ? "bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md shadow-2xs"
          : "bg-white dark:bg-[#090d16]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-16 sm:h-18 flex items-center justify-between">
        {/* Left: Brand Name with Authentic Face Avatar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-950 dark:text-white hover:opacity-80 transition-opacity focus:outline-none"
        >
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
            <Image
              src="/avatar.png"
              alt="Oktavian Ramadhani"
              fill
              className="object-cover"
              sizes="28px"
              priority
            />
          </div>
          <span className="hidden sm:inline">Oktavian Ramadhani</span>
          <span className="sm:hidden">Oktavian</span>
        </Link>

        {/* Center: Sandeep-style HOME · WORK · ABOUT Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors py-1 focus:outline-none ${
                  isActive
                    ? "text-slate-950 dark:text-white font-bold"
                    : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white font-medium"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Book a Call / Contact + Controls */}
        <div className="hidden md:flex items-center gap-5">
          <LanguageToggle />
          <ThemeToggle />

          <a
            href={pathname === "/about" ? "#contact" : "/about#contact"}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold tracking-[0.18em] uppercase text-slate-950 dark:text-white hover:text-[#EA3826] dark:hover:text-[#EA3826] transition-colors focus:outline-none group pl-2"
          >
            <span>{language === "id" ? "HUBUNGI SAYA" : "BOOK A CALL"}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#EA3826]" />
          </a>
        </div>

        {/* Mobile menu triggers */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md px-6 py-4 space-y-3 font-mono text-xs tracking-[0.2em] uppercase">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1.5 transition-colors ${
                  isActive
                    ? "text-slate-950 dark:text-white font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href={pathname === "/about" ? "#contact" : "/about#contact"}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 font-bold text-[#EA3826] py-1"
            >
              <span>{language === "id" ? "HUBUNGI SAYA" : "BOOK A CALL"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
