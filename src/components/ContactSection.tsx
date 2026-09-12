"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/icons";
import {
  Mail,
  Send,
  MapPin,
  Globe,
  CheckCircle2,
  Download,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

export default function ContactSection() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage(
        language === "id"
          ? "Mohon lengkapi nama, email, dan pesan Anda terlebih dahulu."
          : "Please fill in your name, email, and message first."
      );
      setSuccessMessage("");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const getEmailContent = () => {
    const formattedSubject = subject
      ? `[Portfolio Inquiry] ${subject}`
      : `[Portfolio Inquiry] Pesan dari ${name || "Pengunjung"}`;

    const formattedBody =
      `Halo Oktavian,\n\n` +
      `Nama: ${name}\n` +
      `Email: ${email}\n\n` +
      `Pesan:\n${message}\n\n` +
      `Dikirim melalui portofolio personalporto.myon.my.id`;

    return { formattedSubject, formattedBody };
  };

  const handleSend = (target: "gmail" | "mailto" | "copy") => {
    if (!validateForm()) return;

    const { formattedSubject, formattedBody } = getEmailContent();

    if (target === "gmail") {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        PERSONAL_INFO.email
      )}&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(
        formattedBody
      )}`;
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
      setSuccessMessage(
        language === "id"
          ? "Membuka tab Gmail baru di browser. Silakan tinjau dan klik Send."
          : "Opened a new Gmail tab in your browser. Please review and hit Send."
      );
    } else if (target === "mailto") {
      const mailtoUrl = `mailto:${encodeURIComponent(
        PERSONAL_INFO.email
      )}?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(
        formattedBody
      )}`;
      window.location.href = mailtoUrl;
      setSuccessMessage(
        language === "id"
          ? "Membuka aplikasi email bawaan. Silakan tinjau dan klik Send."
          : "Opening default email app. Please review and hit Send."
      );
    } else if (target === "copy") {
      const fullText =
        `Kepada: ${PERSONAL_INFO.email}\n` +
        `Subjek: ${formattedSubject}\n\n` +
        `${formattedBody}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText);
        setCopiedDraft(true);
        setTimeout(() => setCopiedDraft(false), 3000);
        setSuccessMessage(
          language === "id"
            ? "Draf pesan dan email penerima telah disalin ke clipboard."
            : "Message draft and recipient email copied to clipboard."
        );
      }
    }
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950"
    >
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
                {/* Email Item with Direct Gmail Link + Copy Action */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-colors group">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      PERSONAL_INFO.email
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 flex-1 min-w-0 focus:outline-none"
                    title={language === "id" ? "Tulis email via Gmail Web" : "Compose via Gmail Web"}
                  >
                    <div className="p-2 rounded-md bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {language === "id" ? "Email Utama (Klik to Open)" : "Primary Email (Click to Open)"}
                      </p>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {PERSONAL_INFO.email}
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shrink-0"
                    title={language === "id" ? "Salin alamat email" : "Copy email address"}
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition-colors group focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === "id" ? "Profil GitHub" : "GitHub Profile"}
                    </p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      github.com/{PERSONAL_INFO.githubUsername}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="p-2 rounded-md bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === "id" ? "Domain Pribadi" : "Personal Domain"}
                    </p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      https://{PERSONAL_INFO.domain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === "id" ? "Lokasi Domisili" : "Location"}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Request Card with Multi-device Options */}
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

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    PERSONAL_INFO.email
                  )}&su=${encodeURIComponent(
                    "Permintaan Dokumen CV - Oktavian Ramadhani"
                  )}&body=${encodeURIComponent(
                    "Halo Oktavian,\n\nSaya tertarik dengan rekam jejak Anda dan bermaksud meminta salinan CV / Resume terbaru Anda untuk keperluan rekrutmen / kolaborasi proyek.\n\nTerima kasih."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[42px]"
                >
                  <Mail className="w-4 h-4" />
                  <span>{language === "id" ? "Request via Gmail Web" : "Request via Gmail Web"}</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Permintaan%20Dokumen%20CV%20-%20Oktavian%20Ramadhani&body=Halo%20Oktavian,%20saya%20ingin%20meminta%20salinan%20CV%20terbaru%20Anda.`}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[42px]"
                >
                  <span>{language === "id" ? "App Email / HP" : "Email App / Mobile"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-action Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {language === "id" ? "Kirim Pesan Langsung" : "Send a Direct Message"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
                {language === "id"
                  ? "Pilih metode pengiriman yang nyaman bagi Anda: langsung via tab Gmail di browser, aplikasi email default di perangkat / HP, atau salin draf."
                  : "Choose your preferred channel: directly via Gmail in your browser, your device's default mail app, or copy the formatted draft."}
              </p>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                    placeholder={
                      language === "id"
                        ? "cth. Peluang Magang Web Developer"
                        : "e.g. Web Developer Project Opportunity"
                    }
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

                {/* Multi-Action Button Bar */}
                <div className="pt-2 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => handleSend("gmail")}
                      className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs min-h-[44px]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{language === "id" ? "Buka di Gmail (Web)" : "Open in Gmail (Web)"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSend("mailto")}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
                    >
                      <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>{language === "id" ? "Aplikasi Email / HP" : "Email App / Mobile"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSend("copy")}
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 min-h-[44px]"
                      title={language === "id" ? "Salin draf pesan ke clipboard" : "Copy message draft"}
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                            {language === "id" ? "Tersalin!" : "Copied!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-xs">{language === "id" ? "Salin Draf" : "Copy Draft"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left pt-1">
                    {language === "id"
                      ? "*Tips: Pengguna laptop/komputer disarankan memilih 'Buka di Gmail (Web)' agar langsung terbuka di browser Anda."
                      : "*Tip: Desktop/laptop users are recommended to select 'Open in Gmail (Web)' to launch directly in your browser."}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
