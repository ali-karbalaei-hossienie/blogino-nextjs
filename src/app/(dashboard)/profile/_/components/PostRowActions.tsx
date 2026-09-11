"use client";

import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePostApi } from "@/services/postServices";

const PostRowActions = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    if (!isDeleting) setOpenModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);

      await deletePostApi(postId);

      toast.success("پست با موفقیت حذف شد");
      router.refresh();
      setOpenModal(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "خطایی در حذف پست رخ داد",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/profile/posts/${postId}/edit`);
  };

  return (
    <>
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
          onClick={handleOpenModal}
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

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        slotProps={{
          paper: {
            sx: { borderRadius: 3, p: 1, minWidth: 320 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
          حذف پست
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.secondary" }}>
            آیا از حذف این پست اطمینان دارید؟ این عملیات غیرقابل بازگشت است.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 1.5, gap: 1 }}>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            color="inherit"
            disabled={isDeleting}
            sx={{ borderRadius: 2 }}
          >
            انصراف
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={
              isDeleting ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
            sx={{ borderRadius: 2 }}
          >
            {isDeleting ? "در حال حذف..." : "بله، حذف شود"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostRowActions;
