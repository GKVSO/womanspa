"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";
import { useDraggableScroll } from "./useDraggableScroll";

const slides = [
  { id: 1, before: "/before-image.webp", after: "/after-image.webp" },
  { id: 2, before: "/before-image-2.webp", after: "/after-image-2.webp" },
  { id: 3, before: "/before-image.webp", after: "/after-image.webp" },
  { id: 4, before: "/before-image-2.webp", after: "/after-image-2.webp" },
  { id: 5, before: "/before-image.webp", after: "/after-image.webp" },
];

export default function PrimelaseGallerySlider() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  useDraggableScroll(trackRef);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const updateDimensions = useCallback(() => {
    if (trackRef.current) {
      const max = trackRef.current.scrollWidth - trackRef.current.clientWidth;
      setMaxScroll(Math.max(0, max));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions, slides.length]);

  useEffect(() => {
    setScrollPos(0);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [slides.length]);

  const handleScroll = useCallback(() => {
    if (trackRef.current) setScrollPos(trackRef.current.scrollLeft);
  }, []);

  const smoothScroll = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft;
    const card = el.querySelector('.flex-shrink-0');
    const step = card ? (card as HTMLElement).offsetWidth + 16 : 250;
    const distance = dir * step;
    const duration = 400;
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + distance * ease(progress);
      setScrollPos(el.scrollLeft);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const progressPercent = maxScroll > 0 ? (scrollPos / maxScroll) * 100 : 0;
  const isFirst = scrollPos <= 0;
  const isLast = scrollPos >= maxScroll - 1;

  return (
    <FadeIn as="section" className="bg-[#CBA07D] flex justify-center py-16 sm:py-20">
      <div className="w-full sm:w-[90%] px-4 sm:px-0">
        <StaggerContainer staggerDelay={0.12}>
          <StaggerItem>
            <h2 className="text-white text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight mb-10 text-center whitespace-pre-line">
              {t("A Sculpted, Refined Silhouette \n Through Cold Laser Technology")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto hide-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {slides.map((slide, i) => (
                <motion.div
                  key={slide.id}
                  className="flex-shrink-0 w-[88%] sm:w-[57%] pr-4 last:pr-0"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <BeforeAfterSlider beforeSrc={slide.before} afterSrc={slide.after} />
                </motion.div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex items-center justify-between mt-6">
              <motion.div
                className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden mr-6"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="h-full rounded-full bg-[#A5712E] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </motion.div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <motion.button
                  onClick={() => smoothScroll(-1)}
                  disabled={isFirst}
                  aria-label={t("Previous slide")}
                  whileHover={!isFirst ? { scale: 1.08 } : {}}
                  whileTap={!isFirst ? { scale: 0.95 } : {}}
                  className={`w-10 h-10 flex items-center justify-center rounded-[5px] transition-colors ${
                    isFirst ? "bg-[#1F2023]/10" : "bg-[#B07E3F] hover:bg-[#A5712E]"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6.52497 9.16609L10.995 4.69609L9.81647 3.51758L3.33464 9.99943L9.81647 16.4812L10.995 15.3027L6.52497 10.8328H16.668V9.16609H6.52497Z" fill={isFirst ? "#BABABA" : "white"}/>
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => smoothScroll(1)}
                  disabled={isLast}
                  aria-label={t("Next slide")}
                  whileHover={!isLast ? { scale: 1.08 } : {}}
                  whileTap={!isLast ? { scale: 0.95 } : {}}
                  className={`w-10 h-10 flex items-center justify-center rounded-[5px] transition-colors ${
                    isLast ? "bg-[#1F2023]/10" : "bg-[#B07E3F] hover:bg-[#A5712E]"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M13.475 9.16609L9.00503 4.69609L10.1835 3.51758L16.6654 9.99943L10.1835 16.4812L9.00503 15.3027L13.475 10.8328H3.33203V9.16609H13.475Z" fill={isLast ? "#BABABA" : "white"}/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </FadeIn>
  );
}
