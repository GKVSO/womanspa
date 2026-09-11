import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import AcuPulseHero from "@/components/AcuPulseHero";
import AcuPulseConsultation from "@/components/AcuPulseConsultation";
import AcuPulseBenefits from "@/components/AcuPulseBenefits";
import AcuPulseTechnology from "@/components/AcuPulseTechnology";
import AcuPulseCandidate from "@/components/AcuPulseCandidate";
import AcuPulseGallerySlider from "@/components/AcuPulseGallerySlider";
import AcuPulseReviewsSlider from "@/components/AcuPulseReviewsSlider";
import AcuPulseFAQ from "@/components/AcuPulseFAQ";
import Consultation from "@/components/Consultation";

export default function AcuPulsePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <AcuPulseHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <AcuPulseConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <AcuPulseBenefits />
        </div>

        <AcuPulseTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <AcuPulseCandidate />
        </div>

        <AcuPulseGallerySlider />
        <AcuPulseReviewsSlider />
        <AcuPulseFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('acupulse');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
