import bookingItemStyles from "./BookingItemStyles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState, memo } from "react";

const getBookingGuestsTitle = (guests) => {
  const bookingGuestsTitle = Object.keys(guests).reduce((prev, key) => {
    if (guests[key] === 0) {
      return prev;
    } else {
      switch (key) {
        case "adult":
          return [...prev, `${guests[key]} người lớn`];
        case "child":
          return [...prev, `${guests[key]} trẻ em`];
        case "infant":
          return [...prev, `${guests[key]} trẻ sơ sinh`];
        case "pet":
          return [...prev, `${guests[key]} thú cưng`];
        default:
          throw new Error("Invalid guests title");
      }
    }
  }, []);
  return bookingGuestsTitle.join(", ");
};

function BookingItem({ booking, handleBookingAction }) {
  const { user, roomType } = booking;
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={bookingItemStyles["tab-card"]} key={booking?.bookingId}>
      <div className={bookingItemStyles["card-header"]}>
        <b className={bookingItemStyles["color-blue"]}>Hôm nay</b>
        <p>
          {roomType?.bedType} -{" "}
          {getBookingGuestsTitle({
            adult: booking?.adult,
            child: booking?.child,
            infant: booking?.infant,
            pet: booking?.pet,
          })}
        </p>
      </div>
      <div className={bookingItemStyles["card-body"]}>
        <div className={bookingItemStyles["info"]}>
          <p className={bookingItemStyles["user-name"]}>{user?.username}</p>
          <p>
            <span> {booking.checkin}</span> - <span> {booking.checkout}</span>
          </p>
        </div>
        {booking?.user ? (
          <img
            className={bookingItemStyles["image"]}
            src={
              user.avatar
                ? user.avatar
                : "http://localhost:8080/bookify/images/users/blankUser.jpg"
            }
            alt="avatar"
          />
        ) : (
          <FontAwesomeIcon
            className={bookingItemStyles["image"]}
            icon={faCircleUser}
          />
        )}
      </div>
      <div className={bookingItemStyles["button-group"]}>
        {booking.status === 0 ? (
          <>
            <button
         
              className={bookingItemStyles["accept-button"]}
            >
              {isLoading ? "Load" : "Chấp nhận"}
            </button>
            <button
          
              className={bookingItemStyles["reject-button"]}
            >
              {isLoading ? "Load"  : "Hủy bỏ"}
            </button>
          </>
        ) : booking.status === 1 ? (
          <button className={bookingItemStyles["accept-button"]}>
            {"Đã chấp nhận"}
          </button>
        ) : (
          <button className={bookingItemStyles["accept-button"]}>
            {"Đã hủy"}
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(BookingItem);
