import { Link } from "react-router-dom";
import bookmarkItemStyles from "./BookmarkItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/utils/contexts";
import AddDeleteBookMarked from "@/services/user/AddDeleteBookMarked";

function BookmarkItem({ hotel, handleDeleted }) {
  const { user } = useContext(UserContext);
  // console.log(hotel);
  const deleteMarkBooked = () => {
    AddDeleteBookMarked(hotel._id).then((resp) => {
      handleDeleted(hotel._id);
    });
  };
  return (
    <Link to={`hotel/${hotel}`}>
      <div
        className={bookmarkItemStyles["bookmark-item"]}
        style={{
          backgroundImage: `url(http://localhost:${process.env.REACT_APP_BACK_END_PORT}${hotel?.backgroundImage})`,
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
          </div>
          <div
            className={bookmarkItemStyles["infor-right"]}
            tabIndex="-1"
            onClick={deleteMarkBooked}
          >
            <button className={bookmarkItemStyles["unbookmark-button"]}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookmarkItem;
