"use client";

import { useEffect } from "react";

export default function EnvLogger() {
  useEffect(() => {
    fetch("/api/env-test")
      .then((res) => res.json())
      .then((data) => {
        console.log("🌍 Данные из .env (получены через API):", data);
      })
      .catch((err) => console.error("Ошибка при запросе к API:", err));
  }, []);

  return null;
}
