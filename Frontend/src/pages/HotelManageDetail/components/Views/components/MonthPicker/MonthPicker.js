import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useState } from "react";
import MonthPickerStyle from "./MonthPicker.module.scss";

const months = [
  "",
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

function MonthPicker({ monthChanging }) {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [monthName, setMonthName] = useState(months[month]);
  const refLeft = useRef();
  const refRight = useRef();

  useEffect(() => {
    if (month <= 1) {
      setMonth(1);
      refLeft.current.style.display = "none";
      setMonthName(months[month]);
    } else if (month >= date.getMonth() + 1) {
      setMonth(date.getMonth() + 1);
      refRight.current.style.display = "none";
      setMonthName(months[month]);
    } else {
      setMonthName(months[month]);
      refRight.current.style.display = "block";
      refLeft.current.style.display = "block";
    }
  //eslint-disable-next-line
  }, [month]);

  const monthChangingHandle = (data) => {
    monthChanging(data);
  };

  return (
    <div className={MonthPickerStyle["month-picker-wrapper"]}>
      <div>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => {
            setMonth(month - 1);
            monthChangingHandle(month - 1);
          }}
          className={MonthPickerStyle["arrow-left"]}
          ref={refLeft}
        />
      </div>
      <div className={MonthPickerStyle["month-label"]}>{monthName}</div>
      <div>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => {
            setMonth(month + 1);
            monthChangingHandle(month + 1);
          }}
          className={MonthPickerStyle["arrow-right"]}
          ref={refRight}
        />
      </div>
    </div>
  );
}

export default MonthPicker;
