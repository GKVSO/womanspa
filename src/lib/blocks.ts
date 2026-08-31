// Модель секций (блоков) для конструктора страниц.
// Максимальный набор настроек для каждой секции.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "color"
  | "select"
  | "image"
  | "list"
  | "font";

export interface FieldDef {
  key: string;
  labelKey: string;
  type: FieldType;
  defaultValue: unknown;
  options?: { value: string; label: string }[];
}

export interface BlockDef {
  type: string;
  labelKey: string;
  fields: FieldDef[];
}

const GOLD = "#CBA07D";
const GOLD_DARK = "#B07E3F";
const BG_LIGHT = "#F1F2F4";
const TEXT_DARK = "#1F1D1B";
const TEXT_BODY = "#313242";
const TEXT_MUTED = "#6B7078";

const FONT_OPTIONS = [
  { value: "font-berlingske", label: "Berlingske Serif" },
  { value: "font-manrope", label: "Manrope" },
  { value: "sans-serif", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
];

const ALIGN_OPTIONS = [
  { value: "left", label: "←" },
  { value: "center", label: "↔" },
  { value: "right", label: "→" },
];

// Hero block for xerf — full real values from the frontend
export const XERF_HERO_BLOCK = {
  type: "hero",
  fields: [
    { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Lift & Tighten Loose Skin — Without Surgery or Downtime" },
    { key: "subtitle", labelKey: "fieldSubtitle", type: "textarea", defaultValue: "Restore a firmer jawline, tighter neck, and smoother skin with the newest RF technology. Comfortable treatment. No needles. No downtime." },
    { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
    { key: "titleSizeMobile", labelKey: "titleSizeMobile", type: "number", defaultValue: 24 },
    { key: "titleSizeTablet", labelKey: "titleSizeTablet", type: "number", defaultValue: 36 },
    { key: "titleSizeDesktop", labelKey: "titleSizeDesktop", type: "number", defaultValue: 40 },
    { key: "titleSizeLarge", labelKey: "titleSizeLarge", type: "number", defaultValue: 48 },
    { key: "titleLineHeight", labelKey: "titleLineHeight", type: "number", defaultValue: 1.25 },
    { key: "titleLetterSpacing", labelKey: "titleLetterSpacing", type: "number", defaultValue: 0 },
    { key: "subtitleFont", labelKey: "subtitleFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
    { key: "subtitleSize", labelKey: "subtitleSize", type: "number", defaultValue: 16 },
    { key: "subtitleLineHeight", labelKey: "subtitleLineHeight", type: "number", defaultValue: 1.625 },
    { key: "textColor", labelKey: "fieldTextColor", type: "color", defaultValue: "#FFFFFF" },
    { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: "#F1F2F4" },
    { key: "backgroundImage", labelKey: "fieldBackgroundImage", type: "image", defaultValue: "/xerf-hero.webp" },
    { key: "backgroundImageTablet", labelKey: "backgroundImageTablet", type: "image", defaultValue: "/xerf-hero-768.png" },
    { key: "backgroundImageMobile", labelKey: "backgroundImageMobile", type: "image", defaultValue: "/xerf-hero-360.png" },
    { key: "backgroundOverlay", labelKey: "backgroundOverlay", type: "number", defaultValue: 25 },
    { key: "primaryBtn", labelKey: "primaryBtn", type: "text", defaultValue: "Claim $100 Consultation" },
    { key: "secondaryBtn", labelKey: "secondaryBtn", type: "text", defaultValue: "Before & After" },
    { key: "buttonColor", labelKey: "fieldButtonColor", type: "color", defaultValue: "#FFFFFF" },
    { key: "buttonTextColor", labelKey: "buttonTextColor", type: "color", defaultValue: "#000000" },
    { key: "primaryBtnFont", labelKey: "primaryBtnFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
    { key: "primaryBtnSize", labelKey: "primaryBtnSize", type: "number", defaultValue: 14 },
    { key: "primaryBtnRadius", labelKey: "primaryBtnRadius", type: "number", defaultValue: 10 },
    { key: "primaryBtnPaddingX", labelKey: "primaryBtnPaddingX", type: "number", defaultValue: 32 },
    { key: "primaryBtnPaddingY", labelKey: "primaryBtnPaddingY", type: "number", defaultValue: 16 },
    { key: "showStars", labelKey: "showStars", type: "select", defaultValue: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { key: "starsText", labelKey: "starsText", type: "text", defaultValue: "Rated 5.0 on Google · Hallandale Beach, FL" },
    { key: "starColor", labelKey: "starColor", type: "color", defaultValue: "#FFFFFF" },
    { key: "height", labelKey: "height", type: "number", defaultValue: 100 },
    { key: "borderRadius", labelKey: "borderRadius", type: "number", defaultValue: 60 },
    { key: "cardsMini", labelKey: "cardsMini", type: "list", defaultValue: [] },
  ] as FieldDef[],
};

export const BLOCK_DEFS: BlockDef[] = [
  {
    type: "hero",
    labelKey: "blockHero",
    fields: XERF_HERO_BLOCK.fields,
  },

  {
    type: "text_block",
    labelKey: "blockText",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Title" },
      { key: "body", labelKey: "fieldBody", type: "textarea", defaultValue: "Content" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 48 },
      { key: "titleLineHeight", labelKey: "titleLineHeight", type: "number", defaultValue: 1.1 },
      { key: "titleLetterSpacing", labelKey: "titleLetterSpacing", type: "number", defaultValue: 0 },
      { key: "bodyFont", labelKey: "bodyFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "bodySize", labelKey: "bodySize", type: "number", defaultValue: 16 },
      { key: "bodyLineHeight", labelKey: "bodyLineHeight", type: "number", defaultValue: 1.6 },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "bodyColor", labelKey: "bodyColor", type: "color", defaultValue: TEXT_BODY },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "align", labelKey: "align", type: "select", defaultValue: "left", options: ALIGN_OPTIONS },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
      { key: "maxWidth", labelKey: "maxWidth", type: "number", defaultValue: 920 },
    ],
  },

  {
    type: "cards",
    labelKey: "blockCards",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Our Services" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 36 },
      { key: "titleLineHeight", labelKey: "titleLineHeight", type: "number", defaultValue: 1.1 },
      { key: "titleAlign", labelKey: "titleAlign", type: "select", defaultValue: "center", options: ALIGN_OPTIONS },
      { key: "cards", labelKey: "fieldCards", type: "list", defaultValue: [] },
      { key: "cardColumns", labelKey: "cardColumns", type: "select", defaultValue: "3", options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
      { key: "cardBorderRadius", labelKey: "cardBorderRadius", type: "number", defaultValue: 30 },
      { key: "cardPadding", labelKey: "cardPadding", type: "number", defaultValue: 40 },
      { key: "cardGap", labelKey: "cardGap", type: "number", defaultValue: 24 },
      { key: "cardTitleFont", labelKey: "cardTitleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "cardTitleSize", labelKey: "cardTitleSize", type: "number", defaultValue: 24 },
      { key: "cardBodyFont", labelKey: "cardBodyFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "cardBodySize", labelKey: "cardBodySize", type: "number", defaultValue: 16 },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: BG_LIGHT },
      { key: "cardBackground", labelKey: "cardBackground", type: "color", defaultValue: "#FFFFFF" },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "cardTitleColor", labelKey: "cardTitleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "cardTextColor", labelKey: "cardTextColor", type: "color", defaultValue: TEXT_BODY },
      { key: "buttonText", labelKey: "primaryBtn", type: "text", defaultValue: "" },
      { key: "buttonColor", labelKey: "fieldButtonColor", type: "color", defaultValue: GOLD },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
    ],
  },

  {
    type: "benefits",
    labelKey: "blockBenefits",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Why Choose Us" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 48 },
      { key: "titleLineHeight", labelKey: "titleLineHeight", type: "number", defaultValue: 1.1 },
      { key: "image", labelKey: "fieldImage", type: "image", defaultValue: "" },
      { key: "imageMaxWidth", labelKey: "imageMaxWidth", type: "number", defaultValue: 400 },
      { key: "imagePosition", labelKey: "imagePosition", type: "select", defaultValue: "right", options: [{ value: "left", label: "Left" }, { value: "right", label: "Right" }, { value: "center", label: "Center" }, { value: "none", label: "Hide" }] },
      { key: "items", labelKey: "fieldItems", type: "list", defaultValue: [] },
      { key: "itemColumns", labelKey: "itemColumns", type: "select", defaultValue: "3", options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
      { key: "itemBorderRadius", labelKey: "itemBorderRadius", type: "number", defaultValue: 30 },
      { key: "itemPadding", labelKey: "itemPadding", type: "number", defaultValue: 40 },
      { key: "itemTitleFont", labelKey: "itemTitleFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "itemTitleSize", labelKey: "itemTitleSize", type: "number", defaultValue: 18 },
      { key: "itemBodyFont", labelKey: "itemBodyFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "itemBodySize", labelKey: "itemBodySize", type: "number", defaultValue: 16 },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: GOLD },
      { key: "cardBackground", labelKey: "cardBackground", type: "color", defaultValue: "#FFFFFF" },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "itemTitleColor", labelKey: "itemTitleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "itemTextColor", labelKey: "itemTextColor", type: "color", defaultValue: TEXT_BODY },
      { key: "showNumbers", labelKey: "showNumbers", type: "select", defaultValue: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { key: "numberColor", labelKey: "numberColor", type: "color", defaultValue: TEXT_DARK },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
    ],
  },

  {
    type: "gallery",
    labelKey: "blockGallery",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Before & After" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 48 },
      { key: "images", labelKey: "fieldImages", type: "list", defaultValue: [] },
      { key: "imageBorderRadius", labelKey: "imageBorderRadius", type: "number", defaultValue: 40 },
      { key: "imageHeight", labelKey: "imageHeight", type: "number", defaultValue: 35 },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: GOLD },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "labelColor", labelKey: "labelColor", type: "color", defaultValue: GOLD_DARK },
      { key: "filterTabs", labelKey: "filterTabs", type: "select", defaultValue: "no", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
    ],
  },

  {
    type: "reviews",
    labelKey: "blockReviews",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Client Reviews" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 48 },
      { key: "reviews", labelKey: "fieldReviews", type: "list", defaultValue: [] },
      { key: "reviewColumns", labelKey: "reviewColumns", type: "select", defaultValue: "3", options: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }] },
      { key: "reviewBorderRadius", labelKey: "reviewBorderRadius", type: "number", defaultValue: 30 },
      { key: "reviewPadding", labelKey: "reviewPadding", type: "number", defaultValue: 40 },
      { key: "reviewTextFont", labelKey: "reviewTextFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "reviewTextSize", labelKey: "reviewTextSize", type: "number", defaultValue: 16 },
      { key: "reviewNameFont", labelKey: "reviewNameFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "reviewNameSize", labelKey: "reviewNameSize", type: "number", defaultValue: 14 },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "cardColor", labelKey: "cardColor", type: "color", defaultValue: GOLD },
      { key: "reviewTextColor", labelKey: "reviewTextColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "reviewNameColor", labelKey: "reviewNameColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "showStars", labelKey: "showStars", type: "select", defaultValue: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
      { key: "starColor", labelKey: "starColor", type: "color", defaultValue: "#FFD700" },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
    ],
  },

  {
    type: "faq",
    labelKey: "blockFaq",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "FAQ" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 48 },
      { key: "items", labelKey: "fieldItems2", type: "list", defaultValue: [] },
      { key: "questionFont", labelKey: "questionFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "questionSize", labelKey: "questionSize", type: "number", defaultValue: 20 },
      { key: "questionWeight", labelKey: "questionWeight", type: "select", defaultValue: "500", options: [{ value: "400", label: "Regular" }, { value: "500", label: "Medium" }, { value: "600", label: "Semi-bold" }, { value: "700", label: "Bold" }] },
      { key: "answerFont", labelKey: "answerFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "answerSize", labelKey: "answerSize", type: "number", defaultValue: 16 },
      { key: "answerLineHeight", labelKey: "answerLineHeight", type: "number", defaultValue: 1.6 },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "questionColor", labelKey: "questionColor", type: "color", defaultValue: TEXT_DARK },
      { key: "answerColor", labelKey: "answerColor", type: "color", defaultValue: TEXT_MUTED },
      { key: "itemBackground", labelKey: "itemBackground", type: "color", defaultValue: "#F8F7F5" },
      { key: "itemBorderRadius", labelKey: "itemBorderRadius", type: "number", defaultValue: 20 },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
      { key: "maxWidth", labelKey: "maxWidth", type: "number", defaultValue: 920 },
    ],
  },

  {
    type: "consultation",
    labelKey: "blockConsultation",
    fields: [
      { key: "title", labelKey: "fieldTitle", type: "textarea", defaultValue: "Book a Consultation" },
      { key: "subtitle", labelKey: "fieldSubtitle", type: "textarea", defaultValue: "Leave a request" },
      { key: "titleFont", labelKey: "titleFont", type: "select", defaultValue: "font-berlingske", options: FONT_OPTIONS },
      { key: "titleSize", labelKey: "titleSize", type: "number", defaultValue: 48 },
      { key: "titleLineHeight", labelKey: "titleLineHeight", type: "number", defaultValue: 1.1 },
      { key: "subtitleFont", labelKey: "subtitleFont", type: "select", defaultValue: "font-manrope", options: FONT_OPTIONS },
      { key: "subtitleSize", labelKey: "subtitleSize", type: "number", defaultValue: 16 },
      { key: "backgroundColor", labelKey: "backgroundColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "titleColor", labelKey: "titleColor", type: "color", defaultValue: TEXT_DARK },
      { key: "subtitleColor", labelKey: "subtitleColor", type: "color", defaultValue: TEXT_MUTED },
      { key: "buttonColor", labelKey: "fieldButtonColor", type: "color", defaultValue: GOLD },
      { key: "buttonTextColor", labelKey: "buttonTextColor", type: "color", defaultValue: "#FFFFFF" },
      { key: "primaryBtn", labelKey: "primaryBtn", type: "text", defaultValue: "Book Consultation" },
      { key: "primaryBtnSize", labelKey: "primaryBtnSize", type: "number", defaultValue: 14 },
      { key: "primaryBtnRadius", labelKey: "primaryBtnRadius", type: "number", defaultValue: 10 },
      { key: "phone", labelKey: "fieldPhone", type: "text", defaultValue: "+1 (305) 336-9373" },
      { key: "email", labelKey: "fieldEmail", type: "text", defaultValue: "info@womanmedspa.com" },
      { key: "address", labelKey: "address", type: "text", defaultValue: "1006 E Hallandale Beach Blvd Suite 204 Hallandale Beach FL 33009" },
      { key: "workHours", labelKey: "workHours", type: "text", defaultValue: "Mon-Fri 9-7, Sat 10-5" },
      { key: "paddingTop", labelKey: "paddingTop", type: "number", defaultValue: 96 },
      { key: "paddingBottom", labelKey: "paddingBottom", type: "number", defaultValue: 96 },
    ],
  },
];

export function getBlockDef(type: string): BlockDef | undefined {
  return BLOCK_DEFS.find((b) => b.type === type);
}

export function defaultContent(type: string): Record<string, unknown> {
  const def = getBlockDef(type);
  if (!def) return {};
  const out: Record<string, unknown> = {};
  for (const f of def.fields) out[f.key] = f.defaultValue;
  return out;
}

export const BLOCK_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  BLOCK_DEFS.map((b) => [b.type, b.labelKey])
);
