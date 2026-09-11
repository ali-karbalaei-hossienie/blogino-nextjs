"use client";

import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toPersianDigits } from "@/utils/toPersianDigits";

const NewsletterSubscribe = () => {
  const theme = useTheme();
  const router = useRouter();

  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Loading
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          p: 2.5,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "secondary.200",
        }}
      >
        {/* User skeleton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 2,
          }}
        >
          <Skeleton
            variant="circular"
            width={42}
            height={42}
            animation="wave"
          />

          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="55%" height={22} animation="wave" />

            <Skeleton variant="text" width="35%" height={18} animation="wave" />
          </Box>
        </Box>

        {/* Profile skeleton */}
        <Skeleton
          variant="rounded"
          width="100%"
          height={40}
          sx={{
            borderRadius: 2,
            mb: 1,
          }}
          animation="wave"
        />

        {/* Bookmarks skeleton */}
        <Skeleton
          variant="rounded"
          width="100%"
          height={52}
          sx={{
            borderRadius: 2,
            mb: 1.2,
          }}
          animation="wave"
        />

        {/* Logout skeleton */}
        <Skeleton
          variant="rounded"
          width="100%"
          height={35}
          sx={{
            borderRadius: 2,
          }}
          animation="wave"
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 2.5,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "secondary.200",
      }}
    >
      {user ? (
        <>
          {/* User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Avatar
              src={user.avatarUrl || undefined}
              sx={{
                width: 42,
                height: 42,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              {toPersianDigits(user.name?.charAt(0))}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                سلام، {user.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  mt: 0.3,
                }}
              >
                خوش اومدی 👋
              </Typography>
            </Box>
          </Box>

          {/* Profile */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<PersonRoundedIcon sx={{ fontSize: 18 }} />}
            onClick={() => router.push("/profile")}
            sx={{
              mb: 1,
              py: 1,
              borderRadius: 2,
              fontSize: 13,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "none",
              background: `linear-gradient(
                90deg,
                ${theme.palette.primary[600]} 10%,
                ${theme.palette.primary[900]} 100%
              )`,
              "&:hover": {
                boxShadow: "none",
                background: `linear-gradient(
                  90deg,
                  ${theme.palette.primary[700]} 10%,
                  ${theme.palette.primary[900]} 100%
                )`,
              },
            }}
          >
            مشاهده پروفایل
          </Button>

          {/* Logout */}
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutRoundedIcon sx={{ fontSize: 16 }} />}
            onClick={handleLogout}
            sx={{
              py: 0.8,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            خروج از حساب
          </Button>
        </>
      ) : (
        <>
          {/* Newsletter Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1.5,
              gap: 2,
            }}
          >
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
              sx={{
                fontSize: 15,
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              عضویت در خبرنامه
            </Typography>
          </Box>

          {/* Description */}
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

          {/* Sign Up */}
          <Button
            onClick={() => router.push("/signin")}
            fullWidth
            startIcon={
              <SendOutlined
                sx={{
                  fontSize: 18,
                  transform: "rotate(321deg)",
                }}
              />
            }
            sx={{
              background: `linear-gradient(
                90deg,
                ${theme.palette.primary[600]} 10%,
                ${theme.palette.primary[900]} 100%
              )`,
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
