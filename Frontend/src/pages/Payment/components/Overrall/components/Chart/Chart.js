import SingleLineChart from "@/components/Chart/SingleLineChart";
import { useContext } from "react";
import ChartStyle from "./Chart.module.scss";
import { OverrallContext } from "../../Overall";
import { OverrallChartDataContext } from "@/pages/Payment/Payment";

function Chart({ labels, data }) {
  // const [month, setMonth] = useContext(OverrallContext);
  const [chartData, setChartData] = useContext(OverrallChartDataContext);
  console.log(chartData);
  return (
    <div>
      <SingleLineChart
        label="Giao dịch"
        labels={chartData?.listDays}
        data={chartData.totalPaymentPerDay}
      />
    </div>
  );
}

export default Chart;
