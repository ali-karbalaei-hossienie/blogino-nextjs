"use client";

import { useAppSelector } from "@/lib/hooks";
import { getAppTheme } from "@/theme";
import { Theme } from "@emotion/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useAppSelector((state) => state.setting);
  const theme: Theme = getAppTheme(mode);

  return (
    <AppRouterCacheProvider
      options={{
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
