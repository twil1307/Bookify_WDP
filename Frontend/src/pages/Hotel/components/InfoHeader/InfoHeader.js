import { UserContext } from "@/utils/contexts";
import {
  faFlag,
  faHeart,
  faStar,
  faCheck,
  faXmark,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { reportContext } from "../../Hotel";
import { ToastMessageContext, BookmarkContext } from "@/utils/contexts";
import {
  getFailureToastMessage,
  getSuccessToastMessage,
} from "@/utils/reducers/toastMessageReducer";
import { useNavigate, useOutletContext } from "react-router-dom";

import InfoHeaderStyle from "./InfoHeader.module.scss";
import verifiedHotel from "@/services/admin/verifiedHotel";
import disabledHotel from "@/services/admin/disabledHotel";
import { checkHotelBook } from "@/services/hotel";
import AddDeleteBookMarked from "@/services/user/AddDeleteBookMarked";

function InfoHeader({
  Rooms = [],
  reviews = [],
  roomType = null,
  hotelName = null,
  rating = {},
  isBookmarked = false,
  hotelId = null,
  isVerified = false,
  city,
  district,
  address,
  country,
}) {
  // console.log(rating);
  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useContext(reportContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { setToastMessages } = useContext(ToastMessageContext);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkedHotels, setBookmarkedHotels] =
    useOutletContext(BookmarkContext);
  const checkUser = () => {
    if (user._id) {
      checkHotelBook(hotelId).then((result) => {
        // console.log(result);
        if (result === 405) {
          setToastMessages(
            getFailureToastMessage({
              message: "Bạn chưa từng ở khách sạn này",
            })
          );
        }
        if (result == 200) {
          setAdvanceFilterOpen(true);
        }
      });
    } else {
      setToastMessages(
        getFailureToastMessage({
          message: "Đăng nhập để thực hiện",
        })
      );
    }
  };
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

  const setVerifiedHotel = async () => {
    const data = await verifiedHotel(hotelId).then((data) => data);
    navigate("/dashboard");
    setToastMessages(
      getSuccessToastMessage({ message: "Thay đổi trạng thái thành công" })
    );
  };

  const setDisabledHotel = async () => {
    const data = await disabledHotel(hotelId).then((data) => data);
    navigate("/dashboard");
    setToastMessages(
      getSuccessToastMessage({ message: "Thay đổi trạng thái thành công" })
    );
  };

  return (
    <div className={InfoHeaderStyle["hotel_header"]}>
      <div className={InfoHeaderStyle["hotel_banner"]}>
        <h6 className={InfoHeaderStyle["rating_and_stars"]}>
          {rating.locationPoint} <FontAwesomeIcon icon={faStar} />{" "}
          <span className={InfoHeaderStyle["rating_number"]}>
            {reviews?.length} Đánh giá
          </span>
        </h6>
        <h1 className={InfoHeaderStyle["hotel_name"]}>{hotelName}</h1>
        <h5 className={InfoHeaderStyle["hotel_guest_limit"]}>
          {address}, {city}, {district} {country}
        </h5>
        {/* <h5 className={InfoHeaderStyle["hotel_guest_limit"]}>
          {roomType?.maxGuest} người - {roomType?.bedroomNum} phòng ngủ -{" "}
          {roomType?.bathNum} phòng tắm
        </h5> */}
      </div>

      <div className={InfoHeaderStyle["hotel_options"]}>
        {user.role === 3 ? (
          isVerified ? (
            <div className={InfoHeaderStyle["option_icon"]}>
              <span onClick={setDisabledHotel}>
                <FontAwesomeIcon icon={faXmark} style={{ minWidth: "1em" }} />
              </span>
            </div>
          ) : (
            <div className={InfoHeaderStyle["option_icon"]}>
              <span onClick={setVerifiedHotel}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          )
        ) : (
          ""
        )}
        <div className={InfoHeaderStyle["option_icon"]}>
          <span
            onClick={() => {
              checkUser();
            }}
          >
            <FontAwesomeIcon icon={faFlag} />
          </span>
        </div>
        <div className={InfoHeaderStyle["option_icon"]}>
          <span className={isBookmarked ? InfoHeaderStyle["bookmarked"] : ""}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoHeader;
