import postgres from "postgres";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
} catch {}

const sql = postgres(process.env.DATABASE_URL || "postgresql://postgres@localhost:5432/womanmedspa", { max: 5 });

const REVIEWS = [
  { name: "Jennifer Morales", text: "I wanted healthier skin without downtime. Candela Matrix smoothed my texture and left my face looking fresher and much more radiant now too.", stars: "5" },
  { name: "Sarah Johnson", text: "The body contouring treatment exceeded all my expectations. I saw a clear difference after just a few sessions, and it was very comfortable.", stars: "5" },
  { name: "Maria Rodriguez", text: "After years of waxing, laser hair removal changed everything. The staff was gentle and professional, and the results are so truly permanent.", stars: "5" },
  { name: "Amanda Wilson", text: "The wellness program is a complete experience from the start. I walked out feeling like a new person. The treatments were tailored to needs.", stars: "5" },
  { name: "Jessica Brown", text: "My friends keep asking what I did to my skin! The rejuvenation treatments are top-notch and the results speak for themselves, truly amazing.", stars: "5" },
  { name: "Elizabeth Garcia", text: "I was skeptical at first, but the body contouring results are incredible. My clothes fit better and I feel so much more confident in myself.", stars: "5" },
];

const CONSULTATION = {
  title: "Begin With A Personalized Consultation",
  subtitle: "Book a complimentary consultation and get a $100 Welcome Gift toward your first treatment",
  phone: "+1 (305) 336-9373",
};

const GALLERY_IMAGES = [
  { before: "/before-image.webp", after: "/after-image.webp" },
  { before: "/before-image-2.webp", after: "/after-image-2.webp" },
  { before: "/before-image.webp", after: "/after-image.webp" },
  { before: "/before-image-2.webp", after: "/after-image-2.webp" },
  { before: "/before-image.webp", after: "/after-image.webp" },
];

type Block = { type: string; content: Record<string, unknown> };

function hero(title: string, desc: string, img: string, btn1 = "Book Consultation", btn2?: string): Block {
  return { type: "hero", content: { title, subtitle: desc, backgroundImage: img, height: 100, titleSize: 64, subtitleSize: 16, textColor: "#FFF", buttonColor: "#B07E3F", backgroundColor: "#F1F2F4", primaryBtn: btn1, secondaryBtn: btn2 } };
}

function textBlock(title: string, body: string, bg = "#fff"): Block {
  return { type: "text_block", content: { title, body, titleSize: 48, bodySize: 16, titleColor: "#1F1D1B", bodyColor: "#313242", backgroundColor: bg, align: "left" } };
}

function benefitsBlock(title: string, items: { title: string; text: string }[], bg = "#CBA07D"): Block {
  return { type: "benefits", content: { title, items, cardBackground: "#fff", itemTextColor: "#313242", itemTitleColor: "#1F1D1B", backgroundColor: bg, titleColor: "#1F1D1B" } };
}

function cardsBlock(title: string, cards: { title: string; text: string }[], bg = "#F1F2F4"): Block {
  return { type: "cards", content: { title, cards, buttonText: "", buttonColor: "#CBA07D", cardBackground: "#fff", cardTitleColor: "#1F1D1B", cardTextColor: "#313242", backgroundColor: bg, titleColor: "#1F1D1B" } };
}

function galleryBlock(title: string, images = GALLERY_IMAGES): Block {
  return { type: "gallery", content: { title, images, backgroundColor: "#CBA07D", titleColor: "#1F1D1B" } };
}

function reviewsBlock(title: string): Block {
  return { type: "reviews", content: { title, reviews: REVIEWS, cardColor: "#CBA07D", backgroundColor: "#fff", titleColor: "#1F1D1B" } };
}

function faqBlock(title: string, items: { q: string; a: string }[]): Block {
  return { type: "faq", content: { title, items, backgroundColor: "#fff", titleColor: "#1F1D1B", questionColor: "#1F1D1B", answerColor: "#6B7078" } };
}

function consultationBlock(): Block {
  return { type: "consultation", content: { ...CONSULTATION, buttonColor: "#CBA07D", backgroundColor: "#fff", titleColor: "#1F1D1B" } };
}

