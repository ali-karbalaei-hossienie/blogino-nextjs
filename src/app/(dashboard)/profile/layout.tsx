"use client";

import { Box, Toolbar } from "@mui/material";
import React from "react";
import Panel from "./components/Panel";

export const DRAWER_WIDTH = 260;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Panel />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          marginRight: { md: `${DRAWER_WIDTH}px` },
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
