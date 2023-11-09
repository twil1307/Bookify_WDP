import ListStyle from "../../../../BookingHistory.module.scss";
import { useContext, useState, useEffect, useMemo } from "react";
import { HistoryContext, UserContext } from "@/utils/contexts";
import { HistoryCard } from "@/features/account";

function Tabs({ category }) {
  const { user } = useContext(UserContext);
  const [value, setValue] = useContext(HistoryContext);
  const [order, setOrder] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [dataFilter, setDataFilter] = useState(value);
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    document.getElementById("tabs").scrollTo(0, 0);
  }, [showMore]);
  const handleClick = (e) => {
    e.preventDefault();
    showMore ? setShowMore(false) : setShowMore(true);
  };

  const alterOrder = (e) => {
    setOrder(parseInt(e));
  };

  // useEffect(() => {
  //   console.log(category);
  //   getBookingHistory(category,{onSuccess:(result) => { 
  //     console.log(result);
  //     setBookingData(result.booking);
  //   }})
  //   // if (category.filter === "all") {
     
  //   //   // fetch("http://localhost:8080/bookify/api/user/bookingHistory/" + user._id)
  //   //   //   .then((res) => res.json())
  //   //   //   .then((result) => setBookingData(result));
  //   // }
  //   // if (category.checkinDate) {
  //   //   fetch(
  //   //     `http://localhost:8080/bookify/api/user/bookingHistory/filter?userid=${user._id}&condition=${category.checkinDate}`
  //   //   )
  //   //     .then((res) => res.json())
  //   //     .then((result) => setBookingData(result));
  //   // }
  //   // if (category.status === 1 || category.status === 0) {
  //   //   fetch(
  //   //     `http://localhost:8080/bookify/api/user/bookingHistory/filter?userid=${user._id}&condition=${category.status}`
  //   //   )
  //   //     .then((res) => res.json())
  //   //     .then((result) => setBookingData(result));

  // }, [category]);

  return (
    <div className={ListStyle["tabs-body"]}>
      <div className={ListStyle["input-group"]}>
        <select
          name="category"
          id="category"
          className={ListStyle["select-input"]}
          onChange={(e) => alterOrder(e.target.value)}
        >
          <option value={0} selected disabled hidden>
            Filter
          </option>
          <option value={0}>Mới nhất</option>
          <option value={1}>Cũ nhất</option>
        </select>
      </div>
      <div
        id="tabs"
        className={showMore ? ListStyle["tabs-active"] : ListStyle["tabs"]}
      >
        {bookingData?.map((list, key) => (
          <HistoryCard
            hotel={list.hotelId.hotelName}
            address={list.address}
            adult={list.adult}
            price={list.price}
            status={list.status}
            checkinDate={list.checkin}
            checkoutDate={list.checkout}
          />
        ))}
      </div>
      <button className={ListStyle["show-more"]} onClick={handleClick}>
        {showMore ? "Ẩn đi" : "Hiển thị thêm"}
      </button>
    </div>
  );
}
export default Tabs;
