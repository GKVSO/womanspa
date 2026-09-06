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
        <Consultation 
          showOnMobile 
          title="Book Your Private Consultation"
          giftText="Book a complimentary consultation and get a $100 Welcome Gift toward your first treatment"
          bullets={[
            "One-on-one conversation in a discreet luxury suite",
            "Complete privacy and zero pressure",
            "Technology recommendation",
            "Transparent pricing and timeline"
          ]}
        />
      </main>
    </div>
  );
}