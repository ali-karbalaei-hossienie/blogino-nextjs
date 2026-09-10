import { Box, Typography } from "@mui/material";
import { Suspense } from "react";
import CardWrapper from "./_/components/CardWrapper";
import CardsSkeleton from "./_/components/CardsSkeleton";

const Profile = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 3,
          fontSize: "1.25rem",
          color: "#e2e8f0",
        }}
      >
        داشبورد
      </Typography>
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
    </Box>
  );
};

export default Profile;
