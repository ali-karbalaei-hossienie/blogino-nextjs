import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Box, Container, Stack, Typography } from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { BlogPost } from "@/app/types";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import Link from "next/link";
import ArticleContent from "./components/ArticleContent";
import AuthorCard from "./components/AuthorCard";
import HeroSection from "./components/HeroSection";
import PostActions from "./components/PostActions";
import StatRow from "./components/StatRow";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/utils/setCookiesOnRequest";
import RelatedPosts from "./components/RelatedPost";

interface PostPageProps {
  params: Promise<{
    postSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/slug/${postSlug}`,
  );

  if (!res.ok) {
    return {
      title: "پست پیدا نشد",
      description: "پست مورد نظر پیدا نشد.",
    };
  }

  const response: {
    data: {
      post: BlogPost;
    };
  } = await res.json();

  const post = response.data.post;

  if (!post) {
    return {
      title: "پست پیدا نشد",
      description: "پست مورد نظر پیدا نشد.",
    };
  }

  return {
    title: post.title,
    description: post.briefText,

    openGraph: {
      title: post.title,
      description: post.briefText,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImageUrl,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.briefText,
      images: [post.coverImageUrl],
    },
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { postSlug } = await params;
  const cookieStore = await cookies();
  const options = setCookiesOnReq(cookieStore);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/slug/${postSlug}`,
    options,
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }

  const response = await res.json();

  const post: BlogPost = response.data.post;

  if (!post) {
    notFound();
  }

  return (
    <Box
      sx={{
        py: {
          xs: 2,
          sm: 3,
          md: 5,
        },
        backgroundColor: "background.default",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* =========================================
            Breadcrumb
        ========================================= */}
        <Stack
          direction="row"
          spacing={0.8}
          sx={{
            mb: {
              xs: 2.5,
              md: 3.5,
            },
            flexWrap: "wrap",
            rowGap: 1,
            alignItems: "center",
          }}
        >
          <Link style={{ display: "flex", alignItems: "center" }} href="/">
            <Typography
              sx={{
                fontSize: 13,
                color: "secondary.400",
              }}
            >
              خانه
            </Typography>

            <ArrowBackIosNewRoundedIcon
              sx={{
                fontSize: 12,
                color: "secondary.300",
                transform: "rotate(180deg)",
              }}
            />
          </Link>

          <Link href={"/blogs"}>
            <Typography
              sx={{
                fontSize: 13,
                color: "secondary.400",
              }}
            >
              {post.category?.title}
            </Typography>
          </Link>

          <ArrowBackIosNewRoundedIcon
            sx={{
              fontSize: 12,
              color: "secondary.300",
              transform: "rotate(180deg)",
            }}
          />

          <Typography
            sx={{
              fontSize: 13,
              color: "secondary.700",
            }}
          >
            {post.title}
          </Typography>
        </Stack>

        {/* =========================================
            Main Grid
        ========================================= */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 1fr) 310px",
            },
            gap: {
              xs: 3,
              lg: 4,
            },
            alignItems: "start",
          }}
        >
          {/* =======================================
              Main Article
          ======================================= */}
          <Box>
            {/* =====================================
                Hero
            ===================================== */}
            <HeroSection post={post} />

            {/* =====================================
                Actions
            ===================================== */}
            <PostActions post={post} />

            {/* =====================================
                Article Content
            ===================================== */}
            <ArticleContent post={post} />

            <RelatedPosts posts={post.related} />
          </Box>

          {/* =======================================
              Sidebar
          ======================================= */}
          <Stack
            spacing={3}
            sx={{
              position: {
                xs: "static",
                lg: "sticky",
              },
              top: {
                lg: 24,
              },
            }}
          >
            {/* =====================================
                Author Card
            ===================================== */}
            <AuthorCard post={post} />

            {/* =====================================
                Stats
            ===================================== */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: 1,
                borderColor: "secondary.100",
                backgroundColor: "background.paper",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  mb: 1,
                }}
                spacing={1}
              >
                <StackedBarChartIcon
                  sx={{
                    fontSize: 20,
                    color: "primary.400",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  آمار مقاله
                </Typography>
              </Stack>

              <StatRow
                icon={<VisibilityOutlinedIcon />}
                title="بازدید"
                value="—"
              />

              <StatRow
                icon={<FavoriteBorderIcon />}
                title="لایک"
                value={String(post.likesCount)}
              />

              <StatRow
                icon={<BookmarkBorderIcon />}
                title="ذخیره"
                value={post.isBookmarked ? "1" : "0"}
                last
              />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PostPage;
