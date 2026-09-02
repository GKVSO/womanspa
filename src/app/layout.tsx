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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-manrope">
        <LanguageProvider>
          <BookingModalProvider>{children}</BookingModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
