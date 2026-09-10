import { Category } from "@/app/types";

import { Box, Divider, List, ListItem, Typography } from "@mui/material";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SportsSoccerRoundedIcon from "@mui/icons-material/SportsSoccerRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";

import CategoryLink from "./CategoryLink";
import NewsletterSubscribe from "../NewsletterSubscribe/NewsletterSubscribe";

const getCategoryIcon = (englishTitle: string) => {
  switch (englishTitle) {
    case "sport":
      return <SportsSoccerRoundedIcon />;

    case "cultural":
      return <TheaterComedyRoundedIcon />;

    case "economic":
      return <AccountBalanceWalletRoundedIcon />;

    case "programming":
      return <CodeRoundedIcon />;

    case "political":
      return <AccountBalanceRoundedIcon />;

    case "historical":
      return <HistoryEduRoundedIcon />;

    case "geographic":
      return <MapRoundedIcon />;

    default:
      return <GridViewRoundedIcon />;
  }
};

const CategoryList = async () => {
  let categories: Category[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const response = await res.json();

    categories = response.data.categories as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);

    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          border: 1,
          borderColor: "secondary.100",
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: "error.main",
            textAlign: "center",
          }}
        >
          خطا در دریافت دسته‌بندی‌ها
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        borderRadius: 3,
        border: 1,
        borderColor: "secondary.100",
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          py: 1,
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            color: "primary.800",
          }}
        >
          <GridViewRoundedIcon sx={{ fontSize: 20 }} />
        </Box>

        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 800,
            color: "text.primary",
          }}
        >
          دسته‌بندی‌ها
        </Typography>
      </Box>

      <Divider
        sx={{
          borderColor: "secondary.300",
          mb: 1,
        }}
      />

      <List
        disablePadding
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {/* All */}
        <ListItem disablePadding>
          <CategoryLink href="/blogs" exact>
            <Box
              sx={{
                width: "100%",
                minHeight: 48,
                px: 1.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                }}
              >
                <GridViewRoundedIcon
                  sx={{
                    fontSize: 20,
                    color: "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  همه
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "primary.300",
                  color: "primary.600",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {categories.length}
              </Box>
            </Box>
          </CategoryLink>
        </ListItem>

        {/* Categories */}
        {categories.map((category) => (
          <ListItem key={category._id} disablePadding>
            <CategoryLink href={`/blogs/category/${category.slug}`}>
              <Box
                sx={{
                  width: "100%",
                  minHeight: 48,
                  px: 1.5,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                  }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      width: 34,
                      height: 34,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 1.5,
                      color: "primary.main",
                      transition: "all 0.2s ease",

                      "& svg": {
                        fontSize: 19,
                      },
                    }}
                  >
                    {getCategoryIcon(category.englishTitle)}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: "secondary.300",
                    direction: "ltr",
                    opacity: 0,
                    transform: "translateX(4px)",
                    transition: "all 0.2s ease",

                    ".MuiListItem-root:hover &": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                >
                  ›
                </Typography>
              </Box>
            </CategoryLink>
          </ListItem>
        ))}
      </List>
      <NewsletterSubscribe />
    </Box>
  );
};

export default CategoryList;
