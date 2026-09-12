import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import SkinRejuvenationHero from "@/components/SkinRejuvenationHero";
import SkinTechnologiesSection from "@/components/SkinTechnologiesSection";
import Consultation from "@/components/Consultation";

export default async function SkinRejuvenationPage() {
  const page = await getPageBySlug('skin-rejuvenation');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <SkinRejuvenationHero cms={heroBlock?.content as Record<string, unknown>} />
        <SkinTechnologiesSection />
        <Consultation />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('skin-rejuvenation');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
