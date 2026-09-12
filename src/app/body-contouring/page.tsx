import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
import Header from "@/components/Header";
import BodyContouringHero from "@/components/BodyContouringHero";
import TechnologiesSection from "@/components/TechnologiesSection";
import Consultation from "@/components/Consultation";

export default async function BodyContouringPage() {
  const page = await getPageBySlug('body-contouring');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BodyContouringHero cms={heroBlock?.content as Record<string, unknown>} />
        <TechnologiesSection />
        <Consultation formType="body_contouring_consultation" />
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
