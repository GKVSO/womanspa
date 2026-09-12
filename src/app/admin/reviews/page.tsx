"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ml, mlSet } from "@/lib/i18n-helpers";
import AdminHeader from "@/components/cms/AdminHeader";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import { t as tr } from "@/components/cms/i18n";

export default function AdminReviews() {
  const { lang } = useAdminUI();
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/global-data?key=global_reviews")
      .then(res => res.json())
      .then(data => {
        setReviews(data.data || []);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/global-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "global_reviews", data: reviews })
    });
    setSaving(false);
    alert(lang === "ru" ? "Сохранено" : "Saved");
  };

  const addReview = () => {
    const id = reviews.length > 0 ? Math.max(...reviews.map(r => r.id || 0)) + 1 : 1;
    setReviews([{ id, category: "All", title: "", text: "", name: "", initials: "", stars: 5 }, ...reviews]);
  };

  const removeReview = (index: number) => {
    if (confirm("Delete?")) {
      const newReviews = [...reviews];
      newReviews.splice(index, 1);
      setReviews(newReviews);
    }
  };

  const updateReview = (index: number, key: string, value: any) => {
    const newReviews = [...reviews];
    newReviews[index] = { ...newReviews[index], [key]: value };
    setReviews(newReviews);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  const inputStyle = { background: "var(--admin-card)", color: "var(--admin-text)", border: "1px solid var(--admin-border)" };

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--admin-bg)" }}>
      {/* Top bar */}
      <AdminHeader 
        title={tr(lang, "globalReviews")} 
        extraButtons={
          <>
            <button onClick={addReview} className="px-4 py-1.5 rounded-[8px] bg-gray-200 text-black text-sm font-bold">+ {tr(lang, "add")}</button>
            <button onClick={save} disabled={saving} className="px-4 py-1.5 rounded-[8px] text-white text-sm font-bold" style={{ backgroundColor: "#B07E3F" }}>
              {saving ? tr(lang, "saving") : tr(lang, "save")}
            </button>
          </>
        }
      />

      <div className="max-w-[900px] mx-auto px-5 py-8 space-y-4">
        {reviews.map((r, i) => (
          <div key={r.id || i} className="p-5 rounded-[14px]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
            <div className="flex justify-between mb-4">
              <span className="font-bold text-gray-500">#{r.id}</span>
              <button onClick={() => removeReview(i)} className="text-red-500 text-sm font-bold">{tr(lang, "deleteItem")}</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">{tr(lang, "category")} ({lang.toUpperCase()})</label>
                <input type="text" value={ml(r.category, lang)} onChange={e => updateReview(i, "category", mlSet(r.category, lang, e.target.value))} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">{tr(lang, "name")} ({lang.toUpperCase()})</label>
                <input type="text" value={ml(r.name, lang)} onChange={e => updateReview(i, "name", mlSet(r.name, lang, e.target.value))} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">{tr(lang, "initials")} ({lang.toUpperCase()})</label>
                <input type="text" value={ml(r.initials, lang)} onChange={e => updateReview(i, "initials", mlSet(r.initials, lang, e.target.value))} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">{tr(lang, "starsCount")}</label>
                <input type="number" min="1" max="5" value={r.stars || 5} onChange={e => updateReview(i, "stars", Number(e.target.value))} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[12px] mb-1 font-bold text-gray-400">{tr(lang, "fieldTitle")} ({lang.toUpperCase()})</label>
              <input type="text" value={ml(r.title, lang)} onChange={e => updateReview(i, "title", mlSet(r.title, lang, e.target.value))} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
            </div>

            <div>
              <label className="block text-[12px] mb-1 font-bold text-gray-400">{tr(lang, "fieldText")} ({lang.toUpperCase()})</label>
              <textarea value={ml(r.text, lang)} onChange={e => updateReview(i, "text", mlSet(r.text, lang, e.target.value))} className="w-full px-3 py-2 rounded-[8px] h-24" style={inputStyle} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
