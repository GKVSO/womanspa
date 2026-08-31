import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth-helper";

export const runtime = "nodejs";

// POST /api/admin/upload — upload image from admin device
export async function POST(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "no file" }, { status: 400 });
    }

    // Only images
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "not an image" }, { status: 400 });
    }

    // Max 10 MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "too large (max 10MB)" }, { status: 400 });
    }

    // Sanitize name: keep extension, generate unique prefix
    const ext = (file.name.split(".").pop() || "webp").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safeExt = ["webp", "png", "jpg", "jpeg", "svg", "gif", "avif"].includes(ext) ? ext : "webp";
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const filename = `cms-${unique}.${safeExt}`;

    // Save to public/uploads
    const dir = join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, filename), bytes);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ ok: true, url });
  } catch {
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }
}
