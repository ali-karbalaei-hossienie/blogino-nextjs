"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

const PostRowActions = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    // TODO: فراخوانی API حذف پست
    // await deletePostApi(postId);
    // router.refresh();
  };

  const handleEdit = () => {
    router.push(`/profile/posts/${postId}/edit`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <IconButton
        size="small"
        onClick={handleDelete}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          color: "text.secondary",
          "&:hover": {
            color: "error.main",
            borderColor: "error.main",
          },
        }}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={handleEdit}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          color: "text.secondary",
          "&:hover": {
            color: "primary.main",
            borderColor: "primary.main",
          },
        }}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default PostRowActions;
