"use client";

import Link from"next/link";
import { useLanguage } from"@/context/language-context";
import { PERSONAL_INFO } from"@/data/portfolio-data";
import { Mail, ArrowUpRight } from"lucide-react";

export default function HomeContactCTA() {
 const { language } = useLanguage();

 return (
 <section
 id="contact"
 className="py-24 md:py-32 border-b border-slate-200/80 bg-white transition-colors"
 >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
 {/* Minimalist Pill Label */}
 <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-widest">
 <span className="w-1.5 h-1.5 rounded-full bg-[#EA3826]"/>
 <span>{language ==="id"?"Hubungi Saya":"Get In Touch"}</span>
 </div>

 {/* Massive Editorial Headline */}
 <div className="max-w-4xl space-y-4">
 <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.04]">
 {language ==="id"? (
 <>
 Punya sistem kompleks yang butuh <span className="text-[#EA3826]">langkah rekayasa</span> yang jelas?
 </>
 ) : (
 <>
 Have a complex product that needs a <span className="text-[#EA3826]">clear next move</span>?
 </>
 )}
 </h2>
 </div>

 {/* Action Buttons */}
 <div className="flex flex-wrap items-center gap-4 pt-4">
 <a
 href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20from%20Portfolio`}
 className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs min-h-[46px]"
 >
 <Mail className="w-4 h-4"/>
 <span>{language ==="id"?"KIRIM EMAIL":"EMAIL ME"}</span>
 </a>

 <Link
 href="/about#contact"
 className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-900 text-slate-800 font-mono font-semibold text-xs uppercase tracking-wider transition-colors min-h-[46px] group"
 >
 <span>{language ==="id"?"FORMULIR KONTAK LENGKAP":"FULL INQUIRY FORM"}</span>
 <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#EA3826]"/>
 </Link>
 </div>

 {/* Sub-bar Status */}
 <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
 <span>{PERSONAL_INFO.status[language]}</span>
 <span className="flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-emerald-500"/>
 <span>{language ==="id"?"Respon cepat via Gmail":"Quick replies via Gmail"}</span>
 </span>
 </div>
 </div>
 </section>
 );
}
