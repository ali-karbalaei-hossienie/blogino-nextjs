import { Box, Typography } from "@mui/material";
import { Suspense } from "react";
import CardWrapper from "./_/components/CardWrapper";
import CardsSkeleton from "./_/components/CardsSkeleton";
import LatestPosts from "./_/components/LatestPosts";
import LatestPostsSkeleton from "./_/components/LatestPostsSkeleton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "پروفایل",
};
const Profile = () => {
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
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
      <div>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 3,
            mt: 3,
            fontSize: "1.25rem",
            color: "#e2e8f0",
          }}
        >
          آخرین پست ها
        </Typography>
        <Suspense fallback={<LatestPostsSkeleton />}>
          <LatestPosts />
        </Suspense>
      </div>
    </Box>
  );
};

export default Profile;
