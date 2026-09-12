import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import IcooneHero from "@/components/IcooneHero";
import IcooneConsultation from "@/components/IcooneConsultation";
import IcooneBenefits from "@/components/IcooneBenefits";
import IcooneTechnology from "@/components/IcooneTechnology";
import IcooneCandidate from "@/components/IcooneCandidate";
import IcooneGallerySlider from "@/components/IcooneGallerySlider";
import IcooneReviewsSlider from "@/components/IcooneReviewsSlider";
import IcooneFAQ from "@/components/IcooneFAQ";
import Consultation from "@/components/Consultation";

export default async function IcoonePage() {
  const page = await getPageBySlug('icoone');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <IcooneHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <IcooneConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <IcooneBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <IcooneTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <IcooneCandidate />
        </div>

        <IcooneGallerySlider />
        <IcooneReviewsSlider />
        <IcooneFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('icoone');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
