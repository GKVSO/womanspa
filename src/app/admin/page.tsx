"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import AdminHeader from "@/components/cms/AdminHeader";
import { t as tr, type AdminLang } from "@/components/cms/i18n";

interface PageItem {
  id: number;
  slug: string;
  title: string;
  published: number;
  is_home: number;
  updated_at: string;
}

const LANG_LABELS: Record<AdminLang, string> = { ru: "RU", en: "EN", es: "ES" };

export default function AdminDashboard() {
  const { lang, setLang, theme, setTheme } = useAdminUI();
  const router = useRouter();

  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<PageItem | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/pages/");
    const data = await res.json();
    setPages(data.pages || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async () => {
    if (!newTitle.trim()) return;
    const slug = newSlug.trim() || newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const res = await fetch("/api/admin/pages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, slug }),
    });
    const data = await res.json();
    if (res.ok) {
      setShowCreate(false);
      setNewTitle("");
      setNewSlug("");
      router.push(`/admin/pages/${data.id}`);
    }
  };

  const remove = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/pages/?id=${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    load();
  };

  const logout = async () => {
    await fetch("/api/auth/logout/", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--admin-bg)" }}>
      {/* Top bar */}
      <AdminHeader />

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-5 py-8">
        
        {/* Global Settings Links */}
        <div className="flex gap-4 mb-10">
          <Link href="/admin/reviews" className="flex-1 rounded-[14px] p-5 flex items-center justify-between transition-colors hover:border-[#CBA07D]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
            <span className="font-semibold text-[16px]" style={{ color: "var(--admin-text)" }}>{lang === 'ru' ? 'Отзывы (Глобальные)' : 'Global Reviews'}</span>
            <span style={{ color: "var(--admin-muted)" }}>→</span>
          </Link>
          <Link href="/admin/gallery" className="flex-1 rounded-[14px] p-5 flex items-center justify-between transition-colors hover:border-[#CBA07D]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
            <span className="font-semibold text-[16px]" style={{ color: "var(--admin-text)" }}>{lang === 'ru' ? 'До/После (Глобальные)' : 'Global Gallery'}</span>
            <span style={{ color: "var(--admin-muted)" }}>→</span>
          </Link>
        </div>

        {/* Title + create */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-berlingske" style={{ color: "var(--admin-text)" }}>
            {tr(lang, "dashboard")}
          </h1>
          <button
            onClick={() => setShowCreate(true)}
            className="text-white font-bold text-[13px] rounded-[10px] px-5 py-2.5 cursor-pointer"
            style={{ backgroundColor: "#B07E3F" }}
          >
            + {tr(lang, "createPage")}
          </button>
        </div>

        {/* Pages list */}
        {loading ? (
          <div className="text-center py-20" style={{ color: "var(--admin-muted)" }}>…</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--admin-muted)" }}>
            {tr(lang, "noPages")}
          </div>
        ) : (
          <div className="space-y-2">
            {pages.map((p) => (
              <div
                key={p.id}
                className="rounded-[14px] px-5 py-4 flex items-center justify-between gap-4 transition-colors"
                style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[15px] truncate" style={{ color: "var(--admin-text)" }}>
                      {p.title || tr(lang, "untitled")}
                    </span>
                    {p.is_home === 1 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#CBA07D" }}>
                        {tr(lang, "home")}
                      </span>
                    )}
                    {p.published === 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--admin-card)", color: "var(--admin-muted)" }}>
                        {tr(lang, "draft")}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--admin-muted)" }}>/{p.slug}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <a
                    href={`/cms/${p.slug}`}
                    target="_blank"
                    rel="noopener"
                    className="text-[12px] px-3 py-1.5 rounded-[8px] cursor-pointer"
                    style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
                  >
                    {tr(lang, "preview")}
                  </a>
                  <Link
                    href={`/admin/pages/${p.id}`}
                    className="text-[12px] px-3 py-1.5 rounded-[8px]"
                    style={{ color: "#CBA07D", border: "1px solid #CBA07D" }}
                  >
                    {tr(lang, "editPage")}
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="text-[12px] px-3 py-1.5 rounded-[8px] cursor-pointer"
                    style={{ color: "#c0392b", border: "1px solid rgba(192,57,43,0.3)" }}
                  >
                    {tr(lang, "deletePage")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setShowCreate(false)}>
          <div
            className="w-full max-w-[460px] rounded-[20px] p-6 shadow-2xl"
            style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[18px] font-berlingske mb-5" style={{ color: "var(--admin-text)" }}>
              {tr(lang, "createPage")}
            </h2>
            <div className="space-y-3">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={tr(lang, "newPageTitle")}
                className="w-full px-4 py-3 rounded-[10px] text-[14px] outline-none"
                style={{ background: "var(--admin-card)", color: "var(--admin-text)", border: "1px solid var(--admin-border)" }}
                autoFocus
              />
              <input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder={tr(lang, "newPageSlug")}
                className="w-full px-4 py-3 rounded-[10px] text-[14px] outline-none"
                style={{ background: "var(--admin-card)", color: "var(--admin-text)", border: "1px solid var(--admin-border)" }}
              />
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2.5 rounded-[10px] text-[13px] cursor-pointer"
                style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
              >
                {tr(lang, "cancel")}
              </button>
              <button
                onClick={create}
                disabled={!newTitle.trim()}
                className="px-5 py-2.5 rounded-[10px] text-[13px] font-bold text-white cursor-pointer disabled:opacity-40"
                style={{ backgroundColor: "#B07E3F" }}
              >
                {tr(lang, "create")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setDeleteTarget(null)}>
          <div
            className="w-full max-w-[400px] rounded-[20px] p-6 shadow-2xl"
            style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[16px] font-semibold mb-3" style={{ color: "var(--admin-text)" }}>
              {tr(lang, "deleteConfirm").replace("{title}", deleteTarget.title)}
            </h2>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 rounded-[10px] text-[13px] cursor-pointer"
                style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
              >
                {tr(lang, "cancel")}
              </button>
              <button
                onClick={remove}
                className="px-5 py-2.5 rounded-[10px] text-[13px] font-bold text-white cursor-pointer"
                style={{ backgroundColor: "#c0392b" }}
              >
                {tr(lang, "deletePage")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}