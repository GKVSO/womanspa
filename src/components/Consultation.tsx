"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, btnHover } from "./Animations";
import { useT } from "@/i18n/LanguageProvider";

export default function Consultation({ showOnMobile = true, hideAt1200 = false, showOnlyDesktop = false, title1, title2, bullets }: { showOnMobile?: boolean; hideAt1200?: boolean; showOnlyDesktop?: boolean; title1?: string; title2?: string; bullets?: string[] }) {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useT();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "consultation", name, phone, concern }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setConcern("");
        setAgreed(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const visibilityClass = showOnlyDesktop
    ? "hidden min-[1600px]:block"
    : "";

  return (
    <section className={`${visibilityClass} ${hideAt1200 ? "min-[1200px]:max-[1599px]:hidden" : ""} bg-cover bg-center bg-no-repeat rounded-t-[60px] px-5 sm:px-10 py-16 sm:py-20 bg-[url(/consultation-bg.webp)]`}>
      <FadeIn as="div" className="flex flex-col lg:flex-row gap-10 lg:gap-12 max-w-[1440px] mx-auto" y={30}>
        <div className="flex-1">
          <StaggerContainer staggerDelay={0.1}>
            <StaggerItem>
              <h2 className="text-black text-[32px] sm:text-[48px] font-berlingske leading-tight mb-8">
                {t(title1 || "Begin With A")}
                <br />
                {t(title2 || "Personalized Consultation")}
              </h2>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </StaggerItem>

            <StaggerItem>
              <motion.div className="flex items-start gap-4 mb-8" whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
                <div className="w-12 h-12 flex-shrink-0 rounded-full border border-[#CBA07D] flex items-center justify-center">
                  <Image src="/gift-icon.svg" alt="" width={24} height={24} />
                </div>
                <p className="text-black text-[16px] font-semibold leading-relaxed">
                  {t("Book a complimentary consultation")}
                  <br />
                  {t("and get a")}&nbsp;<strong>{t("$100 Welcome Gift")}</strong>&nbsp;{t("toward")}
                  <br />
                  {t("your first treatment")}
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </StaggerItem>

            <StaggerItem>
              <p className="text-black font-semibold text-[16px] mb-4">{t("Consultation Includes:")}</p>
              <ul className="space-y-2 mb-8">
                {(bullets || [
                  "Personalized recommendations",
                  "Skin/body/wellness evaluation",
                  "Personalized treatment recommendations",
                  "Questions answered privately",
                ]).map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-black font-semibold text-[16px]"
                    style={{ opacity: 0.9 }}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 0.9, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: "#9A6D44" }} />
                    {t(item)}
                  </motion.li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: "linear-gradient(90deg, #313242 0%, #F1F1F4 100%)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </StaggerItem>

            <StaggerItem>
              <motion.div className="space-y-6">
                {[
                  { icon: "/phone-icon.svg", href: "tel:+13053369373", lines: ["+1 (305) 336-9373", "Monday - Friday: 9:00 AM - 7:00 PM", "Saturday: 10:00 AM - 5:00 PM"] },
                  { icon: "/email-icon.svg", href: "mailto:info@womanmedspa.com", lines: ["info@womanmedspa.com", "Send us a message"] },
                  { icon: "/location-icon.svg", href: "https://maps.google.com/?q=1006+E+Hallandale+Beach+Blvd+Suite+204+Hallandale+Beach+FL+33009", lines: ["1006 E Hallandale Beach Blvd Suite", "204 Hallandale Beach, FL 33009", "Wo/Man Luxe Med Spa"] },
                  ].map((block) => (
                  <motion.div
                    key={block.icon}
                    className="flex items-start gap-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-12 h-12 flex-shrink-0 rounded-full border border-[#CBA07D] flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(203, 160, 125, 0.1)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <a href={block.href} target={block.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        <Image src={block.icon} alt="" width={24} height={24} />
                      </a>
                    </motion.div>
                    <div>
                      {block.lines.map((line, j) => (
                        j === 0 ? (
                          <a key={j} href={block.href} target={block.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block text-black font-semibold text-[16px] hover:text-[#CBA07D] transition-colors">
                            {t(line)}
                          </a>
                        ) : (
                          <p key={j} className="text-[14px] font-medium" style={{ color: "#313242", opacity: 0.5 }}>
                            {t(line)}
                          </p>
                        )
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <div className="flex-1">
          <motion.div
            className="bg-white rounded-[40px] sm:rounded-t-[60px] p-6 sm:p-10 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <StaggerContainer staggerDelay={0.08}>
              <StaggerItem>
                <h3 className="text-black text-[32px] font-berlingske leading-tight mb-8">
                  {t("Begin With")}
                  <br />
                  {t("A Private Conversation")}
                </h3>
              </StaggerItem>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <StaggerItem>
                  <motion.input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("Your Name")}
                    className="w-full px-5 py-4 rounded-[20px] text-[18px] font-medium outline-none"
                    style={{ backgroundColor: "#FAFAFA", border: "1px solid #F6F6F7", color: "#313242" }}
                    whileFocus={{ scale: 1.01, borderColor: "#CBA07D" }}
                    transition={{ duration: 0.3 }}
                  />
                </StaggerItem>
                <StaggerItem>
                  <motion.input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("Phone Number")}
                    className="w-full px-5 py-4 rounded-[20px] text-[18px] font-medium outline-none"
                    style={{ backgroundColor: "#FAFAFA", border: "1px solid #F6F6F7", color: "#313242" }}
                    whileFocus={{ scale: 1.01, borderColor: "#CBA07D" }}
                    transition={{ duration: 0.3 }}
                  />
                </StaggerItem>
                <StaggerItem>
                  <motion.textarea
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder={t("Main Skin Concern")}
                    rows={5}
                    className="w-full px-5 py-4 rounded-[20px] text-[18px] font-medium outline-none resize-none"
                    style={{ backgroundColor: "#FAFAFA", border: "1px solid #F6F6F7", color: "#313242" }}
                    whileFocus={{ scale: 1.01, borderColor: "#CBA07D" }}
                    transition={{ duration: 0.3 }}
                  />
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`w-5 h-5 flex-shrink-0 rounded border mt-0.5 flex items-center justify-center transition-colors cursor-pointer ${agreed ? "bg-white border-[#CBA07D]" : ""}`}
                      style={{ borderColor: agreed ? "#CBA07D" : "#CFA889" }}
                      onClick={() => setAgreed(!agreed)}
                      whileTap={{ scale: 0.9 }}
                    >
                      {agreed && (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M1 0H17C17.5523 0 18 0.44772 18 1V17C18 17.5523 17.5523 18 17 18H1C0.44772 18 0 17.5523 0 17V1C0 0.44772 0.44772 0 1 0ZM8.0026 13L15.0737 5.92893L13.6595 4.51472L8.0026 10.1716L5.17421 7.3431L3.75999 8.7574L8.0026 13Z" fill="#CBA07D"/>
                        </svg>
                      )}
                    </motion.div>
                    <p className="text-[14px] font-medium leading-snug" style={{ color: "#1F1D1B", opacity: 0.5 }}>
                      {t("By checking this box, I agree to the")}&nbsp;<u>{t("Privacy Policy")}</u>&nbsp;{t("for Woman Luxe")}
                      <br />
                      {t("Med Spa and consent to receive marketing text messages and emails from")}
                      <br />
                      {t("Woman Luxe Med Spa.")}
                    </p>
                  </div>
                </StaggerItem>

                {status === "success" && (
                  <StaggerItem>
                    <p className="text-[#9A6D44] font-medium text-center">{t("Thank you! Your request has been sent.")}</p>
                  </StaggerItem>
                )}
                {status === "error" && (
                  <StaggerItem>
                    <p className="text-red-500 font-medium text-center">{t("Failed to send request. Please try again.")}</p>
                  </StaggerItem>
                )}

                <StaggerItem>
                  <motion.button
                    type="submit"
                    disabled={!agreed || status === "loading"}
                    whileHover={agreed && status !== "loading" ? { scale: 1.03 } : {}}
                    whileTap={agreed && status !== "loading" ? { scale: 0.97 } : {}}
                    className={`w-full text-white font-bold text-[14px] rounded-full py-4 transition-all cursor-pointer whitespace-nowrap ${
                      agreed && status !== "loading" ? "bg-[#CBA07D] shadow-sm hover:shadow-lg" : "bg-[#CBA07D]/40 cursor-not-allowed"
                    }`}
                  >
                    {status === "loading" ? t("Sending...") : t("Book Private Consultation")}
                  </motion.button>
                </StaggerItem>
              </form>
            </StaggerContainer>
          </motion.div>
        </div>
    </FadeIn>
    </section>
  );
}
