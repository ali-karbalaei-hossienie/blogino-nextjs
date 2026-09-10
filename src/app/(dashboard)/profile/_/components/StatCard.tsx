// components/StatCard.tsx
import React from "react";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";

interface StatCardProps {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const StatCard: React.FC<StatCardProps> = ({
  title = "کاربران",
  value = 5,
  icon = <PeopleOutlineRoundedIcon fontSize="small" />,
  sx,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2.5,
        p: 1.5,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          px: 0.5,
          color: "text.secondary",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& svg": {
              fontSize: 20,
            },
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "background.default",
          borderRadius: 2,
          py: 2.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: "action.hover",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            lineHeight: 1,
            letterSpacing: 0.5,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;
