import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ROWS_COUNT = 6;

const LatestPostsSkeleton = () => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflowX: "auto",
        overflowY: "hidden",
        maxWidth: "100%",
      }}
    >
      <Table sx={{ minWidth: 750 }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "action.hover",
            }}
          >
            <TableCell sx={{ width: "20%" }}>
              <Skeleton variant="text" width="60%" />
            </TableCell>
            <TableCell sx={{ width: "16%" }}>
              <Skeleton variant="text" width="60%" />
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              <Skeleton variant="text" width="60%" />
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
            </TableCell>
            <TableCell sx={{ width: "18%" }}>
              <Skeleton variant="text" width="70%" />
            </TableCell>
            <TableCell align="center" sx={{ width: "12%" }}>
              <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: ROWS_COUNT }).map((_, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              {/* Title */}
              <TableCell>
                <Skeleton variant="text" width="80%" height={22} />
              </TableCell>

              {/* Author */}
              <TableCell>
                <Skeleton variant="text" width="70%" height={22} />
              </TableCell>

              {/* Category */}
              <TableCell>
                <Skeleton variant="text" width="65%" height={22} />
              </TableCell>

              {/* Type */}
              <TableCell align="center">
                <Skeleton
                  variant="rounded"
                  width={64}
                  height={24}
                  sx={{ mx: "auto", borderRadius: 4 }}
                />
              </TableCell>

              {/* Updated At */}
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton variant="text" width={80} height={22} />
                </Box>
              </TableCell>

              {/* Actions */}
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width={32}
                    height={32}
                    sx={{ borderRadius: 1.5 }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={32}
                    height={32}
                    sx={{ borderRadius: 1.5 }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestPostsSkeleton;
