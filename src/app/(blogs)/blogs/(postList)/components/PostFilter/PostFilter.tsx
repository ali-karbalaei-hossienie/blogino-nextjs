"use client";

import { Grid } from "@mui/material";
import Search from "./components/Search";
import Sort from "./components/Sort";

const PostFilter = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        mb: 3,
        p: 2,
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Search />
      <Sort />
    </Grid>
  );
};

export default PostFilter;
