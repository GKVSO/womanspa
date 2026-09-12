"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ml, mlSet } from "@/lib/i18n-helpers";
import AdminHeader from "@/components/cms/AdminHeader";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import { t as tr } from "@/components/cms/i18n";

export default function AdminConsultation() {
  const { lang } = useAdminUI();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const createMl = (text: string) => ({ en: text, ru: text, es: text });

  useEffect(() => {
    fetch("/api/admin/global-data?key=global_consultation")
      .then(res => res.json())
      .then(res => {
        const fallback = {
          title1: createMl("Begin With A"),
          title2: createMl("Personalized Consultation"),
          giftText1: createMl("Book a complimentary consultation"),
          giftText2: createMl("and get a"),
          giftAmount: createMl("$100 Welcome Gift"),
          giftText3: createMl("toward your first treatment"),
          bullets: [
            createMl("Personalized recommendations"),
            createMl("Skin/body/wellness evaluation"),
            createMl("Personalized treatment recommendations"),
            createMl("Questions answered privately")
          ],
          phone: "+1 (305) 336-9373",
          phoneHours1: createMl("Monday - Friday: 9:00 AM - 7:00 PM"),
          phoneHours2: createMl("Saturday: 10:00 AM - 5:00 PM"),
          email: "info@womanmedspa.com",
          emailSubtitle: createMl("Send us a message"),
          addressLink: "https://maps.google.com/?q=1006+E+Hallandale+Beach+Blvd+Suite+204+Hallandale+Beach+FL+33009",
          address1: createMl("1006 E Hallandale Beach Blvd Suite"),
          address2: createMl("204 Hallandale Beach, FL 33009"),
          address3: createMl("Wo/Man Luxe Med Spa"),
          formTitle1: createMl("Begin With"),
          formTitle2: createMl("A Private Conversation"),
          buttonText: createMl("Book Private Consultation"),
        };
        setData((res.data && !Array.isArray(res.data) && Object.keys(res.data).length > 0) ? res.data : fallback);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/global-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "global_consultation", data })
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addBullet = () => {
    setData({ ...data, bullets: [...(data.bullets || []), createMl("")] });
  };

  const updateBullet = (index: number, val: any) => {
    const newBullets = [...(data.bullets || [])];
    newBullets[index] = val;
    setData({ ...data, bullets: newBullets });
  };

  const removeBullet = (index: number) => {
    const newBullets = [...(data.bullets || [])];
    newBullets.splice(index, 1);
    setData({ ...data, bullets: newBullets });
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  const inputStyle = { background: "var(--admin-card)", color: "var(--admin-text)", border: "1px solid var(--admin-border)" };

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--admin-bg)" }}>
      <AdminHeader title={tr(lang, "globalConsultation")} />

      <div className="max-w-[800px] mx-auto px-5 py-8 space-y-6">
        
        {/* Texts */}
        <div className="p-6 rounded-[20px]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <h2 className="text-[16px] font-semibold mb-4" style={{ color: "var(--admin-text)" }}>{tr(lang, "fieldTitle")} & {tr(lang, "fieldSubtitle")}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>Title Line 1</label>
              <input value={data.title1?.[lang] || ""} onChange={e => setData({...data, title1: mlSet(data.title1, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
            </div>
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>Title Line 2</label>
              <input value={data.title2?.[lang] || ""} onChange={e => setData({...data, title2: mlSet(data.title2, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>Form Title Line 1</label>
              <input value={data.formTitle1?.[lang] || ""} onChange={e => setData({...data, formTitle1: mlSet(data.formTitle1, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
            </div>
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>Form Title Line 2</label>
              <input value={data.formTitle2?.[lang] || ""} onChange={e => setData({...data, formTitle2: mlSet(data.formTitle2, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "primaryBtn")}</label>
            <input value={data.buttonText?.[lang] || ""} onChange={e => setData({...data, buttonText: mlSet(data.buttonText, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
          </div>
        </div>

        {/* Gift */}
        <div className="p-6 rounded-[20px]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <h2 className="text-[16px] font-semibold mb-4" style={{ color: "var(--admin-text)" }}>{tr(lang, "giftText")}</h2>
          <div className="space-y-3">
            <input value={data.giftText1?.[lang] || ""} onChange={e => setData({...data, giftText1: mlSet(data.giftText1, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} placeholder="Book a complimentary consultation..." />
            <input value={data.giftText2?.[lang] || ""} onChange={e => setData({...data, giftText2: mlSet(data.giftText2, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} placeholder="and get a..." />
            <input value={data.giftAmount?.[lang] || ""} onChange={e => setData({...data, giftAmount: mlSet(data.giftAmount, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px] font-bold" style={inputStyle} placeholder="$100 Welcome Gift" />
            <input value={data.giftText3?.[lang] || ""} onChange={e => setData({...data, giftText3: mlSet(data.giftText3, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} placeholder="toward your first treatment" />
          </div>
        </div>

        {/* Bullets */}
        <div className="p-6 rounded-[20px]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] font-semibold" style={{ color: "var(--admin-text)" }}>{tr(lang, "bullets")}</h2>
            <button onClick={addBullet} className="text-[12px] font-bold px-3 py-1.5 rounded-[8px] text-white" style={{ backgroundColor: "#CBA07D" }}>+ {tr(lang, "add")}</button>
          </div>
          <div className="space-y-2">
            {(data.bullets || []).map((bullet: any, i: number) => (
              <div key={i} className="flex gap-2">
                <input value={bullet?.[lang] || ""} onChange={e => updateBullet(i, mlSet(bullet, lang, e.target.value))} className="flex-1 px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
                <button onClick={() => removeBullet(i)} className="text-[#c0392b] text-[12px] px-3 font-bold">X</button>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="p-6 rounded-[20px]" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <h2 className="text-[16px] font-semibold mb-4" style={{ color: "var(--admin-text)" }}>Контактные данные (Contact Info)</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "fieldPhone")}</label>
              <input value={data.phone} onChange={e => setData({...data, phone: e.target.value})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input value={data.phoneHours1?.[lang] || ""} onChange={e => setData({...data, phoneHours1: mlSet(data.phoneHours1, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} placeholder="Monday - Friday..." />
                <input value={data.phoneHours2?.[lang] || ""} onChange={e => setData({...data, phoneHours2: mlSet(data.phoneHours2, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} placeholder="Saturday..." />
              </div>
            </div>
            <div className="pt-2">
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "fieldEmail")}</label>
              <input value={data.email} onChange={e => setData({...data, email: e.target.value})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} />
              <input value={data.emailSubtitle?.[lang] || ""} onChange={e => setData({...data, emailSubtitle: mlSet(data.emailSubtitle, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px] mt-2" style={inputStyle} placeholder="Send us a message" />
            </div>
            <div className="pt-2">
              <label className="text-[12px] mb-1 block" style={{ color: "var(--admin-muted)" }}>{tr(lang, "address")}</label>
              <input value={data.addressLink} onChange={e => setData({...data, addressLink: e.target.value})} className="w-full px-3 py-2 rounded-[10px] text-[14px] mb-2" style={inputStyle} placeholder="Map Link (URL)" />
              <input value={data.address1?.[lang] || ""} onChange={e => setData({...data, address1: mlSet(data.address1, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px] mb-2" style={inputStyle} placeholder="Address Line 1" />
              <input value={data.address2?.[lang] || ""} onChange={e => setData({...data, address2: mlSet(data.address2, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px] mb-2" style={inputStyle} placeholder="Address Line 2" />
              <input value={data.address3?.[lang] || ""} onChange={e => setData({...data, address3: mlSet(data.address3, lang, e.target.value)})} className="w-full px-3 py-2 rounded-[10px] text-[14px]" style={inputStyle} placeholder="Address Line 3" />
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 border-t flex justify-end" style={{ background: "var(--admin-bg)", borderColor: "var(--admin-border)" }}>
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-3 rounded-[12px] font-bold text-white text-[14px] disabled:opacity-50"
          style={{ backgroundColor: "#B07E3F" }}
        >
          {saving ? tr(lang, "saving") : saved ? "✓ " + tr(lang, "saved") : tr(lang, "save")}
        </button>
      </div>
    </div>
  );
}
