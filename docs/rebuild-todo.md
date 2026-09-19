# Tracker Perombakan Portofolio 3-Halaman (Sandeep.design Reference)

Dokumen ini adalah acuan kerja dan pelacak progres (*checklist*) perombakan menyeluruh website portofolio **Oktavian Ramadhani (Vian)**. Dokumen ini dibuat agar proses pengerjaan tetap terarah, tidak keluar jalur, dan berpegang teguh pada prinsip desain anti-slop.

---

## 🔗 Golden Reference Links (Wajib Dipedomani Secara Ketat)

1. **Homepage:** [https://www.sandeep.design/](https://www.sandeep.design/)
2. **Work Page:** [https://www.sandeep.design/work](https://www.sandeep.design/work)
3. **About Page:** [https://www.sandeep.design/about](https://www.sandeep.design/about)

---

## 🛡️ Anti-AI Slop Directive & Aturan Desain

- **Warna & Permukaan:** Canvas murni netral (Light: `#FAFAF8` / `#FFFFFF`, Dark: `#090D16` / `#050505`). DILARANG menggunakan gradasi ungu/cyan generik, orbs blur, atau efek kaca berlebihan.
- **Tipografi Sandeep:**
  - Header & Headline: Grotesk bold sans-serif ber-tracking rapat (`tracking-[-0.035em]`), kontras tinggi.
  - Accent Headline: Warna aksen merah-oranye hangat (`#E8442E` / `#EA3826`) pada kata kunci pertama.
  - Monospace & Label: Font mono uppercase berjarak (`tracking-[0.2em]`) untuk metadata, penomoran section (`01`, `02`, dst.), dan link berpanah (`↗`).
- **Data Nyata & Terverifikasi:** Menggunakan data asli dari CV Vian (`Oktavian Ramadhani-resume.md`), metrik empiris riset Alzheimer DenseNet-169 (Akurasi 99.92%, 5.098 sampel), dataset patologi ikan nila asli NilaHealth, dan bukti kepemimpinan UNEJ.
- **Fitur Interaktif Nyata:**
  - Background Hero: Canvas 2D interactive green dot vortex yang dinamis mengikuti pergerakan kursor mouse (dengan spring interpolation & fallback drift di HP).
  - Simulator AI Alzheimer: Tetap terpasang di studi kasus unggulan.
  - Modal Alur Sistem: Tetap terpasang pada SiPuBi dan NilaHealth.
  - Minigame Retro Snake: Tetap terpasang di halaman Home sebelum penutup.
- **Sistem Dwibahasa (ID / EN) & Dual Mode:** Navbar dan teks seluruh halaman beralih secara reaktif dan mulus.

---

## 🗺️ Peta Arsitektur 3 Halaman

```
/ (Home)
├── Navbar (2 Baris: Brand/Nav/Action + Sub-bar PORTFOLIO '26 / OPEN TO WORK)
├── Hero (Tipografi Raksasa Rata Kiri + Canvas Dot Vortex Hover + Kaki Bio & CTA)
├── 01 / Featured Case (Alzheimer DenseNet-169 + Interactive Simulator)
├── 02 / Selected Works (SiPuBi, NilaHealth, Web Klinik Gigi + Modal Alur Sistem)
├── 03 / Why Work With Me? (Kartu A, B, C Filosofi Rekayasa)
├── 04 / How I Work? (Kartu H.01 - H.04 Proses Kolaborasi)
├── 05 / Tech Stack & Tools (Infinite Horizontal Marquee Ticker)
├── 06 / Retro Terminal Snake (Minigame Bug Eater)
├── 07 / Get In Touch (Minimalist Strip CTA)
└── Footer

/work (Karya & Pengalaman)
├── Navbar
├── 01 / Work (Headline Eksplorasi Karya)
├── 02 / Selected (Studi Kasus Bernomor P.01 - P.05)
├── 03 / Archived & Coursework (Daftar Repositori Cepat)
├── 04 / Professional & Community Experience (KOMPIS, Cafe Content Creator, HMIF, I/O)
├── 05 / How I Work? (Kartu H.01 - H.04)
├── 06 / Get In Touch (Minimalist Strip CTA)
└── Footer

/about (Tentang & Resume)
├── Navbar
├── 01 / About Me (Foto Potret Asli + Narasi Biografi)
├── 02 / Curriculum Vitæ (Tombol Download Resume PDF + Timeline Edukasi UNEJ IPK 3.84 & Karir)
├── 03 / Things I Believe (Prinsip Rekayasa T.01 - T.03)
├── 04 / How I Work? (Kartu H.01 - H.04)
├── 05 / Get In Touch (Formulir Kontak Lengkap: Gmail Web, App Email, Salin Draf)
└── Footer
```

---

## 📋 Checklist Eksekusi Bertahap

### Fase 0: Setup Aset & Fondasi
- [x] Salin dokumen resume resmi `f:\PETING\Oktavian Ramadhani-resume.pdf` ke `public/resume.pdf`
- [x] Pastikan avatar foto profil asli Vian (`public/avatar.png`) terpasang pada favicon browser dan navbar
- [x] Buat dokumen `docs/rebuild-todo.md` ini sebagai acuan kerja

### Fase 1: Navbar & Hero Section Interaktif (Home)
- [x] Rancang komponen `src/components/HeroDotField.tsx`: Canvas 2D partikel pusaran hijau interaktif bereaksi terhadap mouse hover (lerp smoothing, dpr-aware, pause saat off-screen)
- [x] Perbarui `src/components/Navbar.tsx`:
  - Baris 1: `OKTAVIAN RAMADHANI` (kiri) | `HOME  WORK  ABOUT` (tengah, active-state via `usePathname`) | `BOOK A CALL ↗` / Kontak + Switcher ID/EN & Tema (kanan)
  - Garis pemisah horizontal tipis
- [x] Rancang ulang `src/components/HeroSection.tsx`:
  - Tipografi raksasa rata kiri persis Sandeep
  - Aksen warna oranye-merah (`#EA3826`) pada kata kunci pembuka
  - Sub-header status bar: `PORTFOLIO '26` (kiri) | `● OPEN TO WORK` (kanan, dot oranye-merah)
  - Kaki kiri: Ringkasan bio profesional 2 kalimat
  - Kaki kanan: Tombol teks `GET IN TOUCH ↗`

### Fase 2: Reorganisasi Halaman Home (`/`)
- [ ] Section `01 / Featured Case`: Menampilkan Alzheimer MRI DenseNet-169 + `AlzheimerSimulator` interaktif
- [ ] Section `02 / Selected`: Menampilkan SiPuBi, NilaHealth, Web Klinik Gigi dengan tombol pratinjau modal alur sistem
- [ ] Section `03 / Why Work With Me?`: Kartu A/B/C (Integritas Sistem, ML Empiris, Dampak Lapangan)
- [ ] Section `04 / How I Work?`: Kartu proses kolaborasi H.01 - H.04 (Discovery, Documented, Clear Specs, Support)
- [ ] Section `05 / Tech Stack & Tools`: Ticker marquee horizontal berjalan mulus (hover to pause)
- [ ] Section `06 / Retro Terminal Playground`: Minigame Retro Snake Bug Eater
- [ ] Section `07 / Get In Touch`: Strip CTA minimalis menghubungkan ke `/about#contact`

### Fase 3: Pembangunan Halaman Work (`/work`)
- [ ] Buat page route `src/app/work/page.tsx`
- [ ] Section `01 / Work`: Header besar *"Selected work across products, systems, and experiments"*
- [ ] Section `02 / Selected`: Daftar studi kasus bernomor `P. 01` - `P. 05`
- [ ] Section `03 / Archived & Coursework`: Daftar baris ringkas repositori publik & proyek kuliah
- [ ] Section `04 / Work & Community Experience`: Timeline pengalaman dari CV (KOMPIS, Cafe Dewisri, HMIF, I/O)
- [ ] Section `05 / How I Work?`: Kartu H.01 - H.04
- [ ] Section `06 / Get In Touch`: Strip CTA penutup

### Fase 4: Pembangunan Halaman About (`/about`)
- [ ] Buat page route `src/app/about/page.tsx`
- [ ] Section `01 / About Me`: Potret asli Vian + biografi terkurasi
- [ ] Section `02 / Curriculum Vitæ`: Tombol `[ Download Resume ]` mengunduh `/resume.pdf` + timeline pendidikan UNEJ IPK 3.84 & riwayat organisasi
- [ ] Section `03 / Things I Believe`: Prinsip T.01 - T.03
- [ ] Section `04 / How I Work?`: Kartu H.01 - H.04
- [ ] Section `05 / Contact Form`: Komponen formulir kontak lengkap 3-channel (`ContactSection`)

### Fase 5: Verifikasi, Build & Deployment
- [ ] Jalankan audit linting `npm run lint` (0 error, 0 warning)
- [ ] Jalankan pengujian build Next.js produksi `npm run build`
- [ ] Pastikan navigasi antarmuka mulus di layar Desktop, Tablet, dan Smartphone
- [ ] Buat commit Git yang bersih dan push ke branch `main` GitHub untuk live deployment di `personalporto.myon.my.id`
