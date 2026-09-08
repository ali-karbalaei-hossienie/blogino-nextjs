import { BlogPost } from "@/app/types";
import { AccessTimeRounded } from "@mui/icons-material";

import { Avatar, Stack, Typography } from "@mui/material";

const Author = ({ post }: { post: BlogPost }) => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          mb: 1.5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Author */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={post.author.avatarUrl}
            alt={post.author.name}
            sx={{
              width: 28,
              height: 28,
              border: 1,
              borderColor: "secondary.300",
            }}
          />

          <Typography
            sx={{
              fontSize: 12,
              color: "secondary.500",
              whiteSpace: "nowrap",
            }}
          >
            {post.author.name}
          </Typography>
        </Stack>

        {/* Reading time */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            color: "secondary.400",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
            }}
          >
            خواندن: {post.readingTime} دقیقه
          </Typography>

          <AccessTimeRounded
            sx={{
              fontSize: 16,
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Author;
