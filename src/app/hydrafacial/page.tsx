import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import HydrafacialHero from "@/components/HydrafacialHero";
import HydrafacialConsultation from "@/components/HydrafacialConsultation";
import HydrafacialBenefits from "@/components/HydrafacialBenefits";
import HydrafacialTechnology from "@/components/HydrafacialTechnology";
import HydrafacialCandidate from "@/components/HydrafacialCandidate";
import HydrafacialGallerySlider from "@/components/HydrafacialGallerySlider";
import HydrafacialReviewsSlider from "@/components/HydrafacialReviewsSlider";
import HydrafacialFAQ from "@/components/HydrafacialFAQ";
import Consultation from "@/components/Consultation";

export default function HydrafacialPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <HydrafacialHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <HydrafacialConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <HydrafacialBenefits />
        </div>

        <HydrafacialTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <HydrafacialCandidate />
        </div>

        <HydrafacialGallerySlider />
        <HydrafacialReviewsSlider />
        <HydrafacialFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('hydrafacial');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
