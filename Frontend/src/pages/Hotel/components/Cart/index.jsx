import Button from "@mui/material/Button";
import CartStyle from "./Cart.module.scss";
import { useContext } from "react";
import { BookingContext } from "@/utils/contexts";
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Cart({ setDrawer }) {
  const { bookList, setBookList } = useContext(BookingContext);
  return (
    <div className={CartStyle["container"]}>
      <h3>Các phòng đang đặt</h3>
      <div>
        {bookList?.map((el, index) => (
          <div key={index}>
            <p>{el.roomType}</p>
            <p>{el.hotelId}</p>
            <p>{el.price}</p>
            <p>{el.checkin.toLocaleDateString("vi-VI", options)}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" className={CartStyle["Booking-1"]}>
          Thanh Toán
        </Button>
        <Button
          variant="outlined"
          color="error"
          className={CartStyle["Booking"]}
          onClick={setDrawer(false)}
        >
          Thoát
        </Button>
      </div>
    </div>
  );
}
