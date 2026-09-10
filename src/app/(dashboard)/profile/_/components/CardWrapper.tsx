import React from "react";
import StatCard from "./StatCard";
import { Grid } from "@mui/material";
import { fetchCardData } from "@/services/profileServices";
import ArticleIcon from "@mui/icons-material/Article";
import CommentIcon from "@mui/icons-material/Comment";
const CardWrapper = async () => {
  const { numberOfComments, numberOfPosts, numberOfUsers } =
    await fetchCardData();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard title="کاربران" value={numberOfUsers} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          icon={<ArticleIcon />}
          title="پست ها "
          value={numberOfPosts}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard
          icon={<CommentIcon />}
          title="نظرات"
          value={numberOfComments}
        />
      </Grid>
    </Grid>
  );
};

export default CardWrapper;
