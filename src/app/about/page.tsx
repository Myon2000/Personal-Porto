import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About & Resume | Oktavian Ramadhani",
  description:
    "Learn about Oktavian Ramadhani's engineering philosophy, curriculum vitae, and download official resume.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
