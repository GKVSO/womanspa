import Header from "@/components/Header";
import ExionHero from "@/components/ExionHero";
import ExionConsultation from "@/components/ExionConsultation";
import ExionBenefits from "@/components/ExionBenefits";
import ExionTechnology from "@/components/ExionTechnology";
import ExionCandidate from "@/components/ExionCandidate";
import ExionGallerySlider from "@/components/ExionGallerySlider";
import ExionReviewsSlider from "@/components/ExionReviewsSlider";
import ExionFAQ from "@/components/ExionFAQ";
import Consultation from "@/components/Consultation";

export default function ExionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <ExionHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <ExionConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <ExionBenefits />
        </div>

        <ExionTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <ExionCandidate />
        </div>

        <ExionGallerySlider />
        <ExionReviewsSlider />
        <ExionFAQ />
        <Consultation />
      </main>
    </div>
  );
}