import Header from "@/components/Header";
import HomeFooter from "@/components/home/HomeFooter";
import IvTherapyHero from "@/components/IvTherapyHero";
import IvTherapyInfoBlocks from "@/components/IvTherapyInfoBlocks";
import IvTherapyBenefitsGrid from "@/components/IvTherapyBenefitsGrid";
import IvTherapyProcess from "@/components/IvTherapyProcess";
import IvTherapyCandidates from "@/components/IvTherapyCandidates";
import IvTherapyReviewsSlider from "@/components/IvTherapyReviewsSlider";
import IvTherapyFAQ from "@/components/IvTherapyFAQ";

export default function IvTherapyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <IvTherapyHero />
        <IvTherapyInfoBlocks />
        <IvTherapyBenefitsGrid />
        <IvTherapyProcess />
        <IvTherapyCandidates />
        <IvTherapyReviewsSlider />
        <IvTherapyFAQ />
      </main>
      <HomeFooter />
    </div>
  );
}
