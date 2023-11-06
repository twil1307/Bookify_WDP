import MonthPickerStyle from "./MonthPicker.module.scss";
import { useContext, useMemo } from "react";
import { OverrallContext } from "@/pages/Payment/Payment";
const monthsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function MonthPicker() {
  const [month, setMonth] = useContext(OverrallContext);
  let date = new Date();
  let currentMonth = date.toLocaleString("default", { month: "short" });
  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  return (
    <div className={MonthPickerStyle["header-list"]}>
      <h3>Lịch sử giao dịch</h3>
      <div className={MonthPickerStyle["header-select"]}>
        <select
          name="filter"
          id=""
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          <option value={monthsNumber[date.getMonth()]}>Tháng này</option>
          {months.map((month, index) => {
            return (
              <option
                disabled={
                  months.indexOf(month) > date.getMonth() ? true : false
                }
                value={monthsNumber[index]}
                key={index}
              >
                {month}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default MonthPicker;
