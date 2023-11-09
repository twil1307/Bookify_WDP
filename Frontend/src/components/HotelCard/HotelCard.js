import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HotelCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useState, memo, useEffect } from "react";
import {
  BookmarkContext,
  ToastMessageContext,
  UserContext,
} from "@/utils/contexts";
import { getSuccessToastMessage } from "@/utils/reducers/toastMessageReducer";
import AddDeleteBookMarked from "@/services/user/AddDeleteBookMarked";

function HotelCard({
  _id: hotelId,
  hotelName,
  country,
  district,
  address,
  images,
  rating,
}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const { setToastMessages } = useContext(ToastMessageContext);
  const [bookmarkedHotels, setBookmarkedHotels] =
    useOutletContext(BookmarkContext);
  useEffect(() => {
    if (
      bookmarkedHotels
        ?.map((il) => {
          if (il._id == hotelId) return true;
          return false;
        })
        .includes(true)
    )
      setBookmarked(true);
    else setBookmarked(false);
  }, [user, bookmarkedHotels]);

  const handleBookmark = async (event) => {
    event.preventDefault();
    if (!user._id) {
      setToastMessages(
        getSuccessToastMessage({ message: "Đăng nhập để dùng" })
      );
      return;
    } else {
      AddDeleteBookMarked(hotelId).then((resp) => {
        if (!bookmarked) {
          setBookmarked(!bookmarked);
          setBookmarkedHotels(resp.bookmarks);
          setToastMessages(
            getSuccessToastMessage({ message: "Đã thêm vào mục yêu thích" })
          );
          return;
        } else {
          setBookmarked(!bookmarked);
          setToastMessages(
            getSuccessToastMessage({ message: "Đã xóa khỏi mục yêu thích" })
          );
          setBookmarkedHotels(resp.bookmarks);
        }
      });
    }
  };

  return (
    // <Link to={`hotel/${hotelId}`}>
    <div className={"hotel-card"} style={{ cursor: "pointer" }}>
      <div className={"carousel"}>
        <Carousel controls={true} interval={null}>
          {images.map((element, index) => (
            <Carousel.Item key={index}>
              <img
                className={"carousel-image"}
                src={`http://localhost:${process.env.REACT_APP_BACK_END_PORT}${element.imagePath}`}
                alt={hotelName}
                loading="lazy"
                onClick={() => {
                  navigate(`hotel/${hotelId}`);
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div
        className={"hotel-info"}
        onClick={() => {
          navigate(`hotel/${hotelId}`);
        }}
      >
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
        </div>
      </div>
      {user?.role === 0 ? (
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
    // </Link>
  );
}

export default memo(HotelCard);
