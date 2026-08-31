"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUI } from "@/components/cms/AdminUIProvider";
import { t as tr, type AdminLang } from "@/components/cms/i18n";

const LANG_LABELS: Record<AdminLang, string> = { ru: "RU", en: "EN", es: "ES" };

export default function AdminLoginPage() {
  const { lang, setLang, theme, setTheme } = useAdminUI();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || tr(lang, "loginError"));
      }
    } catch {
      setError(tr(lang, "loginNetworkError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--admin-bg)" }}
    >
      {/* Top bar: lang + theme */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        {(["ru", "en", "es"] as AdminLang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="w-9 h-9 rounded-full text-[12px] font-bold transition-all cursor-pointer"
            style={{
              background: lang === l ? "#CBA07D" : "var(--admin-card)",
              color: lang === l ? "#fff" : "var(--admin-muted)",
              border: "1px solid var(--admin-border)",
            }}
          >
            {LANG_LABELS[l]}
          </button>
        ))}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[16px] cursor-pointer"
          style={{ background: "var(--admin-card)", border: "1px solid var(--admin-border)" }}
        >
          {theme === "dark" ? "\u2600" : "\u263E"}
        </button>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-[420px] rounded-[24px] p-8 sm:p-10"
        style={{ background: "var(--admin-panel)", border: "1px solid var(--admin-border)" }}
      >
        {/* Logo */}
        <div className="mb-8">
          <h1
            className="text-[32px] font-berlingske leading-none"
            style={{ color: "var(--admin-text)" }}
          >
            WO/MAN
          </h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--admin-muted)" }}>
            {tr(lang, "login")}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: "var(--admin-muted)" }}>
              {tr(lang, "username")}
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] text-[15px] outline-none transition-colors"
              style={{
                background: "var(--admin-card)",
                color: "var(--admin-text)",
                border: "1px solid var(--admin-border)",
              }}
              autoComplete="username"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: "var(--admin-muted)" }}>
              {tr(lang, "password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] text-[15px] outline-none transition-colors"
              style={{
                background: "var(--admin-card)",
                color: "var(--admin-text)",
                border: "1px solid var(--admin-border)",
              }}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-[13px] px-3 py-2 rounded-[8px]" style={{ background: "rgba(192,57,43,0.1)", color: "#c0392b" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full text-white font-bold text-[14px] rounded-[12px] py-3.5 transition-opacity disabled:opacity-40 cursor-pointer"
            style={{ backgroundColor: "#B07E3F" }}
          >
            {loading ? "…" : tr(lang, "loginBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}