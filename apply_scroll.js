const fs = require('fs');
const path = require('path');

const apply = (heroFile, targetFile, id) => {
    // 1. Target file
    const tPath = path.join(__dirname, 'src/components', targetFile);
    if (fs.existsSync(tPath)) {
        let content = fs.readFileSync(tPath, 'utf8');
        let modified = false;
        
        // Find <FadeIn as="section" className="..." > and add id
        // Or <section className="..." >
        content = content.replace(/<(FadeIn|section)([^>]*)>/, (match, tag, rest) => {
            if (rest.includes('id=')) return match;
            modified = true;
            return `<${tag} id="${id}"${rest}>`;
        });
        
        if (modified) {
            fs.writeFileSync(tPath, content);
            console.log(`[TARGET] Added id="${id}" to ${targetFile}`);
        }
    } else {
        console.log("[TARGET] Missing:", targetFile);
    }

    // 2. Hero file
    const hPath = path.join(__dirname, 'src/components', heroFile);
    if (!fs.existsSync(hPath)) {
        console.log("[HERO] Missing:", heroFile);
        return;
    }

    let hContent = fs.readFileSync(hPath, 'utf8');
    let hModified = false;
    
    if (!hContent.includes('smoothScrollToTarget')) {
        hContent = hContent.replace(/import \{ motion \} from "framer-motion";/, 'import { motion } from "framer-motion";\nimport { smoothScrollToTarget } from "@/lib/scroll";');
        hModified = true;
    }
    
    // We want to replace the LAST <motion.button or the one with bg-transparent
    const lines = hContent.split('\n');
    let btnIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('<motion.button') && !lines[i].includes('onClick')) {
            // Usually the secondary button is the one we want. It often has bg-transparent or hover:bg-white/10
            if (lines[i].includes('bg-transparent') || lines[i].includes('Explore Treatments')) {
                btnIndex = i;
                break;
            } else {
                btnIndex = i; // Store it, maybe it's the right one
            }
        }
    }
    
    if (btnIndex !== -1) {
        lines[btnIndex] = lines[btnIndex].replace('<motion.button', `<motion.button onClick={() => smoothScrollToTarget('${id}')}`);
        hContent = lines.join('\n');
        hModified = true;
        console.log(`[HERO] Added onClick to ${heroFile}`);
    }

    if (hModified) {
        fs.writeFileSync(hPath, hContent);
    }
}

// Group 1
apply('EmsculptHero.tsx', 'EmsculptGallerySlider.tsx', 'before-after');
apply('ExionHero.tsx', 'ExionGallerySlider.tsx', 'before-after');
apply('SylfirmHero.tsx', 'SylfirmGallerySlider.tsx', 'before-after');
apply('XerfHero.tsx', 'XerfGallerySlider.tsx', 'before-after');

// Group 2
apply('EmsellaHero.tsx', 'EmsellaReviewsSlider.tsx', 'reviews');

// Group 3
apply('AcuPulseHero.tsx', 'AcuPulseTechnology.tsx', 'treatments');
apply('BodyContouringHero.tsx', 'BodyContouringConsultation.tsx', 'treatments');
apply('CandelaSmootherHero.tsx', 'CandelaSmootherTechnology.tsx', 'treatments');
apply('EmeraldHero.tsx', 'EmeraldTechnology.tsx', 'treatments');
apply('PrimelaseHero.tsx', 'PrimelaseTechnology.tsx', 'treatments');
apply('SkinRejuvenationHero.tsx', 'SkinTechnologiesSection.tsx', 'treatments');
apply('WellnessHero.tsx', 'WellnessTechnologiesSection.tsx', 'treatments');
apply('home/HomeHero.tsx', 'home/HomeTreatments.tsx', 'treatments');

console.log("Done applying anchors.");
