"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";
import { useDraggableScroll } from "./useDraggableScroll";

interface Review {
  id: number;
  category: string;
  title: string;
  text: string;
  name: string;
  initials: string;
  stars: number;
}

const reviews: Review[] = [
  {
    id: 1,
    category: "Skin Rejuvenation",
    title: "Skin Feels Much Smoother!",
    text: "I mainly wanted to improve my acne scars and uneven texture. After two EXION treatments, my skin already felt smoother and the scars looked less noticeable. I'm continuing the recommended course to see the full result.",
    name: "Jennifer Morales",
    initials: "JM",
    stars: 5,
  },
  {
    id: 2,
    category: "Skin Rejuvenation",
    title: "I Loved How Natural The Result Looks",
    text: "I wanted some tightening without looking like I had done something drastic. The changes have been gradual, but my skin looks firmer and more refreshed. That natural-looking result is exactly what I was hoping for.",
    name: "Sarah Johnson",
    initials: "SJ",
    stars: 5,
  },
  {
    id: 3,
    category: "Skin Rejuvenation",
    title: "Much More Comfortable Than I Expected",
    text: "I was nervous because I had heard different things about RF treatments. EXION was much more comfortable than I expected, and I didn't have to take time off from my normal routine afterward. So far, I'm really happy with how my skin is responding.",
    name: "Maria Rodriguez",
    initials: "MR",
    stars: 5,
  },
  {
    id: 4,
    category: "Skin Rejuvenation",
    title: "My Skin Looks Firmer",
    text: "My main concern was early skin laxity and a tired-looking complexion. After completing my sessions, I noticed that my skin looked firmer and the overall texture was more refined. It's not an overnight transformation, but I really like the gradual improvement.",
    name: "Amanda Wilson",
    initials: "AW",
    stars: 5,
  },
  {
    id: 5,
    category: "Skin Rejuvenation",
    title: "I Didn't Have To Change My Schedule",
    text: "One of the biggest reasons I chose EXION was because I didn't want a treatment that would keep me at home for days. I was able to get back to my normal routine quickly, and over time my skin started looking smoother and healthier.",
    name: "Jessica Brown",
    initials: "JB",
    stars: 5,
  },
  {
    id: 6,
    category: "Skin Rejuvenation",
    title: "Worth It For My Skin",
    text: "EXION is definitely an investment, but I'm happy with the improvement in my skin. My texture looks better, my scars are less noticeable, and my skin has a healthier overall appearance. I'm glad I decided to complete the treatment.",
    name: "Elizabeth Garcia",
    initials: "EG",
    stars: 5,
  },
];

export default function ExionReviewsSlider() {
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
  }, [updateDimensions, reviews.length]);

  useEffect(() => {
    setScrollPos(0);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [reviews.length]);

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
    <FadeIn as="section" className="flex justify-center py-16 sm:py-20">
      <div className="w-full sm:w-[90%] px-4 sm:px-0">
        <StaggerContainer staggerDelay={0.12}>
          <StaggerItem>
            <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight mb-10 text-center whitespace-pre-line">
              {t("Why Clients\nChoose EXION")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto hide-scrollbar items-stretch"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  className="flex-shrink-0 w-[82%] sm:w-[30%] min-w-[85%] sm:min-w-[340px] pr-4 last:pr-0"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex items-center justify-between mt-6">
              <motion.div
                className="flex-1 h-1.5 rounded-full bg-[#D0AA8A]/10 overflow-hidden mr-6"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="h-full rounded-full bg-[#D0AA8A] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </motion.div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <motion.button
                  onClick={() => smoothScroll(-1)}
                  disabled={isFirst}
                  aria-label={t("Previous review")}
                  whileHover={!isFirst ? { scale: 1.08 } : {}}
                  whileTap={!isFirst ? { scale: 0.95 } : {}}
                  className={`w-10 h-10 flex items-center justify-center rounded-[5px] transition-colors cursor-pointer ${
                    isFirst ? "bg-[#F6F6F6]" : "bg-[#D0AA8A] hover:bg-[#c09a7a]"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6.52497 9.16609L10.995 4.69609L9.81647 3.51758L3.33464 9.99943L9.81647 16.4812L10.995 15.3027L6.52497 10.8328H16.668V9.16609H6.52497Z" fill={isFirst ? "#BABABA" : "white"}/>
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => smoothScroll(1)}
                  disabled={isLast}
                  aria-label={t("Next review")}
                  whileHover={!isLast ? { scale: 1.08 } : {}}
                  whileTap={!isLast ? { scale: 0.95 } : {}}
                  className={`w-10 h-10 flex items-center justify-center rounded-[5px] transition-colors cursor-pointer ${
                    isLast ? "bg-[#F6F6F6]" : "bg-[#D0AA8A] hover:bg-[#c09a7a]"
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

function ReviewCard({ review }: { review: Review }) {
  const t = useT();
  return (
    <div className="bg-[#CBA07D]/90 rounded-[30px] p-8 h-full flex flex-col">
      <h3 className="text-white font-bold text-[17px] sm:text-[20px]">{t(review.title)}</h3>
      <p className="text-white font-semibold text-[14px] min-[768px]:text-[16px] mt-4 leading-relaxed flex-1">
        {t(review.text)}
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <span className="text-[#CBA07D] font-bold text-[16px]">{t(review.initials)}</span>
        </div>
        <div>
          <p className="text-white font-bold text-[16px]">{t(review.name)}</p>
          <div className="flex gap-1 mt-1">
            {[...Array(review.stars)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                <path d="M12.0026 18.26L4.9491 22.2082L6.52443 14.2799L0.589844 8.7918L8.61688 7.84006L12.0026 0.5L15.3882 7.84006L23.4152 8.7918L17.4807 14.2799L19.056 22.2082L12.0026 18.26Z" fill="#FFD700" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

