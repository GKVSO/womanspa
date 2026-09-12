import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import EndospheresHero from "@/components/EndospheresHero";
import EndospheresConsultation from "@/components/EndospheresConsultation";
import EndospheresBenefits from "@/components/EndospheresBenefits";
import EndospheresTechnology from "@/components/EndospheresTechnology";
import EndospheresCandidate from "@/components/EndospheresCandidate";
import EndospheresGallerySlider from "@/components/EndospheresGallerySlider";
import EndospheresReviewsSlider from "@/components/EndospheresReviewsSlider";
import EndospheresFAQ from "@/components/EndospheresFAQ";
import Consultation from "@/components/Consultation";

export default async function EndospheresPage() {
  const page = await getPageBySlug('endospheres');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EndospheresHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EndospheresConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EndospheresBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <EndospheresTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EndospheresCandidate />
        </div>

        <EndospheresGallerySlider />
        <EndospheresReviewsSlider />
        <EndospheresFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('endospheres');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
