import SingleLineChart from "@/components/Chart/SingleLineChart";
import {
  TransactionDataYear,
  TransactionDataYears,
  getYearExchange,
  getYearsSum,
  getMonthData,
  getYearSum,
  TransactionDataYears2,
} from "../AllService";
import YearPicker from "./YearPicker";
import { useState, useMemo } from "react";
import ChartStyle from "../Exchange.module.scss";

function Chart({ exchangeData, year, setYear, type, setType }) {
  const handleChange = (e) => {
    setType(e.target.value);
  };
  const yearChanging = (data) => {
    setYear(data);
  };

  return (
    <div className={ChartStyle["chart"]}>
      <div className={ChartStyle["chart-header"]}>
        <input
          type="radio"
          id="year"
          name="chart"
          onChange={handleChange}
          value="month"
          checked={type === "month"}
        />
        <label htmlFor="year">Theo tháng</label>
        <input
          type="radio"
          id="years"
          name="chart"
          onChange={handleChange}
          value="year"
        />
        <label htmlFor="years">Theo năm</label>

        {type === "month" ? (
          <h2>${exchangeData?.total}.00</h2>
        ) : (
          <h2>${exchangeData?.total}.00</h2>
        )}
        {type === "month" ? (
          <b>Thu được trong năm {year}</b>
        ) : (
          <b>Tổng thu nhập</b>
        )}
      </div>
      <div className={ChartStyle["chart-body"]}>
        {type === "month" ? (
          <>
            <SingleLineChart
              label={"Tổng tiền giao dịch"}
              labels={exchangeData?.income?.label}
              data={exchangeData?.income?.value || []}
              isY={false}
              color={"#f72585"}
            />
            <div className={ChartStyle["month-picker"]}>
              <YearPicker yearChanging={yearChanging} />
            </div>
          </>
        ) : (
          <>
            <SingleLineChart
              label={"Tổng tiền giao dịch"}
              labels={exchangeData?.income?.label}
              data={exchangeData?.income?.value}
              isY={false}
              color={"#f72585"}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default Chart;
