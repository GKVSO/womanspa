import Header from "@/components/Header";
import EndospheresHero from "@/components/EndospheresHero";
import EndospheresConsultation from "@/components/EndospheresConsultation";
import EndospheresBenefits from "@/components/EndospheresBenefits";
import EndospheresTechnology from "@/components/EndospheresTechnology";
import EndospheresCandidate from "@/components/EndospheresCandidate";
import EndospheresGallerySlider from "@/components/EndospheresGallerySlider";
import EndospheresReviewsSlider from "@/components/EndospheresReviewsSlider";
import EndospheresFAQ from "@/components/EndospheresFAQ";
import Consultation from "@/components/Consultation";

export default function EndospheresPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EndospheresHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EndospheresConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EndospheresBenefits />
        </div>

        <EndospheresTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EndospheresCandidate />
        </div>

        <EndospheresGallerySlider />
        <EndospheresReviewsSlider />
        <EndospheresFAQ />
        <Consultation />
      </main>
    </div>
  );
}