import { NextResponse, type NextRequest } from "next/server";
import { getSetting, setSetting } from "@/lib/db";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

async function authed(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  return !!token && verifyToken(token);
}

// GET /api/admin/global-data?key=...
export async function GET(req: NextRequest) {
  if (!(await authed(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  const data = await getSetting(key);
  return NextResponse.json({ data: data ? JSON.parse(data) : [] });
}

import { revalidatePath, revalidateTag } from "next/cache";

// POST /api/admin/global-data
export async function POST(req: NextRequest) {
  if (!(await authed(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { key, data } = body;
  
  if (!key || data === undefined) {
    return NextResponse.json({ error: "Missing key or data" }, { status: 400 });
  }

  await setSetting(key, JSON.stringify(data));
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
