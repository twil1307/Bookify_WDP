import SelectBoxStyle from "./SelectBox.module.scss";
import { MonthContext } from "../All";
import { useContext, useState } from "react";

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const monthsNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function SelectBox() {
  let date = new Date();
  const [month, setMonth] = useContext(MonthContext);
  let currentMonth = date.getMonth() + 1;

  return (
    <div className={SelectBoxStyle["select-wrapper"]}>
      <div className={SelectBoxStyle["styled-select"]}>
        <select
          name="months"
          id="months"
          onChange={(e) => {
            setMonth(parseInt(e.target.value));
          }}
          className={SelectBoxStyle["months"]}
        >
          <option value={currentMonth}>Tháng này</option>
          {months.map((data, index) => {
            return (
              <option
                disabled={months.indexOf(data) > date.getMonth() ? true : false}
                value={monthsNum[index]}
                key={index}
              >
                {data}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectBox;
