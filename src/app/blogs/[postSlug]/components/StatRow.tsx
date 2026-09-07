import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface StatRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  last?: boolean;
}
const StatRow = ({ icon, title, value, last = false }: StatRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.7,
        borderBottom: last ? 0 : 1,
        borderColor: "secondary.100",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            color: "primary.400",

            "& svg": {
              fontSize: 19,
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default StatRow;
