"use client";

import { BlogPost } from "@/app/types";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface RelatedPostsProps {
  posts?: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <Box sx={{ mt: { xs: 5, md: 7 } }}>
      <Stack direction="row" spacing={1} sx={{ mb: 3, alignItems: "center" }}>
        <AutoAwesomeOutlinedIcon color="primary" sx={{ fontSize: 24 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: { xs: 18, md: 20 },
            color: "text.primary",
          }}
        >
          پست‌های مرتبط
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 2.5,
        }}
      >
        {posts.map((item) => (
          <Card
            key={item._id || item.id}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.25s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
                borderColor: "primary.light",
              },
            }}
          >
            <CardActionArea
              component={Link}
              href={`/blogs/${item.slug}`}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  pt: "56.25%",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.coverImageUrl || "/images/placeholder.jpg"}
                  alt={item.title}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {item.category?.title && (
                  <Chip
                    label={item.category.title}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backdropFilter: "blur(8px)",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <Stack spacing={1.5} sx={{ p: 2, flexGrow: 1, width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "44px",
                  }}
                >
                  {item.title}
                </Typography>

                {item.author && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: "auto", pt: 1, alignItems: "center" }}
                  >
                    <Avatar
                      src={item.author.avatarUrl}
                      alt={item.author.name}
                      sx={{ width: 22, height: 22, fontSize: 11 }}
                    >
                      {item.author.name?.charAt(0)}
                    </Avatar>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {item.author.name}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
