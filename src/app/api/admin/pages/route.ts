import { NextResponse } from "next/server";
import { getAllPages, createPage, deletePage, getPageById } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await getAllPages();
  return NextResponse.json({
    pages: pages.map((p: Record<string, unknown>) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      published: p.published,
      is_home: p.is_home,
      updated_at: p.updated_at,
    })),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug и title обязательны" }, { status: 400 });
  }

  const slug = String(body.slug)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Check if slug already exists
  const existing = await getPageById(Number(body.id || 0));
  if (existing) {
    return NextResponse.json({ ok: true, id: existing.id, slug });
  }

  const id = await createPage(slug, body.title);
  return NextResponse.json({ ok: true, id, slug });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "id обязателен" }, { status: 400 });
  await deletePage(id);
  return NextResponse.json({ ok: true });
}