import bookingStyles from "./Booking.module.scss";
import {
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
  useContext,
} from "react";
import { GuestsPicker, DatePicker } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { differenceInDays } from "date-fns";
import { description, title } from "./bookingInitState";
import { useNavigate } from "react-router-dom";
import { BookingContext, UserContext, ModalContext } from "@/utils/contexts";
import { getSignInModal } from "@/utils/reducers/modalReducer";
import { guestsInitial } from "../../hotelInitState";

function formatDay(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (date) {
    const from = date.toLocaleDateString(undefined, options).split(", ");
    return `${from[1]}, ${from[2]}`;
  }

  return undefined;
}

function Booking({ roomType, isAllowPet = true, hotelId }) {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ModalContext);

  const navigate = useNavigate();

  const { bookedDays, bookList, setBookList } = useContext(BookingContext);
  // console.log(selectDays);
  const [isSelectBoxOpen, setSelectBoxOpen] = useState({
    roomTypeBox: false,
    datePickerBox: false,
    guestsPickerBox: false,
  });
  const [chooseRoomType, setchooseRoomType] = useState({});
  const [selectDays, setSelectedDays] = useState();
  const [guests, setGuests] = useState(guestsInitial);
  const [price, setPrice] = useState();
  const total = useMemo(() => {
    return Object.keys(guests).reduce((prev, key) => {
      if (key !== "pet") {
        return prev + guests[key];
      } else {
        return prev;
      }
    }, 0);
  }, [guests]);
  const selectDateDiff = useMemo(
    () => differenceInDays(selectDays?.to, selectDays?.from),
    [selectDays]
  );
  const isAllInformatioSelected = useMemo(() => {
    const isGuestsSelected = total !== 0;
    const selectDaysKey = Object.keys(selectDays || {});
    const isDateSelected =
      selectDaysKey.length !== 0 &&
      selectDaysKey.every((key) => selectDays[key]);

    return isGuestsSelected && isDateSelected;
  }, [selectDays, total]);

  useLayoutEffect(() => {
    if (selectDateDiff === 0) {
      setSelectedDays((prev) => ({
        ...prev,
        to: undefined,
      }));
    }
  }, [selectDateDiff]);

  useEffect(() => {
    if (!selectDateDiff) {
      return;
    } else {
      setPrice(roomType.roomPrice * selectDateDiff);
    }
  }, [selectDateDiff, roomType]);

  const handleClick = (type) => {
    setSelectBoxOpen((prev) => {
      return Object.keys(prev).reduce((prevState, key) => {
        if (key === type) {
          return {
            ...prevState,
            [key]: !prev[key],
          };
        } else {
          return {
            ...prevState,
            [key]: false,
          };
        }
      }, {});
    });
  };

  const handleBooking = async () => {
    console.log(isAllInformatioSelected);
    if (!user._id) {
      dispatch(getSignInModal({ isOpen: true }));
      return;
    }
    if (isAllInformatioSelected) {
      setBookList([
        ...(bookList || []),
        {
          roomType: roomType._id,
          hotelId: hotelId,
          price: price,
          checkin: selectDays.from,
          checkout: selectDays.to,
          adult: guests.adult,
          child: guests.child,
          pet: guests.pet,
          infant: guests.infant,
        },
      ]);
    }
  };

  return (
    <div id={bookingStyles["booking"]}>
      {/* <div className={bookingStyles["heading-row"]}>
        <p className={bookingStyles["price"]}>
          <span>${roomType?.roomPrice}</span>/đêm
        </p>
        <div className={bookingStyles["ticket"]}></div>
      </div> */}
      <div className={bookingStyles["booking-input"]}>
        <div
          className={[
            bookingStyles["room-type-input"],
            isSelectBoxOpen["roomTypeBox"]
              ? bookingStyles["input-selected"]
              : "",
          ].join(" ")}
        >
          <div className={bookingStyles["label"]}>
            <p className={bookingStyles["title"]}>Loại phòng</p>
            <div className={bookingStyles["input-value"]}>
              {chooseRoomType ? "Chọn loại phòng" : "lo"}
              <button
                className={bookingStyles["float-right"]}
                onClick={() => handleClick("roomTypeBox")}
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </div>
          </div>
        </div>
        <div
          className={bookingStyles["date-range-input"]}
          onClick={() => handleClick("datePickerBox")}
        >
          <div className={bookingStyles["start-day"]}>
            <div className={bookingStyles["label"]}>
              <p className={bookingStyles["title"]}>Nhận phòng</p>
              <div className={bookingStyles["input-value"]}>
                {formatDay(selectDays?.from) ?? "Chọn ngày"}
              </div>
            </div>
          </div>
          <div className={bookingStyles["end-day"]}>
            <div className={bookingStyles["label"]}>
              <p className={bookingStyles["title"]}>Trả phòng</p>
              <div className={bookingStyles["input-value"]}>
                {formatDay(selectDays?.to) ?? "Chọn ngày"}
              </div>
            </div>
          </div>
          {isSelectBoxOpen["datePickerBox"] && (
            <div
              className={[bookingStyles["date-range-input-box"]].join(" ")}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className={bookingStyles["date-range-heading"]}>
                <div className={bookingStyles["heading"]}>Chọn ngày</div>
                <div className={bookingStyles["date-range-input-modal"]}>
                  <div className={bookingStyles["modal-start-day"]}>
                    <div className={bookingStyles["label"]}>
                      <p className={bookingStyles["modal-title"]}>Nhận phòng</p>
                      <div className={bookingStyles["modal-input-value"]}>
                        {formatDay(selectDays?.from) ?? "Chọn ngày"}
                      </div>
                    </div>
                  </div>
                  <div className={bookingStyles["modal-end-day"]}>
                    <div className={bookingStyles["label"]}>
                      <p className={bookingStyles["modal-title"]}>Trả phòng</p>
                      <div className={bookingStyles["modal-input-value"]}>
                        {formatDay(selectDays?.to) ?? "Chọn ngày"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DatePicker
                mode={"range"}
                numberOfMonths={2}
                selectedDays={selectDays}
                setSelectedDays={setSelectedDays}
                fullDays={bookedDays}
              />
              <div className={bookingStyles["button-row"]}>
                <button
                  className={bookingStyles["close-date-picker"]}
                  onClick={() => handleClick("datePickerBox")}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={bookingStyles["guests-input"]}>
          <div className={bookingStyles["label"]}>
            <p className={bookingStyles["title"]}>Khách</p>
            <div className={bookingStyles["input-value"]}>
              {total ? `${total} người` : "Thêm người"}
              <button
                className={bookingStyles["float-right"]}
                onClick={() => handleClick("guestsPickerBox")}
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </div>
            {isSelectBoxOpen["guestsPickerBox"] && (
              <div
                className={[
                  bookingStyles["select-box"],
                  bookingStyles["select-box--right"],
                ].join(" ")}
              >
                <GuestsPicker
                  guests={guests}
                  setGuests={setGuests}
                  totalLimit={roomType.numberOfGuests}
                  description={description}
                  isAllowPet={isAllowPet}
                  title={title}
                  limit={roomType.numberOfGuests}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {isAllInformatioSelected && (
        <div className={bookingStyles["total"]}>
          <div className={bookingStyles["provisional"]}>
            <div className={bookingStyles["price-for-all-nights"]}>
              <p className={bookingStyles["price-label"]}>
                ${roomType.roomPrice}
                <span>x</span>
                {selectDateDiff} đêm
              </p>
              <p className={bookingStyles["price"]}>${price}</p>
            </div>
            <div className={bookingStyles["price-for-all-nights"]}>
              <p className={bookingStyles["price-label"]}>Phí vệ sinh</p>
              <p className={bookingStyles["price"]}>${0}</p>
            </div>
          </div>
          <div className={bookingStyles["final"]}>
            <div className={bookingStyles["title"]}>Tổng phải trả</div>
            <div className={bookingStyles["price"]}>${price}</div>
          </div>
        </div>
      )}
      <button
        className={bookingStyles["booking-button"]}
        onClick={handleBooking}
      >
        {isAllInformatioSelected ? "Lưu" : "Hãy điền thông tin"}
      </button>
    </div>
  );
}

export default Booking;
