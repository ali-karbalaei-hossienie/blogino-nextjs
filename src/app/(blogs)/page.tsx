import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه |  بلاگینو ",
};
export default function HomePage() {
  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          textAlign: "center",
          mt: 8,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            letterSpacing: "-0.5px",
            fontWeight: 700,
            color: "primary.contrastText",
          }}
        >
          اپلیکیشن مدیریت بلاگ
        </Typography>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", mb: 1, color: "secondary.500" }}
          >
            جایی که قراره بتونی یه اپلیکیشن بلاگ کامل رو مدیریت کنی!
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", color: "secondary.500" }}
          >
            بتونی بلاگ بسازی - کامنت بگذاری و در پنلت همه اتفاقات رو رصد کنی!
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "8px",
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              color: "secondary.500",
            }}
          >
            مطالعه بلاگ ها
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "8px",
              px: 4,
              py: 1.2,
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            مدیریت بلاگ ها
          </Button>
        </Stack>
      </Container>
    </>
  );
}
