import Header from "@/components/Header";
import EmsculptHero from "@/components/EmsculptHero";
import EmsculptConsultation from "@/components/EmsculptConsultation";
import EmsculptBenefits from "@/components/EmsculptBenefits";
import EmsculptTechnology from "@/components/EmsculptTechnology";
import EmsculptTreatmentAreas from "@/components/EmsculptTreatmentAreas";
import EmsculptGallerySlider from "@/components/EmsculptGallerySlider";
import EmsculptReviewsSlider from "@/components/EmsculptReviewsSlider";
import EmsculptFAQ from "@/components/EmsculptFAQ";
import Consultation from "@/components/Consultation";

export default function EmsculptPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsculptHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsculptConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsculptBenefits />
        </div>

        <EmsculptTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsculptTreatmentAreas />
        </div>

        <EmsculptGallerySlider />
        <EmsculptReviewsSlider />
        <EmsculptFAQ />
        <Consultation />
      </main>
    </div>
  );
}