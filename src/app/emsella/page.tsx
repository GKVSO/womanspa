import Header from "@/components/Header";
import EmsellaHero from "@/components/EmsellaHero";
import EmsellaConsultation from "@/components/EmsellaConsultation";
import EmsellaBenefits from "@/components/EmsellaBenefits";
import EmsellaTechnology from "@/components/EmsellaTechnology";
import EmsellaCandidate from "@/components/EmsellaCandidate";
import EmsellaGallerySlider from "@/components/EmsellaGallerySlider";
import EmsellaReviewsSlider from "@/components/EmsellaReviewsSlider";
import EmsellaFAQ from "@/components/EmsellaFAQ";
import Consultation from "@/components/Consultation";

export default function EmsellaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsellaHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsellaConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsellaBenefits />
        </div>

        <EmsellaTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsellaCandidate />
        </div>

        <EmsellaGallerySlider />
        <EmsellaReviewsSlider />
        <EmsellaFAQ />
        <Consultation />
      </main>
    </div>
  );
}
