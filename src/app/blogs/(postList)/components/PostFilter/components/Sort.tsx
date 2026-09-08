"use client";

import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "latest";

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Grid size={{ xs: 12, sm: 5, md: 4 }}>
      <FormControl size="small" fullWidth>
        <Select
          value={currentSort}
          onChange={handleSortChange}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            color: "text.primary",
          }}
        >
          <MenuItem value="latest">جدیدترین</MenuItem>
          <MenuItem value="oldest">قدیمی‌ترین</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default Sort;
