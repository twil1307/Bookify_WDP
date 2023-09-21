import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HotelCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { Link, useOutletContext } from "react-router-dom";
import { useContext, useState, memo } from "react";
import {
  BookmarkContext,
  ToastMessageContext,
  UserContext,
} from "@/utils/contexts";
import { addHotelToBookmark, deleteHotelFromBookmark } from "@/services/user";
import {
  getFailureToastMessage,
  getSuccessToastMessage,
} from "@/utils/reducers/toastMessageReducer";

function HotelCard({
  _id: hotelId,
  hotelName,
  country,
  district,
  address,
  // backgroundImg,
  images,
  averagePrice,
  rating,
  isBookmarked,
}) {
  console.log(averagePrice);
  // const backgroundImg2 = backgroundImg.split("/");
  // const allImages = [backgroundImg2[backgroundImg2.length - 1]];
  const { user } = useContext(UserContext);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { setToastMessages } = useContext(ToastMessageContext);
  const setBookmarkedHotels = useOutletContext(BookmarkContext);

  // images.forEach((image) => {
  //   let imgName = image.src.split("/");
  //   allImages.push(imgName[imgName.length - 1]);
  // });

  const addToBookmark = () => {
    setBookmarkedHotels((prev) => [
      {
        hotelId,
        hotelName,
        // backgroundImg,
        country,
        district,
        address,
        roomType: {
          price: averagePrice,
        },
      },
      ...prev,
    ]);
    setToastMessages(
      getSuccessToastMessage({ message: "Đã thêm vào mục yêu thích" })
    );
    setBookmarked(true);
  };

  const removeFromBookmark = () => {
    setBookmarkedHotels((prev) => {
      const thisHotelId = hotelId;
      return prev.filter(({ hotelId }) => hotelId !== thisHotelId);
    });
    setToastMessages(
      getSuccessToastMessage({ message: "Đã xóa khỏi mục yêu thích" })
    );
    setBookmarked(false);
  };

  const handleBookmark = async (event) => {
    event.preventDefault();
    if (!user._id) {
      setToastMessages(
        getFailureToastMessage({ message: "Bạn cần phải đăng nhập" })
      );
      return;
    }
    if (bookmarked) {
      const res = await deleteHotelFromBookmark(hotelId, user._id).then(
        (res) => res
      );
      if (res?.ok) {
        removeFromBookmark();
      } else {
        setBookmarked(false);
      }
    } else {
      const res = await addHotelToBookmark(hotelId, user._id).then(
        (res) => res
      );
      if (res?.ok) {
        addToBookmark();
      } else {
        setBookmarked(true);
      }
    }
  };

  return (
    <Link to={`hotel/${hotelId}`}>
      <div className={"hotel-card"}>
        <div className={"carousel"}>
          <Carousel controls={true} interval={null}>
            {images.map((element, index) => (
              <Carousel.Item key={index}>
                <img
                  className={"carousel-image"}
                  src={`http://localhost:${process.env.REACT_APP_BACK_END_PORT}${element.imagePath}`}
                  alt={hotelName}
                  loading="lazy"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className={"hotel-info"}>
          <div className={"basic-info"}>
            <div className={"name-and-point"}>
              <h3 className={"hotel-name"}>{hotelName}</h3>
              <div className={"average-point"}>
                <FontAwesomeIcon icon={faStar} />
                <span>{rating.communicationPoint}</span>
                <span>{rating.accuracyPoint}</span>
                <span>{rating.locationPoint}</span>
                <span>{rating.valuePoint}</span>
              </div>
            </div>
            <p
              className={"hotel-address"}
            >{`${country},  ${district}, ${address}`}</p>
            <p className={"hotel-price-per-night"}>{`$${averagePrice}`}</p>
          </div>
        </div>
        {user.role === 0 ? (
          ""
        ) : (
          <div
            className={["bookmark-icon", bookmarked ? "bookmarked" : ""].join(
              " "
            )}
            onClick={handleBookmark}
          >
            <FontAwesomeIcon icon={bookmarked ? faHeartSolid : faHeart} />
          </div>
        )}
      </div>
    </Link>
  );
}

export default memo(HotelCard);
