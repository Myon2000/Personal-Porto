"use client";

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon } from "./icons";
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

interface ContactSectionProps {
  sectionIndex?: string;
}

export default function ContactSection({ sectionIndex = "05" }: ContactSectionProps) {
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
      className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Sandeep-style Section Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{sectionIndex}</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Kontak & Kolaborasi" : "Get In Touch"}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {language === "id" ? "Saluran Komunikasi Langsung" : "Direct Inquiries"}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            {language === "id"
              ? "Punya tantangan rekayasa, kolaborasi AI, atau peluang kerja?"
              : "Have a complex product, AI collaboration, or engineering role to discuss?"}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            {language === "id"
              ? "Terbuka untuk posisi full-time, magang industri, atau proyek komputasi cerdas. Silakan kirim pesan langsung melalui formulir atau kontak resmi di bawah."
              : "Open for software engineering roles, applied AI research collaborations, and internships. Reach out directly via the form or formal channels below."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {language === "id" ? "Saluran Kontak Utama" : "Primary Channels"}
              </h3>

              <div className="space-y-3 text-sm">
                {/* Email Item with Direct Gmail Link + Copy Action */}
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors group">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      PERSONAL_INFO.email
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 flex-1 min-w-0 focus:outline-none"
                    title={language === "id" ? "Tulis email via Gmail Web" : "Compose via Gmail Web"}
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {language === "id" ? "Email Utama (Gmail)" : "Primary Email"}
                      </p>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {PERSONAL_INFO.email}
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none shrink-0"
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
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors group focus:outline-none"
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {language === "id" ? "Repositori & Kode" : "Code Repository"}
                    </p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                      github.com/{PERSONAL_INFO.githubUsername}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {language === "id" ? "Domain Pribadi" : "Personal Domain"}
                    </p>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                      https://{PERSONAL_INFO.domain}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {language === "id" ? "Lokasi Domisili" : "Location"}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white font-mono">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Request Card with Multi-device Options */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>{language === "id" ? "Curriculum Vitae (CV)" : "Resume Document"}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {language === "id"
                  ? "Salinan ringkasan resume formal untuk evaluasi teknis rekrutmen atau kolaborasi proyek."
                  : "Formal resume summary available for technical evaluation or project collaboration."}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    PERSONAL_INFO.email
                  )}&su=${encodeURIComponent(
                    "Permintaan Dokumen CV - Oktavian Ramadhani"
                  )}&body=${encodeURIComponent(
                    "Halo Oktavian,\n\nSaya tertarik dengan profil portofolio Anda dan bermaksud meminta salinan resume CV terbaru Anda.\n\nTerima kasih."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[42px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Request via Gmail</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Permintaan%20Dokumen%20CV%20-%20Oktavian%20Ramadhani&body=Halo%20Oktavian,%20saya%20ingin%20meminta%20salinan%20CV%20terbaru%20Anda.`}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 transition-colors min-h-[42px]"
                >
                  <span>App Email / HP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-action Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {language === "id" ? "Kirim Pesan Terstruktur" : "Send a Direct Message"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1 font-normal">
                  {language === "id"
                    ? "Tulis rincian pesan di bawah, lalu pilih saluran pengiriman yang nyaman: via tab browser Gmail, aplikasi lokal, atau salin draf."
                    : "Formulate your message below, then select your preferred transmission channel: direct Gmail web tab, local mail app, or copy draft."}
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-mono flex items-center gap-2">
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {language === "id" ? "Nama Lengkap" : "Your Name"}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === "id" ? "cth. Budi Santoso" : "e.g. Jane Doe"}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {language === "id" ? "Alamat Email" : "Email Address"}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {language === "id" ? "Subjek / Topik" : "Subject Line"}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={
                      language === "id"
                        ? "cth. Peluang Proyek Web Developer / Riset AI"
                        : "e.g. Software Engineering Opportunity / AI Project"
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
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
                        ? "Tuliskan kebutuhan kolaborasi, peluang karir, atau diskusi teknologi..."
                        : "Describe project requirements, engineering challenges, or career discussions..."
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors resize-none font-mono"
                  />
                </div>

                {/* Multi-Action Button Bar */}
                <div className="pt-2 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSend("gmail")}
                      className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[44px]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === "id" ? "Kirim via Gmail (Web)" : "Send via Gmail (Web)"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSend("mailto")}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold uppercase tracking-wider transition-colors min-h-[44px]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{language === "id" ? "Aplikasi Email" : "Email Client"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSend("copy")}
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-medium transition-colors min-h-[44px]"
                      title={language === "id" ? "Salin draf pesan ke clipboard" : "Copy message draft"}
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                            {language === "id" ? "Tersalin!" : "Copied!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-xs">{language === "id" ? "Salin Draf" : "Copy Draft"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono pt-1 text-center sm:text-left">
                    {language === "id"
                      ? "*Disarankan memilih 'Kirim via Gmail (Web)' untuk pengguna browser di laptop / komputer."
                      : "*Recommended: 'Send via Gmail (Web)' opens directly in your active browser window."}
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
