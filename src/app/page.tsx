import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import ContactSection from "@/components/ContactSection";
import RetroSnakeGame from "@/components/RetroSnakeGame";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <TechStackMarquee />
      <ContactSection />
      <RetroSnakeGame />
    </div>
  );
}
