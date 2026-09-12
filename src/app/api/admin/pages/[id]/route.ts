import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPageById, getBlocks, upsertBlocks, updatePage } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(Number(id));
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(Number(id));
  if (!page) return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = await req.json();

  if (body.page) {
    await updatePage(page.id, {
      title: body.page.title,
      slug: body.page.slug,
      seo_title: body.page.seo_title,
      seo_description: body.page.seo_description,
      published: body.page.published,
      is_home: body.page.is_home,
      vagaro_booking_url: body.page.vagaro_booking_url,
      vagaro_booking_embed: body.page.vagaro_booking_embed,
      vagaro_booking_mode: body.page.vagaro_booking_mode,
    });
  }

  // Only overwrite blocks when a non-empty array is sent.
  // An empty array would wipe the page — ignore it to protect data.
  if (Array.isArray(body.blocks) && body.blocks.length > 0) {
    await upsertBlocks(
      page.id,
      body.blocks.map((b: { type: string; content: unknown }) => ({
        type: b.type,
        content: (b.content || {}) as Record<string, unknown>,
      }))
    );
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}