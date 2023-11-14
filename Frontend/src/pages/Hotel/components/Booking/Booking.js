import bookingStyles from "./Booking.module.scss";
import {
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
  useContext,
} from "react";
import { GuestsPicker, DatePicker, RoomPicker } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { differenceInDays } from "date-fns";
import { description, title } from "./bookingInitState";
import { useNavigate } from "react-router-dom";
import { BookingContext, UserContext, ModalContext } from "@/utils/contexts";
import { getSignInModal } from "@/utils/reducers/modalReducer";
import { guestsInitial } from "../../hotelInitState";
import NumberPicker from "@/components/NumberPicker";
import { checkRoomAvailable } from "@/services/hotel";

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
    roomNumPickerBox: false,
  });
  const [chooseType, setChooseType] = useState(null);
  const [selectDays, setSelectedDays] = useState();
  const [guests, setGuests] = useState(guestsInitial);
  const [price, setPrice] = useState();
  const [roomNum, setRoomNum] = useState(1);
  const [roomInfo, setRoomInfo] = useState();
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

  const checkDisable = useMemo(() => {
    const check = bookList.filter((book) => {
      if (
        book?.roomType == chooseType?._id &&
        (new Date(selectDays?.from) <= new Date(book?.checkout) ||
          new Date(book?.checkout) >= new Date(selectDays?.to))
      )
        return book;
    });
    return check?.length >= roomInfo?.avaibilityNumber;
  }, [bookList, roomInfo, roomNum]);

  const limitRoom = useMemo(() => {
    const check = bookList.filter((book) => {
      if (
        book?.roomType == chooseType?._id &&
        (new Date(selectDays?.from) <= new Date(book?.checkout) ||
          new Date(book?.checkout) >= new Date(selectDays?.to))
      )
        return book;
    });
    return check?.length;
  }, [bookList, roomInfo, roomNum]);

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
      setPrice(chooseType.roomPrice * selectDateDiff);
    }
  }, [selectDateDiff, chooseType]);

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
  const handleGetAvailRoom = () => {
    handleClick("datePickerBox");
    checkRoomAvailable(
      hotelId,
      chooseType._id,
      selectDays.from,
      selectDays.to
    ).then((resp) => {
      // console.log(resp);
      setRoomInfo(resp);
    });
  };
  // console.log(chooseType);
  const handleBooking = async () => {
    if (!user._id) {
      dispatch(getSignInModal({ isOpen: true }));
      return;
    }
    if (isAllInformatioSelected) {
      setBookList([
        ...(bookList || []),
        ...Array.from(new Array(roomNum)).map(() => ({
          roomType: chooseType._id,
          hotelId: hotelId,
          price: price,
          checkin: String(selectDays.from),
          checkout: String(selectDays.to),
          adult: guests.adult,
          child: guests.child,
          pet: guests.pet,
          infant: guests.infant,
          type: chooseType.index,
        })),
      ]);
      setChooseType(null);
      setGuests(guestsInitial);
      setSelectedDays();
      setRoomInfo();
      setRoomNum(1);
    }
  };
  const handleResetState = () => {
    setGuests(guestsInitial);
    setSelectedDays();
    setRoomNum(1);
  };
  useEffect(() => {
    // console.log(
    //   new Date(selectDays?.from) <= new Date(bookList[0]?.checkout) ||
    //     new Date(bookList[0]?.checkout) >= new Date(selectDays?.to)
    // );
  }, [bookList, roomInfo]);
  return (
    <div id={bookingStyles["booking"]}>
      {/* <div className={bookingStyles["heading-row"]}>
        <p className={bookingStyles["price"]}>
          <span>${roomType?.roomPrice}</span>/đêm
        </p>
        <div className={bookingStyles["ticket"]}></div>
      </div> */}
      <div className={bookingStyles["booking-input"]}>
        <div className={[bookingStyles["room-type-input"]].join(" ")}>
          <div className={bookingStyles["label"]}>
            <p className={bookingStyles["title"]}>Loại phòng</p>
            <div className={bookingStyles["input-value"]}>
              {chooseType?.index !== undefined
                ? `Loại phòng ${chooseType.index + 1}`
                : "Chọn phòng"}
              <button
                className={bookingStyles["float-right"]}
                onClick={() => handleClick("roomTypeBox")}
              >
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </div>
            {isSelectBoxOpen["roomTypeBox"] && (
              <RoomPicker
                roomType={roomType}
                handleResetState={handleResetState}
                setChooseType={setChooseType}
                handleClick={handleClick}
              />
            )}
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
          {isSelectBoxOpen["datePickerBox"] && chooseType && (
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
                  onClick={() => handleGetAvailRoom()}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={bookingStyles["guests-input"]}>
          <div className={bookingStyles["label"]}>
            <p className={bookingStyles["title"]}>Số phòng</p>
            <div className={bookingStyles["input-value"]}>
              {roomInfo ? `${roomNum} phòng` : "Chọn số lượng phòng"}
              {chooseType ? (
                <button
                  className={bookingStyles["float-right"]}
                  onClick={() => handleClick("roomNumPickerBox")}
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              ) : (
                <></>
              )}
            </div>
            {isSelectBoxOpen["roomNumPickerBox"] && (
              <div
                className={[
                  bookingStyles["select-box"],
                  bookingStyles["select-box--right"],
                ].join(" ")}
              >
                <div style={{ padding: "5px" }}>
                  <NumberPicker
                    title={"Số lượng phòng"}
                    value={roomNum}
                    disabled={checkDisable}
                    setValue={setRoomNum}
                    limit={roomInfo?.avaibilityNumber - limitRoom}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={bookingStyles["guests-input"]}>
          <div className={bookingStyles["label"]}>
            <p className={bookingStyles["title"]}>Khách</p>
            <div className={bookingStyles["input-value"]}>
              {total ? `${total} người` : "Thêm người"}
              {chooseType ? (
                <button
                  className={bookingStyles["float-right"]}
                  onClick={() => handleClick("guestsPickerBox")}
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              ) : (
                <></>
              )}
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
                  totalLimit={chooseType.maxGuest}
                  description={description}
                  isAllowPet={isAllowPet}
                  title={title}
                  limit={chooseType.maxGuest}
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
                ${" "}
                {(chooseType.roomPrice * 24000)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                VND
                <span>x</span>
                {selectDateDiff} đêm
              </p>
              <p className={bookingStyles["price"]}>
                {(price * 24000)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                VND
              </p>
            </div>
            <div className={bookingStyles["price-for-all-nights"]}>
              <p className={bookingStyles["price-label"]}>Phí vệ sinh</p>
              <p className={bookingStyles["price"]}>{0} VND</p>
            </div>
          </div>
          <div className={bookingStyles["final"]}>
            <div className={bookingStyles["title"]}>Tổng phải trả</div>
            <div className={bookingStyles["price"]}>
              {(price * 24000)
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
              VND
            </div>
          </div>
        </div>
      )}
      {checkDisable ? (
        <></>
      ) : (
        <button
          className={bookingStyles["booking-button"]}
          onClick={handleBooking}
        >
          {isAllInformatioSelected ? "Lưu" : "Hãy điền thông tin"}
        </button>
      )}
    </div>
  );
}

export default Booking;
