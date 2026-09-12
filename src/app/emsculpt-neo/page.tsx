import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import EmsculptHero from "@/components/EmsculptHero";
import EmsculptConsultation from "@/components/EmsculptConsultation";
import EmsculptBenefits from "@/components/EmsculptBenefits";
import EmsculptTechnology from "@/components/EmsculptTechnology";
import EmsculptTreatmentAreas from "@/components/EmsculptTreatmentAreas";
import EmsculptGallerySlider from "@/components/EmsculptGallerySlider";
import EmsculptReviewsSlider from "@/components/EmsculptReviewsSlider";
import EmsculptFAQ from "@/components/EmsculptFAQ";
import Consultation from "@/components/Consultation";

export default async function EmsculptPage() {
  const page = await getPageBySlug('emsculpt-neo');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsculptHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsculptConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsculptBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <EmsculptTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsculptTreatmentAreas />
        </div>

        <EmsculptGallerySlider />
        <EmsculptReviewsSlider />
        <EmsculptFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('emsculpt-neo');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
