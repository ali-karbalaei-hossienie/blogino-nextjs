import { useAuth } from "@/context/AuthContext";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const DRAWER_WIDTH = 260;

const Header = ({ handleDrawerToggle }: { handleDrawerToggle: () => void }) => {
  const { user } = useAuth();

  const avatarSrc = user?.avatarUrl || user?.avatar || undefined;

  const userInitial = (user?.name || user?.email || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        left: { md: `${DRAWER_WIDTH}px` },
        right: 0,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          پنل مدیریت
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={avatarSrc}
            alt={user?.name || "User"}
            sx={{
              width: 34,
              height: 34,
              bgcolor: "primary.main",
              fontSize: "0.85rem",
            }}
          >
            {userInitial}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
