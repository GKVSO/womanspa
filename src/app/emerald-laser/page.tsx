import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
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

export default function EmeraldPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmeraldHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmeraldConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmeraldBenefits />
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
