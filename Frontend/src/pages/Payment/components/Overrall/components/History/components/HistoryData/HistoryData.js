// import { useEffect } from "react";
import { OverrallDataContext } from "@/pages/Payment/Payment";
import { format } from "date-fns";
import { useContext } from "react";
import HistoryDataStyle from "./HistoryData.module.scss";

function HistoryData({ data }) {
  // console.log(data);
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div className={HistoryDataStyle["report-element"]} key={index}>
            <div className={HistoryDataStyle["hotel"]}>
              <h4>{item.hotelName}</h4>
              {item.type === 1 ? (
                <h4 className={HistoryDataStyle["money-remain"]}>
                  {`+${item.ammount}`}$
                </h4>
              ) : (
                <h4 className={HistoryDataStyle["money-remain-minus"]}>
                  {`-${item.ammount}`}$
                </h4>
              )}
            </div>
            <div className={HistoryDataStyle["book-detail"]}>
              <p>
                {`${item.booking.adult} Người lớn`} -{" "}
                {`${item.booking.child} Trẻ em`} -{" "}
                {`${item.booking.infant} Trẻ sơ sinh`} -{" "}
                {`${item.booking.pet} thú cưng`}
              </p>
              <p className={HistoryDataStyle["book-time"]}>
                {item.spectDate} -{" "}
                {format(new Date(item.createAt), "dd/MM/yyyy")}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default HistoryData;
