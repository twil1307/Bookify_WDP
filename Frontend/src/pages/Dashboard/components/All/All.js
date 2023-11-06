import React, {
  Suspense,
  createContext,
  useState,
  lazy,
  useMemo,
  useEffect,
} from "react";
import AllStyle from "./All.module.scss";
import MonthPicker from "./MonthPicker";

import {
  getStatic,
  typeBookingData,
  BookingNumberData,
  ReportData,
  getIncreasePercent,
} from "./AllService";

const StaticCard = lazy(() => import("./StaticCard"));
const Chart = lazy(() => import("./Chart"));
const Report = lazy(() => import("./Report"));

export const MonthContext = createContext();
const currentMonthInitialData = {
  accessNumber: 0,
  bookingDate: [],
  bookingDateNumber: [],
  bookingHotelType: [],
  bookingHotelTypeNumber: [],
  bookingNumber: 0,
  listReport: [],
  month: 0,
  paymentNumber: 0,
  reviewNumber: 0,
  userRegisNumber: 0,
};

function All() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [currentMonthData, setCurrentMonthData] = useState(
    currentMonthInitialData
  );
  const [prevMonthData, setPrevMonthData] = useState(currentMonthInitialData);

  useEffect(() => {
    fetch(
      `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/income?month=` +
        month,
      {
        method: "GET",
        credentials: "include",
        withCredentials: true,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrentMonthData(result);
      });
    fetch(
      `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/dashboard/income?month=` +
        (month - 1),
      {
        method: "GET",
        credentials: "include",
        withCredentials: true,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPrevMonthData(result);
      });
  }, [month]);

  return (
    <div className={AllStyle["dashboard-all"]}>
      <Suspense fallback={<div>Loading</div>}>
        <MonthContext.Provider value={[month, setMonth]}>
          <div>
            <MonthPicker />
          </div>
          <div className={AllStyle["static"]}>
            <StaticCard
              prevMonthData={prevMonthData ? prevMonthData : {}}
              currentMonthData={currentMonthData ? currentMonthData : {}}
              month={month}
            />
          </div>
          <div className={AllStyle["charts"]}>
            <Chart
              typeBooking={{
                type: currentMonthData.chartData?.trendingBooking.label,
                numberBooking:
                  currentMonthData.chartData?.trendingBooking.value,
              }}
              bookingNumber={{
                day: currentMonthData.chartData?.dailyBooking.label,
                numberBooking: currentMonthData.chartData?.dailyBooking.value,
              }}
            />
          </div>
          <div>
            <Suspense fallback={<div>Loading</div>}>
              <Report
                reportData={
                  currentMonthData.reports ? currentMonthData.reports : null
                }
              />
            </Suspense>
          </div>
        </MonthContext.Provider>
      </Suspense>
    </div>
  );
}

export default All;
