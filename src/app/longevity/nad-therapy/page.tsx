import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import NadTherapyHero from "@/components/NadTherapyHero";
import NadTherapyInfoBlocks from "@/components/NadTherapyInfoBlocks";
import NadTherapyBenefitsGrid from "@/components/NadTherapyBenefitsGrid";
import NadTherapyProcess from "@/components/NadTherapyProcess";
import NadTherapyCandidates from "@/components/NadTherapyCandidates";
import NadTherapyReviewsSlider from "@/components/NadTherapyReviewsSlider";
import NadTherapyFAQ from "@/components/NadTherapyFAQ";

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
