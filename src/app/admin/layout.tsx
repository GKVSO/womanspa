import type { Metadata } from "next";
import { AdminUIProvider } from "@/components/cms/AdminUIProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "WO/MAN Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AdminUIProvider>
        <div className="min-h-screen admin-body">{children}</div>
      </AdminUIProvider>
    </LanguageProvider>
  );
}
