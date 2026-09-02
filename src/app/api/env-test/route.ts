import { NextResponse } from "next/server";

export async function GET() {
  const envData = {
    DATABASE_URL: process.env.DATABASE_URL || "НЕТ",
    JWT_SECRET: process.env.JWT_SECRET || "НЕТ",
  };

  console.log("[Server API] Нужные переменные:", envData);
  return NextResponse.json(envData);
}
