import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import Consultation from "@/components/Consultation";
import IvTherapyHero from "@/components/IvTherapyHero";
import IvTherapyInfoBlocks from "@/components/IvTherapyInfoBlocks";
import IvTherapyBenefitsGrid from "@/components/IvTherapyBenefitsGrid";
import IvTherapyProcess from "@/components/IvTherapyProcess";
import IvTherapyCandidates from "@/components/IvTherapyCandidates";
import IvTherapyReviewsSlider from "@/components/IvTherapyReviewsSlider";
import IvTherapyFAQ from "@/components/IvTherapyFAQ";

export default async function IvTherapyPage() {
  const page = await getPageBySlug('iv-therapy');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <IvTherapyHero cms={heroBlock?.content as Record<string, unknown>} />
        <IvTherapyInfoBlocks />
        <IvTherapyBenefitsGrid />
        <IvTherapyProcess />
        <IvTherapyCandidates />
        <IvTherapyReviewsSlider />
        <IvTherapyFAQ />
      </main>
      <Consultation formType="home_footer_consultation" />
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
