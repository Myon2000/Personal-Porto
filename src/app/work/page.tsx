import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";

export const metadata: Metadata = {
  title: "Work & Experience | Oktavian Ramadhani",
  description:
    "Selected software engineering works, applied Deep Learning models, and leadership experience of Oktavian Ramadhani.",
};

export default function WorkPage() {
  return <WorkPageContent />;
}
