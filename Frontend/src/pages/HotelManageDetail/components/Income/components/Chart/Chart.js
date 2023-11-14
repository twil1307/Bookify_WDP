import ChartStyle from "./Chart.module.scss";
import DualLineChart from "@/components/Chart/DualLineChart/";
import SingleLineChart from "@/components/Chart/SingleLineChart";
import { useEffect, useState } from "react";

function ChartComponent({
  monthSelected,
  total,
  days,
  dayIncome,
  daysTotal,
  expectIncome,
  months,
  incomeByMonth,
  expected,
}) {
  const [monthIncome, setMonthIncome] = useState();

  useEffect(() => {
    setMonthIncome(monthSelected);
  }, [monthSelected]);

  return (
    <div>
      <div className={ChartStyle["static"]}>
        <h1>
          ${" "}
          {(total * 24000)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
          VND
        </h1>
        <p>Đã thu được trong tháng {months}</p>
      </div>

      <div className={ChartStyle["sub-static"]}>
        <h4 className={ChartStyle["realistic"]}>${daysTotal}</h4>
        <h4 className={ChartStyle["expected"]}>${Math.floor(expectIncome)}</h4>
      </div>
      <div className={ChartStyle["signleChart-static"]}>
        {/* <SingleLineChart labels={days} label="Đã thu" data={dayIncome} /> */}
        <DualLineChart
          labels={days}
          label1="Đã thu"
          label2="Ước tính"
          data1={dayIncome}
          data2={expected}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
