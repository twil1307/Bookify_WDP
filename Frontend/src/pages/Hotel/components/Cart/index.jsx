import CartStyle from "./Cart.module.scss";
import { useContext, useEffect, useState } from "react";
import { BookingContext, ToastMessageContext } from "@/utils/contexts";
import {
  getFailureToastMessage,
  getSuccessToastMessage,
} from "@/utils/reducers/toastMessageReducer";
import { bookingRoom } from "@/services/hotel";
var options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function Cart({ setDrawer }) {
  const { bookList, setBookList } = useContext(BookingContext);
  const { setToastMessages } = useContext(ToastMessageContext);
  let total = 0;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (bookList.length == 0) setDrawer(false);
  }, [bookList]);
  const handleBooking = () => {
    setLoading(true);
    bookingRoom(bookList).then((resp) => {
      if (resp.error == "User have no banking account yet!") {
        setToastMessages(
          getFailureToastMessage({ message: "Chưa liên kết thẻ ngân hàng" })
        );
      } else if (resp.message == "Your booking has been successfully") {
        setToastMessages(
          getSuccessToastMessage({ message: "Đặt phòng thành công" })
        );
        setBookList([]);
        setDrawer(false);
      } else if (resp.error) {
        setToastMessages(getFailureToastMessage({ message: "Lỗi đặt phòng" }));
      }
    });
  };
  return (
    <div className={CartStyle["container"]}>
      <h3>Các phòng đang đặt</h3>
      <div
        style={{ marginTop: "1rem" }}
        className={CartStyle["scrollContainer"]}
      >
        {bookList?.map((el, index) => {
          total += el.price;
          return (
            <div key={index} className={CartStyle["cartCard"]}>
              <div style={{ padding: "1rem" }}>
                <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                  Phòng loại {el.type + 1}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  {String(
                    new Date(el.checkin).toLocaleDateString("vi-VI", options)
                  )}{" "}
                  -{" "}
                  {String(
                    new Date(el.checkout).toLocaleDateString("vi-VI", options)
                  )}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  <span style={{ color: "#4361ee" }}>{el.adult}</span> người lớn{" "}
                  <span style={{ color: "#4361ee" }}>{el.child}</span> trẻ em{" "}
                  <span style={{ color: "#4361ee" }}>{el.infant}</span> trẻ nhỏ
                </p>

                <p style={{ fontWeight: "bold", color: "#4361ee" }}>
                  <span style={{ color: "black" }}>Tổng tiền: </span>
                  {(el.price * 24000)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  VND
                </p>
              </div>
              <div
                className={CartStyle["Cancel"]}
                onClick={() => {
                  setBookList(
                    bookList.filter((element, i) => {
                      if (i != index) return element;
                    })
                  );
                }}
              >
                <p>Hủy</p>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "92%",
          justifyContent: "center",
          flexDirection: "column",
          gap: "5px",
          bottom: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "white",
          }}
        >
          Tổng số tiền:{" "}
          <span style={{ color: "red" }}>
            {(total * 24000)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VND
          </span>
        </div>
        <button
          className={CartStyle["booking-button"]}
          onClick={() => handleBooking()}
        >
          {!loading ? "Thanh toán" : "Đang chờ thanh toán"}
        </button>
        <button
          className={CartStyle["escape-button"]}
          onClick={() => setDrawer(false)}
        >
          Thoát
        </button>
      </div>
    </div>
  );
}
