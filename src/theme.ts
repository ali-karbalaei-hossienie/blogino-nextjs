// src/theme.ts
"use client";

import { createTheme, type Theme } from "@mui/material/styles";
import vazirFont from "@/constants/localFont";

declare module "@mui/material/styles" {
  interface PaletteColor {
    900?: string;
    800?: string;
    700?: string;
    600?: string;
    500?: string;
    400?: string;
    300?: string;
    200?: string;
    100?: string;
    50?: string;
    0?: string;
  }
  interface SimplePaletteColorOptions {
    900?: string;
    800?: string;
    700?: string;
    600?: string;
    500?: string;
    400?: string;
    300?: string;
    200?: string;
    100?: string;
    50?: string;
    0?: string;
  }
}

export const getAppTheme = (mode: "light" | "dark" = "light") => {
  const isLight = mode === "light";

  return createTheme({
    direction: "rtl",
    typography: {
      fontFamily: vazirFont.style.fontFamily,
    },
    palette: {
      mode,
      background: {
        // very dark navy, matching the page background in the design
        default: isLight ? "rgb(249, 250, 251)" : "rgb(10, 14, 26)",
        // slightly lighter navy for cards / sidebar / header
        paper: isLight ? "#ffffff" : "rgb(19, 26, 41)",
      },
      primary: {
        // blue-violet accent used for the active category pill and the "عضویت" button
        main: "rgb(91, 110, 242)",
        light: "rgb(140, 154, 250)",
        dark: "rgb(60, 78, 219)",
        contrastText: "#ffffff",
        900: "rgb(45, 58, 171)",
        800: "rgb(55, 71, 191)",
        700: "rgb(60, 78, 219)",
        600: "rgb(75, 93, 232)",
        500: "rgb(91, 110, 242)",
        400: "rgb(115, 131, 246)",
        300: "rgb(140, 154, 250)",
        200: "rgb(170, 181, 252)",
        100: "rgb(201, 208, 253)",
        50: "rgb(228, 232, 254)",
      },
      secondary: isLight
        ? {
            main: "rgb(75, 85, 99)",
            light: "rgb(209, 213, 219)",
            dark: "rgb(17, 24, 39)",
            contrastText: "#ffffff",
            900: "rgb(17, 24, 39)",
            800: "rgb(31, 41, 55)",
            700: "rgb(55, 65, 81)",
            600: "rgb(75, 85, 99)",
            500: "rgb(107, 114, 128)",
            400: "rgb(156, 163, 175)",
            300: "rgb(209, 213, 219)",
            200: "rgb(229, 231, 235)",
            100: "rgb(243, 244, 246)",
            50: "rgb(249, 250, 251)",
            0: "rgb(255, 255, 255)",
          }
        : {
            // muted blue-grey used for secondary text / icons on the dark cards
            main: "rgb(148, 163, 184)",
            light: "rgb(226, 232, 240)",
            dark: "rgb(51, 65, 85)",
            contrastText: "#0f172a",
            900: "rgb(241, 245, 249)",
            800: "rgb(226, 232, 240)",
            700: "rgb(203, 213, 225)",
            600: "rgb(148, 163, 184)",
            500: "rgb(100, 116, 139)",
            400: "rgb(71, 85, 105)",
            300: "rgb(51, 65, 85)",
            200: "rgb(30, 41, 59)",
            100: "rgb(24, 33, 47)",
            50: "rgb(19, 26, 41)",
            0: "rgb(10, 14, 26)",
          },
      success: {
        main: "rgb(0, 192, 115)",
      },
      warning: {
        main: "rgb(255, 153, 0)",
      },
      error: {
        // matches the pink/red heart (like) icon in the design
        main: "rgb(236, 72, 106)",
        light: "rgb(248, 113, 141)",
        dark: "rgb(190, 45, 78)",

        900: "rgb(127, 29, 45)",
        800: "rgb(153, 27, 53)",
        700: "rgb(185, 28, 65)",
        600: "rgb(190, 45, 78)",
        500: "rgb(236, 72, 106)",
        400: "rgb(248, 113, 141)",
        300: "rgb(252, 165, 178)",
        200: "rgb(254, 202, 210)",
        100: "rgb(254, 226, 231)",
        50: "rgb(254, 242, 244)",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${
                isLight ? "#ffffff" : "rgb(19, 26, 41)"
              } inset`,
              WebkitTextFillColor: isLight ? "rgb(19, 26, 41)" : "#ffffff",
              caretColor: "inherit",
            },
          },
        },
      },
    },
  });
};

const theme: Theme = getAppTheme("dark");
export default theme;
