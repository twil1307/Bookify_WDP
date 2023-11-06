import AmenitiesStyle from "./Amenities.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";

function Amenities({ hotelAmenities, roomType }) {
  console.log(hotelAmenities, roomType);
  return (
    <div>
      <h3 className={AmenitiesStyle["title"]}>
        Những tiện nghi bạn được cung cấp
      </h3>
      <div className={AmenitiesStyle["Amenities"]}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {hotelAmenities?.map((item, index) => {
              return (
                <Grid item xs={12} md={4} key={index}>
                  <div className={AmenitiesStyle["item"]}>
                    <div className={AmenitiesStyle["icon"]}>
                      <FontAwesomeIcon icon={icon[item.icon]} />
                    </div>
                    <h6 className={AmenitiesStyle["name"]}>
                      {item.amenityName}
                    </h6>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </div>
      {/* ---------------------------------------------------------------------------------------------------- */}
      <h3 className={AmenitiesStyle["sub-title"]}>Nơi bạn sẽ ngủ nghỉ</h3>
      <div className={AmenitiesStyle["Amenities"]}>
        <Box sx={{}}>
          <Grid container spacing={1}>
            {roomType.map((el, index) => (
              <Grid item xs={12} md={6} key={index}>
                <div className={AmenitiesStyle["sub-item"]}>
                  <div className={AmenitiesStyle["roomtype"]}>
                    <div className={AmenitiesStyle["sub-icon"]}>
                      <FontAwesomeIcon
                        className={AmenitiesStyle["icon"]}
                        icon={icon["faBed"]}
                      />
                      <FontAwesomeIcon
                        className={AmenitiesStyle["icon"]}
                        icon={icon["faShower"]}
                      />
                    </div>
                    <h6 className={AmenitiesStyle["sub-name"]}>
                      Phòng loại {index + 1}
                    </h6>
                    <p className={AmenitiesStyle["sub-des"]}>
                      {el.bathNum} phòng tắm loại {el.bathroomType},{" "}
                      {el.bedroomNum} phòng ngủ {el.bedNum} giường
                    </p>
                  </div>
                </div>
              </Grid>
            ))}

            {/* <Grid item xs={12} md={4}>
              <div className={AmenitiesStyle["sub-item"]}>
                <div className={AmenitiesStyle["sub-icon"]}>
                  <FontAwesomeIcon icon={icon["faShower"]} />
                </div>
                <h6 className={AmenitiesStyle["sub-name"]}>Phòng tắm</h6>
                <p className={AmenitiesStyle["sub-des"]}>
                  {roomType.bathNum + " " + roomType.bathroomType}
                </p>
              </div>
            </Grid> */}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Amenities;
