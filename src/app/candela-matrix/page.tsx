import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import CandelaBenefits from "@/components/CandelaBenefits";
import CandelaCandidate from "@/components/CandelaCandidate";
import CandelaConsultation from "@/components/CandelaConsultation";
import CandelaFAQ from "@/components/CandelaFAQ";
import CandelaGallerySlider from "@/components/CandelaGallerySlider";
import CandelaHero from "@/components/CandelaHero";
import CandelaIdealCandidate from "@/components/CandelaIdealCandidate";
import CandelaReviewsSlider from "@/components/CandelaReviewsSlider";
import CandelaTechnology from "@/components/CandelaTechnology";
import Consultation from "@/components/Consultation";
import Header from "@/components/Header";

export default async function CandelaxPage() {
  const page = await getPageBySlug('candela-matrix');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 test">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <CandelaConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <CandelaBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <CandelaTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <CandelaCandidate />
        </div>

        <div style={{ backgroundColor: "#CFD2D8" }}>
          <CandelaIdealCandidate />
        </div>

        <CandelaGallerySlider />
        <CandelaReviewsSlider />
        <CandelaFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('candela-matrix');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
