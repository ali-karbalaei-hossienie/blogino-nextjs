"use client";

import { BlogPost } from "@/app/types";
import { likePostApi } from "@/services/postServices";
import { toPersianDigits } from "@/utils/toPersianDigits";
import {
  BookmarkBorderRounded,
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
} from "@mui/icons-material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PostAction = ({ post }: { post: BlogPost }) => {
  const router = useRouter();
  const handleLikePost = async (id: string) => {
    try {
      const { message } = await likePostApi(id);
      router.refresh();
      toast.success(message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

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
            {toPersianDigits(post.commentsCount)}
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
            onClick={() => handleLikePost(post.id)}
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
            {post.isLiked ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderRounded fontSize="small" />
            )}
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
              {toPersianDigits(post.likesCount)}
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
