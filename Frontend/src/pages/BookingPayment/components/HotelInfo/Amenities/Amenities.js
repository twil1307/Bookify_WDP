import AmenitiesStyle from "./Amenities.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faCamera,
  faParking,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
function Amenities() {
  return (
    <>
      <h3 className={AmenitiesStyle["amenities-title"]}>Tiện nghi</h3>
      <div className={AmenitiesStyle["amenities-container"]}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={3} md={3}>
              <div className={AmenitiesStyle["img-card"]}>
                <FontAwesomeIcon icon={faBath} />
                <p>Nước nóng</p>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div className={AmenitiesStyle["img-card"]}>
                <FontAwesomeIcon icon={faParking} />
                <p>Đỗ xe</p>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div className={AmenitiesStyle["img-card"]}>
                <FontAwesomeIcon icon={faCamera} />
                <p>Camera</p>
              </div>
            </Grid>
            <Grid item xs={3} md={3}>
              <div className={AmenitiesStyle["img-card"]}>
                <FontAwesomeIcon icon={faPhone} />
                <p>HotLine</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default Amenities;
