import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/db';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewsSlider from "@/components/ReviewsSlider";
import Consultation from "@/components/Consultation";

export default function ReviewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero
          singleLineTitle={"Client Reviews at\nWO/MAN Luxe MedSpa"}
          primaryBtn="Book Consultation"
          secondaryBtn="Read Reviews"
          secondaryBtnHref="#reviews"
        />
        <ReviewsSlider />
        <Consultation />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageBySlug('reviews');
    if (page && (page.seo_title || page.seo_description)) {
      return {
        title: page.seo_title || undefined,
        description: page.seo_description || undefined,
      };
    }
  } catch {}
  return {};
}
