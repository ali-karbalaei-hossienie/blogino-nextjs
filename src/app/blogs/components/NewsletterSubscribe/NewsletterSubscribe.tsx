"use client";
import { Box, Typography, Button, useTheme, Avatar } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NewsletterSubscribe = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "secondary.200",
      }}
    >
      {user ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Avatar
              src={user.avatarUrl || undefined}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}
              >
                سلام، {user.name}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "primary.200" }}>
                خوش اومدی
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
            <Box
              onClick={() => router.push("/bookmarks")}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                borderRadius: 2,
                py: 1,
                px: 1.2,
                backgroundColor: "action.hover",
                cursor: "pointer",
              }}
            >
              <BookmarkBorderRoundedIcon
                sx={{ fontSize: 18, color: "primary.main" }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1,
                  }}
                >
                  {user.likedPosts.length}
                </Typography>
                <Typography sx={{ fontSize: 10.5, color: "text.secondary" }}>
                  ذخیره‌شده
                </Typography>
              </Box>
            </Box>

            <Box
              onClick={() => router.push("/liked")}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                borderRadius: 2,
                py: 1,
                px: 1.2,
                backgroundColor: "action.hover",
                cursor: "pointer",
              }}
            >
              <FavoriteBorderRoundedIcon
                sx={{ fontSize: 18, color: "primary.main" }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1,
                  }}
                >
                  {user.likedPosts?.length ?? 0}
                </Typography>
                <Typography sx={{ fontSize: 10.5, color: "text.secondary" }}>
                  لایک‌شده
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutRoundedIcon sx={{ fontSize: 16 }} />}
            onClick={handleLogout}
            sx={{
              fontSize: 12.5,
              textTransform: "none",
              borderRadius: 2,
              py: 0.8,
            }}
          >
            خروج از حساب
          </Button>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 2 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                flexShrink: 0,
              }}
            >
              <LockRoundedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{ fontSize: 15, fontWeight: 800, color: "text.primary" }}
            >
              عضویت در خبرنامه
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 12.5,
              color: "primary.200",
              mb: 2.5,
              lineHeight: 1.9,
            }}
          >
            برای دریافت جدیدترین مقالات در خبرنامه‌ی ما عضو شوید.
          </Typography>

          <Button
            onClick={() => router.push("/signin")}
            fullWidth
            startIcon={
              <SendOutlined
                sx={{ fontSize: 18, transform: "rotate(321deg)" }}
              />
            }
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.primary[600]} 10%, ${theme.palette.primary[900]} 100%)`,
              color: "primary.contrastText",
              fontWeight: 700,
              fontSize: 13.5,
              borderRadius: 2,
              py: 1,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            عضویت
          </Button>
        </>
      )}
    </Box>
  );
};

export default NewsletterSubscribe;
