import { Link } from "react-router-dom";
import bookmarkItemStyles from "./BookmarkItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteHotelFromBookmark } from "@/services/user";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/utils/contexts";
import { useGetHotel } from "@/utils/hooks";
import { useQuery } from "@tanstack/react-query";
import { GetHotel } from "@/services-new/hotel";

function BookmarkItem({ hotel, handleDeleted }) {
  const { user } = useContext(UserContext);
  const { getHotelbyId } = useGetHotel();
  const unBookmarkHotel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteHotelFromBookmark(hotel, user._id);
    handleDeleted(hotel);
  };
  return (
    <Link to={`hotel/${hotel}`}>
      <div
        className={bookmarkItemStyles["bookmark-item"]}
        style={{
          backgroundImage: `url(http://localhost:${process.env.REACT_APP_BACK_END_PORT}${hotel?.backgroundImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        tabIndex="-1"
      >
        <div className={bookmarkItemStyles["item-infor"]} tabIndex="-1">
          <div className={bookmarkItemStyles["infor-left"]}>
            <h4 className={bookmarkItemStyles["hotel-name"]}>
              {hotel?.hotelName}
            </h4>
            <p className={bookmarkItemStyles["hotel-address"]}>
              {`${hotel?.address}, ${hotel?.district}, ${hotel?.city}, ${hotel?.country}`}
            </p>
            <p className={bookmarkItemStyles["price"]}>
              {`$${hotel?.roomType?.roomPrice}`}
            </p>
          </div>
          <div className={bookmarkItemStyles["infor-right"]} tabIndex="-1">
            <button
              className={bookmarkItemStyles["unbookmark-button"]}
              onClick={unBookmarkHotel}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookmarkItem;
