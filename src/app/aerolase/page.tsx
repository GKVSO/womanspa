import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import AerolaseHero from "@/components/AerolaseHero";
import AerolaseConsultation from "@/components/AerolaseConsultation";
import AerolaseBenefits from "@/components/AerolaseBenefits";
import AerolaseTechnology from "@/components/AerolaseTechnology";
import AerolaseTreatmentAreas from "@/components/AerolaseTreatmentAreas";
import AerolaseGallerySlider from "@/components/AerolaseGallerySlider";
import AerolaseReviewsSlider from "@/components/AerolaseReviewsSlider";
import AerolaseFAQ from "@/components/AerolaseFAQ";
import Consultation from "@/components/Consultation";

export default async function AerolasePage() {
  const page = await getPageBySlug('aerolase');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <AerolaseHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <AerolaseConsultation />
        </div>

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <AerolaseBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <AerolaseTreatmentAreas />
        </div>

        <AerolaseTechnology />

        <AerolaseGallerySlider />
        <AerolaseReviewsSlider />
        <AerolaseFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('aerolase');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
