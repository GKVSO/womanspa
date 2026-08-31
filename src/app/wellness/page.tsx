import Header from "@/components/Header";
import WellnessHero from "@/components/WellnessHero";
import WellnessTechnologiesSection from "@/components/WellnessTechnologiesSection";
import Consultation from "@/components/Consultation";

export default function WellnessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <WellnessHero />
        <WellnessTechnologiesSection />
        <Consultation showOnMobile />
      </main>
    </div>
  );
}