import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "womanmedspa-local-secret-change-me";

export const AUTH_COOKIE = "cms_auth";

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}