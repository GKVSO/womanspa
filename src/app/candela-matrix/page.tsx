import CandelaBenefits from "@/components/CandelaBenefits";
import CandelaCandidate from "@/components/CandelaCandidate";
import CandelaConsultation from "@/components/CandelaConsultation";
import CandelaFAQ from "@/components/CandelaFAQ";
import CandelaGallerySlider from "@/components/CandelaGallerySlider";
import CandelaHero from "@/components/CandelaHero";
import CandelaIdealCandidate from "@/components/CandelaIdealCandidate";
import CandelaReviewsSlider from "@/components/CandelaReviewsSlider";
import CandelaTechnology from "@/components/CandelaTechnology";
import Consultation from "@/components/Consultation";
import Header from "@/components/Header";

export default function CandelaxPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 test">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <CandelaConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaBenefits />
        </div>

        <CandelaTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <CandelaCandidate />
        </div>

        <div style={{ backgroundColor: "#CFD2D8" }}>
          <CandelaIdealCandidate />
        </div>

        <CandelaGallerySlider />
        <CandelaReviewsSlider />
        <CandelaFAQ />
        <Consultation />
      </main>
    </div>
  );
}