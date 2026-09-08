import { BlogPost } from "@/app/types";
import {
  BookmarkBorderRounded,
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
} from "@mui/icons-material";

import { IconButton, Stack, Typography } from "@mui/material";

const PostAction = ({ post }: { post: BlogPost }) => {
  return (
    <>
      <Stack
        direction="row"
        sx={{
          gap: 2,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* Comments */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            bgcolor: "secondary.300",
            borderRadius: 1,
            height: 29,
            color: "secondary.600",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "secondary.500",
              "& .comment-icon, & .comment-count": {
                color: "secondary.contrastText",
              },
            },
          }}
        >
          <IconButton
            className="comment-icon"
            disableRipple
            size="small"
            sx={{
              width: 29,
              height: 29,
              color: "secondary.600",
            }}
          >
            <ChatBubbleOutlineRounded fontSize="small" />
          </IconButton>
          <Typography
            className="comment-count"
            sx={{
              fontSize: 11,
              pr: 0.5,
            }}
          >
            {post.commentsCount}
          </Typography>
        </Stack>
        {/* Like */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            bgcolor: "error.50",
            borderRadius: 1,
            height: 29,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "error.main",

              "& .like-icon, & .like-count": {
                color: "primary.contrastText",
              },
            },
          }}
        >
          <IconButton
            className="like-icon"
            size="small"
            sx={{
              width: 29,
              height: 29,
              color: "error.main",
              transition: "all 0.3s ease",
              padding: 2.5,
            }}
          >
            <FavoriteBorderRounded fontSize="small" />
            <Typography
              className="like-count"
              sx={{
                color: "error.main",
                fontSize: 11,
                transition: "all 0.3s ease",
                padding: 0.2,
                lineHeight: 0,
              }}
            >
              {post.likesCount}
            </Typography>
          </IconButton>
        </Stack>

        {/* Bookmark */}
        <IconButton
          size="small"
          sx={{
            width: 29,
            height: 29,
            bgcolor: "primary.50",
            color: "primary.900",
            borderRadius: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "primary.400",
              "& .bookmark-icon": {
                color: "primary.contrastText",
              },
            },
          }}
        >
          <BookmarkBorderRounded className="bookmark-icon" fontSize="small" />
        </IconButton>
      </Stack>
    </>
  );
};

export default PostAction;
