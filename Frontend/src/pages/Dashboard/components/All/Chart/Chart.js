import ChartStyle from "./Chart.module.scss";
import SingleLineChart from "@/components/Chart/SingleLineChart";
import BarChart from "@/components/Chart/BarChartWithoutYScale";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

function Chart({ typeBooking, bookingNumber }) {
  useEffect(() => {
    console.log(typeBooking, bookingNumber);
  }, []);
  const initArr = [1, 3, 5, 7, 9, 10, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <div className={ChartStyle["chart-1"]}>
            <BarChart
              label="Xu hướng đặt phòng"
              labels={typeBooking.type}
              data={typeBooking.numberBooking}
            />
          </div>
          <div className={ChartStyle["chart-1-title"]}>
            <h5>Xu hướng đặt phòng</h5>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={ChartStyle["chart-2"]}>
            <SingleLineChart
              label="Lượt đặt phòng"
              labels={
                bookingNumber.day?.length !== 0 ? bookingNumber.day : initArr
              }
              data={bookingNumber.numberBooking}
              isY={false}
              color={"#f72585"}
            />
            {/* <BarChart labels={barChartLabel} /> */}
          </div>
          <div className={ChartStyle["chart-2-title"]}>
            <h5>Lượt đặt phòng</h5>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chart;
