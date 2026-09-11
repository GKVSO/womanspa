"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import { t as tr, type AdminLang } from "@/components/cms/i18n";
import { BLOCK_DEFS } from "@/lib/blocks";
import type { BlockContent } from "@/lib/i18n-helpers";
import { ml, mlSet, isML, ML_ITEM_KEYS, type Lang } from "@/lib/i18n-helpers";

const LANG_LABELS: Record<AdminLang, string> = { ru: "RU", en: "EN", es: "ES" };

interface PageInfo {
  id: number;
  slug: string;
  title: string;
  seo_title: string;
  seo_description: string;
  published: number;
  is_home: number;
  vagaro_booking_url?: string;
  vagaro_booking_embed?: string;
  vagaro_booking_mode?: string;
}

interface BlockItem {
  id?: number;
  type: string;
  content: BlockContent;
}

/** Text fields editable per block type (flat, not list) */
const BLOCK_TEXT_FIELDS: Record<string, { key: string; labelKey: string }[]> = {
  hero: [
    { key: "title", labelKey: "fieldTitle" },
    { key: "subtitle", labelKey: "fieldSubtitle" },
    { key: "primaryBtn", labelKey: "primaryBtn" },
    { key: "secondaryBtn", labelKey: "secondaryBtn" },
    { key: "starsText", labelKey: "starsText" },
  ],
  text_block: [
    { key: "title", labelKey: "fieldTitle" },
    { key: "body", labelKey: "fieldBody" },
  ],
  cards: [
    { key: "title", labelKey: "fieldTitle" },
    { key: "buttonText", labelKey: "primaryBtn" },
  ],
  benefits: [
    { key: "title", labelKey: "fieldTitle" },
  ],
  gallery: [
    { key: "title", labelKey: "fieldTitle" },
  ],
  reviews: [
    { key: "title", labelKey: "fieldTitle" },
  ],
  faq: [
    { key: "title", labelKey: "fieldTitle" },
  ],
  consultation: [
    { key: "title", labelKey: "fieldTitle" },
    { key: "subtitle", labelKey: "fieldSubtitle" },
    { key: "primaryBtn", labelKey: "primaryBtn" },
    { key: "phone", labelKey: "fieldPhone" },
    { key: "email", labelKey: "fieldEmail" },
    { key: "address", labelKey: "address" },
    { key: "workHours", labelKey: "workHours" },
  ],
};

/** List fields with text content per block type */
const BLOCK_LIST_FIELDS: Record<string, { key: string; labelKey: string; itemTextKeys: string[] }[]> = {
  hero: [
    { key: "cardsMini", labelKey: "cardsMini", itemTextKeys: ["title", "subtitle"] },
  ],
  cards: [
    { key: "cards", labelKey: "fieldCards", itemTextKeys: ["title", "text"] },
  ],
  benefits: [
    { key: "items", labelKey: "fieldItems", itemTextKeys: ["title", "text"] },
  ],
  gallery: [
    { key: "images", labelKey: "fieldImages", itemTextKeys: ["beforeLabel", "afterLabel"] },
  ],
  reviews: [
    { key: "reviews", labelKey: "fieldReviews", itemTextKeys: ["text", "name"] },
  ],
  faq: [
    { key: "items", labelKey: "fieldItems2", itemTextKeys: ["question", "answer"] },
  ],
};

/** Human labels for item keys */
const ITEM_KEY_LABELS: Record<string, { ru: string; en: string; es: string }> = {
  title: { ru: "Заголовок", en: "Title", es: "Título" },
  subtitle: { ru: "Подзаголовок", en: "Subtitle", es: "Subtítulo" },
  text: { ru: "Текст", en: "Text", es: "Texto" },
  num: { ru: "Номер", en: "Number", es: "Número" },
  question: { ru: "Вопрос", en: "Question", es: "Pregunta" },
  answer: { ru: "Ответ", en: "Answer", es: "Respuesta" },
  name: { ru: "Имя", en: "Name", es: "Nombre" },
  beforeLabel: { ru: "Надпись «до»", en: "Before label", es: "Etiqueta antes" },
  afterLabel: { ru: "Надпись «после»", en: "After label", es: "Etiqueta después" },
};

