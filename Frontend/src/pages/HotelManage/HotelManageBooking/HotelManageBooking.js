import BookingList from "./components/BookingList";
import BookingListStyle from "./HotelManage.module.scss";
import { Grid } from '@mui/material';

function HotelManageBooking() {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={10}>
        <div className={BookingListStyle["container"]}>
          <h2 className={BookingListStyle['header']}>Lịch đặt phòng</h2>
          <BookingList />
        </div>
      </Grid>
    </Grid>
  );
}
export default HotelManageBooking;
