import { CircularProgress, Container, Grid } from "@mui/material";
import { Suspense } from "react";
import CategoryList from "../components/Category/CategoryList";

export const metadata = {
  title: "بلاگ ها",
  description: "Blogs",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Suspense fallback={<CircularProgress size={30} />}>
            <CategoryList />
          </Suspense>
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>{children}</Grid>
      </Grid>
    </Container>
  );
}
