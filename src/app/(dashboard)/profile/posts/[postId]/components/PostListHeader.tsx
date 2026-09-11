"use client";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export const PostListHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const onCreatePost = () => {
    router.push("posts/create");
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const query = inputValue.trim();

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
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

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
      </Box>
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
