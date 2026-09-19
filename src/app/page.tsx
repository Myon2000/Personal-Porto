import HeroSection from "@/components/HeroSection";
import FeaturedCaseSection from "@/components/FeaturedCaseSection";
import SelectedWorksSection from "@/components/SelectedWorksSection";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import HowIWork from "@/components/HowIWork";
import TechStackMarquee from "@/components/TechStackMarquee";
import RetroSnakeGame from "@/components/RetroSnakeGame";
import HomeContactCTA from "@/components/HomeContactCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedCaseSection />
      <SelectedWorksSection />
      <WhyWorkWithMe />
      <HowIWork />
      <TechStackMarquee />
      <RetroSnakeGame />
      <HomeContactCTA />
    </div>
  );
}
