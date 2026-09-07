import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Box, Button, Container, Stack, Typography } from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { BlogPost } from "@/app/types";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import PostActions from "./components/PostActions";
import ArticleContent from "./components/ArticleContent";

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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/post/slug/${postSlug}`,
    {
      cache: "no-store",
    },
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
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: 1,
                borderColor: "secondary.100",
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 82,
                    height: 82,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: 3,
                    borderColor: "secondary.200",
                  }}
                >
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    fill
                    sizes="82px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                {post.author.name}
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "text.secondary",
                  mb: 2.5,
                }}
              >
                نویسنده و توسعه‌دهنده
              </Typography>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 13,
                  lineHeight: 2.1,
                  color: "text.secondary",
                  mb: 2.5,
                }}
              >
                علاقه‌مند به تکنولوژی، برنامه‌نویسی و فریلنسری. در اینجا
                تجربه‌ها و دانسته‌هایم را به اشتراک می‌گذارم.
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<PersonOutlineOutlinedIcon />}
                sx={{
                  height: 46,
                  borderRadius: 2,
                  color: "primary.400",
                  borderColor: "primary.900",
                  backgroundColor: "primary.50",

                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "primary.100",
                  },
                }}
              >
                مشاهده پروفایل
              </Button>
            </Box>

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
                <MenuBookOutlinedIcon
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

interface StatRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  last?: boolean;
}

const StatRow = ({ icon, title, value, last = false }: StatRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.7,
        borderBottom: last ? 0 : 1,
        borderColor: "secondary.100",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            color: "primary.400",

            "& svg": {
              fontSize: 19,
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default PostPage;
