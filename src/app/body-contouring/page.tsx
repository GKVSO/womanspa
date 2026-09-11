import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import BodyContouringHero from "@/components/BodyContouringHero";
import TechnologiesSection from "@/components/TechnologiesSection";
import BodyContouringConsultation from "@/components/BodyContouringConsultation";

export default function BodyContouringPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BodyContouringHero />
        <TechnologiesSection />
        <BodyContouringConsultation />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('body-contouring');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
