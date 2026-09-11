import { Box } from "@mui/material";
import { Suspense } from "react";
import LatestPosts from "../_/components/LatestPosts";
import LatestPostsSkeleton from "../_/components/LatestPostsSkeleton";
import { PostListHeader } from "./[postId]/components/PostListHeader";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/utils/setCookiesOnRequest";
import { BlogPost } from "@/app/types";
interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const page = async ({ searchParams }: BlogPageProps) => {
  const resolvedSearchParams = await searchParams;
  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";
  const sort =
    typeof resolvedSearchParams.sort === "string"
      ? resolvedSearchParams.sort
      : "";

  let posts: BlogPost[] = [];

  try {
    const cookieStore = await cookies();
    const options = setCookiesOnReq(cookieStore);

    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (sort) queryParams.set("sort", sort);

    const queryString = queryParams.toString();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/post/list${
      queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, {
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const response = await res.json();
    posts = response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <div>خطا در دریافت دیتاها</div>;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PostListHeader />
      </Box>
      {/* <Suspense fallback={<LatestPostsSkeleton />}> */}
      <LatestPosts posts={posts} />
      {/* </Suspense> */}
    </>
  );
};

export default page;
