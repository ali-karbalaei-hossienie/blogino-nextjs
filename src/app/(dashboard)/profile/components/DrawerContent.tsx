"use client";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  HomeOutlined as HomeIcon,
  LogoutOutlined as LogoutIcon,
} from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import { MenuItemsType } from "./Panel";
const DrawerContent = ({
  menuItems,
  setMobileOpen,
}: {
  menuItems: MenuItemsType[];
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const pathname = usePathname();
  const handleLogout = () => {
    // منطق خروج از حساب (پاک کردن کوکی/توکن و ریدایرکت)
    router.push("/auth/login");
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* هدر سایدبار */}
      <Toolbar sx={{ px: 2.5 }}>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          بلاگینو
        </Typography>
      </Toolbar>
      <Divider />

      {/* منوهای اصلی سایدبار */}
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "action.selected" : "transparent",
                  color: isActive ? "primary.main" : "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ px: 1.5, pb: 2 }}>
        <Divider sx={{ mb: 1.5 }} />
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href="/"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="مشاهده سایت"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* دکمه خروج */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.lighter",
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="خروج از حساب"
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default DrawerContent;
