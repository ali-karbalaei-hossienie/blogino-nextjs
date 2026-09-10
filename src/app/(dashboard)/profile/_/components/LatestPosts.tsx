import { getAllPostsApi } from "@/services/postServices";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const LatestPosts = async () => {
  const { posts } = await getAllPostsApi();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflowY: "hidden",
        maxWidth: "100%",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "action.hover",
            }}
          >
            <TableCell
              sx={{
                width: "20%",
                fontWeight: 700,
              }}
            >
              عنوان
            </TableCell>

            <TableCell
              sx={{
                width: "18%",
                fontWeight: 700,
              }}
            >
              نویسنده
            </TableCell>

            <TableCell
              sx={{
                width: "10%",
                fontWeight: 700,
              }}
            >
              دسته‌بندی
            </TableCell>

            <TableCell
              align="center"
              sx={{
                width: "11%",
                fontWeight: 700,
              }}
            >
              نوع
            </TableCell>

            <TableCell
              sx={{
                width: "20%",
                fontWeight: 700,
              }}
            >
              آخرین بروزرسانی
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post._id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              {/* Title */}
              <TableCell>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 700,
                  }}
                >
                  {post.title}
                </Typography>
              </TableCell>

              {/* Author */}
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                  {post.author.name}
                </Typography>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                  {post.category.title}
                </Typography>
              </TableCell>

              {/* Type */}
              <TableCell
                align="center"
                sx={{
                  px: 1,
                }}
              >
                <Chip
                  label={post.type === "free" ? "رایگان" : "پولی"}
                  size="small"
                  color={post.type === "free" ? "success" : "warning"}
                />
              </TableCell>

              {/* Updated At */}
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    whiteSpace: "nowrap",
                  }}
                >
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{
                      color: "text.secondary",
                      flexShrink: 0,
                    }}
                  />

                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.updatedAt).toLocaleDateString("fa-IR")}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}

          {posts.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{
                  py: 6,
                  color: "text.secondary",
                }}
              >
                <Typography variant="body2">
                  پستی برای نمایش وجود ندارد.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestPosts;
