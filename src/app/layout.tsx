import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { BookingModalProvider } from "@/components/BookingModalProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Woman Med Spa",
  description: "Woman Med Spa",
};

import EnvLogger from "@/components/EnvLogger";
import { getSetting } from "@/lib/db";
import { GlobalDataProvider } from "@/components/GlobalDataProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialReviews = [];
  let initialGallery = [];
  let initialConsultation = {};
  try {
    const revStr = await getSetting("global_reviews");
    if (revStr) initialReviews = JSON.parse(revStr);
    const galStr = await getSetting("global_gallery");
    if (galStr) initialGallery = JSON.parse(galStr);
    const consStr = await getSetting("global_consultation");
    if (consStr) initialConsultation = JSON.parse(consStr);
  } catch (e) {
    console.error("Failed to fetch global data:", e);
  }

  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-manrope">
        <EnvLogger />
        <GlobalDataProvider initialReviews={initialReviews} initialGallery={initialGallery} initialConsultation={initialConsultation}>
          <LanguageProvider>
            <BookingModalProvider>{children}</BookingModalProvider>
          </LanguageProvider>
        </GlobalDataProvider>
      </body>
    </html>
  );
}
