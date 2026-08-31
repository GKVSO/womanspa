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
