"use client";

import {
  ArticleOutlined as ArticleIcon,
  CategoryOutlined as CategoryIcon,
  ChatOutlined as CommentIcon,
  GridView as DashboardIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { JSX, useState } from "react";
import { DRAWER_WIDTH } from "../../layout";
import DrawerContent from "./DrawerContent";
import Header from "./Header";

export interface MenuItemsType {
  text: string;
  icon: JSX.Element;
  href: string;
}

const menuItems: MenuItemsType[] = [
  { text: "داشبورد", icon: <DashboardIcon />, href: "/profile" },
  { text: "پست ها", icon: <ArticleIcon />, href: "/profile/posts" },
  { text: "نظرات", icon: <CommentIcon />, href: "/profile/comments" },
  { text: "دسته بندی ها", icon: <CategoryIcon />, href: "/profile/categories" },
  { text: "کاربران", icon: <PeopleIcon />, href: "/profile/users" },
];

const Panel = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle} />
      {/* side bar mobile */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        <DrawerContent setMobileOpen={setMobileOpen} menuItems={menuItems} />
      </Drawer>

      {/* side bar mobile desktop */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderLeft: 1,
            borderRight: "none",
            borderColor: "divider",
          },
        }}
        open
      >
        <DrawerContent menuItems={menuItems} setMobileOpen={setMobileOpen} />
      </Drawer>
    </>
  );
};

export default Panel;
