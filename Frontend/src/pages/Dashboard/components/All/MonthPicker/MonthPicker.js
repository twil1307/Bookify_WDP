import MonthPickerStyle from "./MonthPicker.module.scss";
import SelectBox from "../SelectBox";
import { useContext, useState } from "react";
import { MonthContext } from "../All";

function MonthPicker() {
  var date = new Date();
  const [month, setMonth] = useContext(MonthContext);

  return (
    <div className={MonthPickerStyle["time-wrapper"]}>
      <div>
        <h2>
          Tháng {month}, năm {date.getFullYear()}
        </h2>
      </div>
      <div>
        <div>
          <SelectBox />
        </div>
      </div>
    </div>
  );
}

export default MonthPicker;
