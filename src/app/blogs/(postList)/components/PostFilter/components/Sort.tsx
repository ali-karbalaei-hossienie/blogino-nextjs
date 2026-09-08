"use client";
import SortIcon from "@mui/icons-material/Sort";
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const Sort = () => {
  const [sort, setSort] = useState("newest");

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSort(value);
  };
  return (
    <Grid size={{ xs: 12, sm: 5, md: 4 }}>
      <FormControl fullWidth size="small">
        <Select
          value={sort}
          onChange={handleSortChange}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <SortIcon color="action" fontSize="small" />
            </InputAdornment>
          }
          sx={{
            borderRadius: 2,
            bgcolor: "secondary.100",
          }}
        >
          <MenuItem value="newest">جدیدترین</MenuItem>
          <MenuItem value="oldest">قدیمی‌ترین</MenuItem>
          <MenuItem value="most_viewed">پربازدیدترین</MenuItem>
          <MenuItem value="most_popular">محبوب‌ترین</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default Sort;
