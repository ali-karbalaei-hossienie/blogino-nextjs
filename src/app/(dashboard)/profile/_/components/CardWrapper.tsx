import React from "react";
import StatCard from "./StatCard";
import { Grid } from "@mui/material";

const CardWrapper = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard />
      </Grid>
    </Grid>
  );
};

export default CardWrapper;