const PAGES: { slug: string; title: string; seo_title: string; seo_description: string; blocks: Block[] }[] = [
  // ========== 1. ACUPULSE ==========
  {
    slug: "acupulse", title: "AcuPulse CO2 Laser Resurfacing",
    seo_title: "AcuPulse CO2 Laser Resurfacing | WO/MAN Luxe MedSpa",
    seo_description: "Advanced CO2 laser resurfacing for smoother, younger-looking skin. Treats fine lines, acne scars, pigmentation.",
    blocks: [
      hero("AcuPulse CO2 Laser Resurfacing For Smoother, Younger-Looking Skin", "A premium skin rejuvenation treatment designed to improve texture, fine lines, acne scars, pigmentation, and visible signs of aging through advanced collagen remodeling", "/acupulse-hero.webp", "Book Consultation", "Learn How It Works"),
      textBlock("Your Skin Changes Over Time", "Many women begin noticing fine lines becoming more visible, uneven texture, dullness, acne scars, pigmentation. CO2 Laser Resurfacing stimulates collagen renewal and deeper skin regeneration to help the skin appear smoother, firmer, brighter, and more refined.", "#fff"),
      benefitsBlock("Refined, Smoother, Healthier-Looking Skin", [
        { title: "Improve Fine Lines & Wrinkles", text: "Stimulates collagen to soften visible signs of aging" },
        { title: "Refine Skin Texture", text: "Improves roughness, enlarged pores, and uneven texture" },
        { title: "Reduce Acne Scarring", text: "Helps smooth acne scars and improve skin clarity" },
        { title: "Brighten Pigmentation", text: "Targets sun damage and uneven skin tone" },
        { title: "Tighten & Renew Skin", text: "Supports firmer, more youthful-looking skin" },
        { title: "Restore Confidence", text: "Many clients feel more comfortable wearing less makeup and showing their natural skin" },
      ]),
      textBlock("How CO2 Laser Resurfacing Works", "CO2 laser technology creates controlled micro-injuries within the skin to stimulate collagen production and accelerate cellular renewal, as the skin heals, texture improves, fine lines soften, and the complexion appears smoother and more radiant.", "#ECEDEE"),
      textBlock("Is CO2 Laser Resurfacing Right For You?", "Ideal candidates want to improve fine lines & wrinkles, acne scars, uneven texture, sun damage, pigmentation.", "#CFD2D8"),
      galleryBlock("Real Skin Transformation"),
      reviewsBlock("Trusted By Women Who Expect Elevated Care"),
      faqBlock("CO2 Laser Resurfacing Frequently Asked Questions", [
        { q: "Does CO2 Laser Resurfacing hurt?", a: "The treatment is generally well-tolerated. Your provider will ensure your comfort throughout the procedure, and topical numbing is typically applied beforehand." },
        { q: "How long is downtime?", a: "Downtime varies depending on treatment intensity, but most clients can return to normal activities within a short recovery window as the skin heals and renews." },
        { q: "How many treatments will I need?", a: "Most clients achieve optimal results with a series of treatments. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "When will I see results?", a: "Results develop gradually as collagen remodels and new skin forms. Most clients notice visible improvements within the following weeks and continue to improve over time." },
        { q: "Is CO2 safe for all skin types?", a: "CO2 laser resurfacing is suitable for many skin types. Your provider will assess your skin during a consultation to determine the safest and most effective approach for you." },
        { q: "Can CO2 be combined with other treatments?", a: "Yes. CO2 laser resurfacing can safely complement other treatments to enhance overall results. Your provider will tailor a plan to your individual needs." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 2. AEROLASE ==========
  {
    slug: "aerolase", title: "Aerolase Neo Laser",
    seo_title: "Aerolase Neo Laser for Acne & Rejuvenation | WO/MAN Luxe MedSpa",
    seo_description: "Revolutionary single-platform laser for acne, pigmentation, redness, collagen stimulation, and hair removal on all skin types.",
    blocks: [
      hero("Aerolase Neo - Laser For Acne, Rejuvenation & Even Tone At WO/MAN Luxe MedSpa", "A revolutionary, single-platform solution that treats acne, clears pigmentation, reduces redness, stimulates collagen, and removes hair - all with virtually no pain and zero downtime", "/aerolase-hero.webp", "Book Consultation"),
      textBlock("Your Skin Deserves A Solution That Doesn't Create New Problems", "Most lasers demand a trade-off: treat acne but aggravate sensitive skin; target pigmentation but risk hyperpigmentation on deeper tones. Aerolase Neo was engineered precisely to eliminate every single one of them - in a single device, for every skin tone.", "#fff"),
      benefitsBlock("One Device. 650 Microseconds. All Skin Types. Infinite Possibilities", [
        { title: "Rapid Acne Clearance", text: "The laser penetrates to the sebaceous glands, killing acnes bacteria and reducing inflammation" },
        { title: "Fades Pigmentation & Melasma", text: "Melanin-rich lesions are gently fragmented without damaging surrounding skin" },
        { title: "Calms Rosacea & Redness", text: "Diffuse facial redness, telangiectasias, and flushing are visibly reduced" },
        { title: "Stimulates Collagen & Elastin", text: "Gentle dermal heating triggers neocollagenesis - softening fine lines, improving texture" },
        { title: "Supports Laser Hair Removal", text: "Gentle, effective hair reduction on all skin types, including fine vellus hair" },
        { title: "All Skin Tones", text: "The 1064nm wavelength and microsecond speed make it one of the safest lasers for darker skin types" },
      ]),
      textBlock("A Complete Skin Health Platform", "Aerolase Neo treats face & neck, any body area, legs & arms, back/shoulders/chest, and hands.", "#F1F2F4"),
      textBlock("The 650-Microsecond Revolution: Speed Makes It Safe", "Conventional lasers fire in milliseconds, allowing heat to spread to surrounding tissue. Aerolase Neo's patented 650-microsecond pulse delivers energy faster than the thermal relaxation time of the skin.", "#ECEDEE"),
      galleryBlock("Real Transformations Across Acne, Pigmentation & Redness"),
      reviewsBlock("Reviews & Client Experience"),
      faqBlock("Frequently Asked Questions", [
        { q: "What makes Aerolase Neo different from other lasers?", a: "Aerolase Neo uses a patented 650-microsecond pulse duration with a 1064nm wavelength, delivering energy faster than the skin's thermal relaxation time. This allows safe, comfortable treatment of acne, pigmentation, redness, and hair on all skin types." },
        { q: "Is it safe for darker skin?", a: "Yes. The 1064nm wavelength and microsecond pulse speed make Aerolase Neo one of the safest lasers for darker skin types, with minimal risk of hyperpigmentation." },
        { q: "Does it work for active acne?", a: "Yes. Aerolase Neo penetrates to the sebaceous glands, killing acne-causing bacteria and reducing inflammation - even on active breakouts." },
        { q: "Can it remove hair?", a: "Yes. Aerolase Neo can be used for gentle, effective hair reduction on all skin types, including fine vellus hair that other lasers often miss." },
        { q: "Can it be combined with other treatments?", a: "Yes. Aerolase Neo combines beautifully with other treatments in our menu. Your provider will design a personalized plan based on your skin goals during your consultation." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 3. BEFORE-AFTER ==========
  {
    slug: "before-after", title: "Before & After",
    seo_title: "Before & After Results | WO/MAN Luxe MedSpa",
    seo_description: "View real patient results across body contouring, skin rejuvenation, facial aesthetics, and laser hair removal.",
    blocks: [
      hero("Before & After at WO/MAN Luxe MedSpa", "A curated portfolio of actual patient results across body contouring, skin rejuvenation, facial aesthetics, laser hair removal", "/before-after-bg.webp", "Book Consultation", "View Before & After"),
      galleryBlock("Filter by Your Area of Interest"),
      consultationBlock(),
    ],
  },

  // ========== 4. BODY CONTOURING ==========
  {
    slug: "body-contouring", title: "Body Contouring & Fat Reduction",
    seo_title: "Body Contouring & Fat Reduction | WO/MAN Luxe MedSpa",
    seo_description: "Five advanced non-invasive technologies for stubborn fat, muscle tone, and body contour refinement.",
    blocks: [
      hero("Body Contouring & Fat Reduction At WO/MAN Luxe MedSpa", "Five advanced, non-invasive technologies designed to target stubborn fat, improve muscle tone, and refine body contours with zero downtime", "/body-contouring-hero.webp", "Book Consultation", "Explore Treatments"),
      cardsBlock("Five Technologies. Infinite Precision.", [
        { title: "Emsculpt NEO", text: "RF + High-Intensity Focused Electromagnetic energy for simultaneous fat reduction and muscle building" },
        { title: "ICOONE Laser Med", text: "Patented Roboderm Multi Micro Alveolar Stimulation for lymphatic drainage, cellulite refinement, and skin firming" },
        { title: "Emerald Laser", text: "FDA-cleared cold 532nm laser for fat emulsification - zero heat, zero pain, zero downtime, BMI up to 40" },
        { title: "Endospheres Therapy", text: "Compressive microvibration to support circulation, fluid drainage, and tissue remodeling" },
        { title: "Exion", text: "Advanced RF with AI-driven energy delivery for fat reduction and skin tightening in one application" },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 5. CANDELA MATRIX ==========
  {
    slug: "candela-matrix", title: "Candela Matrix RF Skin Renewal",
    seo_title: "Candela Matrix RF Skin Renewal | WO/MAN Luxe MedSpa",
    seo_description: "Next-generation RF skin renewal for collagen remodeling, texture improvement, pore refinement with minimal downtime.",
    blocks: [
      hero("Candela Matrix For Smoother, Firmer & More Refined-Looking Skin", "A next-generation RF skin renewal treatment designed to support collagen remodeling, improve texture, refine pores, and help restore healthier-looking skin with minimal downtime", "/candela-hero.webp", "Book Skin Consultation", "View Before & After"),
      textBlock("Over Time, Skin Starts Looking Less Smooth, Firm & Even", "Even healthy skin gradually loses collagen, elasticity, and smoothness over time. Rough texture, enlarged pores, dullness, fine lines - these changes happen to everyone.", "#F1F2F4"),
      benefitsBlock("One Treatment. Multiple Skin Concerns", [
        { title: "Fine Lines & Wrinkles", text: "Supports smoother, younger-looking skin texture" },
        { title: "Skin Firmness", text: "Helps improve visible skin laxity and elasticity" },
        { title: "Enlarged Pores", text: "Supports refined looking skin texture" },
        { title: "Acne Scars & Texture", text: "Designed to improve uneven texture and skin quality" },
        { title: "Dull Skin", text: "Supports brighter, healthier-looking skin overall" },
        { title: "Collagen Support", text: "Stimulates natural regenerative processes beneath the skin" },
      ]),
      textBlock("Intelligent RF Technology Designed Around Precision", "Candela Matrix uses intelligent impedance monitoring technology that helps personalize energy delivery in real time based on how the skin responds during treatment.", "#fff"),
      textBlock("Ideal For Clients Focused On Long-Term Skin Quality", "Candela Matrix may be ideal for clients who want to improve texture, fine lines, pore size, dullness, skin firmness, acne scars.", "#CFD2D8"),
      galleryBlock("Refined Skin That Looks Healthier, Smoother & Firmer"),
      reviewsBlock("Why Clients Add Candela Matrix To Their Skin Maintenance Routine"),
      faqBlock("Candela Matrix Questions", [
        { q: "Is Candela Matrix RF microneedling?", a: "Candela Matrix uses advanced RF technology designed to target multiple layers of the skin for collagen stimulation, improved texture, and refined skin quality." },
        { q: "How many treatments are recommended?", a: "Most clients achieve optimal results with a series of treatments. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "When will I see results?", a: "Results develop gradually as collagen remodels and the skin renews. Most clients notice visible improvements within the following weeks and continue to improve over time." },
        { q: "Is there downtime?", a: "There is minimal downtime. Most clients can return to their daily activities within 24 hours after their session." },
        { q: "Can Candela Matrix help acne scars and texture?", a: "Yes. Candela Matrix is designed to help improve uneven texture and overall skin quality, including the appearance of acne scars." },
        { q: "Is Candela Matrix safe for multiple skin types?", a: "Candela Matrix uses intelligent impedance monitoring that helps personalize energy delivery, making it suitable and safe across multiple skin types." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 6. CANDELA SMOOTHER (EMFEMME 360) ==========
  {
    slug: "emfemme", title: "Emfemme 360 Feminine Wellness",
    seo_title: "Emfemme 360 Feminine Wellness | WO/MAN Luxe MedSpa",
    seo_description: "Non-surgical feminine wellness treatment for comfort, confidence, and quality of life.",
    blocks: [
      hero("Emfemme 360 - Feminine Wellness At WO/MAN Luxe MedSpa", "EMFEMME 360 is a non-surgical feminine wellness treatment designed to support comfort, confidence, intimate wellness, and quality of life in a luxury clinical environment", "/candela-smoother-hero.webp", "Book Private Consultation", "Learn How It Works"),
      textBlock("Your Skin Deserves A Solution That Doesn't Create New Problems", "For many women, intimate wellness changes slowly over time. After childbirth, hormonal shifts, stress, or aging, many begin feeling less confident, disconnected from their femininity, less comfortable.", "#fff"),
      benefitsBlock("More Than A Treatment. A Confidence & Wellness Upgrade", [
        { title: "Feel More Comfortable", text: "Support feminine wellness and daily comfort" },
        { title: "Restore Confidence", text: "Many clients report feeling more connected and confident" },
        { title: "Non-Surgical Solution", text: "No invasive procedures or extended downtime" },
        { title: "Prioritize Yourself Again", text: "A wellness-focused approach designed around self-care and quality of life" },
        { title: "Luxury Private Care", text: "An elevated environment designed around discretion and comfort" },
        { title: "Quick, Convenient Sessions", text: "Treatments are designed to fit into busy lifestyles with minimal interruption" },
      ]),
      textBlock("Gentle Technology Designed Around Feminine Wellness", "EMFEMME 360 uses gentle radiofrequency energy to support feminine wellness, comfort, and intimate confidence through a painless, non-invasive experience.", "#ECEDEE"),
      textBlock("This Treatment May Be Ideal If You Want To Improve", "Feminine wellness, comfort & confidence, dryness or discomfort, post-childbirth changes, intimate wellness concerns, non-surgical rejuvenation.", "#CFD2D8"),
      galleryBlock("Real Transformations"),
      reviewsBlock("Client Experiences"),
      faqBlock("Frequently Asked Questions", [
        { q: "Is the treatment painful?", a: "No. EMFEMME 360 is a comfortable, non-invasive procedure. Most clients describe a mild warming sensation during the session, with no anesthesia required." },
        { q: "Is there downtime?", a: "There is no downtime. You can return to your daily activities immediately after your session." },
        { q: "Is the experience private?", a: "Yes. Sessions are designed around discretion and comfort, providing a private, elevated, and supportive environment." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with a series of sessions. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "Is surgery required?", a: "No. EMFEMME 360 is a non-surgical solution designed to support feminine wellness without invasive procedures or extended recovery." },
        { q: "When can I expect results?", a: "Results develop gradually over time. Most clients notice improvements within the following weeks and continue to improve with a series of sessions." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 7. EMERALD LASER ==========
  {
    slug: "emerald-laser", title: "Emerald Laser Fat Reduction",
    seo_title: "Emerald Laser FDA-Cleared Fat Reduction | WO/MAN Luxe MedSpa",
    seo_description: "FDA-cleared non-invasive fat reduction with 532nm cold laser. Zero heat, zero pain, zero downtime. BMI up to 40.",
    blocks: [
      hero("Emerald Laser - FDA-Cleared Non-Invasive Fat Reduction & Body Contouring", "The first and only low-level laser therapy FDA-cleared for individuals with a BMI up to 40. Clinically proven to emulsify fat cells without heat, pain, or downtime.", "/emerald-hero.webp", "Book Free Consultation", "Our Treatments"),
      textBlock("Stubborn Fat That Doesn't Respond to Diet or Exercise", "Persistent abdominal fat, bra bulges, inner/outer thighs, love handles, back fat, post-menopausal body changes - fat pockets resistant to even disciplined routines. Emerald Laser uses 532nm low-level laser technology to target adipocytes through cold photobiomodulation.", "#fff"),
      benefitsBlock("Beyond Fat Reduction", [
        { title: "Zero Heat, Zero Pain", text: "Targets fat cells without heat, burning, or surgery during treatments" },
        { title: "No Downtime", text: "Clients can return to their day - no compression garments, no needles, no restrictions" },
        { title: "Clinically Supported Body Contouring", text: "Studies report visible circumference reduction, with visible results after the first sessions" },
        { title: "Lymphatic-Friendly", text: "Cold laser supports gentle fat cell release while promoting lymphatic activity and wellness" },
      ]),
      textBlock("Cold Photobiomodulation That Respects the Body", "Emerald Laser uses 10 independent 532nm green laser beams to target fat cells beneath the dermis, creating transient pores in adipocyte membranes. Triglycerides escape, cells shrink, and surrounding tissues remain intact.", "#ECEDEE"),
      textBlock("For Discerning Clients Who Expect Measurable Results", "Ideal candidates include individuals with localized stubborn fat, active wellness-oriented lifestyle, preference for non-invasive solutions.", "#CFD2D8"),
      galleryBlock("A Sculpted, Refined Silhouette Through Cold Laser Technology"),
      reviewsBlock("Why Clients Choose Emerald Laser"),
      faqBlock("Emerald Laser FAQ", [
        { q: "Is it painful?", a: "No. Emerald Laser is a comfortable, non-invasive treatment. Most clients feel nothing more than a mild warming or tingling sensation, with no anesthesia and no downtime required." },
        { q: "Is there any downtime?", a: "There is zero downtime. You can return to your daily activities immediately after your Emerald Laser session." },
        { q: "How does it work?", a: "Emerald Laser uses 532nm low-level laser energy to target fat cells through cold photobiomodulation. This process creates temporary pores in fat cells, allowing fatty acids to be released and naturally cleared by the body." },
        { q: "Who is eligible?", a: "Emerald Laser is ideal for men and women close to their goal weight who want to reduce stubborn fat pockets that resist diet and exercise." },
        { q: "Can Emerald Laser replace weight loss?", a: "Emerald Laser is not a weight loss treatment. It is a body contouring solution designed to reduce stubborn fat deposits and refine body shape." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 8. EMSCULPT NEO ==========
  {
    slug: "emsculpt-neo", title: "EMSculpt Neo Body Sculpting",
    seo_title: "EMSculpt Neo Body Sculpting & Fat Reduction | WO/MAN Luxe MedSpa",
    seo_description: "Non-surgical body contouring for muscle tone, sculpting, and fat reduction with no downtime.",
    blocks: [
      hero("EMSculpt Neo For Body Sculpting, Muscle Definition & Fat Reduction", "A non-surgical body contouring treatment designed to help support muscle tone, sculpt targeted areas, and refine body shape with no downtime", "/emsculpt-hero.webp", "Book Private Consultation", "View Before & After"),
      textBlock("Some Areas Don't Change - Even With Diet & Exercise", "Many clients live healthy lifestyles, work out consistently, and still struggle with stubborn areas of fat, lack of muscle definition, weakened core strength, slower metabolism.", "#fff"),
      benefitsBlock("Beyond Fat Reduction", [
        { title: "More Defined Abdomen", text: "Popular for clients wanting a tighter-looking core" },
        { title: "Glute Enhancement", text: "Supports a firmer and more lifted appearance" },
        { title: "More Athletic Shape", text: "Designed to help improve visible muscle definition" },
        { title: "Waistline Refinement", text: "Supports a more sculpted-looking silhouette" },
        { title: "Post-Pregnancy Confidence", text: "Often chosen after body changes related to pregnancy" },
        { title: "Non-Surgical Body Contouring", text: "No surgery, recovery, or interruption to daily life" },
      ]),
      textBlock("Muscle Stimulation & RF Technology Working Together", "EMSculpt Neo combines muscle stimulation and radiofrequency technology to help support body sculpting and muscle definition without surgery.", "#fff"),
      textBlock("Common EMSculpt Neo Treatment Areas", "Arms, Thighs, Abdomen / Core, Glutes.", "#CFD2D8"),
      galleryBlock("Real Results"),
      reviewsBlock("EMSculpt Neo Client Experiences"),
      faqBlock("Emsculpt Neo Questions Clients Often Ask", [
        { q: "Does EMSculpt Neo hurt?", a: "No. EMSculpt Neo is generally well-tolerated. Most clients feel intense muscle contractions and a warming sensation in the treated area, similar to an intense workout, but without pain." },
        { q: "Is there any downtime?", a: "There is zero downtime. You can return to your daily activities immediately after your EMSculpt Neo session." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with a series of sessions, typically spaced several days apart. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "Can EMSculpt Neo replace exercise?", a: "EMSculpt Neo is not a replacement for exercise or a healthy lifestyle. It is a body sculpting treatment designed to enhance muscle tone and reduce fat in targeted areas." },
        { q: "When will I notice results?", a: "Results develop gradually as the body responds to treatment. Most clients notice visible improvements within the following weeks and continue to improve over time." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 9. EMSELLA ==========
  {
    slug: "emsella", title: "Emsella Pelvic Floor Treatment",
    seo_title: "Emsella Pelvic Floor Treatment | WO/MAN Luxe MedSpa",
    seo_description: "FDA-cleared pelvic floor treatment. 11,200 Kegels in 28 minutes. Fully clothed. No surgery. No downtime.",
    blocks: [
      hero("Emsella Pelvic Floor Treatment in Hallandale Beach, FL", "WO/MAN Luxe Med Spa offers BTL Emsella in Hallandale Beach, FL. The only FDA-cleared pelvic floor treatment that delivers the equivalent of 11,200 Kegel exercises in a single 28-minute session. Fully clothed. No surgery. No downtime.", "/emsella-hero.webp", "Book Private Consultation", "View Reviews"),
      textBlock("You Shouldn't Have To Think About Your Bladder Every Day", "Many women quietly deal with leaking when laughing or exercising, constantly searching for bathrooms, avoiding long drives or workouts, wearing pads just in case. And most never talk about it!", "#fff"),
      benefitsBlock("Designed To Support Pelvic Health, Comfort & Confidence", [
        { title: "Bladder Control Support", text: "Helps strengthen pelvic floor muscles associated with urinary control" },
        { title: "Pelvic Floor Strength", text: "Supports deeper muscle engagement beyond traditional Kegel exercises" },
        { title: "Postpartum Recovery Support", text: "Popular among women after pregnancy and childbirth" },
        { title: "Menopause-Related Changes", text: "Supports pelvic wellness during hormonal transitions" },
        { title: "Intimate Wellness Support", text: "Supports improved pelvic strength, overall feminine wellness and sensation" },
        { title: "Non-Invasive Treatment", text: "No surgery, anesthesia, recovery, or downtime required" },
      ]),
      textBlock("Thousands Of Pelvic Floor Contractions In A Single Session", "EMSELLA uses High-Intensity Focused Electromagnetic (HIFEM) technology to stimulate deep pelvic floor muscles while you remain fully clothed and comfortably seated. A single session delivers the equivalent of thousands of Kegel contractions.", "#ECEDEE"),
      textBlock("Emsella May Be Ideal If You Experience", "Bladder leakage, urgency or frequent urination, weakened pelvic floor muscles, postpartum pelvic changes, menopause-related changes, reduced pelvic strength.", "#CFD2D8"),
      galleryBlock("Real Transformations"),
      reviewsBlock("Emsella Client Experiences"),
      faqBlock("Emsella Questions Clients Often Ask", [
        { q: "Is EMSELLA painful?", a: "No. EMSELLA is a comfortable, non-invasive treatment. Most clients describe a mild contracting or pulling sensation during the session, with no anesthesia required." },
        { q: "Do I need downtime?", a: "There is no downtime. You can return to your daily activities immediately after your session." },
        { q: "How long are treatments?", a: "A single EMSELLA session lasts approximately 28 minutes, designed to fit comfortably into your schedule." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with a series of sessions. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "Can EMSELLA help after childbirth or menopause?", a: "Yes. EMSELLA is designed to support the pelvic floor through various life stages, including postpartum recovery and menopause-related changes." },
        { q: "Do I remain clothed during treatment?", a: "Yes. EMSELLA is a fully clothed treatment. You remain comfortably seated while the technology works." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 10. ENDOSPHERES ==========
  {
    slug: "endospheres", title: "Endospheres Therapy",
    seo_title: "Endospheres Therapy for Cellulite & Body Tone | WO/MAN Luxe MedSpa",
    seo_description: "Advanced Italian Compressive Microvibration technology for cellulite, lymphatic drainage, and body contouring.",
    blocks: [
      hero("Endospheres Therapy For Cellulite, Body Tone & Lymphatic Activation", "Advanced Italian Compressive Microvibration technology designed to stimulate circulation, support lymphatic drainage, improve skin texture, and help refine body contours without downtime", "/endospheres-hero.webp", "Book Free Consultation"),
      textBlock("Compression Microvibration Designed To Stimulate The Entire Body", "Endospheres Therapy uses patented Compressive Microvibration technology that creates rhythmic mechanical stimulation throughout the tissue using a rotating cylinder with 55 silicone spheres.", "#fff"),
      benefitsBlock("More Than Cellulite Reduction", [
        { title: "Cellulite Smoothing", text: "Supports smoother-looking skin texture and tissue refinement" },
        { title: "More Athletic Shape", text: "Helps support fluid movement and reduce puffiness" },
        { title: "Heavy Legs & Swelling", text: "Popular among clients struggling with heaviness and water retention" },
        { title: "Body Tone & Firmness", text: "Supports firmer-feeling skin and improved contour appearance" },
        { title: "Circulation Support", text: "Promotes healthy blood circulation and tissue oxygenation" },
        { title: "Recovery & Muscle Relaxation", text: "Mechanical vibration may help with recovery support and muscle relief" },
      ]),
      textBlock("Rhythmic Mechanical Stimulation Explained Simply", "Mechanical pulses stimulate circulation and tissue movement. The body responds through improved circulation and oxygenation. Fluid movement and drainage may gradually improve.", "#fff"),
      textBlock("For Smoother, Lighter & More Sculpted Body", "Endospheres may be ideal for clients wanting to improve cellulite, swelling, heavy legs, muscle tension, poor circulation.", "#CFD2D8"),
      galleryBlock("Real Results"),
      reviewsBlock("Endospheres Client Experiences"),
      faqBlock("Endospheres Frequently Asked Questions", [
        { q: "Is Endospheres Therapy painful?", a: "No. Endospheres is a comfortable, non-invasive procedure. Most clients describe a pleasant deep-tissue massage-like sensation during the session, with no anesthesia and no downtime required." },
        { q: "Is there downtime?", a: "There is zero downtime. You can return to your daily activities immediately after your session." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with a series of sessions. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "When will I see results?", a: "Results develop gradually as the body responds to treatment. Most clients notice visible improvements within the following weeks and continue to improve over time." },
        { q: "Can Endospheres replace surgery?", a: "Endospheres is a non-invasive alternative designed to improve body contouring, lymphatic drainage, and skin firmness without surgery or downtime." },
        { q: "Can Endospheres be combined with other treatments?", a: "Yes. Endospheres can safely complement other treatments to enhance overall results. Your provider will tailor a plan to your individual needs." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 11. EXION ==========
  {
    slug: "exion", title: "EXION Skin Rejuvenation",
    seo_title: "EXION RF Skin Rejuvenation | WO/MAN Luxe MedSpa",
    seo_description: "Non-invasive RF treatment for firmer, smoother, younger-looking skin. Collagen stimulation without surgery.",
    blocks: [
      hero("EXION For Firmer, Smoother & Younger-Looking Skin", "Non-invasive treatment designed to improve skin firmness, collagen production, texture, and overall skin quality — without surgery or downtime", "/exion-hero.webp", "Book Private Consultation", "View Before & After"),
      textBlock("Your Skin Can Still Look Healthy, Firm & Refined", "Over time, collagen production naturally slows down. Beautiful skin is rarely about perfection. Usually, it's about skin that looks thinner, less firm, uneven, dull. EXION is designed to stimulate collagen and improve overall skin quality.", "#fff"),
      benefitsBlock("Rejuvenation Designed To Look Natural", [
        { title: "Natural Collagen Production", text: "Stimulates collagen remodeling to improve skin quality over time" },
        { title: "Improve Skin Firmness", text: "Stimulates collagen remodeling to improve skin quality over time" },
        { title: "Refine Texture & Tone", text: "Stimulates collagen remodeling to improve skin quality over time" },
        { title: "Non-Invasive Treatment", text: "Stimulates collagen remodeling to improve skin quality over time" },
        { title: "Natural-Looking Results", text: "Stimulates collagen remodeling to improve skin quality over time" },
        { title: "Minimal Lifestyle Interruption", text: "Stimulates collagen remodeling to improve skin quality over time" },
      ]),
      textBlock("Intelligent RF Technology Designed Around Precision", "EXION combines advanced radiofrequency energy and targeted ultrasound technology to stimulate collagen and support skin renewal at deeper levels.", "#ECEDEE"),
      textBlock("Who EXION Is Best Suited For", "Mild to moderate skin laxity, fine lines & wrinkles, loss of firmness, dull or tired-looking skin, uneven texture, early visible aging signs.", "#CFD2D8"),
      galleryBlock("Real Transformations"),
      reviewsBlock("EXION Client Experiences"),
      faqBlock("Exion Frequently Asked Questions", [
        { q: "Is EXION painful?", a: "No. EXION is a comfortable, non-invasive procedure. Most clients describe a mild warming sensation during the session, with no anesthesia and no downtime required." },
        { q: "Is there downtime?", a: "There is zero downtime. You can return to your daily activities immediately after your session." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with a series of sessions. Your provider will design a personalized treatment plan based on your goals during your consultation." },
        { q: "When will I see results?", a: "Results develop gradually as the skin builds new collagen. Most clients notice visible improvements within the following weeks and continue to improve over time." },
        { q: "Can EXION replace surgery?", a: "EXION is a non-invasive alternative designed to improve skin firmness, texture, and quality without surgery or downtime." },
        { q: "Can EXION be combined with other treatments?", a: "Yes. EXION can safely complement other treatments to enhance overall results. Your provider will tailor a plan to your individual needs." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 12. FEMTOUCH ==========
  {
    slug: "femtouch", title: "FemTouch CO2 Laser Vaginal Health",
    seo_title: "FemTouch CO2 Laser for Vaginal Health | WO/MAN Luxe MedSpa",
    seo_description: "Gentle non-invasive CO2 laser for vaginal tissue restoration, moisture improvement, and feminine wellness.",
    blocks: [
      hero("FemTouch - CO2 Laser For Vaginal Health At WO/MAN Luxe MedSpa Hallandale Beach", "A gentle, non-invasive laser treatment designed to restore vaginal tissue, improve moisture, and support feminine wellness at every stage of life.", "/femtouch-hero.webp", "Book Consultation"),
      textBlock("Some Changes Are Rarely Spoken About - But Deeply Felt", "Childbirth, hormonal shifts, menopause, and even the natural passage of time can silently affect your most intimate wellbeing. Vaginal dryness, loss of tightness, urinary leakage, decreased sensitivity.", "#fff"),
      benefitsBlock("FemTouch: A Few Gentle Minutes. Lasting Change", [
        { title: "Restored Natural Lubrication", text: "Many women experience significant improvement in moisture after just 1-2 sessions" },
        { title: "Improved Vaginal Tone & Elasticity", text: "Collagen regeneration gradually restores tightness and resilience" },
        { title: "Reduction In Stress Urinary", text: "FemTouch strengthens the supportive tissue around the urethra and bladder neck" },
        { title: "Increased Comfort & Confidence", text: "No more planning your day around bathrooms or avoiding intimacy" },
        { title: "Non-Surgical & Non-Hormonal", text: "An ideal option for women who cannot or prefer not to use hormone therapy" },
      ]),
      textBlock("How Fractional CO2 Laser Restores Feminine Wellness", "Tiny columns of thermal energy are delivered deep into the lamina propria, leaving the surrounding tissue intact. New collagen and elastin fibers are synthesized over the following weeks.", "#ECEDEE"),
      textBlock("Who Benefits Most From FemTouch?", "Postpartum women, perimenopausal & menopausal women, women with vaginal laxity, episiotomy scars, mild stress incontinence.", "#CFD2D8"),
      reviewsBlock("FemTouch Client Experiences"),
      faqBlock("Femtouch Questions", [
        { q: "Is there downtime?", a: "No. FemTouch is a gentle, non-invasive treatment with minimal to no downtime. Most women return to their daily activities immediately." },
        { q: "Is FemTouch safe for women who've had a hysterectomy?", a: "Yes. FemTouch is safe and effective for women who've had a hysterectomy. Your provider will confirm your suitability during a consultation." },
        { q: "Can FemTouch be combined with Emsella or Emfemme 360?", a: "Yes. FemTouch can be safely combined with Emsella or Emfemme 360 for a more complete, personalized feminine wellness plan." },
        { q: "Will my partner feel the difference?", a: "Most partners notice a difference in tone, tightness, and comfort, which can enhance intimacy and satisfaction for both partners." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 13. HYDRAFACIAL ==========
  {
    slug: "hydrafacial", title: "HydraFacial Syndeo",
    seo_title: "HydraFacial Syndeo at Hallandale Beach | WO/MAN Luxe MedSpa",
    seo_description: "Advanced HydraFacial platform for deep cleansing, gentle extraction, and intensive hydration in 30 minutes.",
    blocks: [
      hero("HydraFacial Syndeo - The Most Advanced HydraFacial Platform at Hallandale Beach", "Technology delivers deep cleansing, gentle extraction, and intensive hydration in a single 30-minute treatment. Customizable with medical-grade boosters for your unique skin goals.", "/hydrafacial-hero.webp", "Book Your HydraFacial"),
      textBlock("Your Skin Faces More Than You Realize - Every Single Day", "Miami's humidity, sun exposure, air conditioning, pollution, and stress create a constant cycle of congested pores, dehydration, uneven tone, fine lines, breakouts.", "#fff"),
      benefitsBlock("The HydraFacial Syndeo Difference", [
        { title: "Instant Visible Glow", text: "Your skin looks brighter, smoother, and more hydrated immediately after the treatment" },
        { title: "Deep Cleansing + Gentle Extraction", text: "Patented vortex suction clears pores and removes debris without pain" },
        { title: "Intensive Hydration", text: "Simultaneous infusion of hyaluronic acid, antioxidants, and peptides" },
        { title: "Fully Customizable", text: "Syndeo technology allows your provider to tailor each step with targeted boosters" },
        { title: "No Downtime, No Irritation", text: "Unlike chemical peels or lasers, HydraFacial is non-invasive and suitable even on sensitive skin" },
      ]),
      textBlock("Patented Vortex-Fusion: The Science Behind The Glow", "A gentle lactic acid and glucosamine blend removes dead surface cells. Vortex suction painlessly removes impurities. A proprietary blend of hyaluronic acid, antioxidants, minerals, and peptides is infused deep into the skin.", "#ECEDEE"),
      textBlock("Who Benefits Most From HydraFacial Syndeo?", "Women 30-60 with fine lines, dehydration, dullness, hormonal pigmentation. Men with deep cleansing for congested, shaving-irritated skin.", "#CFD2D8"),
      galleryBlock("Real Results"),
      reviewsBlock("HydraFacial Client Experiences"),
      faqBlock("Frequently Asked Questions", [
        { q: "What makes Syndeo different from a regular HydraFacial?", a: "Syndeo is the next-generation HydraFacial platform. It adds LED light therapy, enhanced vortex technology, and a more streamlined 30-minute experience." },
        { q: "Is there downtime?", a: "None. HydraFacial Syndeo is non-invasive and suitable even for sensitive skin. You can return to your daily activities immediately." },
        { q: "How long does the treatment take?", a: "A complete HydraFacial Syndeo session takes about 30 minutes — easily fit into a lunch break." },
        { q: "Can I combine HydraFacial with other treatments?", a: "Yes. HydraFacial Syndeo combines beautifully with many of our treatments." },
        { q: "Does HydraFacial help with acne scars?", a: "Yes. Regular HydraFacial treatments help improve the appearance of acne scars by keeping pores clear and supporting skin renewal." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 14. ICOONE ==========
  {
    slug: "icoone", title: "ICOONE Laser Med",
    seo_title: "ICOONE Laser Med for Body Contouring | WO/MAN Luxe MedSpa",
    seo_description: "Advanced Italian Roboderm technology for cellulite, lymphatic drainage, and skin firming.",
    blocks: [
      hero("ICOONE Laser Med For Body Contouring, Lymphatic Drainage & Skin Firming", "Advanced Italian Roboderm technology designed to help improve cellulite appearance, support lymphatic drainage, stimulate circulation, and refine body contours through non-invasive microstimulation", "/icoone-hero.webp", "Book Body Consultation"),
      textBlock("Swelling, Puffiness & Cellulite Often Start Beneath The Surface", "Many clients struggle with fluid retention, cellulite, bloating, heavy legs, stubborn body texture. Even healthy women who work out, eat well, stay active often still feel puffy, less toned, heavier in their body.", "#fff"),
      benefitsBlock("More Than Body Contouring", [
        { title: "Lymphatic Drainage", text: "Supports circulation and helps reduce fluid retention and swelling" },
        { title: "Cellulite Refinement", text: "Helps smooth uneven skin texture and improve skin appearance" },
        { title: "Skin Firming", text: "Supports collagen and elastin stimulation for firmer-looking skin" },
        { title: "Body Remodeling", text: "Designed to support more sculpted-looking body contours" },
        { title: "Recovery & Wellness", text: "Popular among clients focused on circulation, recovery, and body wellness" },
        { title: "Relaxing Experience", text: "A comfortable treatment experience many clients describe as deeply relaxing" },
      ]),
      textBlock("Multi Micro Alveolar Stimulation Explained Simply", "Thousands of microstimulations activate connective tissue. Laser & LED support collagen and body remodeling. Fluid movement and circulation are stimulated.", "#fff"),
      textBlock("Focused On Body Wellness & Refinement", "ICOONE may be ideal for clients wanting to improve cellulite, swelling, puffiness, body texture, bloating.", "#CFD2D8"),
      galleryBlock("Real Results"),
      reviewsBlock("Icoone Client Experiences"),
      faqBlock("Icoone Frequently Asked Questions", [
        { q: "Is ICOONE painful?", a: "No. ICOONE is a comfortable, non-invasive procedure. Most clients describe a pleasant deep-tissue massage-like sensation during the session." },
        { q: "Is there downtime?", a: "There is zero downtime. You can return to your daily activities immediately after your session." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with a series of sessions. Your provider will design a personalized treatment plan." },
        { q: "When will I see results?", a: "Results develop gradually as the body responds to treatment. Most clients notice visible improvements within the following weeks." },
        { q: "Can ICOONE replace surgery?", a: "ICOONE is a non-invasive alternative designed to improve body contouring, lymphatic drainage, and skin firmness without surgery." },
        { q: "Can ICOONE be combined with other treatments?", a: "Yes. ICOONE can safely complement other treatments to enhance overall results." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 15. JOURNAL ==========
  {
    slug: "journal", title: "The WO/MAN Luxe MedSpa Journal",
    seo_title: "MedSpa Journal & Articles | WO/MAN Luxe MedSpa",
    seo_description: "Expert articles on aesthetics, body refinement, wellness, and longevity.",
    blocks: [
      hero("The WO/MAN Luxe MedSpa Journal", "A curated library of articles written by our wellness experts - designed to educate, empower, and guide you through the world of advanced aesthetics, body refinement, and longevity", "/journal-bg.webp"),
      textBlock("Welcome to Our Journal", "Explore expert insights on skin rejuvenation, body contouring, wellness treatments, and the science behind advanced aesthetics.", "#fff"),
      consultationBlock(),
    ],
  },

  // ========== 16. PRIMELASE ==========
  {
    slug: "primelase", title: "Primelase Laser Hair Removal",
    seo_title: "Primelase Laser Hair Removal | WO/MAN Luxe MedSpa",
    seo_description: "Advanced laser hair removal for all skin types. Fast, effective, permanent results.",
    blocks: [
      hero("Primelase - Advanced Laser Hair Removal At WO/MAN Luxe MedSpa", "The fastest, most powerful diode laser hair removal system. Safe for all skin types, including darker skin tones. Permanent reduction in as few as 4 sessions.", "/primelase-hero.webp", "Book Consultation"),
      textBlock("Laser Hair Removal That Actually Works", "Tired of shaving, waxing, and plucking? Primelase delivers permanent hair reduction with minimal discomfort and zero downtime.", "#fff"),
      benefitsBlock("Why Clients Choose Primelase", [
        { title: "Permanent Hair Reduction", text: "Significant, long-lasting reduction in hair growth" },
        { title: "All Skin Types Safe", text: "Advanced technology safe for light to dark skin tones" },
        { title: "Fast Treatment Sessions", text: "Large areas treated quickly with advanced diode technology" },
        { title: "Minimal Discomfort", text: "Built-in cooling system for a comfortable experience" },
        { title: "No Downtime", text: "Return to daily activities immediately" },
        { title: "Cost-Effective", text: "Long-term savings compared to lifetime waxing costs" },
      ]),
      textBlock("How Primelase Works", "Primelase uses advanced diode laser technology to target the melanin in hair follicles, disrupting the growth cycle for permanent reduction.", "#ECEDEE"),
      textBlock("Ideal For Clients Who Want", "Permanent hair reduction, smooth skin without maintenance, freedom from shaving and waxing, safe treatment for all skin types.", "#CFD2D8"),
      galleryBlock("Real Transformations"),
      reviewsBlock("Primelase Client Experiences"),
      faqBlock("Primelase Frequently Asked Questions", [
        { q: "How many sessions will I need?", a: "Most clients achieve optimal results with 4-8 sessions, spaced several weeks apart. Your provider will design a personalized plan." },
        { q: "Is it painful?", a: "Most clients describe a mild snapping sensation. The built-in cooling system minimizes discomfort." },
        { q: "Is it safe for darker skin?", a: "Yes. Primelase is one of the safest laser hair removal systems for all skin types, including darker tones." },
        { q: "When will I see results?", a: "Most clients notice significant hair reduction after the first few sessions, with continued improvement over time." },
        { q: "Can it treat large areas?", a: "Yes. Primelase's large spot size allows fast treatment of large areas like legs, back, and chest." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 17. REVIEWS ==========
  {
    slug: "reviews", title: "Client Reviews",
    seo_title: "Client Reviews | WO/MAN Luxe MedSpa",
    seo_description: "Read what our clients say about their experiences at WO/MAN Luxe MedSpa.",
    blocks: [
      hero("Client Reviews at WO/MAN Luxe MedSpa", "See what our clients are saying about their experiences with our treatments and team", "/reviews-bg.webp", "Book Consultation", "View Before & After"),
      reviewsBlock("Filter by Your Area of Interest"),
      consultationBlock(),
    ],
  },

  // ========== 18. SKIN REJUVENATION ==========
  {
    slug: "skin-rejuvenation", title: "Skin Rejuvenation & Resurfacing",
    seo_title: "Skin Rejuvenation & Resurfacing | WO/MAN Luxe MedSpa",
    seo_description: "Six clinically distinct technologies for skin refinement. Zero compromises on safety or luxury.",
    blocks: [
      hero("Skin Rejuvenation & Resurfacing At WO/MAN Luxe MedSpa", "Six clinically distinct technologies. One elevated standard of skin refinement. Zero compromises on safety, luxury, or the quality of your skin", "/skin-rejuvenation-hero.webp", "Book Consultation", "Explore Treatments"),
      cardsBlock("Six Technologies. Every Layer Of Skin Transformation", [
        { title: "SylfirmX RF Microneedling", text: "RF microneedling for collagen stimulation, texture improvement, and skin tightening" },
        { title: "Xerf", text: "XERF delivers thermal energy precisely into shallow, middle, and deep layers of your skin" },
        { title: "AcuPulse CO2 Laser", text: "Ablative fractional CO2 laser - the gold standard for dramatic resurfacing and deep wrinkle reduction" },
        { title: "HydraFacial Syndeo", text: "Deep cleansing, gentle extraction, and intensive hydration in a single 30-minute treatment" },
        { title: "Aerolase Neo", text: "Single-platform solution for acne, pigmentation, redness, and collagen stimulation" },
        { title: "Candela Matrix", text: "Next-generation RF skin renewal for collagen remodeling and texture improvement" },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 19. SYLFIRMX ==========
  {
    slug: "sylfirmx", title: "SylfirmX RF Microneedling",
    seo_title: "SylfirmX RF Microneedling | WO/MAN Luxe MedSpa",
    seo_description: "Advanced RF microneedling for collagen stimulation, pigmentation, and skin tightening.",
    blocks: [
      hero("SylfirmX RF Microneedling For Skin Renewal & Tightening", "Advanced RF microneedling designed to stimulate collagen, improve texture, reduce pigmentation, and support skin tightening with minimal downtime", "/sylfirmx-hero.webp", "Book Consultation", "View Before & After"),
      textBlock("Your Skin Changes Over Time", "Collagen production slows, texture becomes uneven, fine lines appear, pigmentation develops. SylfirmX combines RF energy with microneedling for comprehensive skin renewal.", "#fff"),
      benefitsBlock("Advanced RF Microneedling Results", [
        { title: "Collagen Stimulation", text: "Deep RF energy triggers natural collagen production" },
        { title: "Pigmentation Reduction", text: "Targets melasma, sun spots, and uneven tone" },
        { title: "Skin Tightening", text: "Supports firmer, more youthful-looking skin" },
        { title: "Texture Improvement", text: "Refines pores, smooths rough texture" },
        { title: "Acne Scar Treatment", text: "Helps improve appearance of acne scars" },
        { title: "Minimal Downtime", text: "Return to activities quickly with manageable recovery" },
      ]),
      textBlock("How SylfirmX Works", "SylfirmX combines pulsed wave and continuous wave RF microneedling to target both pigmentation and skin structure at multiple depths.", "#ECEDEE"),
      textBlock("Ideal For Clients Who Want", "Pigmentation improvement, skin tightening, texture refinement, acne scar treatment, collagen stimulation.", "#CFD2D8"),
      galleryBlock("Real Transformations"),
      reviewsBlock("SylfirmX Client Experiences"),
      faqBlock("SylfirmX Frequently Asked Questions", [
        { q: "Is SylfirmX painful?", a: "Most clients describe mild discomfort. Topical numbing is applied beforehand to ensure comfort." },
        { q: "How many sessions are recommended?", a: "Most clients achieve optimal results with 3-4 sessions spaced 4-6 weeks apart." },
        { q: "When will I see results?", a: "Results develop gradually as collagen remodels. Most clients notice improvements within weeks." },
        { q: "Is there downtime?", a: "Minimal downtime. Most clients return to activities within 1-3 days." },
        { q: "Can SylfirmX treat pigmentation?", a: "Yes. SylfirmX is particularly effective for melasma, sun spots, and other pigmentation concerns." },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 20. WELLNESS ==========
  {
    slug: "wellness", title: "Wellness Treatments",
    seo_title: "Wellness & Feminine Health | WO/MAN Luxe MedSpa",
    seo_description: "Three advanced technologies for pelvic floor strength, vaginal health, and feminine confidence.",
    blocks: [
      hero("Wellness At WO/MAN Luxe MedSpa Hallandale Beach", "Three advanced, non-surgical technologies. One deeply personalized plan for pelvic floor strength, internal vaginal health, external intimate aesthetics, and total feminine confidence", "/wellness-hero.webp", "Book Consultation", "Explore Treatments"),
      cardsBlock("Precision Technologies. Every Dimension Of Your Confidence", [
        { title: "Emsella for Man and Woman", text: "Stimulates thousands of supramaximal pelvic floor contractions in a single 28-minute session - painless, non-invasive, and powerful" },
        { title: "Emfemme", text: "Gently heats tissue to stimulate collagen, improve circulation, and restore tightness and sensitivity" },
        { title: "Femtouch", text: "Fractional CO2 laser for internal vaginal health. Restores moisture, improves tone, and reduces mild stress incontinence" },
      ]),
      consultationBlock(),
    ],
  },

  // ========== 21. XERF ==========
  {
    slug: "xerf", title: "XERF RF Skin Tightening",
    seo_title: "XERF RF Skin Tightening - Without Surgery | WO/MAN Luxe MedSpa",
    seo_description: "Newest RF technology for firmer jawline, tighter neck, smoother skin. No needles, no downtime.",
    blocks: [
      hero("Lift & Tighten Loose Skin - Without Surgery or Downtime", "Restore a firmer jawline, tighter neck, and smoother skin with the newest RF technology. Comfortable treatment. No needles. No downtime.", "/xerf-hero.webp", "Claim $100 Consultation", "Before & After"),
      textBlock("Your Skin Changes Over Time", "You may have tried creams, serums, even traditional RF treatments. Yet still notice skin that feels looser, less resilient, jawline definition softening, fine lines settling into your lower face and neck.", "#fff"),
      benefitsBlock("XERF: Results Without Sacrifice", [
        { title: "No Needles, No Numbing, No Downtime", text: "Walk in, receive a comfortable treatment, and return to your life immediately" },
        { title: "Multifrequency RF", text: "Two frequencies working together reach shallow, middle, and deep dermal layers" },
        { title: "Fully Personalized To Your Skin", text: "Real-time impedance analysis tailors energy delivery to your skin" },
        { title: "Comfortable Never-Numb Experience", text: "Wave Fit Pulse and ICD cooling keep skin comfortable and protected" },
        { title: "Visible, Progressive Tightening", text: "Collagen remodeling occurs over weeks and months post-treatment" },
        { title: "Short Treatment Time", text: "Sessions typically last 15 to 30 minutes" },
      ]),
      textBlock("How XERF Structural Skin Tightening Works", "XERF is the world's first monopolar RF device to combine 6.78 MHz and 2 MHz frequencies in one handpiece. This dual-frequency approach is the key to its depth versatility.", "#F7F1E7"),
      textBlock("Which Areas Can XERF Treat?", "Eye area and forehead, arms, thighs and knees, neck/lower face/jawline, buttocks.", "#CFD2D8"),
      textBlock("What Results Can You Expect After XERF?", "Skin and jawline look tighter, fine lines and texture improvement, results gradually become clearer over 1 to 6 months.", "#fff"),
      textBlock("Who Is XERF Suitable For?", "Mild to moderate skin laxity, want to tighten jawline/cheeks/neck, want skin-quality and fine-line support, concerned about pain, want non-surgical option.", "#CFD2D8"),
      galleryBlock("Structural Tightening, Naturally Delivered"),
      reviewsBlock("Real XERF Client Experience"),
      faqBlock("XERF Questions Clients Often Ask", [
        { q: "Does XERF hurt?", a: "XERF is designed to be comfortable. Wave Fit Pulse creates a stable, balanced thermal profile, and the ICD cryogen cooling keeps the skin protected throughout." },
        { q: "How many sessions are needed?", a: "Most clients achieve optimal results with a series of sessions. Your provider will design a personalized treatment plan." },
        { q: "When will I see results?", a: "Some clients feel mild tightness immediately, but clearer visible change usually develops over 1 to 6 months." },
        { q: "Is there downtime?", a: "No. XERF is a non-invasive treatment with minimal to no downtime. Most clients return to daily activities immediately." },
        { q: "Can XERF be combined with other treatments?", a: "Yes. XERF can safely complement other treatments. Your provider will tailor a plan to your individual needs." },
        { q: "Is XERF safe for all skin types?", a: "XERF uses intelligent impedance monitoring that helps personalize energy delivery, making it suitable across multiple skin types." },
      ]),
      consultationBlock(),
    ],
  },
];

async function seed() {
  console.log("Connecting to PostgreSQL...");
  const sql = postgres(process.env.DATABASE_URL || "postgresql://postgres@localhost:5432/womanmedspa", { max: 5 });

  // Ensure tables exist
  await sql`CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL DEFAULT '',
    seo_title TEXT NOT NULL DEFAULT '', seo_description TEXT NOT NULL DEFAULT '',
    published INTEGER NOT NULL DEFAULT 1, is_home INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS page_blocks (
    id SERIAL PRIMARY KEY, page_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    type TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0, content JSONB NOT NULL DEFAULT '{}'
  )`;
  await sql`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT ''
  )`;

  let created = 0;
  let skipped = 0;

  for (const page of PAGES) {
    const existing = await sql`SELECT id FROM pages WHERE slug = ${page.slug}`;
    if (existing.length > 0) {
      console.log(`  Skip (exists): ${page.slug}`);
      skipped++;
      continue;
    }

    const pageId = await sql`
      INSERT INTO pages (slug, title, seo_title, seo_description, published, is_home)
      VALUES (${page.slug}, ${page.title}, ${page.seo_title}, ${page.seo_description}, 1, 0)
      RETURNING id
    `.then((r) => r[0].id);

    // Insert blocks
    if (page.blocks.length > 0) {
      const values: (string | number)[] = [];
      const placeholders: string[] = [];
      page.blocks.forEach((b, i) => {
        const offset = i * 4;
        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}::jsonb)`);
        values.push(pageId, b.type, i, JSON.stringify(b.content));
      });
      await sql.unsafe(
        `INSERT INTO page_blocks (page_id, type, sort_order, content) VALUES ${placeholders.join(", ")}`,
        values
      );
    }

    console.log(`  Created: ${page.slug} (${page.blocks.length} blocks)`);
    created++;
  }

  await sql.end();
  console.log(`\nDone: ${created} created, ${skipped} skipped`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
