import { redirect } from "next/navigation";
import { getPageBySlug, getBlocks } from "@/lib/db";
import BlockRenderer from "@/components/cms/BlockRenderer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

const FRONTEND_ROUTES = new Set([
  "acupulse", "aerolase", "before-after", "body-contouring",
  "candela-matrix", "emfemme", "emerald-laser", "emsculpt-neo",
  "emsella", "endospheres", "exion", "femtouch", "hydrafacial",
  "icoone", "journal", "primelase", "reviews", "skin-rejuvenation",
  "sylfirmx", "wellness", "xerf",
]);

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (FRONTEND_ROUTES.has(slug)) {
    redirect(`/${slug}`);
  }

  const page = await getPageBySlug(slug);

  if (!page || page.is_home === 1) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#F1F2F4" }}>
        <div className="text-center">
          <h1 className="text-[48px] font-berlingske" style={{ color: "#1F1D1B" }}>404</h1>
          <p className="mt-4 text-[16px]" style={{ color: "#6B7078" }}>Page not found</p>
        </div>
      </main>
    );
  }

  const blocks = await getBlocks(page.id);

  return (
    <LanguageProvider>
      <main className="min-h-screen" style={{ background: "#F1F2F4" }}>
        {blocks.map((block: Record<string, unknown>) => (
          <BlockRenderer
            key={block.id as number}
            type={block.type as never}
            content={typeof block.content === "string" ? JSON.parse(block.content as string) : block.content as Record<string, unknown>}
          />
        ))}
      </main>
    </LanguageProvider>
  );
}
