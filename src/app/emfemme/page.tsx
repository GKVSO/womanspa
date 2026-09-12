import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import CandelaSmootherHero from "@/components/CandelaSmootherHero";
import CandelaSmootherConsultation from "@/components/CandelaSmootherConsultation";
import CandelaSmootherBenefits from "@/components/CandelaSmootherBenefits";
import CandelaSmootherTechnology from "@/components/CandelaSmootherTechnology";
import CandelaSmootherIdealCandidate from "@/components/CandelaSmootherIdealCandidate";
import CandelaSmootherGallerySlider from "@/components/CandelaSmootherGallerySlider";
import CandelaSmootherReviewsSlider from "@/components/CandelaSmootherReviewsSlider";
import CandelaSmootherFAQ from "@/components/CandelaSmootherFAQ";
import Consultation from "@/components/Consultation";

export default async function CandelaSmootherPage() {
  const page = await getPageBySlug('emfemme');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaSmootherHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <CandelaSmootherConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaSmootherBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <CandelaSmootherTechnology />

        <div style={{ backgroundColor: "#CFD2D8" }}>
          <CandelaSmootherIdealCandidate />
        </div>

        <CandelaSmootherGallerySlider />
        <CandelaSmootherReviewsSlider />
        <CandelaSmootherFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('emfemme');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
