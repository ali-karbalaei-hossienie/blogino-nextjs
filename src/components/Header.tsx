"use client";

import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navItems = [
  { title: "خانه", href: "/" },
  { title: "بلاگ ها", href: "/blogs" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 4, alignItems: "center" }}
            >
              {navItems.map((item) => (
                <Typography
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    textDecoration: "none",
                    color:
                      pathname === item.href
                        ? "primary.main"
                        : "text.secondary",
                    fontWeight: pathname === item.href ? 600 : 400,
                    fontSize: "0.95rem",
                    transition: "color 0.2s",
                    "&:hover": {
                      color:
                        pathname === item.href
                          ? "primary.main"
                          : "text.primary",
                    },
                  }}
                >
                  {item.title}
                </Typography>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
