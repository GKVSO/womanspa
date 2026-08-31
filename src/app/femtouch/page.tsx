import Header from "@/components/Header";
import FemTouchHero from "@/components/FemTouchHero";
import FemTouchConsultation from "@/components/FemTouchConsultation";
import FemTouchBenefits from "@/components/FemTouchBenefits";
import FemTouchTechnology from "@/components/FemTouchTechnology";
import FemTouchCandidate from "@/components/FemTouchCandidate";
import FemTouchReviewsSlider from "@/components/FemTouchReviewsSlider";
import FemTouchFAQ from "@/components/FemTouchFAQ";
import Consultation from "@/components/Consultation";

export default function FemTouchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <FemTouchHero />
        <FemTouchConsultation />
        <FemTouchBenefits />
        <FemTouchTechnology />
        <FemTouchCandidate />
        <FemTouchReviewsSlider />
        <FemTouchFAQ />
        <Consultation />
      </main>
    </div>
  );
}