import Header from "@/components/Header";
import HomeHero from "@/components/home/HomeHero";
import HomeTreatments from "@/components/home/HomeTreatments";
import HomeMoreBody from "@/components/home/HomeMoreBody";
import HomeSmoothTexture from "@/components/home/HomeSmoothTexture";
import HomeGallery from "@/components/home/HomeGallery";
import HomeTeam from "@/components/home/HomeTeam";
import HomeReviews from "@/components/home/HomeReviews";
import HomeFooter from "@/components/home/HomeFooter";
import { getPageBySlug, getBlocks } from "@/lib/db";
import BlockRenderer from "@/components/cms/BlockRenderer";

function StaticHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HomeHero />
        <HomeTreatments />
        <HomeMoreBody />
        <HomeSmoothTexture />
        <HomeGallery />
        <HomeTeam />
        <HomeReviews />
        <HomeFooter />
      </main>
    </div>
  );
}

export default async function Home() {
  try {
    const homePage = await getPageBySlug("home");
    if (homePage && homePage.is_home === 1) {
      const blocks = await getBlocks(homePage.id);
      return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {blocks.map((block: Record<string, unknown>) => (
              <BlockRenderer
                key={block.id as number}
                type={block.type as never}
                content={typeof block.content === "string" ? JSON.parse(block.content as string) : block.content as Record<string, unknown>}
              />
            ))}
          </main>
        </div>
      );
    }
  } catch {
    // DB not available or no home page — use static
  }
  return <StaticHome />;
}