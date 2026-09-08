import { Grid } from "@mui/material";
import setCookiesOnReq from "@/utils/setCookiesOnRequest";
import { cookies } from "next/headers";
import { BlogPost } from "@/app/types";
import PostCard from "../../components/Posts/PostCard";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categorySlug } = await params;

  let posts: BlogPost[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/list?categorySlug=${encodeURIComponent(
        categorySlug,
      )}`,
    );

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
    <Grid container spacing={2}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Grid>
  );
};

export default CategoryPage;
