"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type AdminLang = "ru" | "en" | "es";

interface AdminUIContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: AdminLang;
  setLang: (l: AdminLang) => void;
}

const AdminUIContext = createContext<AdminUIContextValue | null>(null);

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<AdminLang>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("cms_theme") as Theme | null;
    if (saved) setThemeState(saved);
    document.documentElement.setAttribute("data-theme", saved || "light");
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cms_lang") as AdminLang | null;
    if (saved) setLangState(saved);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("cms_theme", t);
  };

  const setLang = (l: AdminLang) => {
    setLangState(l);
    localStorage.setItem("cms_lang", l);
  };

  return (
    <AdminUIContext.Provider value={{ theme, setTheme, lang, setLang }}>
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  const ctx = useContext(AdminUIContext);
  if (!ctx) throw new Error("useAdminUI must be used within AdminUIProvider");
  return ctx;
}