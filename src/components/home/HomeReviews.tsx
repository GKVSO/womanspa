"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "../Animations";
import { useT } from "@/i18n/LanguageProvider";
import { useDraggableScroll } from "../useDraggableScroll";

const filters = ["All Reviews", "Body Contouring", "Skin Rejuvenation", "Laser Hair Removal", "Wellness"];

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
    title: "Skin Looked Smoother!",
    text: "I wanted healthier skin without downtime. Candela Matrix smoothed my texture and left my face looking fresher and much more radiant now too.",
    name: "Jennifer Morales",
    initials: "JM",
    stars: 5,
  },
  {
    id: 2,
    category: "Body Contouring",
    title: "Amazing Results!",
    text: "The body contouring treatment exceeded all my expectations. I saw a clear difference after just a few sessions, and it was very comfortable.",
    name: "Sarah Johnson",
    initials: "SJ",
    stars: 5,
  },
  {
    id: 3,
    category: "Laser Hair Removal",
    title: "Best Investment Ever",
    text: "After years of waxing, laser hair removal changed everything. The staff was gentle and professional, and the results are so truly permanent.",
    name: "Maria Rodriguez",
    initials: "MR",
    stars: 5,
  },
  {
    id: 4,
    category: "Wellness",
    title: "Felt Rejuvenated",
    text: "The wellness program is a complete experience from the start. I walked out feeling like a new person. The treatments were tailored to needs.",
    name: "Amanda Wilson",
    initials: "AW",
    stars: 5,
  },
  {
    id: 5,
    category: "Skin Rejuvenation",
    title: "Glowing Skin",
    text: "My friends keep asking what I did to my skin! The rejuvenation treatments are top-notch and the results speak for themselves, truly amazing.",
    name: "Jessica Brown",
    initials: "JB",
    stars: 5,
  },
  {
    id: 6,
    category: "Body Contouring",
    title: "Contour Like Never Before",
    text: "I was skeptical at first, but the body contouring results are incredible. My clothes fit better and I feel so much more confident in myself.",
    name: "Elizabeth Garcia",
    initials: "EG",
    stars: 5,
  },
];

export default function HomeReviews() {
  const t = useT();
  const [activeFilter, setActiveFilter] = useState("All Reviews");
  const trackRef = useRef<HTMLDivElement>(null);
  useDraggableScroll(trackRef);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const filteredReviews = activeFilter === "All Reviews"
    ? reviews
    : reviews.filter((r) => r.category === activeFilter);

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
  }, [updateDimensions, filteredReviews.length]);

  useEffect(() => {
    setScrollPos(0);
    if (trackRef.current) trackRef.current.scrollLeft = 0;
  }, [filteredReviews.length]);

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
    <FadeIn as="section" className="flex justify-center py-20">
      <div className="w-[90%]">
        <StaggerContainer staggerDelay={0.12}>
          <StaggerItem>
            <h2 className="text-black text-[24px] min-[768px]:text-[32px] min-[1200px]:text-[36px] min-[1600px]:text-[48px] font-berlingske leading-tight mb-6 text-center">
              {t("Why Clients Continue Coming Back")}
            </h2>
          </StaggerItem>

          <StaggerItem>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto hide-scrollbar items-stretch"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {filteredReviews.map((review, i) => (
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
      <h3 className="text-white font-bold text-[20px]">{t(review.title)}</h3>
      <p className="text-white font-semibold text-[14px] min-[768px]:text-[16px] mt-4 leading-relaxed flex-1">
        {t(review.text)}
      </p>
      <div className="flex items-center gap-4 mt-6">
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

