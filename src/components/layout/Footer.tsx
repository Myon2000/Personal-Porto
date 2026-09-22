"use client";

import Image from"next/image";
import { useLanguage } from"@/context/language-context";
import { Mail, Globe, ArrowUp } from"lucide-react";
import { GithubIcon } from"@/components/shared/icons";

export default function Footer() {
 const { language } = useLanguage();

 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior:"smooth"});
 };

 return (
 <footer className="border-t border-slate-200 bg-white transition-colors">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
 <div className="flex flex-col items-center md:items-start gap-1.5">
 <div className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-950 uppercase">
 <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-300 shrink-0">
 <Image
 src="/avatar.png"
 alt="Oktavian Ramadhani"
 fill
 className="object-cover"
 sizes="24px"
 />
 </div>
 <span>Oktavian Ramadhani</span>
 </div>
 <p className="text-xs text-slate-500 font-mono">
 {language ==="id"
 ?"Full-Stack Web Developer & Applied AI Builder · Fasilkom UNEJ"
 :"Full-Stack Web Developer & Applied AI Builder · CS at UNEJ"}
 </p>
 </div>

 {/* Social Links & Back to Top */}
 <div className="flex items-center gap-3 text-slate-600 font-mono text-xs">
 <a
 href="https://github.com/Myon2000"
 target="_blank"
 rel="noopener noreferrer"
 className="p-2.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors"
 aria-label="GitHub Myon2000"
 title="GitHub @Myon2000"
 >
 <GithubIcon className="w-4 h-4"/>
 </a>
 <a
 href="mailto:oktavianramadhani25@gmail.com"
 className="p-2.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors"
 aria-label="Kirim Email"
 title="Email Oktavian"
 >
 <Mail className="w-4 h-4"/>
 </a>
 <a
 href="https://myon.my.id"
 className="p-2.5 rounded-lg hover:bg-slate-100 hover:text-slate-950 transition-colors"
 aria-label="Domain myon.my.id"
 title="myon.my.id"
 >
 <Globe className="w-4 h-4"/>
 </a>
 <button
 type="button"
 onClick={scrollToTop}
 className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-mono uppercase tracking-wider transition-colors"
 aria-label="Kembali ke atas"
 title="Back to top"
 >
 <ArrowUp className="w-3.5 h-3.5"/>
 <span className="hidden sm:inline">Top</span>
 </button>
 </div>
 </div>

 <div className="border-t border-slate-100 py-4 text-center text-xs font-mono text-slate-400">
 &copy; {new Date().getFullYear()} Oktavian Ramadhani. Built with Next.js, Tailwind CSS &amp; TypeScript. Domain:{""}
 <span className="text-slate-700">personalporto.myon.my.id</span>
 </div>
 </footer>
 );
}
