"use client";

import { useEffect, useState } from "react";
import BlockRenderer, { type BlockContent } from "@/components/cms/BlockRenderer";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import XerfHero from "@/components/XerfHero";
import XerfBenefits from "@/components/XerfBenefits";
import Header from "@/components/Header";
import "@/app/globals.css";

interface BlockItem {
  type: string;
  content: BlockContent;
}

function PreviewInner() {
  const [blocks, setBlocks] = useState<BlockItem[]>([]);
  const [slug, setSlug] = useState<string>("");
  const { setLang: setCtxLang } = useLanguage();

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "cms-preview-update") {
        setBlocks(e.data.blocks || []);
        setSlug(e.data.slug || "");
        if (e.data.lang) {
          const l = e.data.lang.charAt(0).toUpperCase() + e.data.lang.slice(1);
          setCtxLang(l as "En" | "Ru" | "Es");
        }
      }
    }
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "cms-preview-ready" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, [setCtxLang]);

  const handlePreviewClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const blockEl = target.closest("[data-block-index]");
    if (!blockEl) return;
    const blockIndex = Number(blockEl.getAttribute("data-block-index"));
    const editType = target.getAttribute("data-edit-type") || target.closest("[data-edit-type]")?.getAttribute("data-edit-type") || "section";
    const label = target.getAttribute("data-edit-label") || target.closest("[data-edit-label]")?.getAttribute("data-edit-label") || "";
    window.parent.postMessage({ type: "cms-preview-select", blockIndex, editType, label }, "*");
  };

  // For xerf, render the REAL frontend components with CMS overrides — 1:1 with /xerf
  if (slug === "xerf" && blocks.length > 0) {
    const heroBlock = blocks.find(b => b.type === "hero");
    const benefitsBlock = blocks.find(b => b.type === "benefits");
    const otherBlocks = blocks.filter(b => b.type !== "hero" && b.type !== "benefits");
    return (
      <div className="min-h-screen" style={{ background: "#F1F2F4" }} onClick={handlePreviewClick}>
        <Header />
        <div data-block-index={blocks.indexOf(heroBlock as BlockItem)} className="relative">
          <XerfHero cms={heroBlock?.content as Record<string, unknown>} editing />
        </div>
        <div data-block-index={blocks.indexOf(benefitsBlock as BlockItem)} className="relative">
          <XerfBenefits cms={benefitsBlock?.content as Record<string, unknown>} editing />
        </div>
        {otherBlocks.map((block) => {
          const idx = blocks.indexOf(block);
          return (
            <div key={idx} data-block-index={idx} className="relative">
              <BlockRenderer type={block.type as never} content={block.content} editing={true} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F1F2F4" }} onClick={handlePreviewClick}>
      {blocks.map((block, i) => (
        <div
          key={i}
          data-block-index={i}
          className="relative"
        >
          <BlockRenderer
            type={block.type as never}
            content={block.content}
            editing={true}
          />
        </div>
      ))}
    </div>
  );
}

export default function CmsPreviewPage() {
  return (
    <LanguageProvider>
      <PreviewInner />
    </LanguageProvider>
  );
}
