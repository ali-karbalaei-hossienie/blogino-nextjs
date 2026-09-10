"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, ListItemButton } from "@mui/material";
import { ReactNode } from "react";

interface CategoryLinkProps {
  href: string;
  children: ReactNode;
  exact?: boolean;
}

export default function CategoryLink({
  href,
  children,
  exact,
}: CategoryLinkProps) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <ListItemButton sx={{ padding: 0 }} component={Link} href={href}>
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          backgroundColor: isActive ? "primary.900" : "transparent",
          color: isActive ? "text.primary" : "text.secondary",
        }}
      >
        {children}
      </Box>
    </ListItemButton>
  );
}
