"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import { t as tr, type AdminLang } from "@/components/cms/i18n";

interface VagaroSettings {
  vagaro_booking_url: string;
  vagaro_booking_embed: string;
  vagaro_booking_mode: string;
}

export default function AdminSettingsPage() {
  const { lang } = useAdminUI();
  const router = useRouter();
  const [settings, setSettings] = useState<VagaroSettings>({
    vagaro_booking_url: "",
    vagaro_booking_embed: "",
    vagaro_booking_mode: "link",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setSettings(data);
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    background: "var(--admin-card)",
    color: "var(--admin-text)",
    border: "1px solid var(--admin-border)",
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--admin-bg)" }}>…</div>;

  return (
    <div className="min-h-screen" style={{ background: "var(--admin-bg)" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 sticky top-0 z-20"
        style={{ background: "var(--admin-panel)", borderBottom: "1px solid var(--admin-border)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin")}
            className="text-[13px] px-2.5 py-1.5 rounded-[8px] cursor-pointer"
            style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
          >
            ← {tr(lang, "back")}
          </button>
          <span className="text-[16px] font-berlingske" style={{ color: "var(--admin-text)" }}>
            Vagaro
          </span>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="text-[12px] font-bold px-4 py-1.5 rounded-[8px] text-white cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: "#B07E3F" }}
        >
          {saving ? tr(lang, "saving") : saved ? "✓ " + tr(lang, "saved") : tr(lang, "save")}
        </button>
      </div>

      <div className="max-w-[760px] mx-auto px-4 py-6 space-y-5">
        {/* How to get the code */}
        <div className="rounded-[16px] p-5" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <p className="text-[13px] font-semibold mb-3" style={{ color: "var(--admin-text)" }}>
            {lang === "ru" ? "Как получить код в Vagaro" : lang === "es" ? "Cómo obtener el código en Vagaro" : "How to get the code in Vagaro"}
          </p>
          <ol className="text-[12px] space-y-1.5 list-decimal list-inside" style={{ color: "var(--admin-muted)" }}>
            <li>{lang === "ru" ? "Войдите в Vagaro → Settings → Booking Widget" : lang === "es" ? "Inicia sesión en Vagaro → Settings → Booking Widget" : "Log in to Vagaro → Settings → Booking Widget"}</li>
            <li>{lang === "ru" ? "Настройте виджет (услуги, цвета, тип «In Website»)" : lang === "es" ? "Configura el widget (servicios, colores, tipo «In Website»)" : "Configure the widget (services, colors, type «In Website»)"}</li>
            <li>{lang === "ru" ? "Нажмите Save → Copy Code" : lang === "es" ? "Pulsa Save → Copy Code" : "Click Save → Copy Code"}</li>
            <li>{lang === "ru" ? "Вставьте код в поле ниже" : lang === "es" ? "Pega el código en el campo de abajo" : "Paste the code into the field below"}</li>
          </ol>
        </div>

        {/* Mode */}
        <div className="rounded-[16px] p-5" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <p className="text-[13px] font-semibold mb-3" style={{ color: "var(--admin-text)" }}>
            {lang === "ru" ? "Режим бронирования" : lang === "es" ? "Modo de reserva" : "Booking mode"}
          </p>
          <div className="flex gap-2">
            {[
              { value: "embed", label: lang === "ru" ? "Виджет на странице /book" : lang === "es" ? "Widget en la página /book" : "Widget on /book page" },
              { value: "link", label: lang === "ru" ? "Ссылка на Vagaro" : lang === "es" ? "Enlace a Vagaro" : "Link to Vagaro" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSettings({ ...settings, vagaro_booking_mode: opt.value })}
                className="text-[12px] px-4 py-2 rounded-[8px] cursor-pointer font-semibold"
                style={{
                  background: settings.vagaro_booking_mode === opt.value ? "#CBA07D" : "var(--admin-card)",
                  color: settings.vagaro_booking_mode === opt.value ? "#fff" : "var(--admin-muted)",
                  border: `1px solid ${settings.vagaro_booking_mode === opt.value ? "#CBA07D" : "var(--admin-border)"}`,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Booking URL */}
        <div className="rounded-[16px] p-5" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <label className="text-[11px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
            {lang === "ru" ? "Ссылка на бронирование Vagaro (Booking Link)" : lang === "es" ? "Enlace de reserva de Vagaro (Booking Link)" : "Vagaro Booking Link"}
          </label>
          <input
            value={settings.vagaro_booking_url}
            onChange={(e) => setSettings({ ...settings, vagaro_booking_url: e.target.value })}
            placeholder="https://www.vagaro.com/your-business/booking"
            className="w-full px-3 py-2 rounded-[8px] text-[13px] outline-none"
            style={inputStyle}
          />
          <p className="text-[10px] mt-1.5" style={{ color: "var(--admin-muted)" }}>
            {lang === "ru"
              ? "Vagaro → Settings → Booking Widget → тип «Link» → Copy Link"
              : lang === "es"
              ? "Vagaro → Settings → Booking Widget → tipo «Link» → Copy Link"
              : "Vagaro → Settings → Booking Widget → type «Link» → Copy Link"}
          </p>
        </div>

        {/* Embed code */}
        <div className="rounded-[16px] p-5" style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}>
          <label className="text-[11px] mb-1 block" style={{ color: "var(--admin-muted)" }}>
            {lang === "ru" ? "Embed-код виджета (In Website)" : lang === "es" ? "Código embed del widget (In Website)" : "Widget embed code (In Website)"}
          </label>
          <textarea
            value={settings.vagaro_booking_embed}
            onChange={(e) => setSettings({ ...settings, vagaro_booking_embed: e.target.value })}
            rows={6}
            placeholder='<script src="https://www.vagaro.com/resources/Scripts/..." ...></script>'
            className="w-full px-3 py-2 rounded-[8px] text-[12px] outline-none resize-y font-mono"
            style={inputStyle}
          />
          <p className="text-[10px] mt-1.5" style={{ color: "var(--admin-muted)" }}>
            {lang === "ru"
              ? "Используется в режиме «Виджет на странице /book»"
              : lang === "es"
              ? "Se usa en el modo «Widget en la página /book»"
              : "Used in «Widget on /book page» mode"}
          </p>
        </div>
      </div>
    </div>
  );
}
