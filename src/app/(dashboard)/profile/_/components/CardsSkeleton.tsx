import { Grid, Skeleton } from "@mui/material";

const CardsSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map((item) => (
        <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
          <Skeleton
            variant="rectangular"
            height={120}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardsSkeleton;
