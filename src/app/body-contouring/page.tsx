import Header from "@/components/Header";
import BodyContouringHero from "@/components/BodyContouringHero";
import TechnologiesSection from "@/components/TechnologiesSection";
import BodyContouringConsultation from "@/components/BodyContouringConsultation";

export default function BodyContouringPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BodyContouringHero />
        <TechnologiesSection />
        <BodyContouringConsultation />
      </main>
    </div>
  );
}
