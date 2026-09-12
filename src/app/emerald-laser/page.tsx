import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import EmeraldHero from "@/components/EmeraldHero";
import EmeraldConsultation from "@/components/EmeraldConsultation";
import EmeraldBenefits from "@/components/EmeraldBenefits";
import EmeraldTechnology from "@/components/EmeraldTechnology";
import EmeraldCandidate from "@/components/EmeraldCandidate";
import EmeraldGallerySlider from "@/components/EmeraldGallerySlider";
import EmeraldReviewsSlider from "@/components/EmeraldReviewsSlider";
import EmeraldFAQ from "@/components/EmeraldFAQ";
import Consultation from "@/components/Consultation";

export default async function EmeraldPage() {
  const page = await getPageBySlug('emerald-laser');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmeraldHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmeraldConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmeraldBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <EmeraldTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmeraldCandidate />
        </div>

        <EmeraldGallerySlider />
        <EmeraldReviewsSlider />
        <EmeraldFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('emerald-laser');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
