import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import Consultation from "@/components/Consultation";
import NadTherapyBenefitsGrid from "@/components/NadTherapyBenefitsGrid";
import NadTherapyCandidates from "@/components/NadTherapyCandidates";
import NadTherapyFAQ from "@/components/NadTherapyFAQ";
import NadTherapyHero from "@/components/NadTherapyHero";
import NadTherapyInfoBlocks from "@/components/NadTherapyInfoBlocks";
import NadTherapyProcess from "@/components/NadTherapyProcess";
import NadTherapyReviewsSlider from "@/components/NadTherapyReviewsSlider";

export default async function NadTherapyPage() {
  const page = await getPageBySlug('nad-therapy');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <NadTherapyHero cms={heroBlock?.content as Record<string, unknown>} />
        <NadTherapyInfoBlocks />
        <NadTherapyBenefitsGrid />
        <NadTherapyProcess />
        <NadTherapyCandidates />
        <NadTherapyReviewsSlider />
        <NadTherapyFAQ />
      </main>
      <Consultation formType="home_footer_consultation" />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('nad-therapy');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
