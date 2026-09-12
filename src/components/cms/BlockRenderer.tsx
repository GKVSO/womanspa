"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ml, sv, nv, px, yesNo, toLang, type Lang, ML_KEYS, ML_ITEM_KEYS, type BlockContent } from "@/lib/i18n-helpers";
import { useGlobalData } from "@/components/GlobalDataProvider";

export type { BlockContent };

interface BlockRendererProps {
  type: "hero" | "text_block" | "cards" | "benefits" | "gallery" | "reviews" | "faq" | "consultation";
  content: BlockContent;
  editing?: boolean;
  lang?: Lang;
  onElementClick?: (elementType: string, label: string) => void;
}

function normalizeItem<T extends Record<string, unknown>>(raw: string | T, map: Record<string, string>): T {
  if (typeof raw === "object" && raw !== null) return raw;
  const parts = String(raw).split("|");
  const result: Record<string, unknown> = {};
  Object.keys(map).forEach((k, i) => { result[k] = parts[i] ?? ""; });
  return result as T;
}

const EDIT_HOVER = "cursor-pointer hover:ring-2 hover:ring-[#CBA07D] hover:ring-offset-1 transition-all";

/** Get text value for language (multi-language aware) */
function tVal(content: BlockContent, key: string, lang: Lang): string {
  return ml(content[key], lang);
}

/** Get item text value for language */
function tItem(item: Record<string, unknown>, key: string, lang: Lang): string {
  const v = item[key];
  if (v == null) return "";
  if (ML_ITEM_KEYS.has(key)) return ml(v, lang);
  return sv(v);
}

function Stars({ text, color = "#FFD700" }: { text?: string; color?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" style={{ color }}>
            <path d="M12.0026 18.26L4.9491 22.2082L6.52443 14.2799L0.589844 8.7918L8.61688 7.84006L12.0026 0.5L15.3882 7.84006L23.4152 8.7918L17.4807 14.2799L19.056 22.2082L12.0026 18.26Z" fill="currentColor" />
          </svg>
        ))}
      </div>
      {text && <span className="text-white/90 text-[13px]">{text}</span>}
    </div>
  );
}

