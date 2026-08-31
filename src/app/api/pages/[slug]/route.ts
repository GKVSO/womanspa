import { NextResponse } from "next/server";
import { getPageBySlug, getBlocks } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return NextResponse.json({ error: "not found" }, { status: 404 });
  const blocks = await getBlocks(page.id);
  return NextResponse.json({
    page,
    blocks: blocks.map((b: Record<string, unknown>) => ({
      id: b.id,
      type: b.type,
      content: typeof b.content === "string" ? JSON.parse(b.content) : b.content,
    })),
  });
}