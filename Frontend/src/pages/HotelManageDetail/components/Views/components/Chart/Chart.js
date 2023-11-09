import ChartStyle from "./Chart.module.scss";
import SingleLineChart from "@/components/Chart/SingleLineChart";

function Chart({ days, label, data }) {
  return <SingleLineChart labels={days} label={label} data={data} />;
}

export default Chart;
