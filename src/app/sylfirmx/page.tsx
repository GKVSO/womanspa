import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import SylfirmHero from "@/components/SylfirmHero";
import SylfirmConsultation from "@/components/SylfirmConsultation";
import SylfirmBenefits from "@/components/SylfirmBenefits";
import SylfirmTechnology from "@/components/SylfirmTechnology";
import SylfirmCandidate from "@/components/SylfirmCandidate";
import SylfirmGallerySlider from "@/components/SylfirmGallerySlider";
import SylfirmReviewsSlider from "@/components/SylfirmReviewsSlider";
import SylfirmFAQ from "@/components/SylfirmFAQ";
import Consultation from "@/components/Consultation";

export default function SylfirmxPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <SylfirmHero />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <SylfirmConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <SylfirmBenefits />
        </div>

        <SylfirmTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <SylfirmCandidate />
        </div>

        <SylfirmGallerySlider />
        <SylfirmReviewsSlider />
        <SylfirmFAQ />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('sylfirmx');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
