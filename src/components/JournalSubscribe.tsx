"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useT } from "@/i18n/LanguageProvider";

export default function JournalSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useT();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "subscribe", email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-2">
      <form
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 w-full bg-white rounded-[24px] sm:rounded-full p-2"
        style={{ border: "1px solid #F6F6F7" }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("Enter your email")}
          className="flex-1 min-w-0 bg-transparent px-4 py-3 sm:py-2 text-[16px] font-medium outline-none"
          style={{ color: "#313242", opacity: 0.6 }}
          aria-label={t("Enter your email")}
          disabled={status === "loading"}
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={status !== "loading" ? { scale: 1.04 } : {}}
          whileTap={status !== "loading" ? { scale: 0.97 } : {}}
          className={`w-full sm:w-auto justify-center text-white font-medium text-[16px] rounded-full px-6 py-2.5 cursor-pointer whitespace-nowrap ${
            status === "loading" ? "bg-[#B07E3F]/70" : "bg-[#B07E3F]"
          }`}
        >
          {status === "loading" ? t("Sending...") : t("Subscribe")}
        </motion.button>
      </form>
      {status === "success" && (
        <p className="text-[#9A6D44] font-medium text-center text-sm">{t("Thank you for subscribing!")}</p>
      )}
      {status === "error" && (
        <p className="text-red-500 font-medium text-center text-sm">{t("Failed to subscribe. Please try again.")}</p>
      )}
    </div>
  );
}
