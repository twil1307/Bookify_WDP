import PhotosStyle from "./Photos.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
function Photos() {
  return (
    <>
      <h3 className={PhotosStyle["photo-title"]}>Photos</h3>
      <div className={PhotosStyle["photos-container"]}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={4} md={4}>
              <div className={PhotosStyle["img-card"]}>
                <img
                  src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/article/0yZyZ5nlx5oDMmlGwBytC59dT9Samz.jpg"
                  alt=""
                />
              </div>
            </Grid>
            <Grid item xs={4} md={4}>
              <div className={PhotosStyle["img-card"]}>
                <img
                  src="https://eder6ypjvgv.exactdn.com/wp-content/uploads/2021/12/scene-montagne-flottante-pandora-3.jpg?strip=all&lossy=1&resize=1280%2C650&ssl=1"
                  alt=""
                />
              </div>
            </Grid>
            <Grid item xs={4} md={4}>
              <div className={PhotosStyle["img-card"]}>
                <img
                  src="https://static1.moviewebimages.com/wordpress/wp-content/uploads/article/0yZyZ5nlx5oDMmlGwBytC59dT9Samz.jpg"
                  alt=""
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default Photos;
