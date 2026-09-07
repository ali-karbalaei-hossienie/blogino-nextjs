// src/app/layout.tsx
import type { Metadata } from "next";
import ThemeRegistry from "../components/ThemeRegistry";
import vazirFont from "@/constants/localFont";
import Header from "@/components/Header";
import { CssBaseline } from "@mui/material";

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
        <ThemeRegistry>
          <Header />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
