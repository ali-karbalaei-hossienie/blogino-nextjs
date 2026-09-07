import { Box, Typography } from "@mui/material";
import { BlogPost } from "@/app/types";

const ArticleContent = ({ post }: { post: BlogPost }) => {
  return (
    <Box
      sx={{
        p: {
          xs: 2.5,
          sm: 4,
          md: 5,
        },
        borderRadius: 3,
        border: 1,
        borderColor: "secondary.100",
        backgroundColor: "background.paper",
      }}
    >
      {/* Intro */}
      <Box
        sx={{
          position: "relative",
          pr: {
            xs: 2,
            md: 2.5,
          },
          mb: 3,
          "&::before": {
            content: '""',
            position: "absolute",
            right: 0,
            top: 4,
            width: 4,
            height: 60,
            borderRadius: 99,
            backgroundColor: "primary.main",
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: {
              xs: 21,
              md: 26,
            },
            fontWeight: 800,
            lineHeight: 1.8,
            color: "text.primary",
          }}
        >
          {post.briefText}
        </Typography>
      </Box>

      {/* Body */}
      <Typography
        sx={{
          fontSize: {
            xs: 16,
            md: 18,
          },
          lineHeight: 2.6,
          color: "text.secondary",
          whiteSpace: "pre-line",
        }}
      >
        {post.text}
      </Typography>
    </Box>
  );
};

export default ArticleContent;
