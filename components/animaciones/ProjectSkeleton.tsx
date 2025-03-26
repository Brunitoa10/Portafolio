import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";

export default function ProjectSkeleton() {
  return (
    <>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ minWidth: 300, maxWidth: "100%", borderRadius: "16px", boxShadow: 3, background: "linear-gradient(45deg, #0a0f29, #122b4e, #0077b6)"}}>
            <CardContent>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width="40%" height={40} />
              <Skeleton variant="rectangular" width="40%" height={40} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}
