import CheckOutStyle from "./CheckOut.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CheckOutInfo from "./components/CheckOutInfo";
import HotelInfo from "./components/HotelInfo";

function BookingPayment() {
  return (
    <div className={CheckOutStyle["container"]}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <div className={CheckOutStyle["bank-card"]}>
              <CheckOutInfo />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={CheckOutStyle["bank-card"]}>
              <HotelInfo />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default BookingPayment;
