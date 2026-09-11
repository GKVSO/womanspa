import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GallerySlider from "@/components/GallerySlider";
import Consultation from "@/components/Consultation";

export default function BeforeAfterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero
          titleFirst="Before & After at"
          titleSecond="WO/MAN Luxe MedSpa"
          description="A curated portfolio of actual patient results across body contouring, skin rejuvenation, facial aesthetics, laser hair removal"
          primaryBtn="Book Consultation"
          secondaryBtn="View Before / After"
        />
        <GallerySlider />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('before-after');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
