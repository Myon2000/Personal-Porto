import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myon.my.id"),
  title: {
    default: "Oktavian Ramadhani | Web Developer & Applied ML",
    template: "%s | Oktavian Ramadhani",
  },
  description:
    "Portofolio profesional Oktavian Ramadhani. Pengembang Web Full-Stack dan Pembuat Model AI (Deep Learning) berbasis di Indonesia.",
  keywords: [
    "Oktavian Ramadhani",
    "Myon2000",
    "myon.my.id",
    "Web Developer Indonesia",
    "Machine Learning Engineer",
    "Next.js",
    "Tailwind CSS",
    "Deep Learning",
    "DenseNet",
  ],
  authors: [{ name: "Oktavian Ramadhani", url: "https://myon.my.id" }],
  creator: "Oktavian Ramadhani",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://myon.my.id",
    siteName: "Oktavian Ramadhani Portfolio",
    title: "Oktavian Ramadhani | Web Developer & Applied ML",
    description:
      "Portofolio profesional Oktavian Ramadhani. Full-Stack Web Developer dan Pengembang Model Machine Learning.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 1500,
        alt: "Oktavian Ramadhani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oktavian Ramadhani | Web Developer & Applied ML",
    description:
      "Portofolio profesional Oktavian Ramadhani. Full-Stack Web Developer dan Pengembang Model Machine Learning.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen flex flex-col font-sans antialiased selection:bg-sky-500/20 selection:text-sky-600 dark:selection:text-sky-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
