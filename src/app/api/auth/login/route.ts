import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import sql from "@/lib/db";
import { AUTH_COOKIE } from "@/lib/auth-helper";

const JWT_SECRET = process.env.JWT_SECRET || "womanmedspa-local-secret-change-me";

export function createToken(username: string): string {
  return sign({ username }, JWT_SECRET, { expiresIn: "7d" });
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Read admin credentials from settings table
  const rows = await sql`SELECT key, value FROM settings WHERE key IN ('admin_username', 'admin_password')`;
  const settings: Record<string, string> = {};
  for (const r of rows) settings[r.key] = r.value;
  const storedUsername = settings.admin_username || "admin";
  const storedHash = settings.admin_password;

  let ok = false;
  if (storedHash) {
    ok = (await bcrypt.compare(password, storedHash)) && username === storedUsername;
  } else {
    // First login — no hash yet, compare plain and upgrade
    ok = username === storedUsername && password === "admin12345";
    if (ok) {
      const hash = await bcrypt.hash(password, 10);
      await sql`INSERT INTO settings (key, value) VALUES ('admin_password', ${hash}) ON CONFLICT (key) DO UPDATE SET value = ${hash}`;
    }
  }

  if (!ok) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  const token = createToken(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}