import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('iv-therapy');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
