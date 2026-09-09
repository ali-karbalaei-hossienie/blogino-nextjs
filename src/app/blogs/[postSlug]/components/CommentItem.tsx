"use client";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import type { BlogPost } from "@/app/types";

interface CommentItemProps {
  comment: NonNullable<BlogPost["comments"]>[number];
  onReply: (commentId: string) => void;
  activeReplyId: string | null;
  replyText: string;
  onReplyTextChange: (value: string) => void;
  onSubmitReply: () => void;
  onCancelReply: () => void;
}

const CommentItem = ({
  comment,
  onReply,
  activeReplyId,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  onCancelReply,
}: CommentItemProps) => {
  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
        <Avatar
          src={comment.user.avatarUrl}
          alt={comment.user.name}
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 0.5,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {comment.user.name}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {comment.createdAt}
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 14,
              lineHeight: 2,
              color: "text.secondary",
              whiteSpace: "pre-line",
            }}
          >
            {comment.content.text}
          </Typography>

          <Button
            size="small"
            startIcon={<ReplyRoundedIcon />}
            onClick={() => onReply(comment._id)}
            sx={{
              mt: 1,
              minWidth: 0,
              px: 0,
              fontSize: 13,
            }}
          >
            پاسخ
          </Button>

          {activeReplyId === comment._id && (
            <Box sx={{ mt: 1.5 }}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder={`پاسخ به ${comment.user.name}...`}
                value={replyText}
                onChange={(e) => onReplyTextChange(e.target.value)}
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button size="small" onClick={onCancelReply}>
                  انصراف
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  endIcon={<SendRoundedIcon />}
                  disabled={!replyText.trim()}
                  onClick={onSubmitReply}
                >
                  ارسال پاسخ
                </Button>
              </Stack>
            </Box>
          )}

          {comment.answers?.length > 0 && (
            <Stack
              spacing={2}
              sx={{
                mt: 2,
                mr: {
                  xs: 1,
                  sm: 4,
                },
                pr: 2,
                borderRight: 2,
                borderColor: "secondary.100",
              }}
            >
              {comment.answers.map((answer) => (
                <Box key={answer._id}>
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Avatar
                      src={answer.user.avatarUrl}
                      alt={answer.user.name}
                      sx={{
                        width: 34,
                        height: 34,
                        flexShrink: 0,
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          mb: 0.5,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "text.primary",
                          }}
                        >
                          {answer.user.name}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "text.secondary",
                          }}
                        >
                          {answer.createdAt}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          fontSize: 13,
                          lineHeight: 2,
                          color: "text.secondary",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {answer.content.text}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>

      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};
export default CommentItem;
