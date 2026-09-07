"use client";

import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Layout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        boxSizing: "border-box",
        px: 2,
        py: { xs: 2, sm: 6 },
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "-18%",
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${alpha(
            theme.palette.primary.main,
            0.2,
          )}, transparent)`,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          p: { xs: 3, sm: 4.5 },
        }}
      >
        <Stack spacing={0.75} sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700 }}
            color="text.primary"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>

        <Stack spacing={3}>{children}</Stack>

        {footer && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {footer}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
