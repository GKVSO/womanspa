"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders Vagaro booking widget embed code safely.
 * Vagaro "In Website" widget code is a <script> tag pointing to
 * https://www.vagaro.com/resources/Scripts/... — we inject it into a container.
 */
export default function VagaroEmbed({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || !code) return;
    container.innerHTML = "";

    try {
      // 1. Inject all non-script HTML first (title, .vagaro div, powered-by links)
      const html = code.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
      if (html) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        while (wrapper.firstChild) container.appendChild(wrapper.firstChild);
      }

      // 2. Extract script src and RE-INSERT a <script> INSIDE the .vagaro div,
      //    because Vagaro's loader scans for ".vagaro script" (querySelectorAll).
      //    document.createElement is safe here — the src comes from the admin-saved Vagaro code.
      const srcMatch = code.match(/<script[^>]*\ssrc=["']([^"']+)["'][^>]*><\/script>/i);
      if (srcMatch) {
        const vagaroDiv = container.querySelector(".vagaro");
        const host = vagaroDiv || container;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = srcMatch[1];
        script.async = true;
        script.onerror = () => setError(true);
        host.appendChild(script);
      } else {
        // No script tag — maybe it's an iframe or plain link code
        const rawHtml = code.trim();
        if (rawHtml && !html) container.innerHTML = rawHtml;
      }
    } catch {
      setError(true);
    }

    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  if (error) {
    return (
      <div className="text-center py-16 rounded-[30px]" style={{ backgroundColor: "#fff" }}>
        <p className="text-[16px] font-semibold" style={{ color: "#1F1D1B" }}>
          Booking widget failed to load.
        </p>
        <p className="text-[14px] mt-3" style={{ color: "#6B7078" }}>
          Please call us at <a href="tel:+13053369373" className="font-semibold" style={{ color: "#B07E3F" }}>+1 (305) 336-9373</a>
        </p>
      </div>
    );
  }

  return <div ref={ref} className="vagaro-embed rounded-[30px] overflow-hidden" style={{ backgroundColor: "#fff", minHeight: "600px" }} />;
}
