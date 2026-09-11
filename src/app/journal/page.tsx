import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JournalSubscribe from "@/components/JournalSubscribe";
import JournalSection from "@/components/JournalSection";
import Consultation from "@/components/Consultation";

export default function JournalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero
          singleLineTitle="The WO/MAN Luxe MedSpa Journal"
          description={
            "A curated library of articles written by our wellness experts - designed to educate, empower, and guide you through the world of advanced aesthetics, body refinement, and longevity"
          }
          showButtons={false}
        >
          <JournalSubscribe />
        </Hero>
        <JournalSection />
        <Consultation />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('journal');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
