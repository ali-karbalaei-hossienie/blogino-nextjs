import Header from "@/components/Header";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Box>{children}</Box>
    </>
  );
}
