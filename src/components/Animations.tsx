"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section";
  id?: string;
}

export function FadeIn({ children, delay = 0, y = 30, className, as = "div", id }: FadeInProps) {
  const Component = as === "section" ? motion.section : motion.div;
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export const btnHover = {
  whileHover: { scale: 1.03, transition: { duration: 0.3, ease } },
  whileTap: { scale: 0.97, transition: { duration: 0.15 } },
};

export const subtleHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.3, ease } },
  whileTap: { scale: 0.98, transition: { duration: 0.15 } },
};
