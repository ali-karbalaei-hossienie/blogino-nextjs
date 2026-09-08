import { Grid } from "@mui/material";
import { BlogPost } from "../../types";
import PostCard from "./components/Posts/PostCard";
import setCookiesOnReq from "@/utils/setCookiesOnRequest";
import { cookies } from "next/headers";

const BlogPage = async () => {
  let posts: BlogPost[] = [];

  try {
    const cookieStore = await cookies();
    const options = setCookiesOnReq(cookieStore);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/list`,
      options,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const response = await res.json();

    posts = response.data.posts;
  } catch (error) {
    console.error("Error fetching categories:", error);

    return <div>خطا در دیافت دیتاها</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Grid>
    </>
  );
};

export default BlogPage;
