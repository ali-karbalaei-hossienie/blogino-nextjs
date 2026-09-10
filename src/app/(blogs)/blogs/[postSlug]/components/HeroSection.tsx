import Image from "next/image";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import { BlogPost } from "@/app/types";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

const formattedDate = (post: BlogPost) => {
  const formatted = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.createdAt));
  return formatted;
};

const HeroSection = ({ post }: { post: BlogPost }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        },
        gap: {
          xs: 3,
          md: 4,
        },
        alignItems: "center",
        mb: 3,
      }}
    >
      {/* Cover */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: 3,
          border: 1,
          borderColor: "secondary.100",
          backgroundColor: "background.paper",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
          style={{
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.25), transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Header */}
      <Box>
        {/* Category */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            height: 40,
            px: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.700",
            backgroundColor: "secondary.200",
            color: "primary.300",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <CodeRoundedIcon
            sx={{
              fontSize: 20,
            }}
          />

          <Typography
            component="span"
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "inherit",
            }}
          >
            {post.category.title || "برنامه‌نویسی"}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: 30,
              sm: 38,
              md: 46,
            },
            fontWeight: 900,
            lineHeight: 1.5,
            color: "text.primary",
            mb: 1.5,
          }}
        >
          {post.title}
        </Typography>

        {/* Brief */}
        <Typography
          sx={{
            fontSize: {
              xs: 16,
              md: 18,
            },
            lineHeight: 2,
            color: "text.secondary",
            mb: 3,
          }}
        >
          {post.briefText}
        </Typography>

        {/* Meta */}
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Author */}
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                position: "relative",
                width: 42,
                height: 42,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: 2,
                borderColor: "secondary.200",
              }}
            >
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                fill
                sizes="42px"
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {post.author.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "text.secondary",
                }}
              >
                نویسنده
              </Typography>
            </Box>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          />

          {/* Reading time */}
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.7}>
            <AccessTimeOutlinedIcon
              sx={{
                fontSize: 18,
                color: "primary.400",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              {post.readingTime} دقیقه مطالعه
            </Typography>
          </Stack>

          {/* Date */}
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.7}>
            <CalendarMonthOutlinedIcon
              sx={{
                fontSize: 18,
                color: "primary.400",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              {formattedDate(post)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;
