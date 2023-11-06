import { createContext, useContext, useState } from "react";
import Chart from "./components/Chart";
import History from "./components/History";
import OverrallStyle from "./Overrall.module.scss";
import { getLabelAndData } from "./HistoryService";
import { data } from "./FakeHistoryData";
import { OverrallContext } from "../../Payment";

function Overall() {
  // console.log(month);
  const [month, setMonth] = useContext(OverrallContext);
  let { labels, dataLabel, hotelData } = getLabelAndData(month);

  return (
    <div>
      <div className={OverrallStyle["chart-wrapper"]}>
        <Chart labels={labels} data={dataLabel} />
      </div>
      <div className={OverrallStyle["history-wrapper"]}>
        <History data={hotelData} />
      </div>
    </div>
  );
}

export default Overall;
