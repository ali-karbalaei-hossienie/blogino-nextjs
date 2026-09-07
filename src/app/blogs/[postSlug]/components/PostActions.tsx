import { Box, Button, Stack } from "@mui/material";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { BlogPost } from "@/app/types";

const PostActions = ({ post }: { post: BlogPost }) => {
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
              sx={{ color: "primary.500", width: 22, height: 22 }}
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
          disableRipple
          startIcon={<BookmarkBorderIcon />}
          sx={{
            height: 46,
            px: 2,
            borderRadius: 2,
            color: "text.secondary",
            backgroundColor: "background.paper",
            border: 1,
            borderColor: "secondary.300",

            "&:hover": {
              backgroundColor: "secondary.100",
            },
          }}
        >
          ذخیره مقاله
        </Button>
      </Stack>
    </Box>
  );
};

export default PostActions;
