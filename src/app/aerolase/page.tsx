import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
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

export default function AerolasePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <AerolaseHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <AerolaseConsultation />
        </div>

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <AerolaseBenefits />
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
