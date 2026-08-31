"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import en from "./en.json";
import ru from "./ru.json";
import es from "./es.json";

export type Lang = "En" | "Ru" | "Es";

export const LANGUAGES: Lang[] = ["En", "Ru", "Es"];

const dictionaries: Record<Lang, Record<string, string>> = {
  En: en as Record<string, string>,
  Ru: ru as Record<string, string>,
  Es: es as Record<string, string>,
};

const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&middot;": "\u00B7",
  "&apos;": "'",
  "&quot;": '"',
  "&nbsp;": " ",
  "&mdash;": "\u2014",
  "&ndash;": "\u2013",
  "&rsquo;": "\u2019",
  "&lsquo;": "\u2018",
  "&ldquo;": "\u201C",
  "&rdquo;": "\u201D",
  "&hellip;": "\u2026",
  "&deg;": "\u00B0",
  "&times;": "\u00D7",
};

function decodeEntities(str: string): string {
  let result = "";
  const regex = /&(?:amp|middot|apos|quot|nbsp|mdash|ndash|rsquo|lsquo|ldquo|rdquo|hellip|deg|times);/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(str)) !== null) {
    result += str.slice(last, m.index) + ENTITY_MAP[m[0]];
    last = m.index + m[0].length;
  }
  result += str.slice(last);
  return result;
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "woman-medspa-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("En");

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null) as Lang | null;
    if (saved && saved in dictionaries) setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const code = lang === "Es" ? "es" : lang === "Ru" ? "ru" : "en";
    if (typeof document !== "undefined") document.documentElement.lang = code;
  }, [lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dictionaries[lang];
      const enDict = dictionaries.En;
      const normalized = key
        .replace(/\\n|\\r|\\t/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      let out = dict[normalized] ?? enDict[normalized] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return decodeEntities(out);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useT(): (key: string, vars?: Record<string, string | number>) => string {
  return useLanguage().t;
}