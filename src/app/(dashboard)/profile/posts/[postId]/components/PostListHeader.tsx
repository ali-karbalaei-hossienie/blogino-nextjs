"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

interface PostListHeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const PostListHeader: React.FC<PostListHeaderProps> = ({
  searchTerm = "",
  onSearchChange,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const onCreatePost = () => {
    router.push("posts/create");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        px: 3,
        py: 2,
        mb: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
          fontWeight: 700,
        }}
      >
        لیست پست ها
      </Typography>

      <TextField
        value={searchTerm}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder="جستجو ..."
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.secondary.main }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          flexGrow: 1,
          maxWidth: 400,
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.background.default,
            borderRadius: 2,
            "& fieldset": {
              borderColor: theme.palette.secondary.dark,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.secondary.main,
            },
          },
        }}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreatePost}
        sx={{
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          borderRadius: 2,
          px: 2,
          py: 1,
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        ایجاد پست
      </Button>
    </Box>
  );
};
