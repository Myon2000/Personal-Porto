import HeroSection from "@/components/home/HeroSection";
import FeaturedCaseSection from "@/components/home/FeaturedCaseSection";
import SelectedWorksSection from "@/components/home/SelectedWorksSection";
import WhyWorkWithMe from "@/components/home/WhyWorkWithMe";
import HowIWork from "@/components/shared/HowIWork";
import TechStackMarquee from "@/components/home/TechStackMarquee";
import RetroSnakeGame from "@/components/home/RetroSnakeGame";
import HomeContactCTA from "@/components/home/HomeContactCTA";

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
