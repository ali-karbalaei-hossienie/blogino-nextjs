import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import StatCard from "./_/components/StatCard";
import CardWrapper from "./_/components/CardWrapper";

const statsData = [
  {
    id: 1,
    title: "کاربران",
    count: 5,
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 2,
    title: "پست ها",
    count: 6,
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 3,
    title: "نظرات",
    count: 9,
    icon: <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
  },
];

const Profile = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 3,
          fontSize: "1.25rem",
          color: "#e2e8f0",
        }}
      >
        داشبورد
      </Typography>
      <CardWrapper />
    </Box>
  );
};

export default Profile;
