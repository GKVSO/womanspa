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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = ref.current;
    if (!container || !code) return;
    container.innerHTML = "";
    setLoading(true);

    const observer = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        // Iframe is found. Don't hide loader immediately on load because 
        // Vagaro loads a shell first, then expands.
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // Vagaro widget resizes its iframe once the React app inside boots up.
    // We poll the iframe's height. When it grows beyond a default shell height, we consider it ready.
    const checkInterval = setInterval(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        const heightVal = parseInt(iframe.style.height || "0", 10);
        // Vagaro calendar is typically > 500px. If it's smaller, it might just be its own internal loader.
        // Waiting for > 450px ensures we only show it when the actual booking UI is rendered.
        if (iframe.offsetHeight > 450 || heightVal > 450) {
          setLoading(false);
          clearInterval(checkInterval);
        }
      }
    }, 250);

    // Hard fallback to 6 seconds so we don't load infinitely if the widget happens to be short
    const timeoutId = setTimeout(() => {
      setLoading(false);
      clearInterval(checkInterval);
    }, 6000);

    try {
      const html = code.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
      if (html) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        while (wrapper.firstChild) container.appendChild(wrapper.firstChild);
      }

      const srcMatch = code.match(/<script[^>]*\ssrc=["']([^"']+)["'][^>]*><\/script>/i);
      if (srcMatch) {
        const vagaroDiv = container.querySelector(".vagaro");
        const host = vagaroDiv || container;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = srcMatch[1];
        script.async = true;
        script.onerror = () => {
          setError(true);
          setLoading(false);
        };
        host.appendChild(script);
      } else {
        const rawHtml = code.trim();
        if (rawHtml && !html) container.innerHTML = rawHtml;
        if (!rawHtml.includes("<iframe")) {
          setLoading(false);
        }
      }
    } catch {
      setError(true);
      setLoading(false);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      clearInterval(checkInterval);
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

  return (
    <div className="relative w-full transition-all duration-500 ease-in-out" style={{ minHeight: loading ? "300px" : "400px" }}>
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white rounded-[30px] transition-opacity duration-300">
          <div className="w-10 h-10 border-4 border-[#CBA07D]/30 border-t-[#CBA07D] rounded-full animate-spin mb-4"></div>
        </div>
      )}

      {/* Widget Container */}
      <div
        ref={ref}
        className={`vagaro-embed w-full transition-opacity duration-500 ${loading ? "opacity-0 absolute top-0 left-0 pointer-events-none" : "opacity-100 relative"}`}
      />
    </div>
  );
}
