import Header from "@/components/Header";
import SkinRejuvenationHero from "@/components/SkinRejuvenationHero";
import SkinTechnologiesSection from "@/components/SkinTechnologiesSection";
import Consultation from "@/components/Consultation";

export default function SkinRejuvenationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <SkinRejuvenationHero />
        <SkinTechnologiesSection />
        <Consultation />
      </main>
    </div>
  );
}