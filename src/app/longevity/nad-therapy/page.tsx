import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import NadTherapyBenefitsGrid from "@/components/NadTherapyBenefitsGrid";
import NadTherapyCandidates from "@/components/NadTherapyCandidates";
import NadTherapyFAQ from "@/components/NadTherapyFAQ";
import NadTherapyHero from "@/components/NadTherapyHero";
import NadTherapyInfoBlocks from "@/components/NadTherapyInfoBlocks";
import NadTherapyProcess from "@/components/NadTherapyProcess";
import NadTherapyReviewsSlider from "@/components/NadTherapyReviewsSlider";

export default function NadTherapyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <NadTherapyHero />
        <NadTherapyInfoBlocks />
        <NadTherapyBenefitsGrid />
        <NadTherapyProcess />
        <NadTherapyCandidates />
        <NadTherapyReviewsSlider />
        <NadTherapyFAQ />
      </main>
      <HomeFooter />
    </div>
  );
}
