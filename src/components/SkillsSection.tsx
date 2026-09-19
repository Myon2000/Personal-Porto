"use client";

import { useLanguage } from "@/context/language-context";
import { Code, Brain, Shield, Server } from "lucide-react";

export default function SkillsSection() {
  const { language } = useLanguage();

  const capabilities = language === "id" ? [
    {
      code: "C. 01",
      icon: Code,
      title: "Rekayasa Web Full-Stack",
      tagline: "Arsitektur aplikasi web modern dari API hingga antarmuka reaktif",
      description: "Berpengalaman merancang sistem informasi terintegrasi menggunakan Next.js, React, TypeScript, dan Laravel. Menitikberatkan pada pemisahan logika bisnis yang bersih, kepatuhan arsitektur RESTful API, dan pengalaman pengguna yang cepat dan aksesibel.",
      stack: ["Next.js", "React", "TypeScript", "Laravel 12", "PHP", "Tailwind CSS", "RESTful APIs"],
    },
    {
      code: "C. 02",
      icon: Brain,
      title: "Applied Deep Learning & Computer Vision",
      tagline: "Pipeline klasifikasi citra medis dan patologi perikanan",
      description: "Mengembangkan arsitektur Convolutional Neural Networks (DenseNet-169 dan EfficientNet) untuk klasifikasi citra kompleks. Terbukti mencapai akurasi 99.92% pada klasifikasi MRI otak Alzheimer dan model deteksi 6 patologi ikan nila pada kemitraan tambak Jember.",
      stack: ["PyTorch", "TensorFlow", "DenseNet-169", "EfficientNet", "Computer Vision", "Data Preprocessing"],
    },
    {
      code: "C. 03",
      icon: Shield,
      title: "Keamanan Server & Pertahanan Sistem",
      tagline: "Pengerasan server Linux dan integritas data ACID",
      description: "Meraih Juara 1 LAOS Arena dalam simulasi pertahanan server terhadap serangan Denial of Service (DDoS). Menguasai konfigurasi firewall, audit akses, serta perancangan skema relasional MySQL yang mencegah manipulasi kuota dan redudansi data.",
      stack: ["Linux Administration", "DDoS Mitigation", "Firewall Hardening", "MySQL Relational Schemas", "RBAC Security"],
    },
    {
      code: "C. 04",
      icon: Server,
      title: "Microservices & Siklus Cloud",
      tagline: "Integrasi sistem monolitik dengan AI engine terisolasi",
      description: "Menghubungkan aplikasi web inti (Laravel) dengan microservice inferensi model Python (Flask) via protokol REST API asinkron. Memastikan pipeline deployment lancar melalui Git/GitHub dan cloud server Vercel.",
      stack: ["Flask AI API", "Microservices Architecture", "Git & GitHub", "Vercel Cloud", "Multipart Uploads"],
    },
  ] : [
    {
      code: "C. 01",
      icon: Code,
      title: "Full-Stack Web Engineering",
      tagline: "Modern web architectures from secure APIs to reactive interfaces",
      description: "Experienced in building production-ready web systems using Next.js, React, TypeScript, and Laravel. Emphasizing clean domain separation, RESTful API adherence, and accessible, responsive user interfaces.",
      stack: ["Next.js", "React", "TypeScript", "Laravel 12", "PHP", "Tailwind CSS", "RESTful APIs"],
    },
    {
      code: "C. 02",
      icon: Brain,
      title: "Applied Deep Learning & Computer Vision",
      tagline: "Medical scan and aquaculture pathology classification pipelines",
      description: "Developing Convolutional Neural Networks (DenseNet-169 and EfficientNet) for nuanced image classification. Proven track record achieving 99.92% test accuracy on Alzheimer MRI staging and 6-class tilapia pathology detection in Jember partner ponds.",
      stack: ["PyTorch", "TensorFlow", "DenseNet-169", "EfficientNet", "Computer Vision", "Data Preprocessing"],
    },
    {
      code: "C. 03",
      icon: Shield,
      title: "Defensive Security & Server Hardening",
      tagline: "Linux server defense, DDoS mitigation, and relational integrity",
      description: "1st Place Winner in LAOS Arena live server defense simulation against Denial of Service (DDoS) traffic. Skilled in firewall tuning, access control audits, and MySQL schema design enforcing strict transactional consistency.",
      stack: ["Linux Administration", "DDoS Mitigation", "Firewall Hardening", "MySQL Relational Schemas", "RBAC Security"],
    },
    {
      code: "C. 04",
      icon: Server,
      title: "Microservices & Cloud Delivery",
      tagline: "Connecting web backends to decoupled Python AI inference services",
      description: "Architecting decoupled microservice workflows connecting Laravel web applications to Python Flask AI engines via asynchronous REST endpoints. Ensuring streamlined deployments across Git/GitHub and Vercel cloud edge infrastructure.",
      stack: ["Flask AI API", "Microservices Architecture", "Git & GitHub", "Vercel Cloud", "Multipart Uploads"],
    },
  ];

  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Sandeep-style Section Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">02</span>
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <span className="uppercase tracking-[0.25em] text-slate-900 dark:text-white font-semibold">
              {language === "id" ? "Kemampuan Teknis" : "Technical Capabilities"}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            {language === "id" ? "Fokus Rekayasa Web & AI" : "Web & AI Engineering Focus"}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
            {language === "id"
              ? "Keahlian rekayasa yang mencakup siklus perangkat lunak dan komputasi cerdas."
              : "Engineering capabilities spanning the full software lifecycle and applied intelligence."}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            {language === "id"
              ? "Fokus pada dua pilar utama: pembangunan aplikasi web yang andal dan implementasi model kecerdasan buatan teruji."
              : "Focused on two complementary pillars: mission-critical full-stack web applications and empirically validated Deep Learning models."}
          </p>
        </div>

        {/* 4 Numeric Cards: C.01 to C.04 in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.code}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white tracking-widest">
                      {cap.code}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {cap.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {cap.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                {/* Stack Pills (clean, no skill levels) */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                  {cap.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
