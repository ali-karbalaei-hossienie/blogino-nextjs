"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import type { BlogPost } from "@/app/types";
import { createCommentApi } from "@/services/commentServices";
import { useState } from "react";
import CommentItem from "./CommentItem";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CommentsSectionProps {
  post: BlogPost;
}

const CommentsSection = ({ post }: CommentsSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const router = useRouter();
  const comments = post.comments ?? [];

  const handleReply = (commentId: string) => {
    setActiveReplyId(commentId);
    setReplyText("");
  };

  const handleCancelReply = () => {
    setActiveReplyId(null);
    setReplyText("");
  };
  const submitComment = async ({
    text,
    parentId,
    onSuccess,
  }: {
    text: string;
    parentId?: string | null;
    onSuccess: () => void;
  }) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    try {
      const res = await createCommentApi({
        postId: post.id,
        text: trimmedText,
        ...(parentId && { parentId }),
      });

      const message =
        res?.data?.message || res?.message || "عملیات با موفقیت انجام شد";

      toast.success(message);
      onSuccess();
      router.refresh();
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "خطایی در ثبت نظر رخ داد";
      toast.error(errorMsg);
    }
  };

  const handleSubmitComment = () =>
    submitComment({
      text: commentText,
      onSuccess: () => setCommentText(""),
    });

  const handleSubmitReply = () =>
    submitComment({
      text: replyText,
      parentId: activeReplyId,
      onSuccess: handleCancelReply,
    });

  return (
    <Box
      sx={{
        mt: 5,
        p: {
          xs: 2,
          sm: 3,
        },
        borderRadius: 3,
        border: 1,
        borderColor: "secondary.100",
        backgroundColor: "background.paper",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          mb: 3,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 18,
              sm: 20,
            },
            fontWeight: 800,
            color: "text.primary",
          }}
        >
          نظرات کاربران
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
          }}
        >
          {post.commentsCount ?? comments.length} نظر
        </Typography>
      </Stack>

      {/* New Comment */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder="نظر خود را درباره این مقاله بنویسید..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <Stack direction="row" sx={{ mt: 1.5, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            endIcon={<SendRoundedIcon />}
            disabled={!commentText.trim()}
            onClick={handleSubmitComment}
          >
            ارسال نظر
          </Button>
        </Stack>
      </Box>

      {/* Comments */}
      {comments.length > 0 ? (
        <Stack spacing={3}>
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              activeReplyId={activeReplyId}
              replyText={replyText}
              onReplyTextChange={setReplyText}
              onSubmitReply={handleSubmitReply}
              onCancelReply={handleCancelReply}
            />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            هنوز نظری ثبت نشده است.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CommentsSection;
