// src/app/layout.tsx
import vazirFont from "@/constants/localFont";
import AuthProvider from "@/context/AuthContext";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import ThemeRegistry from "../components/ThemeRegistry";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | بلاگینو",
    default: "بلاگینو",
  },
  description: "اپلیکیشن مدیریت بلاگ",
  keywords: ["اپلیکیشن بلاگ", "مدیریت بلاگ", "بلاگ"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <StoreProvider>
          <AuthProvider>
            <ThemeRegistry>
              <Toaster richColors position="top-center" />
              {children}
            </ThemeRegistry>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
