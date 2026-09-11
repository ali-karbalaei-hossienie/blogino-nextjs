import { Grid } from "@mui/material";
import PostCard from "./components/Posts/PostCard";
import setCookiesOnReq from "@/utils/setCookiesOnRequest";
import { cookies } from "next/headers";
import PostFilter from "./components/PostFilter/PostFilter";
import { BlogPost } from "@/app/types";
import PaginationControl from "./components/Posts/PaginationControl";

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const resolvedSearchParams = await searchParams;

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";
  const sort =
    typeof resolvedSearchParams.sort === "string"
      ? resolvedSearchParams.sort
      : "";
  const page = Number(resolvedSearchParams.page) || 1;

  let posts: BlogPost[] = [];
  let totalPages = 1;

  try {
    const cookieStore = await cookies();
    const options = setCookiesOnReq(cookieStore);

    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (sort) queryParams.set("sort", sort);
    queryParams.set("page", page.toString());

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
    totalPages = response.data.totalPages || 1;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <div>خطا در دریافت دیتاها</div>;
  }

  return (
    <Grid container spacing={2}>
      <PostFilter />

      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <Grid size={{ xs: 12 }}>
          <div>هیچ پستی یافت نشد.</div>
        </Grid>
      )}

      {/* کامپوننت صفحه‌بندی */}
      <Grid size={{ xs: 12 }}>
        <PaginationControl totalPages={totalPages} currentPage={page} />
      </Grid>
    </Grid>
  );
};

export default BlogPage;
