import Image from "next/image";
import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import type { BlogPost } from "@/app/types";
import Author from "./Author";
import PostAction from "./PostAction";

interface BlogCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: BlogCardProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
      <Card
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "secondary.200",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        {/* Cover */}
        <Link
          href={`/blogs/${post.slug}`}
          style={{
            display: "block",
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              position: "relative",
              mx: 1,
              mt: 1,
              borderRadius: 1.5,
              overflow: "hidden",
              aspectRatio: 16 / 9,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        </Link>

        <CardContent
          sx={{
            mx: 1,
            mb: 1,
            mt: 1,
            borderRadius: 1.5,
            p: "12px !important",
          }}
        >
          {/* Title */}
          <Link
            href={`/blogs/${post.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "secondary.900",
                mb: 1.5,

                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",

                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {post.title}
            </Typography>
          </Link>

          {/* Author + Reading time */}
          <Author post={post} />

          {/* Actions */}
          <PostAction post={post} />
        </CardContent>
      </Card>
    </Grid>
  );
}
