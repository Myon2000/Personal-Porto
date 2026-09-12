export interface ProjectItem {
  id: string;
  title: string;
  category: "ml" | "web" | "system";
  badge: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  highlights: {
    id: string[];
    en: string[];
  };
  tags: string[];
  githubUrl: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: {
    id: string;
    en: string;
  };
  iconName: string;
  skills: {
    name: string;
    level: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: {
    id: string;
    en: string;
  };
  organizer: string;
  year: string;
  field: string;
  description: {
    id: string;
    en: string;
  };
  isWinner?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: {
    id: string;
    en: string;
  };
  organization: string;
  period: string;
  description: {
    id: string;
    en: string;
  };
}

export const PERSONAL_INFO = {
  name: "Oktavian Ramadhani",
  nickname: "Oktavian",
  domain: "myon.my.id",
  githubUsername: "Myon2000",
  githubUrl: "https://github.com/Myon2000",
  email: "oktavianramadhani25@gmail.com",
  location: "Jember, Indonesia",
  university: "Universitas Jember",
  faculty: "Fakultas Ilmu Komputer (Fasilkom)",
  status: {
    id: "Terbuka untuk Peluang Kerja & Magang",
    en: "Open to Work & Internship Opportunities",
  },
  roles: {
    id: "Web Developer & Pengembang Model AI",
    en: "Web Developer & Applied ML Builder",
  },
  bio: {
    id: "Mahasiswa Ilmu Komputer di Universitas Jember dengan fokus pada pengembangan sistem web terukur dan implementasi model kecerdasan buatan (Deep Learning). Berpengalaman membangun aplikasi sistem informasi terintegrasi, arsitektur backend, serta pipeline pelatihan Computer Vision.",
    en: "Computer Science student at University of Jember focusing on scalable web engineering and applied Deep Learning solutions. Experienced in building integrated management systems, solid backend APIs, and computer vision classification pipelines.",
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: {
      id: "Pengembangan Web (Full-Stack)",
      en: "Full-Stack Web Development",
    },
    iconName: "Code",
    skills: [
      { name: "TypeScript & JavaScript", level: "Mahir" },
      { name: "Next.js & React", level: "Mahir" },
      { name: "PHP & Laravel / Blade", level: "Kompeten" },
      { name: "Tailwind CSS & Responsive UI", level: "Mahir" },
      { name: "RESTful API Architecture", level: "Kompeten" },
    ],
  },
  {
    title: {
      id: "Machine Learning & AI",
      en: "Machine Learning & Applied AI",
    },
    iconName: "Brain",
    skills: [
      { name: "Python", level: "Mahir" },
      { name: "PyTorch & Deep Learning", level: "Kompeten" },
      { name: "Convolutional Networks (DenseNet)", level: "Kompeten" },
      { name: "Medical Image Classification", level: "Spesialisasi" },
      { name: "Data Preprocessing & Evaluation", level: "Kompeten" },
    ],
  },
  {
    title: {
      id: "Infrastruktur, Security & Tools",
      en: "Infrastructure, Security & Tools",
    },
    iconName: "Shield",
    skills: [
      { name: "Server Security & DDOS Mitigation", level: "Juara 1 LAOS" },
      { name: "Linux Server Management", level: "Kompeten" },
      { name: "Git & GitHub Collaboration", level: "Mahir" },
      { name: "MySQL & Relational Databases", level: "Kompeten" },
      { name: "Cloud Deployment (Vercel)", level: "Mahir" },
    ],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "alzheimer-densenet",
    title: "Alzheimer MRI Classification with DenseNet-169",
    category: "ml",
    featured: true,
    badge: {
      id: "Sorotan Machine Learning",
      en: "Machine Learning Spotlight",
    },
    description: {
      id: "Pengembangan dan eksperimen model Deep Learning menggunakan arsitektur DenseNet-169 untuk mengklasifikasikan tahapan penyakit Alzheimer berdasarkan citra MRI otak. Model memanfaatkan koneksi dense inter-layer untuk mereduksi problem vanishing gradient dan memaksimalkan ekstraksi fitur.",
      en: "Deep Learning research and pipeline implementation utilizing DenseNet-169 architecture to classify Alzheimer disease progression stages from MRI scans. Leverages dense inter-layer connections to minimize vanishing gradient and maximize feature reuse.",
    },
    highlights: {
      id: [
        "Implementasi arsitektur DenseNet-169 dengan transfer learning",
        "Pipeline pra-pemrosesan citra MRI dan augmentasi data",
        "Evaluasi komprehensif menggunakan metrik Confusion Matrix dan F1-Score",
      ],
      en: [
        "DenseNet-169 architecture implementation with transfer learning",
        "Brain MRI pre-processing and data augmentation pipeline",
        "Evaluation using Confusion Matrix and F1-Score metrics",
      ],
    },
    tags: ["Python", "PyTorch", "Deep Learning", "DenseNet-169", "Computer Vision"],
    githubUrl: "https://github.com/Myon2000/Alzheimer-DenseNet-169",
  },
  {
    id: "sipubi",
    title: "SiPuBi: Sistem Distribusi Pupuk Bersubsidi",
    category: "web",
    featured: true,
    badge: {
      id: "Terverifikasi Sertifikat",
      en: "Certified System",
    },
    description: {
      id: "Sistem informasi pengelolaan dan pemantauan alur distribusi pupuk bersubsidi untuk menjamin transparansi penyaluran komoditas kepada petani penerima hak. Dilengkapi alur verifikasi data dan pencatatan distribusi terpusat.",
      en: "Information system engineered to manage and monitor subsidized fertilizer distribution workflows, ensuring transparency and accountable allocation for registered farmers.",
    },
    highlights: {
      id: [
        "Tervalidasi sertifikat resmi implementasi sistem informasi",
        "Manajemen kuota dan tracking riwayat distribusi per wilayah",
        "Arsitektur database relasional untuk konsistensi pencatatan",
      ],
      en: [
        "Officially recognized with system implementation certificate",
        "Regional quota management and distribution tracking",
        "Relational database architecture for data consistency",
      ],
    },
    tags: ["PHP", "MySQL", "JavaScript", "Information System", "Web App"],
    githubUrl: "https://github.com/Myon2000/SiPuBi",
  },
  {
    id: "nila-health",
    title: "NilaHealth: Platform Layanan Kesehatan Digital",
    category: "web",
    featured: true,
    badge: {
      id: "Aplikasi Kesehatan",
      en: "Healthcare Platform",
    },
    description: {
      id: "Platform layanan digital untuk sektor kesehatan yang mempermudah organisasi data kesehatan, visualisasi informasi fasilitas medis, dan pengalaman pengguna yang intuitif melalui komponen berbasis TypeScript dan Blade.",
      en: "Digital healthcare platform built to streamline health data management, medical service facility visualization, and intuitive patient interaction using modern component design.",
    },
    highlights: {
      id: [
        "Dibangun dalam varian TypeScript modern dan arsitektur Blade",
        "Desain antarmuka responsif dan ramah aksesibilitas",
        "Struktur data modular untuk kemudahan skalabilitas fitur",
      ],
      en: [
        "Developed across modern TypeScript and Blade architectures",
        "Responsive, accessibility-focused interface design",
        "Modular data structures for straightforward feature scaling",
      ],
    },
    tags: ["TypeScript", "PHP", "Blade", "Tailwind CSS", "Healthcare"],
    githubUrl: "https://github.com/Myon2000/NilaHealth2",
  },
  {
    id: "web-klinik-gigi",
    title: "Sistem Operasional Klinik Gigi Terpadu",
    category: "web",
    featured: true,
    badge: {
      id: "Proyek Terbaru (2026)",
      en: "Recent Project (2026)",
    },
    description: {
      id: "Aplikasi web modern untuk manajemen jadwal konsultasi dokter gigi, registrasi pasien berkala, dan rekam layanan tindakan medis klinik secara paperless.",
      en: "Modern web application for dental clinic management, scheduling dentist consultations, patient intake, and digital record keeping for clinic treatments.",
    },
    highlights: {
      id: [
        "Alur penjadwalan temu janji interaktif dan bebas konflik waktu",
        "Dashboard pencatatan tindakan dan riwayat kunjungan pasien",
        "Antarmuka bersih berfokus pada kemudahan staf klinik",
      ],
      en: [
        "Interactive appointment scheduling avoiding time slot conflicts",
        "Patient visit logs and medical action tracking dashboard",
        "Clean, intuitive interface tailored for clinic administrative staff",
      ],
    },
    tags: ["JavaScript", "Full-Stack", "Web Management", "Clinic Portal"],
    githubUrl: "https://github.com/Myon2000/web-klinik-gigi",
  },
  {
    id: "leave-management",
    title: "Employee Leave Management System",
    category: "system",
    featured: false,
    badge: {
      id: "Sistem Korporat",
      en: "Enterprise Workflow",
    },
    description: {
      id: "Sistem otomasi siklus pengajuan, kalkulasi sisa kuota, serta persetujuan cuti kerja karyawan dengan pembagian hak akses terpisah antara staf dan manajer.",
      en: "Automated leave request management, balance calculation, and administrative approval system with strict multi-role permission separation.",
    },
    highlights: {
      id: [
        "Otentikasi aman berbasis sesi dan otorisasi bertingkat",
        "Kalkulasi kuota cuti otomatis dan pelaporan status pengajuan",
        "Manajemen data karyawan dan pencatatan audit log",
      ],
      en: [
        "Secure session-based authentication and role authorization",
        "Automatic leave balance calculation with real-time status updates",
        "Employee records management with traceable audit history",
      ],
    },
    tags: ["PHP", "MySQL", "RBAC", "Enterprise System"],
    githubUrl: "https://github.com/Myon2000/leave-management-system",
  },
  {
    id: "lelangin-cekakarta",
    title: "Lelangin & CekakArta: Platform Finansial & Lelang",
    category: "system",
    featured: false,
    badge: {
      id: "Solusi Finansial",
      en: "Financial Solutions",
    },
    description: {
      id: "Eksplorasi arsitektur sistem lelang barang secara daring (Lelangin) dan pengelolaan kalkulasi finansial digital (CekakArta) dengan fokus pada validasi input dan integritas transaksi.",
      en: "Exploration of digital bidding architectures (Lelangin) and personal finance calculations (CekakArta) with strict input validation and transaction integrity.",
    },
    highlights: {
      id: [
        "Logika penawaran lelang real-time dengan validasi selisih harga",
        "Pemodelan data keuangan terstruktur dengan Python dan JS",
        "Pemisahan modul logika bisnis dan presentasi antarmuka",
      ],
      en: [
        "Real-time bidding mechanism with price increment validations",
        "Structured financial data modeling in Python and JavaScript",
        "Separation of business logic modules and presentation layers",
      ],
    },
    tags: ["Python", "JavaScript", "Financial Tools", "Data Modeling"],
    githubUrl: "https://github.com/Myon2000/Lelangin",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "laos-arena",
    title: {
      id: "Juara 1: LAOS Arena (Keamanan Server & DDOS)",
      en: "1st Winner: LAOS Arena (Server Security & DDOS)",
    },
    organizer: "UKM LAOS (Linux and Open Source) Universitas Jember",
    year: "2024",
    field: "Cyber Security & Server Defense",
    description: {
      id: "Meraih Juara 1 pada kompetisi pertahanan server Linux dari serangan simulasi Denial of Service (DDOS), konfigurasi firewall, serta mitigasi gangguan performa sistem.",
      en: "Awarded 1st Place in server defense competition focusing on Linux hardening, firewall tuning, and mitigating live Denial of Service (DDOS) simulations.",
    },
    isWinner: true,
  },
  {
    id: "cpc-friendship",
    title: {
      id: "Juara: Competitive Programming Championship (Friendship)",
      en: "Winner: Competitive Programming Championship (Friendship)",
    },
    organizer: "BEM Fakultas Ilmu Komputer Universitas Jember",
    year: "2024",
    field: "Algorithms & Competitive Programming",
    description: {
      id: "Penghargaan atas penyelesaian tantangan algoritma kompleks, analisis kompleksitas waktu, dan pengoptimalan struktur data di ajang tahunan Friendship Fasilkom UNEJ.",
      en: "Recognized for solving complex algorithmic challenges, time complexity optimization, and robust data structures at the annual Friendship event.",
    },
    isWinner: true,
  },
  {
    id: "sipubi-cert",
    title: {
      id: "Sertifikat Pengelolaan Sistem SIPUBI",
      en: "Certified System: SIPUBI Fertilizer Distribution",
    },
    organizer: "Distribusi Pupuk Bersubsidi",
    year: "2025",
    field: "Software Engineering & System Delivery",
    description: {
      id: "Sertifikat bukti resmi atas implementasi dan pengelolaan perangkat lunak Sistem Pengelolaan Distribusi Pupuk Bersubsidi (SIPUBI).",
      en: "Official credential certifying the development and operational delivery of the Subsidized Fertilizer Distribution System (SIPUBI).",
    },
    isWinner: false,
  },
  {
    id: "icom-2024",
    title: {
      id: "Informatics Competition (I-COM)",
      en: "Informatics Competition (I-COM)",
    },
    organizer: "Himpunan Mahasiswa Informatika (HMIF) Universitas Jember",
    year: "2024",
    field: "Informatics Challenge",
    description: {
      id: "Partisipasi aktif dalam kompetisi bidang teknologi informasi tingkat mahasiswa yang menguji kapabilitas pemecahan masalah teknis.",
      en: "Active participation in academic computing competition testing technical problem-solving and software innovation.",
    },
    isWinner: false,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "informatics-olympiad-2025",
    role: {
      id: "Ketua Pelaksana - Informatics Olympiad 2025",
      en: "Project Lead - Informatics Olympiad 2025",
    },
    organization: "Universitas Jember",
    period: "2025",
    description: {
      id: "Memimpin perencanaan strategis, manajemen puluhan panitia, penyusunan anggaran, serta koordinasi teknis pelaksanaan olimpiade informatika.",
      en: "Directed strategic planning, managed cross-functional committee members, allocated resources, and supervised technical execution for the regional olympiad.",
    },
  },
  {
    id: "hmif-leadership",
    role: {
      id: "Pengurus Himpunan Mahasiswa Informatika (HMIF)",
      en: "Executive Board - Informatics Student Association",
    },
    organization: "HMIF Universitas Jember",
    period: "2023 - 2025 (2 Periode)",
    description: {
      id: "Berperan aktif selama dua periode berturut-turut dalam merancang program kerja teknologi, kaderisasi mahasiswa, dan tata kelola kegiatan fakultas.",
      en: "Served for two consecutive terms driving technology work programs, student mentoring initiatives, and organizational governance at the faculty level.",
    },
  },
  {
    id: "icom-committee",
    role: {
      id: "Panitia Divisi Perlengkapan: I-COM 2024",
      en: "Logistics Committee: I-COM 2024",
    },
    organization: "HMIF Universitas Jember",
    period: "2024",
    description: {
      id: "Bertanggung jawab atas kesiapan sarana teknis, inventaris perangkat keras, dan kelancaran infrastruktur penunjang kompetisi informatika.",
      en: "Managed technical equipment readiness, hardware inventory, and infrastructure stability supporting hundreds of competition participants.",
    },
  },
];
