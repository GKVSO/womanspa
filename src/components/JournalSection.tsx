"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

const cardTitles = [
  "Emerald Laser vs Emsculpt NEO: Which Body Contouring Technology Is Right For You?",
  "The Complete Guide to Skin Rejuvenation for Every Skin Type",
  "Laser Hair Removal: Everything You Need to Know Before Your First Session",
  "How to Maintain Your Results After Body Contouring Treatments",
  "The Science Behind Radiofrequency Skin Tightening",
  "Facial Aesthetics 101: From Botox to Dermal Fillers",
  "5 Wellness Habits That Amplify Your Beauty Routine",
  "What to Expect During Your First Med Spa Consultation",
  "Winter Skin Care: Protecting Your Glow in Cold Weather",
  "Understanding Microneedling: Benefits and Recovery",
  "The Benefits of Personalized Treatment Plans in Modern Aesthetics",
  "CoolSculpting vs Liposuction: Making the Right Choice",
  "How Often Should You Get Laser Hair Removal Sessions?",
  "The Role of Collagen in Healthy, Youthful Skin",
  "Non-Surgical Body Contouring: Myths and Facts",
  "Preparing for Your Laser Skin Resurfacing Appointment",
  "Advanced Aesthetics: The Future of Med Spa Treatments",
  "Achieving Longevity Through Comprehensive Wellness Programs",
  "Choosing the Right Skincare Products for Your Treatment",
  "The Healing Power of Red Light Therapy",
  "Body Refinement Techniques for a Confident Summer",
  "The Importance of Sun Protection in Anti-Aging",
  "Hormonal Changes and Their Impact on Skin Health",
  "Injectable Treatments: What Truly Delivers Natural Results",
  "Your Roadmap to a Personalized Aesthetic Journey",
  "Chemical Peels: Types, Benefits, and Downtime",
  "How to Combine Treatments for Maximum Results",
  "The Aesthetician's Guide to Sensitive Skin Care",
  "Laser Toning: Gentle Glow Without Downtime",
  "Nutrition and Beauty: Foods That Improve Your Skin",
  "Recovering from Body Contouring: Tips from Our Experts",
  "The Truth About Pain-Free Laser Treatments",
  "Menopause and Skin: Strategies for Lasting Radiance",
  "Vacation Prep: Non-Invasive Treatments Before Your Trip",
  "Why Consistency Matters in Aesthetic Treatments",
  "Exploring Intimate Wellness Treatments in a Safe Space",
  "Scar Reduction: Modern Approaches That Really Work",
  "Anti-Aging Myths We Hear Every Day",
  "The Connection Between Sleep and Skin Repair",
  "Lymphatic Drainage: Benefits Beyond Relaxation",
  "Professional-Grade Skincare vs Over-the-Counter",
  "Building Your Confidence Through Aesthetic Care",
  "The Art of Natural-Looking Facial Enhancements",
  "Seasonal Treatments: What to Book Each Quarter",
  "A Beginner's Journey Into Advanced Aesthetics",
  "Cold Therapy and Its Surprising Beauty Benefits",
  "Mastering the Perfect Skincare Routine for Busy Women",
  "The Best Treatments to Pair with Your Body Contouring",
  "Stretch Marks: Prevention and Modern Treatment Options",
  "What Your Skin Type Reveals About Your Health",
  "Laser Precision: How Technology Shapes Modern Aesthetics",
  "Embracing Natural Beauty at Every Age",
  "The Ultimate Pre-Event Beauty Checklist",
];

const CARD_IMAGE = "/journal-card.webp";

interface Card {
  id: number;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

const cards: Card[] = cardTitles.map((title, i) => ({
  id: i + 1,
  title,
  date: "30 Jan 2025",
  readTime: "10 mins read",
  image: CARD_IMAGE,
}));

const PER_PAGE = 9;

export default function JournalSection() {
  const t = useT();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cards.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const visibleCards = cards.slice(startIndex, startIndex + PER_PAGE);

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <FadeIn as="section" className="flex justify-center py-20">
      <div className="w-[90%]">
        <StaggerContainer staggerDelay={0.06}>
          <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCards.map((card, i) => (
              <motion.article
                key={card.id}
                className="cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="relative overflow-hidden rounded-[30px]">
                  <Image
                    src={card.image}
                    alt={t(card.title)}
                    width={600}
                    height={400}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[16px] font-medium mt-4" style={{ color: "#1F1D1B", opacity: 0.5 }}>
                  {t(card.date)} &bull; {t(card.readTime)}
                </p>
                <h3 className="text-[20px] font-medium leading-snug mt-1" style={{ color: "#1F1D1B", opacity: 0.9 }}>
                  {t(card.title)}
                </h3>
              </motion.article>
            ))}
          </div>

          <StaggerItem>
            <motion.nav
              className="flex items-center justify-center gap-2 mt-12"
              aria-label={t("Pagination")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.button
                onClick={goPrev}
                disabled={currentPage === 1}
                aria-label={t("Previous page")}
                whileHover={currentPage > 1 ? { scale: 1.08 } : {}}
                whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
                className="w-10 h-10 flex items-center justify-center rounded-[10px] cursor-pointer transition-opacity"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #F1F5F8", opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                <Image src="/pagination-prev.svg" alt={t("Previous")} width={8} height={13} />
              </motion.button>

              {pageNumbers.map((num, i) =>
                num === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-[16px] font-semibold" style={{ color: "#1F1D1B", opacity: 0.5 }}>
                    ...
                  </span>
                ) : (
                  <motion.button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-[10px] text-[16px] font-semibold cursor-pointer ${
                      num === currentPage ? "bg-[#CBA07D] text-white" : ""
                    }`}
                    style={num === currentPage ? {} : { backgroundColor: "#FFFFFF", border: "1px solid #F1F5F8", color: "#324349" }}
                  >
                    {num}
                  </motion.button>
                )
              )}

              <motion.button
                onClick={goNext}
                disabled={currentPage === totalPages}
                aria-label={t("Next page")}
                whileHover={currentPage < totalPages ? { scale: 1.08 } : {}}
                whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
                className="w-10 h-10 flex items-center justify-center rounded-[10px] cursor-pointer transition-opacity"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #F1F5F8", opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                <Image src="/pagination-next.svg" alt={t("Next")} width={8} height={13} />
              </motion.button>
            </motion.nav>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </FadeIn>
  );
}

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  if (currentPage > 3) pages.push("...");
  for (let p = Math.max(2, currentPage - 1); p <= Math.min(totalPages - 1, currentPage + 1); p++) {
    pages.push(p);
  }
  if (currentPage < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
}
