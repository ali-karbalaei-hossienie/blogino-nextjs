"use client";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { toggleColorMode } from "@/features/settingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const navItems = [
  { title: "خانه", href: "/" },
  { title: "مقالات", href: "/blogs" },
];

const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.setting.mode);

  const handleToggleTheme = () => {
    dispatch(toggleColorMode(mode === "dark" ? "light" : "dark"));
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        bgcolor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark"
            ? alpha(theme.palette.secondary[600] || theme.palette.divider, 0.15)
            : alpha(theme.palette.secondary[300] || theme.palette.divider, 0.5)
        }`,
        zIndex: theme.zIndex.appBar,
      })}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: 74,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={{ xs: 3, md: 5 }}
            sx={{ alignItems: "center" }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <Box
                sx={(theme) => ({
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.45)}`,
                  transform: "rotate(-6deg)",
                })}
              >
                <Box
                  sx={(theme) => ({
                    width: 14,
                    height: 14,
                    bgcolor: theme.palette.primary.contrastText,
                    borderRadius: "3px",
                    transform: "rotate(45deg)",
                  })}
                />
              </Box>

              <Typography
                variant="h6"
                sx={(theme) => ({
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: theme.palette.text.primary,
                  letterSpacing: "-0.5px",
                })}
              >
                وبلاگ
              </Typography>
            </Link>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Box
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={(theme) => ({
                      position: "relative",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      py: 1.5,
                      transition: theme.transitions.create("color", {
                        duration: theme.transitions.duration.shorter,
                      }),
                      "&:hover": {
                        color: theme.palette.text.primary,
                      },
                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "2.5px",
                            bgcolor: theme.palette.primary.main,
                            borderRadius: "4px",
                            boxShadow: `0 0 10px ${alpha(
                              theme.palette.primary.main,
                              0.6,
                            )}`,
                          }
                        : undefined,
                    })}
                  >
                    {item.title}
                  </Box>
                );
              })}
            </Box>
          </Stack>

          <IconButton
            onClick={handleToggleTheme}
            aria-label="تغییر تم"
            sx={(theme) => ({
              width: 42,
              height: 42,
              borderRadius: "12px",
              bgcolor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.secondary[500] || "#fff", 0.08)
                  : alpha(theme.palette.secondary[500] || "#000", 0.06),
              border: "1px solid",
              borderColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.secondary[400] || "#fff", 0.15)
                  : alpha(theme.palette.secondary[400] || "#000", 0.12),
              color: theme.palette.secondary.main,
              transition: theme.transitions.create(
                ["background-color", "color", "transform", "border-color"],
                { duration: theme.transitions.duration.shorter },
              ),
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.12)
                    : alpha(theme.palette.primary.main, 0.08),
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                transform: "scale(1.05)",
              },
            })}
          >
            {mode === "dark" ? (
              <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
