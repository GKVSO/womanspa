import Header from "@/components/Header";
import XerfHero from "@/components/XerfHero";
import XerfConsultation from "@/components/XerfConsultation";
import XerfBenefits from "@/components/XerfBenefits";
import XerfTreatmentAreas from "@/components/XerfTreatmentAreas";
import XerfTechnology from "@/components/XerfTechnology";
import XerfResults from "@/components/XerfResults";
import XerfCandidate from "@/components/XerfCandidate";
import XerfGallerySlider from "@/components/XerfGallerySlider";
import XerfReviewsSlider from "@/components/XerfReviewsSlider";
import XerfFAQ from "@/components/XerfFAQ";
import Consultation from "@/components/Consultation";

export default function XerfPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <XerfHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <XerfConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <XerfBenefits />
        </div>

        <XerfTreatmentAreas />

        <XerfTechnology />

        <XerfResults />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <XerfCandidate />
        </div>

        <XerfGallerySlider />
        <XerfReviewsSlider />
        <XerfFAQ />
        <Consultation />
      </main>
    </div>
  );
}
