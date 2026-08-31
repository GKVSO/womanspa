import Header from "@/components/Header";
import IcooneHero from "@/components/IcooneHero";
import IcooneConsultation from "@/components/IcooneConsultation";
import IcooneBenefits from "@/components/IcooneBenefits";
import IcooneTechnology from "@/components/IcooneTechnology";
import IcooneCandidate from "@/components/IcooneCandidate";
import IcooneGallerySlider from "@/components/IcooneGallerySlider";
import IcooneReviewsSlider from "@/components/IcooneReviewsSlider";
import IcooneFAQ from "@/components/IcooneFAQ";
import Consultation from "@/components/Consultation";

export default function IcoonePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <IcooneHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <IcooneConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <IcooneBenefits />
        </div>

        <IcooneTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <IcooneCandidate />
        </div>

        <IcooneGallerySlider />
        <IcooneReviewsSlider />
        <IcooneFAQ />
        <Consultation />
      </main>
    </div>
  );
}