"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ml, mlSet } from "@/lib/i18n-helpers";
import AdminHeader from "@/components/cms/AdminHeader";
import { useAdminUI } from "@/components/cms/AdminUIProvider";

export default function AdminGallery() {
  const { lang } = useAdminUI();
  const router = useRouter();
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/global-data?key=global_gallery")
      .then(res => res.json())
      .then(data => {
        setGallery(data.data || []);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/global-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "global_gallery", data: gallery })
    });
    setSaving(false);
    alert(lang === "ru" ? "Сохранено" : "Saved");
  };

  const addItem = () => {
    const id = gallery.length > 0 ? Math.max(...gallery.map(r => r.id || 0)) + 1 : 1;
    setGallery([{ id, category: "Body", before: "", after: "" }, ...gallery]);
  };

  const removeItem = (index: number) => {
    if (confirm("Delete?")) {
      const newGallery = [...gallery];
      newGallery.splice(index, 1);
      setGallery(newGallery);
    }
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newGallery = [...gallery];
    newGallery[index] = { ...newGallery[index], [key]: value };
    setGallery(newGallery);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  const inputStyle = { background: "var(--admin-card)", color: "var(--admin-text)", border: "1px solid var(--admin-border)" };

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--admin-bg)" }}>
      {/* Top bar */}
      <AdminHeader 
        title="Global Gallery" 
        extraButtons={
          <>
            <button onClick={addItem} className="px-4 py-1.5 rounded-[8px] bg-gray-200 text-black text-sm font-bold">+ Add</button>
            <button onClick={save} disabled={saving} className="px-4 py-1.5 rounded-[8px] text-white text-sm font-bold" style={{ backgroundColor: "#B07E3F" }}>
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        }
      />

      <div className="max-w-[900px] mx-auto px-5 py-8 space-y-4">
        {gallery.map((r, i) => (
          <div key={r.id || i} className="p-5 rounded-[14px]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
            <div className="flex justify-between mb-4">
              <span className="font-bold text-gray-500">#{r.id}</span>
              <button onClick={() => removeItem(i)} className="text-red-500 text-sm">Delete</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">Category ({lang.toUpperCase()})</label>
                <input type="text" value={ml(r.category, lang)} onChange={e => updateItem(i, "category", mlSet(r.category, lang, e.target.value))} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">Before Image URL</label>
                <input type="text" value={r.before || ""} onChange={e => updateItem(i, "before", e.target.value)} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">Before Label ({lang.toUpperCase()})</label>
                <input type="text" value={ml(r.beforeLabel, lang)} onChange={e => updateItem(i, "beforeLabel", mlSet(r.beforeLabel, lang, e.target.value))} placeholder="Before" className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">After Image URL</label>
                <input type="text" value={r.after || ""} onChange={e => updateItem(i, "after", e.target.value)} className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
              <div>
                <label className="block text-[12px] mb-1 font-bold text-gray-400">After Label ({lang.toUpperCase()})</label>
                <input type="text" value={ml(r.afterLabel, lang)} onChange={e => updateItem(i, "afterLabel", mlSet(r.afterLabel, lang, e.target.value))} placeholder="After" className="w-full px-3 py-2 rounded-[8px]" style={inputStyle} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