export default function AdminPageEditor({ params }: { params: Promise<{ id: string }> }) {
  const { lang, setLang } = useAdminUI();
  const router = useRouter();

  const [page, setPage] = useState<PageInfo | null>(null);
  const [blocks, setBlocks] = useState<BlockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSeo, setShowSeo] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    params.then(({ id }) => {
      if (!mounted) return;
      const n = Number(id);
      fetch(`/api/admin/pages/${n}`).then((res) => res.json()).then((data) => {
        if (!mounted) return;
        setPage(data.page);
        setBlocks(data.blocks || []);
        setLoading(false);
      });
    });
    return () => { mounted = false; };
  }, []);

  const save = async () => {
    if (!page) return;
    setSaving(true);
    await fetch(`/api/admin/pages/${page.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, blocks }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const contentLang = lang.toLowerCase() as Lang;

  // Update a flat ML text field for current language
  const setText = (blockIndex: number, key: string, value: string) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      return { ...b, content: { ...b.content, [key]: mlSet(b.content[key], contentLang, value) } };
    }));
  };

  // Update a text field inside a list item for current language
  const setItemText = (blockIndex: number, listKey: string, itemIndex: number, itemKey: string, value: string) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      const arr = [...(Array.isArray(b.content[listKey]) ? b.content[listKey] as unknown[] : [])];
      const item = { ...(arr[itemIndex] as Record<string, unknown>) };
      item[itemKey] = mlSet(item[itemKey], contentLang, value);
      arr[itemIndex] = item;
      return { ...b, content: { ...b.content, [listKey]: arr } };
    }));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--admin-bg)" }}>…</div>;
  if (!page) return <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--admin-bg)", color: "var(--admin-muted)" }}>not found</div>;

  const inputStyle = {
    background: "var(--admin-card)",
    color: "var(--admin-text)",
    border: "1px solid var(--admin-border)",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--admin-bg)" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 sticky top-0 z-20"
        style={{ background: "var(--admin-panel)", borderBottom: "1px solid var(--admin-border)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => router.push("/admin")}
            className="text-[13px] px-2.5 py-1.5 rounded-[8px] cursor-pointer flex-shrink-0"
            style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
          >
            ← {tr(lang, "back")}
          </button>
          <span className="text-[16px] font-berlingske truncate" style={{ color: "var(--admin-text)" }}>
            {page.title || tr(lang, "untitled")}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {(["ru", "en", "es"] as AdminLang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="w-7 h-7 rounded-full text-[10px] font-bold cursor-pointer"
              style={{
                background: lang === l ? "#CBA07D" : "transparent",
                color: lang === l ? "#fff" : "var(--admin-muted)",
                border: `1px solid ${lang === l ? "#CBA07D" : "var(--admin-border)"}`,
              }}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
          <button
            onClick={() => setShowSeo(true)}
            className="text-[12px] px-3 py-1.5 rounded-[8px] cursor-pointer"
            style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
          >
            SEO
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="text-[12px] font-bold px-4 py-1.5 rounded-[8px] text-white cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "#B07E3F" }}
          >
            {saving ? tr(lang, "saving") : saved ? "✓ " + tr(lang, "saved") : tr(lang, "save")}
          </button>
        </div>
      </div>

      {/* Text editor: all sections, all text fields */}
      <div className="max-w-[860px] mx-auto px-4 py-6 space-y-6">
        {/* Vagaro Settings Override (Directly on page) */}
        <div className="rounded-[16px] p-5" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <p className="text-[13px] font-semibold mb-4" style={{ color: "var(--admin-text)" }}>
            {lang === "ru" ? "Виджет записи (Vagaro) для этой страницы" : lang === "es" ? "Widget de reserva (Vagaro) para esta página" : "Booking Widget (Vagaro) for this page"}
          </p>
          <p className="text-[11px] mb-4" style={{ color: "var(--admin-muted)" }}>
            {lang === "ru" ? "Оставьте пустым, чтобы использовать глобальные настройки." : lang === "es" ? "Dejar en blanco para usar la configuración global." : "Leave blank to use global settings."}
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
                {lang === "ru" ? "Режим бронирования" : lang === "es" ? "Modo de reserva" : "Booking mode"}
              </label>
              <select
                value={page.vagaro_booking_mode || ""}
                onChange={(e) => setPage({ ...page, vagaro_booking_mode: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[8px] text-[13px] outline-none"
                style={inputStyle}
              >
                <option value="">{lang === "ru" ? "По умолчанию (как в общих настройках)" : "Default (global settings)"}</option>
                <option value="embed">{lang === "ru" ? "Виджет (embed)" : "Widget (embed)"}</option>
                <option value="link">{lang === "ru" ? "Ссылка (link)" : "Link"}</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
                {lang === "ru" ? "Ссылка (Booking Link)" : "Booking Link"}
              </label>
              <input
                value={page.vagaro_booking_url || ""}
                onChange={(e) => setPage({ ...page, vagaro_booking_url: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[8px] text-[13px] outline-none"
                style={inputStyle}
                placeholder="https://www.vagaro.com/your-business/booking"
              />
            </div>
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
                {lang === "ru" ? "Код виджета (Embed code)" : "Embed code"}
              </label>
              <textarea
                value={page.vagaro_booking_embed || ""}
                onChange={(e) => setPage({ ...page, vagaro_booking_embed: e.target.value })}
                rows={4}
                className="w-full px-3 py-2.5 rounded-[8px] text-[12px] outline-none resize-y font-mono"
                style={inputStyle}
                placeholder='<script src="..."></script>'
              />
            </div>
          </div>
        </div>

        {blocks.map((block, bi) => {
          const def = BLOCK_DEFS.find((b) => b.type === block.type);
          const blockName = def ? tr(lang, def.labelKey as Parameters<typeof tr>[1]) : block.type;
          const textFields = BLOCK_TEXT_FIELDS[block.type] || [];
          const listFields = BLOCK_LIST_FIELDS[block.type] || [];

          return (
            <div
              key={bi}
              className="rounded-[16px] p-5"
              style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}
            >
              <p className="text-[13px] font-semibold mb-4" style={{ color: "var(--admin-text)" }}>
                {blockName}
              </p>

              {/* Flat text fields */}
              {textFields.map(({ key, labelKey }) => {
                const val = block.content[key];
                // If RU/ES and not translated yet → show empty
                const missing = contentLang !== "en" && !isML(val) && typeof val === "string" && val !== "";
                const display = missing ? "" : ml(val, contentLang);
                const isLong = display.length > 80 || key === "body" || key === "subtitle";
                return (
                  <div key={key} className="mb-3">
                    <label className="text-[11px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
                      {tr(lang, labelKey as Parameters<typeof tr>[1])}
                    </label>
                    {isLong ? (
                      <textarea
                        value={display}
                        onChange={(e) => setText(bi, key, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none resize-y"
                        style={inputStyle}
                      />
                    ) : (
                      <input
                        value={display}
                        onChange={(e) => setText(bi, key, e.target.value)}
                        className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none"
                        style={inputStyle}
                      />
                    )}
                  </div>
                );
              })}

              {/* List fields with text */}
              {listFields.map(({ key, labelKey, itemTextKeys }) => {
                const arr = Array.isArray(block.content[key]) ? block.content[key] as Record<string, unknown>[] : [];
                if (arr.length === 0) return null;
                return (
                  <div key={key} className="mb-3">
                    <label className="text-[11px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
                      {tr(lang, labelKey as Parameters<typeof tr>[1])}
                    </label>
                    <div className="space-y-2">
                      {arr.map((item, ii) => (
                        <div key={ii} className="rounded-[10px] p-3" style={{ background: "var(--admin-card)", border: "1px solid var(--admin-border)" }}>
                          {itemTextKeys.map((ik) => {
                            const v = item[ik];
                            if (v == null && !ML_ITEM_KEYS.has(ik)) return null;
                            const missing = contentLang !== "en" && !isML(v) && typeof v === "string" && v !== "";
                            const display = missing ? "" : ml(v, contentLang);
                            if (!ML_ITEM_KEYS.has(ik) && v == null) return null;
                            const isLong = display.length > 80 || ik === "text" || ik === "answer";
                            return (
                              <div key={ik} className="mb-2 last:mb-0">
                                <label className="text-[10px] mb-0.5 block" style={{ color: "var(--admin-muted)" }}>
                                  {ITEM_KEY_LABELS[ik]?.[lang] || ik}
                                </label>
                                {isLong ? (
                                  <textarea
                                    value={display}
                                    onChange={(e) => setItemText(bi, key, ii, ik, e.target.value)}
                                    rows={2}
                                    className="w-full px-2.5 py-1.5 rounded-[6px] text-[12px] outline-none resize-y"
                                    style={inputStyle}
                                  />
                                ) : (
                                  <input
                                    value={display}
                                    onChange={(e) => setItemText(bi, key, ii, ik, e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-[6px] text-[12px] outline-none"
                                    style={inputStyle}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Settings modal */}
      {showSeo && page && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setShowSeo(false)}>
          <div
            className="w-full max-w-[500px] rounded-[20px] p-6 shadow-2xl my-auto"
            style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[16px] font-semibold mb-4" style={{ color: "var(--admin-text)" }}>SEO & {tr(lang, "general" as any) || "Общие"}</h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "pageTitle")}</label>
                <input
                  value={page.title}
                  onChange={(e) => setPage({ ...page, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[10px] text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "slug")}</label>
                <input
                  value={page.slug}
                  onChange={(e) => setPage({ ...page, slug: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[10px] text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "seoTitle")}</label>
                <input
                  value={page.seo_title}
                  onChange={(e) => setPage({ ...page, seo_title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-[10px] text-[14px] outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "seoDescription")}</label>
                <textarea
                  value={page.seo_description}
                  onChange={(e) => setPage({ ...page, seo_description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-[10px] text-[14px] outline-none resize-y"
                  style={inputStyle}
                />
              </div>
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: "var(--admin-text)" }}>
                  <input type="checkbox" checked={page.published === 1} onChange={(e) => setPage({ ...page, published: e.target.checked ? 1 : 0 })} />
                  {tr(lang, "published")}
                </label>
                <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: "var(--admin-text)" }}>
                  <input type="checkbox" checked={page.is_home === 1} onChange={(e) => setPage({ ...page, is_home: e.target.checked ? 1 : 0 })} />
                  {tr(lang, "home")}
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowSeo(false)}
                className="px-5 py-2.5 rounded-[10px] text-[13px] font-bold text-white cursor-pointer"
                style={{ backgroundColor: "#B07E3F" }}
              >
                {tr(lang, "done")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
