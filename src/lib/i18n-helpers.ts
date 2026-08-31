// Multi-language content helpers.
// Text fields store: { en: "...", ru: "...", es: "..." }
// Non-text fields (colors, sizes) store: "value"

export type Lang = "en" | "ru" | "es";

/** Convert LanguageProvider Lang (capital) to lowercase */
export function toLang(l: string): Lang {
  if (l === "Ru" || l === "ru") return "ru";
  if (l === "Es" || l === "es") return "es";
  return "en";
}

export type MLObject = Record<Lang, string>;

export type BlockContent = Record<string, unknown>;

/** Keys that are text content and support multi-language */
export const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

/** Keys inside list items that are text content */
export const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

/** Check if a value is a multi-language object */
export function isML(v: unknown): v is MLObject {
  return typeof v === "object" && v !== null && "en" in v && "ru" in v && "es" in v;
}

/** Get text value for a language. Backward-compatible: plain string → treated as "en" */
export function ml(v: unknown, lang: Lang): string {
  if (v == null) return "";
  if (typeof v === "string") return v; // backward compat
  if (isML(v)) return v[lang] ?? v.en ?? "";
  return String(v);
}

/** Set text value for a language. If old value is plain string, converts to ML object */
export function mlSet(v: unknown, lang: Lang, value: string): MLObject {
  if (isML(v)) {
    return { ...v, [lang]: value };
  }
  // Plain string → convert to ML object
  return { en: typeof v === "string" ? v : "", ru: lang === "ru" ? value : "", es: lang === "es" ? value : "", [lang]: value };
}

/** Get a non-ML value directly */
export function sv(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

/** Get numeric value */
export function nv(v: unknown, fallback: number): number {
  if (v == null || v === "") return fallback;
  const n = Number(v);
  return isNaN(n) ? fallback : n;
}

/** Get pixel string */
export function px(v: unknown, fallback?: string): string {
  if (v == null || v === "") return fallback ?? "";
  return `${v}px`;
}

/** Get boolean from "yes"/"no" string */
export function yesNo(v: unknown, fallback: boolean): boolean {
  if (v === "yes") return true;
  if (v === "no") return false;
  return fallback;
}
