import type { Metadata } from "next";
import TilPageContent from "@/components/til/TilPageContent";

export const metadata: Metadata = {
  title: "Today I Learned | Oktavian Ramadhani",
  description:
    "Daily technical takeaways, applied AI insights, web architecture patterns, and engineering notes by Oktavian Ramadhani.",
};

export default function TilPage() {
  return <TilPageContent />;
}
