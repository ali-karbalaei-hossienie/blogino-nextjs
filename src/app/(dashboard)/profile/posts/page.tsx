import { Box } from "@mui/material";
import { Suspense } from "react";
import LatestPosts from "../_/components/LatestPosts";
import LatestPostsSkeleton from "../_/components/LatestPostsSkeleton";
import { PostListHeader } from "./[postId]/components/PostListHeader";

const page = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PostListHeader />
      </Box>
      <Suspense fallback={<LatestPostsSkeleton />}>
        <LatestPosts />
      </Suspense>
    </>
  );
};

export default page;
