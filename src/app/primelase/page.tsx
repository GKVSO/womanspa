import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import PrimelaseHero from "@/components/PrimelaseHero";
import PrimelaseConsultation from "@/components/PrimelaseConsultation";
import PrimelaseBenefits from "@/components/PrimelaseBenefits";
import PrimelaseTechnology from "@/components/PrimelaseTechnology";
import PrimelaseCandidate from "@/components/PrimelaseCandidate";
import PrimelaseGallerySlider from "@/components/PrimelaseGallerySlider";
import PrimelaseReviewsSlider from "@/components/PrimelaseReviewsSlider";
import PrimelaseFAQ from "@/components/PrimelaseFAQ";
import Consultation from "@/components/Consultation";

export default async function PrimelasePage() {
  const page = await getPageBySlug('primelase');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <PrimelaseHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <PrimelaseConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <PrimelaseBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <PrimelaseTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <PrimelaseCandidate />
        </div>

        <PrimelaseGallerySlider />
        <PrimelaseReviewsSlider />
        <PrimelaseFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('primelase');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
