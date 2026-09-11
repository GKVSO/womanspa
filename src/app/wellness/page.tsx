import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import WellnessHero from "@/components/WellnessHero";
import WellnessTechnologiesSection from "@/components/WellnessTechnologiesSection";
import Consultation from "@/components/Consultation";

export default function WellnessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <WellnessHero />
        <WellnessTechnologiesSection />
        <Consultation 
          showOnMobile 
          title1="Book Your"
          title2="Private Consultation"
          bullets={[
            "One-on-one conversation in a discreet luxury suite",
            "Complete privacy and zero pressure",
            "Technology recommendation",
            "Transparent pricing and timeline"
          ]}
        />
      </main>
    </div>
  );
}
export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('wellness');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
