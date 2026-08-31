import { getPageBySlug, getBlocks } from "@/lib/db";
import BlockRenderer from "@/components/cms/BlockRenderer";

export const dynamic = "force-dynamic";

export default async function CmsPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return <div className="p-10 text-center text-[#313242]">Страница не найдена в CMS</div>;
  }

  const blocks = await getBlocks(page.id);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F2F4" }}>
      {blocks.map((block: Record<string, unknown>) => (
        <BlockRenderer
          key={block.id as number}
          type={block.type as "hero" | "text_block" | "cards" | "benefits" | "gallery" | "reviews" | "faq" | "consultation"}
          content={typeof block.content === "string" ? JSON.parse(block.content as string) : block.content as Record<string, unknown>}
        />
      ))}
    </div>
  );
}