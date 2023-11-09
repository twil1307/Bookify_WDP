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
import { useContext } from "react";
import { reportContext } from "../../Hotel";
import { ToastMessageContext } from "@/utils/contexts";
import {
  getFailureToastMessage,
  getSuccessToastMessage,
} from "@/utils/reducers/toastMessageReducer";

import InfoHeaderStyle from "./InfoHeader.module.scss";
import verifiedHotel from "@/services/admin/verifiedHotel";
import { useNavigate } from "react-router-dom";
import disabledHotel from "@/services/admin/disabledHotel";
import { checkHotelBook } from "@/services/hotel";

function InfoHeader({
  Rooms = [],
  reviews = [],
  roomType = null,
  hotelName = null,
  rating = {},
  isBookmarked = false,
  hotelId = null,
  isVerified = false,
}) {
  // console.log(rating);
  const [isAdvanceFilterOpen, setAdvanceFilterOpen] = useContext(reportContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { setToastMessages } = useContext(ToastMessageContext);

  const checkUser = () => {
    if (user._id) {
      checkHotelBook(hotelId).then((result) => {
        console.log(result);
        if (!result) {
          setToastMessages(
            getFailureToastMessage({
              message: "Bạn chưa từng ở khách sạn này",
            })
          );
        }
        if (result) {
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
          {roomType?.maxGuest} người - {roomType?.bedroomNum} phòng ngủ -{" "}
          {roomType?.bathNum} phòng tắm
        </h5>
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
