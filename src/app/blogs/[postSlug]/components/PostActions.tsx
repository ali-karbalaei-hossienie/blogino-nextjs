"use client";

import { Box, Button, Stack } from "@mui/material";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { BlogPost } from "@/app/types";
import { bookmarkPostApi } from "@/services/postServices";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PostActions = ({ post }: { post: BlogPost }) => {
  const router = useRouter();
  const handleBookmark = async (id: string) => {
    try {
      const { message } = await bookmarkPostApi(id);
      router.refresh();
      toast.success(message);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <Box
      sx={{
        mb: 3,
        px: {
          xs: 1.5,
          sm: 2,
        },
        py: 1.5,
        borderRadius: 2,
        border: 1,
        borderColor: "secondary.100",
        backgroundColor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Like */}
        <Button
          disableRipple
          startIcon={
            <FavoriteBorderIcon
              sx={{
                color: "primary.500",
                width: 22,
                height: 22,
              }}
            />
          }
          sx={{
            minWidth: 88,
            height: 46,
            borderRadius: 4,
            color: "primary.contrastText",
            backgroundColor: "secondary.200",

            "&:hover": {
              backgroundColor: "secondary.300",
            },
          }}
        >
          {post.likesCount}
        </Button>

        {/* Bookmark */}
        <Button
          onClick={() => handleBookmark(post.id)}
          disableRipple
          startIcon={
            post.isBookmarked ? (
              <BookmarkRoundedIcon sx={{ color: "primary.main" }} />
            ) : (
              <BookmarkBorderRoundedIcon sx={{ color: "text.secondary" }} />
            )
          }
          sx={{
            height: 46,
            px: 2,
            borderRadius: 2,

            color: post.isBookmarked ? "primary.main" : "text.secondary",

            backgroundColor: "background.paper",

            border: 1,
            borderColor: "secondary.300",

            "&:hover": {
              backgroundColor: "secondary.100",
            },
          }}
        >
          {post.isBookmarked ? "حذف مقاله از ذخیره‌ها" : "ذخیره مقاله"}
        </Button>
      </Stack>
    </Box>
  );
};

export default PostActions;
