import Header from "@/components/Header";
import CandelaSmootherHero from "@/components/CandelaSmootherHero";
import CandelaSmootherConsultation from "@/components/CandelaSmootherConsultation";
import CandelaSmootherBenefits from "@/components/CandelaSmootherBenefits";
import CandelaSmootherTechnology from "@/components/CandelaSmootherTechnology";
import CandelaSmootherIdealCandidate from "@/components/CandelaSmootherIdealCandidate";
import CandelaSmootherGallerySlider from "@/components/CandelaSmootherGallerySlider";
import CandelaSmootherReviewsSlider from "@/components/CandelaSmootherReviewsSlider";
import CandelaSmootherFAQ from "@/components/CandelaSmootherFAQ";
import Consultation from "@/components/Consultation";

export default function CandelaSmootherPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaSmootherHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <CandelaSmootherConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaSmootherBenefits />
        </div>

        <CandelaSmootherTechnology />

        <div style={{ backgroundColor: "#CFD2D8" }}>
          <CandelaSmootherIdealCandidate />
        </div>

        <CandelaSmootherGallerySlider />
        <CandelaSmootherReviewsSlider />
        <CandelaSmootherFAQ />
        <Consultation />
      </main>
    </div>
  );
}