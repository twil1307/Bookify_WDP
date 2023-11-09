import { DayPicker } from "react-day-picker";
import { addDays } from "date-fns";
import "./DatePickerTable.scss";
import "./Cell.scss";

const pastMonth = new Date();
function DatePicker({
  numberOfMonths,
  mode,
  selectedDays,
  setSelectedDays,
  fullDays,
}) {
  const disable =fullDays?.map((el) => new Date(el))
  const disabledDays = [
     ...disable|| [],
    {
      from: new Date("2000/1/1"),
      to: addDays(new Date(), -1),
    },
  ];

  return (
    <>
      <DayPicker
        mode={mode}
        defaultMonth={pastMonth}
        disabled={disabledDays}
        // footer={footer}
        selected={selectedDays}
        modifiersClassNames={{
          selected: "selected_day",
          range_end: "range_end_day",
          range_start: "range_start_day",
          range_middle: "range_middle",
          disabled: "disabled_day",
        }}
        numberOfMonths={numberOfMonths}
        onSelect={setSelectedDays}
      />
    </>
  );
}

export default DatePicker;
