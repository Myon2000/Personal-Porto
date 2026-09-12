"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import { Mail, Send, MapPin, Globe, CheckCircle2, Download, ExternalLink } from "lucide-react";

export default function ContactSection() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(
      subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] Pesan dari ${name || "Pengunjung"}`
    );
    const mailtoBody = encodeURIComponent(
      `Halo Oktavian,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}\n\nDikirim melalui portofolio myon.my.id`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>{language === "id" ? "Terhubung & Kolaborasi" : "Get in Touch"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "id" ? "Mari Memulai Percakapan" : "Let's Start a Conversation"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {language === "id"
              ? "Terbuka untuk diskusi proyek rekayasa perangkat lunak, kolaborasi model AI, atau tawaran magang dan karir."
              : "Open for software engineering opportunities, AI research collaborations, or career discussions."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === "id" ? "Informasi Kontak Langsung" : "Direct Contact Channels"}
              </h3>

              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-colors group focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <div className="p-2 rounded-md bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email Utama</p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-colors group focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">GitHub Profile</p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      github.com/{PERSONAL_INFO.githubUsername}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="p-2 rounded-md bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Domain Pribadi</p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      https://{PERSONAL_INFO.domain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Lokasi Domisili</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Download Card */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>{language === "id" ? "Curriculum Vitae (CV)" : "Resume Document"}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "id"
                  ? "Salinan ringkasan resume formal untuk keperluan rekrutmen atau evaluasi teknis."
                  : "Formal resume summary available for recruitment or technical evaluation."}
              </p>
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Permintaan%20CV%20Oktavian%20Ramadhani&body=Halo%20Oktavian,%20saya%20ingin%20meminta%20salinan%20CV%20terbaru%20Anda.`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[42px]"
              >
                <Download className="w-4 h-4" />
                <span>{language === "id" ? "Request Dokumen CV via Email" : "Request CV via Email"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Mailto Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {language === "id" ? "Kirim Pesan Langsung" : "Send a Message"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                {language === "id"
                  ? "Formulir ini akan langsung membuka aplikasi email Anda dengan format pesan yang telah disiapkan rapi."
                  : "This form will prepare a structured email ready to send from your favorite email client."}
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>
                    {language === "id"
                      ? "Aplikasi email Anda telah dibuka. Silakan tekan kirim pada email tersebut."
                      : "Your email client has been prepared. Please review and hit send."}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {language === "id" ? "Nama Anda" : "Your Name"}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === "id" ? "cth. Budi Santoso" : "e.g. Jane Doe"}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {language === "id" ? "Alamat Email Anda" : "Your Email Address"}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {language === "id" ? "Subjek Percakapan" : "Subject"}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={language === "id" ? "cth. Peluang Magang Web Developer" : "e.g. Web Developer Project Opportunity"}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {language === "id" ? "Isi Pesan" : "Your Message"}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      language === "id"
                        ? "Tuliskan rincian kebutuhan proyek, tawaran karir, atau diskusi teknologi..."
                        : "Describe project requirements, career opportunities, or tech discussions..."
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === "id" ? "Buka Email & Kirim Pesan" : "Prepare Email & Send"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
