"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import { t as tr, type AdminLang } from "@/components/cms/i18n";

const LANG_LABELS: Record<AdminLang, string> = { ru: "RU", en: "EN", es: "ES" };

export default function AdminHeader({ title, extraButtons }: { title?: string, extraButtons?: React.ReactNode }) {
  const { lang, setLang, theme, setTheme } = useAdminUI();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout/", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div
      className="sticky top-0 z-30 px-5 py-3 flex items-center justify-between"
      style={{ background: "var(--admin-panel)", borderBottom: "1px solid var(--admin-border)" }}
    >
      <div className="flex items-center gap-4">
        <Link href="/admin" className="text-[20px] font-berlingske" style={{ color: "var(--admin-text)" }}>
          WO/MAN
        </Link>
        {title && (
          <>
            <span className="text-gray-400">/</span>
            <span className="text-[16px] font-semibold" style={{ color: "var(--admin-text)" }}>{title}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {extraButtons}
        
        <div className="w-px h-5 mx-2" style={{ background: "var(--admin-border)" }} />
        
        {(["ru", "en", "es"] as AdminLang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="w-8 h-8 rounded-full text-[11px] font-bold cursor-pointer transition-all"
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
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] cursor-pointer"
          style={{ border: "1px solid var(--admin-border)" }}
        >
          {theme === "dark" ? "\u2600" : "\u263E"}
        </button>
        <div className="w-px h-5 mx-1" style={{ background: "var(--admin-border)" }} />
        <button
          onClick={logout}
          className="text-[13px] px-3 py-1.5 rounded-[8px] cursor-pointer"
          style={{ color: "var(--admin-muted)", border: "1px solid var(--admin-border)" }}
        >
          {tr(lang, "logout")}
        </button>
      </div>
    </div>
  );
}
