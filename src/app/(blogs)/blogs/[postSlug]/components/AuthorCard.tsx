import Image from "next/image";

import { Box, Button, Typography } from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { BlogPost } from "@/app/types";

const AuthorCard = ({ post }: { post: BlogPost }) => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        border: 1,
        borderColor: "secondary.100",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 82,
            height: 82,
            borderRadius: "50%",
            overflow: "hidden",
            border: 3,
            borderColor: "secondary.200",
          }}
        >
          <Image
            src={post.author.avatarUrl}
            alt={post.author.name}
            fill
            sizes="82px"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: 800,
          color: "text.primary",
          mb: 0.5,
        }}
      >
        {post.author.name}
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: 12,
          color: "text.secondary",
          mb: 2.5,
        }}
      >
        نویسنده و توسعه‌دهنده
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          fontSize: 13,
          lineHeight: 2.1,
          color: "text.secondary",
          mb: 2.5,
        }}
      >
        علاقه‌مند به تکنولوژی، برنامه‌نویسی و فریلنسری. در اینجا تجربه‌ها و
        دانسته‌هایم را به اشتراک می‌گذارم.
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<PersonOutlineOutlinedIcon />}
        sx={{
          height: 46,
          borderRadius: 2,
          color: "primary.400",
          borderColor: "primary.900",
          backgroundColor: "secondary.100",

          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "primary.100",
          },
        }}
      >
        مشاهده پروفایل
      </Button>
    </Box>
  );
};

export default AuthorCard;
