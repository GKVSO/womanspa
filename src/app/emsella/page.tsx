import type { Metadata } from 'next';
import { getPageBySlug, getBlocks } from '@/lib/db';
﻿import Header from "@/components/Header";
import EmsellaHero from "@/components/EmsellaHero";
import EmsellaConsultation from "@/components/EmsellaConsultation";
import EmsellaBenefits from "@/components/EmsellaBenefits";
import EmsellaTechnology from "@/components/EmsellaTechnology";
import EmsellaCandidate from "@/components/EmsellaCandidate";
import EmsellaGallerySlider from "@/components/EmsellaGallerySlider";
import EmsellaReviewsSlider from "@/components/EmsellaReviewsSlider";
import EmsellaFAQ from "@/components/EmsellaFAQ";
import Consultation from "@/components/Consultation";

export default async function EmsellaPage() {
  const page = await getPageBySlug('emsella');
  const blocks = page ? await getBlocks(page.id) : [];
  const heroBlock = blocks.find((b: any) => b.type === 'hero');
  const benefitsBlock = blocks.find((b: any) => b.type === 'benefits');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsellaHero cms={heroBlock?.content as Record<string, unknown>} />
        </div>

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsellaConsultation />
        </div>

        <div style={{ backgroundColor: "#F1F2F4" }}>
          <EmsellaBenefits cms={benefitsBlock?.content as Record<string, unknown>} />
        </div>

        <EmsellaTechnology />

        <div style={{ backgroundColor: "#CBA07D" }}>
          <EmsellaCandidate />
        </div>

        <EmsellaGallerySlider />
        <EmsellaReviewsSlider />
        <EmsellaFAQ />
        <Consultation />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('emsella');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
