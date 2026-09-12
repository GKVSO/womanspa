import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import ExionHero from "@/components/ExionHero";
import ExionConsultation from "@/components/ExionConsultation";
import ExionBenefits from "@/components/ExionBenefits";
import ExionTechnology from "@/components/ExionTechnology";
import ExionCandidate from "@/components/ExionCandidate";
import ExionGallerySlider from "@/components/ExionGallerySlider";
import ExionReviewsSlider from "@/components/ExionReviewsSlider";
import ExionFAQ from "@/components/ExionFAQ";
import Consultation from "@/components/Consultation";

import { getBlocks } from '@/lib/db';

export default async function ExionPage() {
  const page = await getPageBySlug('exion');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b) => b.type === 'hero');
  const benefitsBlock = blocks.find((b) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <ExionHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <ExionConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <ExionBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <ExionTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <ExionCandidate />
        </div>

        <ExionGallerySlider />
        <ExionReviewsSlider />
        <ExionFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('exion');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
