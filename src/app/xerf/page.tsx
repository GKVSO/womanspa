import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import XerfHero from "@/components/XerfHero";
import XerfConsultation from "@/components/XerfConsultation";
import XerfBenefits from "@/components/XerfBenefits";
import XerfTreatmentAreas from "@/components/XerfTreatmentAreas";
import XerfTechnology from "@/components/XerfTechnology";
import XerfResults from "@/components/XerfResults";
import XerfCandidate from "@/components/XerfCandidate";
import XerfGallerySlider from "@/components/XerfGallerySlider";
import XerfReviewsSlider from "@/components/XerfReviewsSlider";
import XerfFAQ from "@/components/XerfFAQ";
import Consultation from "@/components/Consultation";

export default async function XerfPage() {
  const page = await getPageBySlug('xerf');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <XerfHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <XerfConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <XerfBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <XerfTreatmentAreas />

        <XerfTechnology />

        <XerfResults />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <XerfCandidate />
        </div>

        <XerfGallerySlider />
        <XerfReviewsSlider />
        <XerfFAQ />
        <Consultation />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('xerf');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
