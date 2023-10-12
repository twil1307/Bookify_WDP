import { HotelCard } from "@/components";
import { Grid } from "@mui/material";
import { memo } from "react";

function HotelCards({ hotels, type = null }) {
  // console.log(hotels);
  return (
    <div>
      {hotels.map((hotel) => (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={hotel._id}>
          <HotelCard {...hotel} />
        </Grid>
      ))}
    </div>
  );
}

export default memo(HotelCards);
