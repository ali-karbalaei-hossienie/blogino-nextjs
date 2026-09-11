"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Grid size={{ xs: 12, sm: 7, md: 8 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          size="small"
          placeholder="جستجو در مقالات / پست‌ها..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit" size="small" edge="start">
                    <SearchIcon color="action" fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "secondary.100",
            },
          }}
        />
      </Box>
    </Grid>
  );
};

export default Search;