function DotList({ items, color = "#9A6D44", fontSize = 16 }: { items: string[]; color?: string; fontSize?: number }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[#1F1D1B] font-medium" style={{ fontSize: `${fontSize}px` }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[8px]" style={{ backgroundColor: color }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BlockRenderer({ type, content, editing = false, lang: langProp }: BlockRendererProps) {
  const { lang: ctxLang, t } = useLanguage();
  // Convert LanguageProvider lang ("En") → lowercase ("en")
  const lang: Lang = langProp ?? toLang(ctxLang);
  const e = (elementType: string, label: string) => editing ? { "data-edit-type": elementType, "data-edit-label": label, className: EDIT_HOVER } : {};

  switch (type) {
    // ==================== HERO ====================
    case "hero": {
      const bg = sv(content.backgroundImage);
      const bgTablet = sv(content.backgroundImageTablet);
      const bgMobile = sv(content.backgroundImageMobile);
      const overlay = nv(content.backgroundOverlay, 30);
      return (
        <section
          {...e("section", "hero")}
          className="relative bg-cover bg-center bg-no-repeat px-5 sm:px-10 pt-20 sm:pt-24 pb-10 sm:pb-16 min-h-[100vh] flex flex-col overflow-hidden"
          style={{
            minHeight: `${nv(content.height, 100)}vh`,
            backgroundImage: bg ? `url(${bg})` : undefined,
            backgroundColor: bg ? undefined : sv(content.backgroundColor),
            borderRadius: `0 0 ${nv(content.borderRadius, 60)}px ${nv(content.borderRadius, 60)}px`,
            paddingTop: px(content.paddingTop) || "96px",
            paddingBottom: px(content.paddingBottom) || "64px",
            paddingLeft: px(content.paddingX) || "40px",
            paddingRight: px(content.paddingX) || "40px",
          }}
        >
          <div className="absolute inset-0 bg-black" style={{ opacity: overlay / 100 }} />
          <div className="relative z-10 w-full flex-1 flex flex-col">
            {content.showStars !== "no" && (
              <Stars text={tVal(content, "starsText", lang)} color={sv(content.starColor) || "#FFD700"} />
            )}
            <h1
              {...e("text", "title")}
              className={`text-white leading-tight ${sv(content.titleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
              style={{
                fontSize: px(content.titleSize) || "64px",
                lineHeight: nv(content.titleLineHeight, 1.1),
                letterSpacing: content.titleLetterSpacing ? `${nv(content.titleLetterSpacing, 0)}px` : undefined,
              }}
            >
              {t(tVal(content, "title", lang))}
            </h1>
            {content.subtitle != null && (
              <p
                {...e("text", "subtitle")}
                className={`text-white font-semibold mt-6 max-w-[680px] ${sv(content.subtitleFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
                style={{
                  fontSize: px(content.subtitleSize) || "16px",
                  lineHeight: nv(content.subtitleLineHeight, 1.6),
                }}
              >
                {t(tVal(content, "subtitle", lang))}
              </p>
            )}
            {(content.primaryBtn != null || content.secondaryBtn != null) && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 mt-auto sm:mt-0" {...e("button", "buttons")}>
                {content.primaryBtn != null && (
                  <button
                    className="w-full sm:w-auto bg-white text-black font-bold hover:shadow-md transition-shadow"
                    style={{
                      borderRadius: `${nv(content.primaryBtnRadius, 10)}px`,
                      paddingLeft: `${nv(content.primaryBtnPaddingX, 32)}px`,
                      paddingRight: `${nv(content.primaryBtnPaddingX, 32)}px`,
                      paddingTop: `${nv(content.primaryBtnPaddingY, 16)}px`,
                      paddingBottom: `${nv(content.primaryBtnPaddingY, 16)}px`,
                      fontSize: `${nv(content.primaryBtnSize, 14)}px`,
                    }}
                  >
                    {t(tVal(content, "primaryBtn", lang))}
                  </button>
                )}
                {content.secondaryBtn != null && (
                  <button className="w-full sm:w-auto text-white font-bold border border-white rounded-[10px] px-8 py-4 bg-transparent hover:bg-white/10 transition-colors">
                    {t(tVal(content, "secondaryBtn", lang))}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      );
    }

    // ==================== TEXT BLOCK ====================
    case "text_block": {
      return (
        <section
          {...e("section", "text_block")}
          className="px-5 sm:px-10"
          style={{
            backgroundColor: sv(content.backgroundColor) || "#FFFFFF",
            paddingTop: px(content.paddingTop) || "96px",
            paddingBottom: px(content.paddingBottom) || "96px",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: content.maxWidth ? `${nv(content.maxWidth, 920)}px` : undefined }}>
            <h2
              {...e("text", "title")}
              className={`leading-tight ${sv(content.titleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
              style={{
                fontSize: px(content.titleSize) || "48px",
                lineHeight: nv(content.titleLineHeight, 1.1),
                letterSpacing: content.titleLetterSpacing ? `${nv(content.titleLetterSpacing, 0)}px` : undefined,
                color: sv(content.titleColor) || "#1F1D1B",
                textAlign: sv(content.align) as "left" | "center" | "right",
              }}
            >
              {t(tVal(content, "title", lang))}
            </h2>
            <div
              {...e("text", "body")}
              className={`mt-6 ${sv(content.bodyFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
              style={{
                fontSize: px(content.bodySize) || "16px",
                lineHeight: nv(content.bodyLineHeight, 1.6),
                color: sv(content.bodyColor) || "#313242",
                textAlign: sv(content.align) as "left" | "center" | "right",
              }}
            >
              {t(tVal(content, "body", lang))}
            </div>
          </div>
        </section>
      );
    }

    // ==================== CARDS ====================
    case "cards": {
      const rawCards = (Array.isArray(content.cards) ? content.cards : []) as Array<string | Record<string, unknown>>;
      const cols = sv(content.cardColumns) || "3";
      const gridCols = cols === "1" ? "grid-cols-1" : cols === "2" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      return (
        <section
          {...e("section", "cards")}
          className="px-5 sm:px-10"
          style={{
            backgroundColor: sv(content.backgroundColor) || "#F1F2F4",
            paddingTop: px(content.paddingTop) || "96px",
            paddingBottom: px(content.paddingBottom) || "96px",
          }}
        >
          <h2
            {...e("text", "title")}
            className={`text-center leading-tight ${sv(content.titleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
            style={{
              fontSize: px(content.titleSize) || "36px",
              lineHeight: nv(content.titleLineHeight, 1.1),
              color: sv(content.titleColor) || "#1F1D1B",
              textAlign: sv(content.titleAlign) as "left" | "center" | "right",
            }}
          >
            {t(tVal(content, "title", lang))}
          </h2>
          <div className={`grid ${gridCols} mt-10 sm:mt-12`} style={{ gap: `${nv(content.cardGap, 24)}px` }}>
            {rawCards.map((raw, i) => {
              const card = normalizeItem(raw, { title: "title", text: "text" });
              return (
                <div
                  key={i}
                  {...e("card", "card")}
                  className={`flex flex-col ${editing ? EDIT_HOVER : ""}`}
                  style={{
                    backgroundColor: sv(content.cardBackground) || "#FFFFFF",
                    borderRadius: `${nv(content.cardBorderRadius, 30)}px`,
                    padding: `${nv(content.cardPadding, 40)}px`,
                  }}
                >
                  <h3
                    {...e("text", "card_title")}
                    className={`${sv(content.cardTitleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
                    style={{
                      fontSize: px(content.cardTitleSize) || "24px",
                      color: sv(content.cardTitleColor) || "#1F1D1B",
                    }}
                  >
                    {t(tItem(card, "title", lang))}
                  </h3>
                  <p
                    {...e("text", "card_text")}
                    className={`mt-3 ${sv(content.cardBodyFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
                    style={{
                      fontSize: px(content.cardBodySize) || "16px",
                      color: sv(content.cardTextColor) || "#313242",
                    }}
                  >
                    {t(tItem(card, "text", lang))}
                  </p>
                </div>
              );
            })}
          </div>
          {content.buttonText != null && (
            <button
              className="self-center mt-10 text-white font-bold hover:shadow-md transition-shadow"
              style={{ backgroundColor: sv(content.buttonColor) || "#CBA07D", borderRadius: "10px", padding: "16px 40px", fontSize: "14px" }}
            >
              {t(tVal(content, "buttonText", lang))}
            </button>
          )}
        </section>
      );
    }

    // ==================== BENEFITS ====================
    case "benefits": {
      const rawItems = (Array.isArray(content.items) ? content.items : []) as Array<string | Record<string, unknown>>;
      const cols = sv(content.itemColumns) || "3";
      const gridCols = cols === "1" ? "grid-cols-1" : cols === "2" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      const imgPos = sv(content.imagePosition) || "right";
      const showImg = imgPos !== "none" && !!content.image;
      // Use white title on dark/gold backgrounds like frontend
      const isGoldBg = (sv(content.backgroundColor) || "#CBA07D").toLowerCase() === "#cba07d" || (sv(content.backgroundColor) || "").toLowerCase() === "#cba07d";
      const titleColor = sv(content.titleColor) || (isGoldBg ? "#FFFFFF" : "#1F1D1B");
      return (
        <section
          {...e("section", "benefits")}
          className="relative overflow-hidden rounded-b-[60px] px-5 sm:px-10 pt-16 sm:pt-24 pb-12 sm:pb-20"
          style={{
            backgroundColor: sv(content.backgroundColor) || "#CBA07D",
          }}
        >
          <h2
            {...e("text", "title")}
            className={`text-center leading-tight font-berlingske ${editing ? EDIT_HOVER : ""}`}
            style={{
              fontSize: px(content.titleSize) || undefined,
              color: titleColor,
            }}
          >
            <span className="text-[32px] min-[768px]:text-[48px] min-[1200px]:text-[70px] min-[1600px]:text-[92px] leading-tight font-berlingske font-normal">
              {t(tVal(content, "title", lang))}
            </span>
          </h2>
          {showImg ? (
            <div {...e("image", "image")} className={`relative z-10 -mt-4 min-[768px]:-mt-8 flex justify-center ${editing ? EDIT_HOVER : ""}`}>
              <img src={sv(content.image)} alt="" className="h-auto w-[50%] min-[1200px]:w-[60%]" style={{ maxWidth: `${nv(content.imageMaxWidth, 400)}px` }} />
            </div>
          ) : (
            // Default xerf device image if no custom image set but on gold bg (like frontend)
            isGoldBg && !showImg && (
              <div className="relative z-10 -mt-4 min-[768px]:-mt-8 flex justify-center">
                <img src="/xerf-benefits.png" alt="" className="h-auto w-[50%] min-[1200px]:w-[60%]" />
              </div>
            )
          )}
          <div className="relative z-20 -mt-8 min-[768px]:-mt-[100px] w-full">
            <div className="absolute -inset-8 rounded-[60px]" style={{ backgroundColor: sv(content.backgroundColor) || "#CBA07D", filter: "blur(10px)", opacity: 0.9 }} />
            <div className="relative rounded-[40px]" style={{ backgroundColor: sv(content.backgroundColor) || "#CBA07D" }}>
              <div className={`grid ${gridCols} gap-5 sm:gap-8`}>
                {rawItems.map((raw, i) => {
                  const item = normalizeItem(raw, { title: "title", text: "text" });
                  return (
                    <div
                      key={i}
                      {...e("card", "item")}
                      className={`rounded-[30px] bg-white/80 p-6 sm:p-10 flex flex-col justify-between h-full min-[1600px]:min-h-[360px] ${editing ? EDIT_HOVER : ""}`}
                    >
                      {yesNo(content.showNumbers, true) && (
                        <p className="text-[#1F1D1B] font-normal text-[24px] font-berlingske">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                      )}
                      <div>
                        <p
                          {...e("text", "item_title")}
                          className={`text-left text-[#1F1D1B] font-bold text-[16px] min-[768px]:text-[18px] min-[1200px]:text-[16px] min-[1600px]:text-[24px] leading-snug mb-4 ${editing ? EDIT_HOVER : ""}`}
                        >
                          {t(tItem(item, "title", lang))}
                        </p>
                        <p
                          {...e("text", "item_text")}
                          className={`text-left text-[#1F1D1B] font-medium text-[14px] min-[768px]:text-[16px] min-[1200px]:text-[14px] min-[1600px]:text-[20px] leading-snug ${editing ? EDIT_HOVER : ""}`}
                        >
                          {t(tItem(item, "text", lang))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // ==================== GALLERY ====================
    case "gallery": {
      const { gallery } = useGlobalData();
      return (
        <section
          {...e("section", "gallery")}
          className="px-5 sm:px-10"
          style={{
            backgroundColor: sv(content.backgroundColor) || "#CBA07D",
            paddingTop: px(content.paddingTop) || "96px",
            paddingBottom: px(content.paddingBottom) || "96px",
          }}
        >
          <h2
            {...e("text", "title")}
            className={`text-center leading-tight ${sv(content.titleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
            style={{
              fontSize: px(content.titleSize) || "48px",
              color: sv(content.titleColor) || "#1F1D1B",
            }}
          >
            {t(tVal(content, "title", lang))}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 sm:mt-12">
            {gallery.map((img, i) => (
              <div key={i} className="relative" style={{ borderRadius: `${nv(content.imageBorderRadius, 40)}px`, overflow: "hidden", height: `${nv(content.imageHeight, 35)}vh` }}>
                <img src={img.before} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <img src={img.after} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: "inset(0 0 0 50%)" }} />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-black/40 backdrop-blur-sm">
                  {img.beforeLabel || "Before"}
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-[11px] font-bold text-white bg-black/40 backdrop-blur-sm">
                  {img.afterLabel || "After"}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // ==================== REVIEWS ====================
    case "reviews": {
      const { reviews } = useGlobalData();
      const cols = sv(content.reviewColumns) || "3";
      const gridCols = cols === "1" ? "grid-cols-1" : cols === "2" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      return (
        <section
          {...e("section", "reviews")}
          className="px-5 sm:px-10"
          style={{
            backgroundColor: sv(content.backgroundColor) || "#FFFFFF",
            paddingTop: px(content.paddingTop) || "96px",
            paddingBottom: px(content.paddingBottom) || "96px",
          }}
        >
          <h2
            {...e("text", "title")}
            className={`text-center leading-tight ${sv(content.titleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
            style={{
              fontSize: px(content.titleSize) || "48px",
              color: sv(content.titleColor) || "#1F1D1B",
            }}
          >
            {t(tVal(content, "title", lang))}
          </h2>
          <div className={`grid ${gridCols} mt-10 sm:mt-12`} style={{ gap: "20px" }}>
            {reviews.map((rev, i) => (
              <div
                key={i}
                {...e("card", "review")}
                className={`flex flex-col ${editing ? EDIT_HOVER : ""}`}
                style={{
                  backgroundColor: sv(content.cardColor) || "#CBA07D",
                  borderRadius: `${nv(content.reviewBorderRadius, 30)}px`,
                  padding: `${nv(content.reviewPadding, 40)}px`,
                }}
              >
                {content.showStars !== "no" && (
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(Number(rev.stars) || 5)].map((_, j) => (
                      <svg key={j} width="18" height="18" viewBox="0 0 24 24" style={{ color: sv(content.starColor) || "#FFD700" }}>
                        <path d="M12.0026 18.26L4.9491 22.2082L6.52443 14.2799L0.589844 8.7918L8.61688 7.84006L12.0026 0.5L15.3882 7.84006L23.4152 8.7918L17.4807 14.2799L19.056 22.2082L12.0026 18.26Z" fill="currentColor" />
                      </svg>
                    ))}
                  </div>
                )}
                <p
                  {...e("text", "review_text")}
                  className={`flex-1 ${sv(content.reviewTextFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
                  style={{
                    fontSize: px(content.reviewTextSize) || "16px",
                    color: sv(content.reviewTextColor) || "#FFFFFF",
                  }}
                >
                  &ldquo;{t(rev.text)}&rdquo;
                </p>
                <p
                  {...e("text", "review_name")}
                  className={`mt-4 font-semibold ${sv(content.reviewNameFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
                  style={{
                    fontSize: px(content.reviewNameSize) || "14px",
                    color: sv(content.reviewNameColor) || "#FFFFFF",
                  }}
                >
                  — {t(rev.name)}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // ==================== FAQ ====================
    case "faq": {
      const rawItems = (Array.isArray(content.items) ? content.items : []) as Array<string | Record<string, unknown>>;
      return (
        <section
          {...e("section", "faq")}
          className="px-5 sm:px-10"
          style={{
            backgroundColor: sv(content.backgroundColor) || "#FFFFFF",
            paddingTop: px(content.paddingTop) || "96px",
            paddingBottom: px(content.paddingBottom) || "96px",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: content.maxWidth ? `${nv(content.maxWidth, 920)}px` : undefined }}>
            <h2
              {...e("text", "title")}
              className={`text-center leading-tight ${sv(content.titleFont) || "font-berlingske"} ${editing ? EDIT_HOVER : ""}`}
              style={{
                fontSize: px(content.titleSize) || "48px",
                color: sv(content.titleColor) || "#1F1D1B",
              }}
            >
              {t(tVal(content, "title", lang))}
            </h2>
            <div className="mt-10 space-y-3">
              {rawItems.map((raw, i) => {
                const item = normalizeItem(raw, { question: "question", answer: "answer" });
                return (
                  <div
                    key={i}
                    {...e("card", "faq_item")}
                    className={`rounded-[20px] overflow-hidden ${editing ? EDIT_HOVER : ""}`}
                    style={{
                      backgroundColor: sv(content.itemBackground) || "#F8F7F5",
                      borderRadius: `${nv(content.itemBorderRadius, 20)}px`,
                    }}
                  >
                    <div className="px-6 py-4 flex items-center justify-between">
                      <h3
                        {...e("text", "question")}
                        className={`${sv(content.questionFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
                        style={{
                          fontSize: px(content.questionSize) || "20px",
                          fontWeight: nv(content.questionWeight, 500),
                          color: sv(content.questionColor) || "#1F1D1B",
                        }}
                      >
                        {t(tItem(item, "question", lang))}
                      </h3>
                    </div>
                    <div className="px-6 pb-4">
                      <p
                        {...e("text", "answer")}
                        className={`${sv(content.answerFont) || "font-manrope"} ${editing ? EDIT_HOVER : ""}`}
                        style={{
                          fontSize: px(content.answerSize) || "16px",
                          lineHeight: nv(content.answerLineHeight, 1.6),
                          color: sv(content.answerColor) || "#6B7078",
                        }}
                      >
                        {t(tItem(item, "answer", lang))}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

  }
}
