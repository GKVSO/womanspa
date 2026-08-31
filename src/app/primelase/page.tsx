import Header from "@/components/Header";
import PrimelaseHero from "@/components/PrimelaseHero";
import PrimelaseConsultation from "@/components/PrimelaseConsultation";
import PrimelaseBenefits from "@/components/PrimelaseBenefits";
import PrimelaseTechnology from "@/components/PrimelaseTechnology";
import PrimelaseCandidate from "@/components/PrimelaseCandidate";
import PrimelaseGallerySlider from "@/components/PrimelaseGallerySlider";
import PrimelaseReviewsSlider from "@/components/PrimelaseReviewsSlider";
import PrimelaseFAQ from "@/components/PrimelaseFAQ";
import Consultation from "@/components/Consultation";

export default function PrimelasePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <PrimelaseHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <PrimelaseConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <PrimelaseBenefits />
        </div>

        <PrimelaseTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <PrimelaseCandidate />
        </div>

        <PrimelaseGallerySlider />
        <PrimelaseReviewsSlider />
        <PrimelaseFAQ />
        <Consultation />
      </main>
    </div>
  );
}